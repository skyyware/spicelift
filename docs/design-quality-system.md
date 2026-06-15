# Spicelift Design Quality System

Last updated: 2026-06-15

This document defines what "impeccable design" means for the Spicelift Shopify store. It is a working contract for humans and agents.

## Design Standard

The store should feel premium, useful and quiet. Every section must help the customer choose, trust, compare, buy or inquire. Decoration without commerce value should be removed.

## Visual Rules

| Area | Rule |
| --- | --- |
| Typography | Serif headlines for editorial premium feel; compact sans-serif for UI and product facts. No viewport-scaled body text. |
| Spacing | Major sections need clear breathing room; compact panels use tighter hierarchy. Avoid card-in-card layouts. |
| Cards | Cards are for products, tools, forms and repeated items only. Page sections stay unframed unless they are a functional surface. |
| Buttons | One primary action per surface. Secondary actions use ghost/light styles. Button text must always remain visible on dark panels. |
| Images | Product images must show real product value. No blurry decoration. First viewport image is prioritized; below-fold images are lazy. |
| Mobile | Every fixed-format UI element needs stable dimensions. Horizontal scrolling is only acceptable for nav chips and must be intentional. |
| Color | Green is the brand anchor, but pages must not become one-note. Clay, sage, gold and cream create hierarchy. |
| Language | Storefront UI must use one customer-facing language per flow. German shop pages use German titles, labels and CTAs. |
| Links | Links, buttons and chips are never underlined in the visual UI. Use icon cues, spacing, color and state changes instead. |

## Commerce Rules

| Route | Design job |
| --- | --- |
| Home | Explain the brand, guide by occasion, show a recipe-to-cart flow, then create gift/B2B paths. |
| Search | Act as guided discovery, not a generic result list. Support dish, occasion, aroma and gift-intent search. |
| Collection | Let users choose by purchase path: first buy, refill, gift or occasion. |
| PDP | Answer: What does it taste like? What does it fit? Which size should I buy? What complements it? |
| Cart | Reduce doubt, show threshold logic and suggest useful additions without pressure. |
| B2B | Qualify intent with amount, occasion and timing before any heavy B2B app or portal is needed. |

## Current Excellence Pass

2026-06-11 added:

- Premium Search/Discovery page with intent chips, product-card results and better empty state.
- PDP decision panel above the variant selector.
- B2B inquiry path using Shopify-native contact form fields.
- Repeatable Playwright QA script for screenshots, overflow checks, broken image checks, relevant network failures and interaction proof.

2026-06-11 recipe/gift/refill pass added:

- Recipe Hub with structured recipe-to-cart flows and multiple cart-ready dish paths.
- Geschenkfinder that segments host, team and client-gift buying intent.
- PDP refill advisor that explains dose, refill and larger pack decisions.
- Cart next-action surface for recipe and gift continuation.
- Store sync support for `recipes` and `gift-finder` pages.

2026-06-11 world-class baseline pass added:

- German storefront titles for Recipe Hub, Geschenkfinder and B2B page.
- Mobile header search with intent-led wording.
- Tighter compact product-card typography and link affordances.
- Compact mobile refill advisor layout near the PDP buy flow.
- Empty cart recovery links for recipe, gift and refill intent.
- BreadcrumbList JSON-LD for the new editorial/decision pages.

2026-06-11 live review polish added:

- Full-bleed topbar, Aroma Finder, gifts and footer surfaces.
- Header search suggestions for dish, occasion, gift and refill intent.
- CSS logo mark aligned with the generated product-label identity.
- Finder layout with narrower copy column, wider recommendation surface and hidden compact product-card titles.
- Stable product-card meta rhythm so price and actions align across uneven descriptions.
- Quick-add states that visibly move from adding to added to in-cart.
- PDP refill advisor as a full-width stacked decision surface.
- Breadcrumbs hidden from the visual UI while structured data remains in place.
- Cart summary and empty-cart buttons cleaned up for better contrast and spacing.

2026-06-11 real-store polish added:

- Text-only wordmark in header and footer; product-label iconography remains in imagery, not navigation chrome.
- Top navigation reduced to four customer categories.
- Search and cart use compact icons while preserving accessible labels.
- Header suggestions only include queries that resolve to actual shop results.
- Gift, B2B, search and recipe copy now reads like a real shop instead of an implementation demo.
- PDP next actions are buttons, not underlined links.
- Cart assurance uses aligned check rows and only shows shipping encouragement before the threshold is reached.
- The Shopify CLI does not own connector-created Metaobjects; use the direct Shopify connector/Admin GraphQL path when live content needs to change.

2026-06-12 browser-comment polish added:

- Header search submits from the input; the extra icon button was removed from desktop and mobile.
- Finder and gift choices no longer show a double active border.
- Normal and compact product cards now reserve stable title, copy, category and meta zones so category, price and cart buttons align across desktop, tablet and mobile.
- Recipe-to-cart step copy uses real recipe guidance instead of implementation language, and bundle helper text was removed.
- Manufaktur spacing is tighter with a more useful image/text ratio.
- B2B home copy is merchant-facing and concrete: gifts, replenishment, labels, delivery dates and repeat orders.
- Footer copy has a calmer line-height, and footer links carry the link icon before the text.
- Visible recipe Metaobject copy was updated through the Shopify connector after the CLI reported the connector-owned type boundary.

2026-06-15 all-screen optimization added:

- Home, Search, Collections, Recipe Hub, Geschenkfinder, B2B, PDP and Cart share a final responsive layer for stable product-card heights, aligned price/action rows and no accidental underlined actions.
- The Aroma Finder uses a wider recommendation surface with product images, real prices and quick-add actions preserved across desktop and mobile.
- Recipe-to-cart cards now remove step numbers visually and use real customer guidance instead of process language.
- The Manufaktur section uses tighter whitespace and a stronger crop so the product packaging remains the visual subject.
- The B2B panel is calmer and more specific, with White Label language and a compact inquiry CTA.
- The footer no longer repeats navigation links; it now presents payment methods, shipping options and service promises using Shopify-native payment icons.
- The QA script now defaults to screenshots for every major commerce route and includes tablet plus wide-desktop breakpoints.

## QA Gate

Before shipping a design pass:

```bash
shopify theme check
NODE_PATH=/Users/sasha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules \
SHOPIFY_STORE_PASSWORD=<demo-password> \
node scripts/qa-storefront.mjs
```

The QA script must report:

- `failureCount: 0`
- `relevantNetworkFailureCount: 0`
- `cartContainsRecipeProducts: true`
- No screenshots may show Shopify's password page. A password-page screenshot is a blocked QA run, not a visual pass.

If headless QA is blocked by the storefront password but the in-app browser is already authenticated, run a targeted responsive DOM audit there before shipping: check 390, 768 and 1440px for no horizontal overflow, no password page, no stale demo copy, no search submit button, and equal product-card title/copy/category/meta offsets.

Then inspect at least these screenshots manually:

- Desktop home
- Mobile home
- Search with results
- Mobile search
- Product page mobile
- Recipe Hub mobile
- Geschenkfinder mobile
- B2B mobile
- B2B form desktop

## Dossier Angle

The design is not framed as "I made a nicer Shopify theme". The stronger message:

> I turned a Shopify storefront into a maintainable commerce system: customer-intent navigation, guided discovery, product decision support, recipe-to-cart, refill logic, B2B qualification and repeatable QA. The result is both visually premium and operationally maintainable.
