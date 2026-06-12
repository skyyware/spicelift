# Agent And Human Development Guide

Last updated: 2026-06-11

This guide is for future agents and humans continuing the Spicelift Shopify store.

## Store And Repo

| Item | Value |
| --- | --- |
| Store | `spicelift.myshopify.com` |
| Store password | Use `SHOPIFY_STORE_PASSWORD` from the local environment. Do not commit it. |
| Live theme | `Spicelift Premium Store` |
| Live theme ID | `160055492834` |
| Current development theme | `Development (582b15-skyy)` |
| Current development theme ID | `160055656674` |
| Repo | `https://github.com/skyyware/spicelift` |
| Local path | `/Volumes/web/spicelift` |

Never use the real prospect name in the shop. The demo brand is `Spicelift`.

## Product Principle

Build a real Shopify product, not a visual demo.

Good changes should improve at least one of these:

- Customer orientation
- Conversion clarity
- Average order value
- Repeat purchase logic
- Product discoverability
- Store maintainability
- Performance and accessibility
- Operational fit for a merchant team

Avoid changes that only make the page look busier.

## Architecture Rules

- Prefer Shopify-native primitives before apps: products, variants, tags, collections, metafields, metaobjects, pages, templates and sections.
- Keep Liquid readable. If logic becomes complex, move repeated output into snippets.
- Keep theme behavior progressive. Ajax can improve the experience, but Shopify forms and links must remain usable.
- Do not hardcode prospect names or confidential context in theme files.
- Keep copy compact and commercially useful.
- Keep generated assets premium, restrained and label-aware.
- Avoid visible demo/case-study wording in the storefront. It must read like a real shop.
- Never underline links, chips or buttons visually; use spacing, icons, states and copy for affordance.

## Commands

Run locally:

```bash
shopify theme dev --store spicelift --path /Volumes/web/spicelift
```

Validate:

```bash
shopify theme check
```

Run storefront QA:

```bash
NODE_PATH=/Users/sasha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules \
SHOPIFY_STORE_PASSWORD=<demo-password> \
node scripts/qa-storefront.mjs
```

Sync Shopify Admin data:

```bash
node scripts/update-store-seo-media.mjs
node scripts/sync-commerce-data.mjs
```

Push to live theme:

```bash
shopify theme push --store spicelift --path /Volumes/web/spicelift --theme 160055492834
```

Generate assets:

```bash
node scripts/generate-grok-assets.mjs
python3 scripts/create-social-share.py
```

## Shopify Connector Notes

Use the direct Shopify connector for Admin API operations that the CLI cannot own, especially Metaobject definitions and entries.

Known boundary:

- The connector can create and read `spicelift_use_case` and `spicelift_recipe`.
- The Shopify CLI currently cannot write those connector-owned definitions. A `SHOPIFY_SYNC_METAOBJECTS=1` run on 2026-06-11 failed with `Not authorized. This type is reserved for use by another application`.
- `scripts/sync-commerce-data.mjs` skips Metaobjects by default and still maintains smart collections and pages.
- When visible Metaobject copy is stale, update the exact entry through the direct Shopify connector/Admin GraphQL path. On 2026-06-12 this was used for `spicelift_recipe/knusprige-bagel-bowl` after the CLI boundary repeated.

Before a write mutation:

1. Inspect the GraphQL schema for the type/input.
2. Validate the operation.
3. Execute the mutation.
4. Read back the result.
5. Document handles and intent here or in `docs/commerce-data-layer.md`.

## Visual QA

Minimum viewport set:

- 320 x 740
- 390 x 844
- 430 x 932
- 768 x 1024
- 1024 x 768
- 1440 x 1000
- 1920 x 1080

Critical routes:

- `/`
- `/collections/gewuerzmischungen`
- `/collections/gewuerzsets`
- `/collections/brunch-fruehstueck`
- `/collections/grillen-sommer`
- `/collections/geschenkideen`
- `/pages/b2b-corporate-gifts`
- `/products/bio-bagel-gewuerz`
- `/cart`

Check for:

- No page-level horizontal overflow.
- No broken images.
- Buttons and labels do not wrap awkwardly.
- Navigation is stable.
- Product cards remain useful without JavaScript.
- Quick add and recipe-to-cart work with JavaScript.
- B2B page feels like a real route, not a slide.

Latest QA artifact:

`/Users/sasha/Dropbox/Office/System/_application_assets/spicelift-real-shop-iab-qa-2026-06-11`

2026-06-11 password-gate note:

- Shopify Admin/Connector access works and the live theme can be pushed.
- The public storefront and preview link currently still require the storefront password.
- The previously provided local password value was rejected by Shopify CLI and Playwright, so automated screenshot QA lands on the password page until the store password is corrected in Shopify Admin or temporarily disabled.
- Do not commit or print the password. Once corrected, rerun `scripts/qa-storefront.mjs` with `SHOPIFY_STORE_PASSWORD` and replace the artifact path above.

Additional focused screenshot:

`/Users/sasha/Dropbox/Office/System/_application_assets/spicelift-live-polish-final-qa-2026-06-11/desktop-1440-cart-final-button.png`

Known harmless noise:

- Shopify may request `https://cdn.shopify.com/shopify-marketing_assets/static/ShopifySans--regular.woff` and receive a 404. This is not a theme-owned asset and did not create visible rendering or image failures in the 2026-06-10 QA run.

## Documentation Habit

After each meaningful pass, update at least one of:

- `README.md` for top-level capability changes.
- `docs/commerce-data-layer.md` for Shopify data model changes.
- `docs/design-quality-system.md` for visual-system, UX and QA-gate changes.
- `docs/dossier-notes.md` for prospect-facing argumentation.
- This guide for development workflow or tool boundary changes.

The documentation should explain the commercial reason and the technical implementation. Future work should be easy to defend in a dossier and easy to continue in code.
