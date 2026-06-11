# Rimoco Opportunity Map

Last updated: 2026-06-11

Purpose: translate the original Shopify freelance pitch into concrete Spicelift proof points and next optimization candidates.

## Original Need

The project asks for long-term Shopify development with focus on technical maintenance, visual improvement, conversion, user experience, theme work, landing pages, app integrations, cross-sell, upsell, performance, support and collaboration with marketing.

The strongest response is not a generic premium theme. The strongest response is a maintainable commerce system that makes a rich spice catalog easier to discover, understand, gift, replenish and buy.

## Observed Brand And Commerce Context

Rimoco already has substantial raw material:

- Broad organic spice catalog with many variants.
- Refill packs, larger pack sizes and sustainable packaging logic.
- Recipe content.
- Gift products, vouchers, seminars and gift packaging.
- B2B paths for corporate gifts, private label, resellers and further processing.
- Strong trust signals: reviews, local manufactory, Bio quality, human service.
- Brand idea around taste discovery and hand-made manufactory quality.

This means the opportunity is not to invent a new brand story. The opportunity is to make the existing story easier to buy.

## Priority Optimization Themes

### 1. Intent-Led Discovery

Food customers often do not start with a product name. They start with a situation:

- What am I cooking?
- Who am I gifting?
- What flavor profile do I want?
- Which refill or pack size makes sense?

Spicelift already demonstrates the first version with guided search, occasion collections and an aroma finder. The next version should become a real discovery model:

- Search synonym map for dishes, cuisines, occasions and flavor language.
- Collection landing pages by use case rather than only product taxonomy.
- Zero-result search recovery with suggested occasions and products.
- Search analytics review loop.

Proof points:

- `sections/search.liquid`
- Homepage aroma finder
- Smart collections
- `scripts/qa-storefront.mjs`

### 2. Recipe-To-Cart At Scale

Recipe content is already part of the business. The next step is turning recipes into structured commerce:

- Recipe metaobjects with prep time, servings, difficulty, product references and optional pantry staples.
- Add all relevant spice products to cart from a recipe.
- Recipe recommendations on product pages.
- Product recommendations on recipe pages.
- Seasonal recipe landing pages for grilling, brunch, gifts, winter, salads and BBQ.

This answers content, UX and conversion at the same time.

Proof points:

- `spicelift_recipe` metaobject model
- Homepage recipe-to-cart block
- Cart API bundle interaction

### 3. Refill And Reorder Logic

Rimoco's refill and packaging logic is a real differentiator. It should not sit silently inside variant labels.

High-impact UX:

- "First time here?" choose jar/dose.
- "Already have the jar?" choose refill.
- "Cooking professionally?" choose larger pack.
- Cart prompt after first dose purchase: add matching refill or save refill path.
- Post-purchase reorder reminders for high-use categories.

The point is not discount pressure. The point is clarity and repeat behavior.

Proof points:

- Variant decision panel on PDP
- Refill collection path
- Cart threshold and upgrade logic

### 4. Gift And B2B Funnel

The current project brief mentions cross-selling, upselling and app work. For a premium spice shop, the better framing is gift intelligence:

- Gift finder by budget, recipient, cooking style and occasion.
- Curated gift bundles with real inventory tracking.
- B2B quick inquiry with quantity, occasion, timing and personalization need.
- Dedicated corporate-gifts landing page.
- Private label and reseller paths separated from consumer gifting.

This is a major pitch angle because Rimoco already exposes B2B categories. A clear funnel would reduce manual clarification and create better leads.

Proof points:

- `/pages/b2b-corporate-gifts`
- Shopify-native contact form
- Gift smart collection
- Dossier screenshots

### 5. Product Decision Support

Spices can be hard to choose because the customer cannot taste them online. Product pages should answer three questions quickly:

- What does it taste like?
- What does it fit?
- Which size should I buy?

Next improvements:

- Flavor profile tags: warm, citrusy, smoky, nutty, herbal, spicy.
- Heat and intensity scale where relevant.
- "Use like this tonight" micro recipes.
- Substitutes and alternatives.
- Pairing products.
- Compare similar spices.

This is a stronger argument than generic PDP redesign.

Proof points:

- PDP decision panel
- Product metafields
- Related products and "more from the dish" section

### 6. Search And Recommendation Operations

Shopify-native Search & Discovery should be part of the operational model:

- Synonyms for common German food searches.
- Product boosts for seasonal campaigns.
- Product recommendations by recipe, cuisine and buying path.
- Search analytics review.
- Semantic search where available and appropriate.

The value is not only storefront UI; it gives the merchant an ongoing tuning workflow.

### 7. Performance And Quality Gate

The ad explicitly asks for performance, support and long-running technical reliability. The proof should show a process:

- Theme check before deployment.
- Playwright visual QA across key pages and viewports.
- Overflow, broken image and relevant network failure checks.
- Interaction checks for search, product page, recipe-to-cart and cart.
- Performance budget for image weight, app scripts and first viewport.

Proof points:

- `scripts/qa-storefront.mjs`
- `docs/design-quality-system.md`

### 8. Analytics And Continuous Optimization

The strongest long-term freelance positioning is: build, measure, improve.

Recommended event model:

- Search submitted.
- Search result clicked.
- Occasion finder used.
- Recipe-to-cart clicked.
- Refill selected.
- Gift finder completed.
- B2B inquiry submitted.
- Cross-sell accepted.
- Variant changed from dose to refill or large pack.

This connects Shopify development with marketing collaboration.

### 9. App Strategy Without App Bloat

The brief asks for Shopify app integrations. The sober answer:

- Use native Shopify first where it is enough.
- Add apps only when they own a real capability: reviews, search, bundles, subscriptions, email, loyalty, analytics or B2B.
- Keep app impact measurable: speed, UX, data ownership, maintainability.

For the dossier, this signals senior judgment.

### 10. AI As A Quiet Production Tool

AI should be visible in the process, not gimmicky in the shop.

Useful AI-assisted areas:

- Product description consistency checks.
- Search synonym discovery from real queries.
- Recipe/product pairing suggestions.
- Alt text and SEO draft review.
- Support triage and FAQ clustering.
- Image concepting for campaigns and landing pages.

This supports the user's AI-driven development positioning without making the pitch feel unserious.

## Suggested Next Spicelift Pass

Build the next pass around "from inspiration to basket":

1. Recipe hub with structured recipe metaobjects and add-to-cart.
2. Gift finder landing page with budget and recipient logic.
3. PDP pairing and substitute model.
4. Search synonym/intent documentation and example config.
5. Analytics event map and QA proof screenshots.

This would align very tightly with the original ad: theme development, new features, landing pages, cross-sell/upsell, UX, conversion and maintainable operations.

## Dossier Framing

Suggested short framing:

> Ich habe die Arbeitsprobe bewusst nicht als reines Theme-Redesign aufgebaut, sondern als Shopify-System für bessere Kaufentscheidungen: anlassbasierte Navigation, Guided Search, Recipe-to-Cart, Refill-Logik, Geschenk- und B2B-Pfade, PDP-Entscheidungshilfen und wiederholbare QA. Genau diese Flächen entsprechen den Aufgaben aus der Ausschreibung: Theme-Weiterentwicklung, Landingpages, Shopify-Logik, Cross-/Upselling, Conversion, Performance und laufende technische Betreuung.

