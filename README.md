# Rimoco Spiceflow Shopify Theme

Shopify-native preview theme for a premium organic spice manufacturer. The project shows how a Rimoco-like shop could turn recipe content, product variants, refill logic, gifting and B2B paths into a clearer buying experience.

The theme is intentionally built as a real Shopify theme for the demo dev store `Spicelift`, not as a standalone mockup.

## What This Shows

- Premium storefront rhythm for organic spices, sets and recipe-led commerce
- Product detail pages with visible variant logic, refill options and use-case copy
- Collections that guide by usage, nutrition and aroma instead of only showing a grid
- Recipe-to-cart concept for turning content into a direct purchase path
- Storefront modules that can be maintained in Shopify without coupling the shop to a custom app

## Stack

- Shopify CLI
- Shopify Liquid
- JSON templates
- CSS custom properties
- Shopify Admin GraphQL via `shopify store execute`

## Local Workflow

```bash
shopify theme dev --store spicelift --path /Volumes/web/rimoco-spice-shopify
```

## Seed Demo Store

The seed script creates products, variants, metafields and collections in the `Spicelift` dev store.

```bash
node /Volumes/web/rimoco-spice-shopify/scripts/seed-store.mjs
```

Environment overrides:

```bash
SHOPIFY_STORE=spicelift.myshopify.com \
SHOPIFY_PUBLICATION_ID=gid://shopify/Publication/192855605474 \
node scripts/seed-store.mjs
```

## Push Preview Theme

```bash
shopify theme push \
  --store spicelift \
  --path /Volumes/web/rimoco-spice-shopify \
  --unpublished
```

## Architecture Notes

- `assets/spiceflow.css` contains the custom design system.
- `sections/home-spiceflow.liquid` is the landing surface.
- `sections/product.liquid` implements the conversion-focused PDP.
- `sections/collection.liquid` implements the guided product grid.
- `snippets/product-card-spice.liquid` keeps product tiles reusable.
- `scripts/seed-store.mjs` keeps store content reproducible.

The demo deliberately avoids theme-app coupling. The point is to show how far the first improvement pass can go with Shopify-native primitives before adding app complexity.
