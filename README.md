# Spicelift Shopify Theme

Premium Shopify theme for the development store `Spicelift`.

The project is a real Online Store 2.0 theme, not a static mockup. It shows how a premium organic spice shop can combine product variants, refill logic, recipe-led commerce, gift sets and B2B paths into a clearer buying experience.

## What This Shows

- Premium storefront rhythm for organic spices, sets and recipe-led commerce
- Product detail pages with visible variant logic, refill options and use-case copy
- Collections that guide by usage, nutrition and aroma instead of only showing a grid
- Recipe-to-cart concept for turning content into a direct purchase path
- Aroma Finder guided selling for occasion-led product discovery
- Ajax Quick Add on product cards with Shopify form fallback
- Contextual cart upgrade logic for shipping threshold, refill and set recommendations
- Breadcrumb navigation, structured data and social sharing metadata for clearer product signals
- Responsive image loading strategy with an explicit priority image for the first viewport
- Storefront modules that can be maintained in Shopify without coupling the shop to a custom app
- 2k Grok Imagine asset pipeline for high-value product and editorial imagery
- Shopify-native commerce data layer with smart collections, Metaobjects and a B2B page route
- Premium search/discovery route, PDP decision support and B2B inquiry path
- Dedicated Recipe Hub, Gift Finder and refill/reorder decision surfaces

## Stack

- Shopify CLI
- Shopify Liquid
- JSON templates
- CSS custom properties
- Shopify Admin GraphQL via `shopify store execute`
- xAI Grok Imagine image generation via `XAI_API_KEY`

## Local Workflow

```bash
shopify theme dev --store spicelift --path /Volumes/web/spicelift
```

## Seed Store Content

The seed script creates products, variants, metafields and collections in the `Spicelift` development store.

```bash
node /Volumes/web/spicelift/scripts/seed-store.mjs
```

Environment overrides:

```bash
SHOPIFY_STORE=spicelift.myshopify.com \
SHOPIFY_PUBLICATION_ID=gid://shopify/Publication/192855605474 \
node scripts/seed-store.mjs
```

## Generate Premium Assets

Requires `XAI_API_KEY`.

```bash
node scripts/generate-grok-assets.mjs
```

The generator uses `grok-imagine-image-quality` at `2k`, stores final JPGs in `assets/`, and writes `assets/grok-assets-manifest.json`.

The product prompts ask Grok to render sparse native labels directly in the packshot:
`SPICELIFT`, product name and at most `GEWÜRZ` or `SET`.

```bash
python3 scripts/create-social-share.py
```

This creates the OpenGraph fallback image `assets/spicelift-social-share.jpg`.

## Update Store SEO And Media

After pushing image changes to GitHub, update Shopify product SEO, collection SEO, vendor names and product media:

```bash
node scripts/update-store-seo-media.mjs
```

## Sync Commerce Data Layer

The commerce data sync keeps Shopify-native buying paths aligned with the theme:

```bash
node scripts/sync-commerce-data.mjs
```

It maintains smart collections and key pages through Shopify Admin GraphQL via the CLI. Metaobject definitions and entries are owned by the direct Shopify connector/Admin API app and are documented in `docs/commerce-data-layer.md`.

Only opt into CLI Metaobject writes when the active API app can read and write those definitions:

```bash
SHOPIFY_SYNC_METAOBJECTS=1 node scripts/sync-commerce-data.mjs
```

## Push Theme

```bash
shopify theme push \
  --store spicelift \
  --path /Volumes/web/spicelift \
  --theme 160055492834
```

## Storefront QA

The QA script captures screenshots across key routes and viewports, checks horizontal overflow, broken images, relevant network failures and critical interactions.

```bash
NODE_PATH=/Users/sasha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules \
SHOPIFY_STORE_PASSWORD=<demo-password> \
node scripts/qa-storefront.mjs
```

Set `QA_OUTPUT_DIR=/path/to/folder` to store artifacts outside `.qa-artifacts/`.

## Architecture Notes

- `assets/spicelift-store.css` contains the custom design system.
- `assets/spicelift-store.js` contains progressive enhancement for product-card quick add.
- `sections/home-spicelift.liquid` is the landing surface.
- `sections/product.liquid` implements the conversion-focused PDP.
- `sections/collection.liquid` implements the guided product grid.
- `sections/page-recipes.liquid` implements the recipe-to-cart hub.
- `sections/page-gift-finder.liquid` implements the gift finder path.
- `snippets/product-card-spice.liquid` keeps product tiles reusable.
- `snippets/image.liquid` centralizes responsive image loading behavior.
- `scripts/seed-store.mjs` keeps store content reproducible.
- `scripts/generate-grok-assets.mjs` keeps generated visual assets reproducible and documented.
- `scripts/update-store-seo-media.mjs` keeps Shopify Admin product and collection data aligned with the theme.
- `scripts/sync-commerce-data.mjs` keeps smart collections and key pages reproducible.
- `scripts/qa-storefront.mjs` runs repeatable storefront screenshot and interaction QA.
- `docs/commerce-data-layer.md` documents the Shopify data model and Admin API ownership boundary.
- `docs/agent-development-guide.md` documents the operating guide for future agents and humans.
- `docs/design-quality-system.md` defines the visual and commerce quality bar.
- `docs/dossier-notes.md` translates the build into application material.

The theme deliberately avoids theme-app coupling. The first improvement pass is built with Shopify-native primitives before adding app complexity.

## Best-Practice Pass

The current theme pass follows current Shopify and Google guidance plus durable e-commerce UX principles:

- Use Shopify-native Online Store 2.0 primitives first: sections, snippets, JSON templates, metafields and reproducible admin scripts.
- Treat performance as a storefront budget: the hero asset is a real high-priority image, product media is responsive and lazy by default, and app complexity is intentionally avoided.
- Keep product signals machine-readable: Shopify product structured data, BreadcrumbList JSON-LD, Organization JSON-LD, canonical URLs and OpenGraph/Twitter media.
- Preserve accessibility in the interaction layer: visible focus states, semantic breadcrumbs, aria-pressed filter controls and explicit quick-add labels.
- Reduce commerce friction: product-page buying guidance, collection filter feedback, cart assurance and a visible shipping threshold.
- Use guided selling where it has real value: the Aroma Finder turns cooking occasions into product recommendations without forcing users through a generic search path.
- Keep Ajax behavior progressive: Quick Add improves speed and perceived quality, but the underlying Shopify product form remains the fallback.

## Award-Layer Pass

The latest pass adds high-impact, low-risk commerce improvements that map directly to a premium Shopify maintenance project:

- Guided Selling: the homepage Aroma Finder recommends products by cooking occasion, not by internal category structure.
- Recipe-to-Cart: the featured recipe adds a useful two-product basket through Shopify cart APIs.
- PDP Decision Logic: each product answers usage, size and pairing questions near the purchase flow.
- Collection Kaufpfade: curated paths for first purchase, refill and occasion activate product-grid filters; the gift path routes to the dedicated set collection when that is the stronger buying path.
- Cart AOV Layer: the cart explains the shipping threshold and points users toward refill or set additions.
- Quick Add: product cards add items without a full page transition while keeping the standard Shopify form fallback.

## Commerce Data Layer Pass

The 2026-06-10 pass moved the strongest buying paths into Shopify-native data:

- Smart collections for brunch, grilling, dips, gifts and refill/stock-up.
- `spicelift_use_case` Metaobjects for the Aroma Finder.
- `spicelift_recipe` Metaobject for the featured recipe-to-cart block.
- Dedicated `page.b2b` route for corporate gifts, gastro/team stock-up and private label qualification.
- Header and footer links that resolve to the B2B page when it exists.
- A documented Admin API boundary: Metaobjects are managed by the direct Shopify connector, while the CLI script maintains smart collections and pages.

## Design Excellence Pass

The 2026-06-11 pass focused on design quality as a system:

- Search became a guided discovery route with intent chips, premium empty state and product-card results.
- PDPs now answer taste, fit and purchase path above the variant selector.
- The B2B page now includes a real Shopify-native inquiry path for company, quantity, need and context.
- `docs/design-quality-system.md` defines the design and commerce QA bar.
- `scripts/qa-storefront.mjs` makes viewport and interaction QA repeatable.

## Device QA

Final QA was run against the live theme `Spicelift Premium Store` (`#160055492834`) on 2026-06-10 after the commerce data layer pass.

- Viewports: 320x740, 390x844, 430x932, 768x1024 and 1440x1000.
- Routes: home, brunch collection, grill collection, gift collection, B2B page, product detail page and cart.
- Checks: no page-level horizontal overflow, no broken images, no unwanted client/demo wording, one-line desktop navigation and hidden Shopify preview chrome.
- Interaction proof: Aroma Finder starts with Brunch, switches to Grillen, Recipe-to-Cart redirects to cart and contains Bagel/Avocado products.

## Recipe Gift Refill Pass

The 2026-06-11 follow-up pass turns the Rimoco opportunity map into visible storefront surfaces:

- Recipe Hub: multiple cart-ready dish paths show how editorial content can become measurable commerce.
- Gift Finder: host, team and client-gift intents are separated before the customer sees products.
- Refill Advisor: product pages explain dose, refill and larger-pack decisions near the purchase flow.
- Cart Next Actions: checkout-adjacent links continue naturally toward recipes, gifts and refill logic.
- Store Sync: `recipes` and `gift-finder` pages are created and maintained through the CLI sync script.
- Relevant network check: no own theme asset failures; the remaining 404 is a Shopify CDN `ShopifySans--regular.woff` request outside the theme.
- Final screenshots and matrix data: `/Users/sasha/Dropbox/Office/System/_application_assets/spicelift-commerce-data-qa-2026-06-10`.
