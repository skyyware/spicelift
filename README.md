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

## Push Theme

```bash
shopify theme push \
  --store spicelift \
  --path /Volumes/web/spicelift \
  --theme 160055492834
```

## Architecture Notes

- `assets/spicelift-store.css` contains the custom design system.
- `assets/spicelift-store.js` contains progressive enhancement for product-card quick add.
- `sections/home-spicelift.liquid` is the landing surface.
- `sections/product.liquid` implements the conversion-focused PDP.
- `sections/collection.liquid` implements the guided product grid.
- `snippets/product-card-spice.liquid` keeps product tiles reusable.
- `snippets/image.liquid` centralizes responsive image loading behavior.
- `scripts/seed-store.mjs` keeps store content reproducible.
- `scripts/generate-grok-assets.mjs` keeps generated visual assets reproducible and documented.
- `scripts/update-store-seo-media.mjs` keeps Shopify Admin product and collection data aligned with the theme.

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
- Collection Kaufpfade: curated paths for first purchase, refill, gift and occasion activate the product grid filters.
- Cart AOV Layer: the cart explains the shipping threshold and points users toward refill or set additions.
- Quick Add: product cards add items without a full page transition while keeping the standard Shopify form fallback.
