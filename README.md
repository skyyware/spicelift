# Spicelift Shopify Theme

Premium Shopify theme for the demo dev store `Spicelift`.

The project is a real Online Store 2.0 theme, not a static mockup. It shows how a premium organic spice shop can combine product variants, refill logic, recipe-led commerce, gift sets and B2B paths into a clearer buying experience.

## What This Shows

- Premium storefront rhythm for organic spices, sets and recipe-led commerce
- Product detail pages with visible variant logic, refill options and use-case copy
- Collections that guide by usage, nutrition and aroma instead of only showing a grid
- Recipe-to-cart concept for turning content into a direct purchase path
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

## Seed Demo Store

The seed script creates products, variants, metafields and collections in the `Spicelift` dev store.

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

## Push Theme

```bash
shopify theme push \
  --store spicelift \
  --path /Volumes/web/spicelift \
  --theme 160055492834
```

## Architecture Notes

- `assets/spiceflow.css` contains the custom design system.
- `sections/home-spiceflow.liquid` is the landing surface.
- `sections/product.liquid` implements the conversion-focused PDP.
- `sections/collection.liquid` implements the guided product grid.
- `snippets/product-card-spice.liquid` keeps product tiles reusable.
- `scripts/seed-store.mjs` keeps store content reproducible.
- `scripts/generate-grok-assets.mjs` keeps generated visual assets reproducible and documented.

The theme deliberately avoids theme-app coupling. The first improvement pass is built with Shopify-native primitives before adding app complexity.
