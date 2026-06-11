# Spicelift Design Quality System

Last updated: 2026-06-11

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
- Gift Finder that segments host, team and client-gift buying intent.
- PDP refill advisor that explains dose, refill and larger pack decisions.
- Cart next-action surface for recipe and gift continuation.
- Store sync support for `recipes` and `gift-finder` pages.

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

Then inspect at least these screenshots manually:

- Desktop home
- Mobile home
- Search with results
- Mobile search
- Product page mobile
- Recipe Hub mobile
- Gift Finder mobile
- B2B mobile
- B2B form desktop

## Dossier Angle

The design is not framed as "I made a nicer Shopify theme". The stronger message:

> I turned a Shopify storefront into a maintainable commerce system: customer-intent navigation, guided discovery, product decision support, recipe-to-cart, refill logic, B2B qualification and repeatable QA. The result is both visually premium and operationally maintainable.
