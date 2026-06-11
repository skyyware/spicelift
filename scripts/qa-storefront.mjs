#!/usr/bin/env node

import { mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const baseUrl = process.env.STOREFRONT_URL || 'https://spicelift.myshopify.com';
const password = process.env.SHOPIFY_STORE_PASSWORD || '';
const outputDir = process.env.QA_OUTPUT_DIR || path.resolve('.qa-artifacts', new Date().toISOString().replace(/[:.]/g, '-'));

const viewports = [
  { name: 'mobile-320', width: 320, height: 740 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-430', width: 430, height: 932 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1440', width: 1440, height: 1000 },
];

const routes = [
  { name: 'home', path: '/' },
  { name: 'search-empty', path: '/search' },
  { name: 'search-bagel', path: '/search?type=product&q=bagel' },
  { name: 'collection-brunch', path: '/collections/brunch-fruehstueck' },
  { name: 'collection-grill', path: '/collections/grillen-sommer' },
  { name: 'collection-gifts', path: '/collections/geschenkideen' },
  { name: 'b2b', path: '/pages/b2b-corporate-gifts' },
  { name: 'product-bagel', path: '/products/bio-bagel-gewuerz' },
  { name: 'cart', path: '/cart' },
];

async function unlockStore(page) {
  await page.goto(`${baseUrl}/?qa=unlock-${Date.now()}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(1000);
  const passwordInput = page.locator('input[type="password"]').first();
  if ((await passwordInput.count()) === 0 || !password) return;

  await passwordInput.fill(password);
  await page.locator('button[type="submit"], input[type="submit"]').first().click();
  await page.waitForLoadState('domcontentloaded', { timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(800);
}

async function getPageMetrics(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const images = Array.from(document.images);
    const brokenImages = images
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.currentSrc || img.src || img.alt || 'unknown')
      .slice(0, 10);

    const overflowNodes = Array.from(document.querySelectorAll('body *'))
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && (rect.right > doc.clientWidth + 2 || rect.left < -2);
      })
      .slice(0, 10)
      .map((element) => ({
        tag: element.tagName,
        className: String(element.className),
        text: (element.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 90),
      }));

    return {
      title: document.title,
      h1: document.querySelector('h1')?.textContent?.trim() || '',
      clientWidth: doc.clientWidth,
      scrollWidth: doc.scrollWidth,
      overflowX: doc.scrollWidth > doc.clientWidth + 2,
      brokenImages,
      overflowNodes,
    };
  });
}

async function checkInteractions(page) {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/?qa=interactions-${Date.now()}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(1400);

  const finderButtons = await page.locator('[data-finder-target]').evaluateAll((buttons) =>
    buttons.map((button) => ({
      target: button.getAttribute('data-finder-target'),
      text: button.textContent.trim().replace(/\s+/g, ' '),
      active: button.classList.contains('is-active'),
    })),
  ).catch(() => []);

  await page.locator('[data-finder-target="grill"]').first().click().catch(() => {});
  await page.waitForTimeout(300);
  const finderAfter = await page.locator('[data-finder-result]:not([hidden])').first().innerText().catch((error) => `ERROR: ${error.message}`);

  const recipeText = await page.locator('#recipe-to-cart').innerText().catch((error) => `ERROR: ${error.message}`);
  await page.locator('[data-bundle-add]').first().click().catch(() => {});
  await page.waitForTimeout(1800);
  const cartText = await page.locator('body').innerText().catch((error) => `ERROR: ${error.message}`);

  return {
    finderButtons,
    finderAfter: finderAfter.slice(0, 500),
    recipeText: recipeText.slice(0, 500),
    afterBundleUrl: page.url(),
    cartContainsRecipeProducts: /Bagel|Avocado/.test(cartText),
  };
}

mkdirSync(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();
const consoleMessages = [];
const networkFailures = [];

page.on('console', (message) => {
  if (['error', 'warning'].includes(message.type())) {
    consoleMessages.push(`${message.type()}: ${message.text()}`);
  }
});

page.on('response', (response) => {
  if (response.status() >= 400) {
    networkFailures.push({ status: response.status(), url: response.url() });
  }
});

await unlockStore(page);

const results = [];
for (const viewport of viewports) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  for (const route of routes) {
    await page.goto(`${baseUrl}${route.path}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(1200);
    const metrics = await getPageMetrics(page);
    const screenshot = path.join(outputDir, `${viewport.name}-${route.name}.png`);
    await page.screenshot({ path: screenshot, fullPage: true });
    results.push({ viewport: viewport.name, route: route.path, screenshot, ...metrics });
  }
}

const interaction = await checkInteractions(page);
await browser.close();

const relevantNetworkFailures = networkFailures.filter((failure) =>
  !/monorail|web-pixels|analytics|shopify_chat|shop\.app|ShopifySans--regular\.woff/.test(failure.url),
);

const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  outputDir,
  routes,
  viewports,
  failures: results.filter((result) => result.overflowX || result.brokenImages.length),
  relevantNetworkFailures,
  consoleMessages: [...new Set(consoleMessages)].slice(0, 50),
  interaction,
  results,
};

writeFileSync(path.join(outputDir, 'qa-report.json'), JSON.stringify(report, null, 2));

console.log(JSON.stringify({
  outputDir,
  failureCount: report.failures.length,
  relevantNetworkFailureCount: relevantNetworkFailures.length,
  interaction,
}, null, 2));

if (report.failures.length || relevantNetworkFailures.length || !interaction.cartContainsRecipeProducts) {
  process.exitCode = 1;
}
