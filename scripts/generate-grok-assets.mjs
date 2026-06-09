#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { basename, dirname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const assetsDir = resolve(root, 'assets');
const manifestPath = resolve(root, 'assets/grok-assets-manifest.json');

const apiKey = process.env.XAI_API_KEY;
if (!apiKey) {
  throw new Error('XAI_API_KEY is not set.');
}

const commonQuality =
  'Ultra high-end commercial product photography for a premium organic spice brand. ' +
  'Photorealistic, elegant, restrained, editorial food-commerce art direction. ' +
  'Matte black glass spice jars with premium cream labels and subtle colored label bands. ' +
  'Natural premium lighting, stone or warm paper surface, shallow depth of field, controlled shadows, realistic materials, no CGI look. ' +
  'Avoid cheesy styling, cartoon look, fake typography, distorted labels, watermark, plastic shine, over-saturated colors, clutter, hands, people. ' +
  'No brand name other than SPICELIFT. No external client names anywhere.';

const labelGuidance =
  'The label typography must be crisp, modern, centered and readable. ' +
  'Use very little text. The only readable label text is exactly the requested SPICELIFT brand line and product name. ' +
  'Do not add nutrition facts, barcodes, addresses, fake paragraphs, random letters or extra copy.';

const jobs = [
  {
    file: 'spice-hero-premium.jpg',
    aspect_ratio: '16:9',
    prompt:
      `${commonQuality} ${labelGuidance} Wide homepage hero scene: three matte black spice jars grouped on a warm limestone counter, small ceramic bowls with red paprika powder, green herbs and golden curry, a few tasteful ingredient traces, generous dark negative space on the left for headline overlay, premium D2C food brand mood, editorial still life, 85mm lens feel. Labels should read SPICELIFT only, plus tiny simple product words if visible.`,
  },
  {
    file: 'spice-editorial-workbench.jpg',
    aspect_ratio: '16:9',
    prompt:
      `${commonQuality} ${labelGuidance} Editorial workbench scene for a premium spice manufactory: five matte black jars aligned with ceramic bowls, kraft paper, linen cloth, measuring spoon, warm daylight from one side, calm composition, enough clean negative space. Labels should read SPICELIFT only, plus tiny simple product words if visible.`,
  },
  {
    file: 'spice-product-bio-bagel-gewuerz.jpg',
    aspect_ratio: '1:1',
    prompt:
      `${commonQuality} ${labelGuidance} Square product image for an everything-bagel style organic spice blend: one matte black jar with cream label and orange accent band, sesame, poppy seeds, onion flakes and coarse salt arranged tastefully around it, warm neutral background, premium packshot. The label text must read exactly: SPICELIFT on the top line, BIO BAGEL on the main line, GEWÜRZ below. No other label text.`,
  },
  {
    file: 'spice-product-bio-avocado-gewuerz.jpg',
    aspect_ratio: '1:1',
    prompt:
      `${commonQuality} ${labelGuidance} Square product image for an avocado spice blend: one matte black jar with cream label and green accent band, avocado half, lime zest, dried herbs and chili flakes arranged sparsely, premium packshot on pale stone. The label text must read exactly: SPICELIFT on the top line, BIO AVOCADO on the main line, GEWÜRZ below. No other label text.`,
  },
  {
    file: 'spice-product-bio-cafe-de-paris-gewuerz.jpg',
    aspect_ratio: '1:1',
    prompt:
      `${commonQuality} ${labelGuidance} Square product image for a cafe de paris herb spice blend: one matte black jar with cream label and muted golden accent band, dried green herbs, butter curls, peppercorns, warm neutral stone surface, refined European food styling. The label text must read exactly: SPICELIFT on the top line, CAFÉ DE PARIS on the main line, GEWÜRZ below. No other label text.`,
  },
  {
    file: 'spice-product-bio-gemuesebruehe.jpg',
    aspect_ratio: '1:1',
    prompt:
      `${commonQuality} ${labelGuidance} Square product image for organic vegetable broth powder: one matte black jar with cream label and deep green accent band, dried vegetables, celery leaves, carrot pieces and golden broth powder in a small ceramic bowl, calm premium packshot. The label text must read exactly: SPICELIFT on the top line, BIO GEMÜSEBRÜHE on the main line. No other label text.`,
  },
  {
    file: 'spice-product-bio-grillabend-set.jpg',
    aspect_ratio: '1:1',
    prompt:
      `${commonQuality} ${labelGuidance} Square product image for a premium grilling spice gift set: three matte black jars with cream labels and restrained red, green and gold accent bands in a low gift tray, rosemary, smoked paprika and pepper, elegant summer dinner mood. Visible label text should be minimal and read SPICELIFT plus GRILLABEND SET on the front jar. No other label text.`,
  },
  {
    file: 'spice-product-bio-brunch-bagel-set.jpg',
    aspect_ratio: '1:1',
    prompt:
      `${commonQuality} ${labelGuidance} Square product image for a brunch and bagel spice gift set: three matte black jars with cream labels and subtle teal, orange and green accent bands, bagel, avocado, egg, linen napkin, premium breakfast table styling. Visible label text should be minimal and read SPICELIFT plus BRUNCH SET on the front jar. No other label text.`,
  },
];

async function createImage(job) {
  const response = await fetch('https://api.x.ai/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'grok-imagine-image-quality',
      prompt: job.prompt,
      aspect_ratio: job.aspect_ratio,
      resolution: '2k',
      response_format: 'url',
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`xAI image generation failed for ${job.file}: ${response.status} ${JSON.stringify(payload)}`);
  }
  const imageUrl = payload.data?.[0]?.url;
  if (!imageUrl) {
    throw new Error(`No image URL returned for ${job.file}: ${JSON.stringify(payload)}`);
  }

  const imageResponse = await fetch(imageUrl);
  if (!imageResponse.ok || !imageResponse.body) {
    throw new Error(`Failed to download ${job.file}: ${imageResponse.status}`);
  }
  const outputPath = resolve(assetsDir, job.file);
  await pipeline(imageResponse.body, createWriteStream(outputPath));

  return {
    file: `assets/${basename(outputPath)}`,
    model: 'grok-imagine-image-quality',
    aspect_ratio: job.aspect_ratio,
    resolution: '2k',
    prompt: job.prompt,
    revised_prompt: payload.data?.[0]?.revised_prompt ?? '',
    mime_type: payload.data?.[0]?.mime_type ?? 'image/jpeg',
    generated_at: new Date().toISOString(),
  };
}

await mkdir(dirname(manifestPath), { recursive: true });

const generated = [];
for (const job of jobs) {
  console.log(`Generating ${job.file}...`);
  const result = await createImage(job);
  generated.push(result);
  console.log(`Saved ${result.file}`);
}

await writeFile(manifestPath, JSON.stringify({ generated }, null, 2));
console.log(`Manifest written to ${manifestPath}`);
