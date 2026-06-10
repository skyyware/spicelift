# Spicelift Commerce Data Layer

Last updated: 2026-06-10

This document describes the Shopify-native data model behind the Spicelift demo store. The goal is to keep the shop maintainable as a real commerce system instead of a static presentation theme.

## What Was Added

The storefront now uses Shopify data for buying paths that matter for a premium spice shop:

- Occasion-led smart collections
- Guided-selling metaobjects
- A recipe-to-cart metaobject
- A dedicated B2B and corporate gifts page
- Theme fallbacks so the storefront still renders if content is missing

## Smart Collections

Created and maintained by `scripts/sync-commerce-data.mjs`.

| Handle | Purpose | Rule source |
| --- | --- | --- |
| `brunch-fruehstueck` | Bagel, avocado, egg, bowl and breakfast entry path | Product tags `brunch`, `bagel` |
| `grillen-sommer` | Grill vegetables, dips, butter and summer gifts | Product tags `grillen`, `kraeuterbutter` |
| `dips-saucen` | Avocado dip, yoghurt, herb butter and sauces | Product tags `dip`, `kraeuterbutter` |
| `geschenkideen` | Gift sets for hosts, teams and seasonal occasions | Product tags `geschenk`, `set` |
| `nachfuellpacks-vorrat` | Refill and stock-up path for repeat purchase | Variant titles containing `Nachfüll`, `Gastro` or `Vorrat` |

These collections are intentionally close to real customer intent. They can power navigation, SEO landing pages, internal merchandising and later campaign pages.

## Metaobjects

Created through the direct Shopify connector/Admin API, not the Shopify CLI. The active CLI app cannot read or write these connector-created definitions, so the local sync script skips them by default and documents that boundary at runtime.

### `spicelift_use_case`

Purpose: guided-selling tiles for the homepage Aroma Finder.

Fields:

| Key | Type | Purpose |
| --- | --- | --- |
| `title` | `single_line_text_field` | Button label |
| `subtitle` | `single_line_text_field` | Short context under the button |
| `heading` | `single_line_text_field` | Result heading |
| `summary` | `multi_line_text_field` | Result explanation |
| `metric` | `single_line_text_field` | Compact proof or recommendation count |
| `products` | `list.product_reference` | Product recommendations |
| `collection` | `collection_reference` | Deep link to the relevant buying path |

Entries:

| Handle | Products | Collection |
| --- | --- | --- |
| `brunch` | Bio Bagel Gewürz, Bio Avocado Gewürz | `brunch-fruehstueck` |
| `grill` | Bio Café de Paris Gewürz, Bio Grillabend Set | `grillen-sommer` |
| `alltag` | Bio Gemüsebrühe, Bio Avocado Gewürz | `nachfuellpacks-vorrat` |
| `geschenk` | Bio Brunch & Bagel Set, Bio Grillabend Set | `geschenkideen` |

### `spicelift_recipe`

Purpose: editorial commerce that can add a useful basket instead of only sending users to content.

Fields:

| Key | Type | Purpose |
| --- | --- | --- |
| `title` | `single_line_text_field` | Recipe title |
| `occasion` | `single_line_text_field` | Small label |
| `summary` | `multi_line_text_field` | Why this recipe matters |
| `cta_label` | `single_line_text_field` | Cart CTA |
| `products` | `list.product_reference` | Cart-ready products |
| `steps` | `list.single_line_text_field` | Short implementation or recipe logic |

Entry:

| Handle | Products |
| --- | --- |
| `knusprige-bagel-bowl` | Bio Bagel Gewürz, Bio Avocado Gewürz |

## B2B Page

Created by `scripts/sync-commerce-data.mjs`.

| Field | Value |
| --- | --- |
| Handle | `b2b-corporate-gifts` |
| Template | `page.b2b` |
| Section | `sections/page-b2b.liquid` |
| Purpose | Corporate gifts, gastro/team stock-up, private label qualification |

The page is intentionally Shopify-native: it can start as a landing page and later grow into Shopify Forms, B2B catalogs, company accounts or CRM integration.

## Theme Integration

| File | Role |
| --- | --- |
| `sections/home-spicelift.liquid` | Reads smart collections, metaobjects and the B2B page |
| `sections/page-b2b.liquid` | B2B/corporate gifts landing page |
| `templates/page.b2b.json` | Assigns the B2B page template |
| `sections/header.liquid` | Links B2B navigation to the page when present |
| `sections/footer.liquid` | Links B2B footer navigation to the page when present |
| `assets/spicelift-store.css` | Layout and responsive styles for the new surfaces |

The homepage keeps hardcoded fallback content for the Aroma Finder and recipe block. This is deliberate: the shop remains usable during Admin API maintenance or content migration.

The Aroma Finder reads content from Metaobjects but uses a fixed merchandising order in Liquid: `brunch`, `grill`, `alltag`, `geschenk`. Shopify does not guarantee that `shop.metaobjects.<type>.values` returns entries in the desired UX order, so handles define the order while fields define the content.

## Sync Runbook

Use this sequence after product, content or theme changes:

```bash
node scripts/seed-store.mjs
node scripts/update-store-seo-media.mjs
node scripts/sync-commerce-data.mjs
shopify theme check
shopify theme push --store spicelift --path /Volumes/web/spicelift --theme 160055492834
```

For Metaobjects, use the direct Shopify connector/Admin API app that owns the definitions. Only run the CLI Metaobject path when the active API app can read/write those definitions:

```bash
SHOPIFY_SYNC_METAOBJECTS=1 node scripts/sync-commerce-data.mjs
```

If the CLI returns `Not authorized. This type is reserved for use by another application.`, do not fight the theme. Use the owning Shopify Admin API app or connector for Metaobjects, then run the normal sync again for collections and pages.

## Extension Pattern

To add a new buying path:

1. Add product tags or variant naming that describe the customer intent.
2. Add a smart collection definition in `scripts/sync-commerce-data.mjs`.
3. Add a `spicelift_use_case` entry with product references and a collection reference.
4. Confirm the homepage Aroma Finder renders the new case without code changes.
5. Add a dossier note explaining the commercial reason for the path.

To add a new recipe-to-cart flow:

1. Create a `spicelift_recipe` entry.
2. Attach two to four products that belong in the same basket.
3. Keep text short enough to support buying, not editorial browsing.
4. Verify cart add behavior on desktop and mobile.

## QA Checklist

- `shopify theme check` has no offenses.
- Homepage renders with Metaobjects enabled.
- Homepage still renders if Metaobjects are temporarily missing.
- Aroma Finder buttons update content and product cards.
- Recipe-to-cart adds the referenced products.
- Smart collections are published and populated.
- B2B page uses `page.b2b` and links from header/footer.
- Mobile view has no horizontal overflow at 320px, 390px and 430px widths.
- Desktop navigation remains one line at 1024px and wider.
