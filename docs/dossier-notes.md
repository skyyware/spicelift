# Dossier Notes

Last updated: 2026-06-10

These notes translate the Spicelift shop into application material for a Shopify freelance project. Keep this concise and evidence-based.

## Positioning

Spicelift is a Shopify-native proof of work for a premium food brand that needs ongoing technical development, theme work, UX improvements, conversion optimization and maintainable operations.

The shop demonstrates:

- Fullstack Shopify thinking, not only Liquid edits.
- Product and collection architecture for real buying intent.
- Guided search/discovery for dish, occasion, aroma and gift intent.
- Product pages that answer taste, fit, size and pairing before the buy button.
- Conversion-oriented UX without loud growth-hack patterns.
- Maintainable Admin data structures.
- High-quality product imagery and social preview assets.
- A pragmatic path from D2C to B2B and corporate gifts.

## Prospect-Relevant Opportunities

### 1. Occasion-Led Navigation

Customers do not primarily think in internal product categories. They think in situations: brunch, grilling, dips, gifts, stock-up. Smart collections and guided-selling tiles turn those situations into direct shopping paths.

Evidence in shop:

- `brunch-fruehstueck`
- `grillen-sommer`
- `dips-saucen`
- `geschenkideen`
- Homepage Aroma Finder

### 2. Recipe-To-Cart

Recipe content should not stop at inspiration. It can build a basket. A recipe with two matching spices creates a credible, low-friction conversion path from content to cart.

Evidence in shop:

- `spicelift_recipe` metaobject
- Homepage recipe block
- Cart API basket add

### 3. Refill And Repeat Purchase

Premium spice shops often leave reorder behavior implicit. Refill and stock-up paths make repeat purchase more visible and can improve AOV without discount pressure.

Evidence in shop:

- `nachfuellpacks-vorrat`
- Variant-driven smart collection rules
- Cart upgrade logic

### 4. Corporate Gifts And B2B

Corporate gifts, gastro and private label are different jobs-to-be-done. They should not be buried in a generic contact page. A lean Shopify-native B2B page can qualify interest before adding heavier systems.

Evidence in shop:

- `/pages/b2b-corporate-gifts`
- `page.b2b` template
- B2B links in header and footer

### 5. SEO And Sharing Surface

Collections and products need clear titles, descriptions, structured data and social preview assets. This is a low-risk foundation that improves both search and link sharing.

Evidence in repo:

- `scripts/update-store-seo-media.mjs`
- `scripts/create-social-share.py`
- Product and collection SEO in Admin data

### 6. Maintainable Content Model

The shop is not only designed; it is structured. Use cases and recipes live in Shopify content primitives instead of being permanently buried in theme code.

Evidence in shop:

- `spicelift_use_case`
- `spicelift_recipe`
- Theme fallback behavior
- `docs/commerce-data-layer.md`

### 7. Search As Guided Discovery

Search should not be a bare result list. For food commerce, customers search by dish, occasion, flavor, gifting and refill intent. The Spicelift search route turns those needs into intent chips, premium results and a useful empty state.

Evidence in repo:

- `sections/search.liquid`
- Search QA route in `scripts/qa-storefront.mjs`

### 8. B2B Qualification

Corporate gifts and Private Label need more context than a standard contact link. A short Shopify-native inquiry path captures company, quantity, need and context without adding app complexity.

Evidence in shop:

- `/pages/b2b-corporate-gifts`
- Shopify contact form in `sections/page-b2b.liquid`

## Short Dossier Language

Suggested concise wording:

> Für die Bewerbung habe ich eine lauffähige Shopify-Arbeitsprobe aufgebaut: ein Premium-Gewürzshop unter der Demo-Marke Spicelift. Der Fokus liegt nicht auf einem reinen Theme-Mockup, sondern auf Shopify-nativen Kaufpfaden: anlassbasierte Collections, ein Aroma-Finder, Recipe-to-Cart, Refill-/Vorratslogik, hochwertige Produktbilder, SEO-/Sharing-Basics und ein erster B2B-/Corporate-Gifts-Pfad.

> Die Umsetzung zeigt, wie ich technische Shopify-Entwicklung mit Produktdenken verbinde: Liquid, Sections, JSON Templates, Admin GraphQL, Produkte, Varianten, Collections, Metafields, Metaobjects und progressive Cart-Interaktionen greifen zusammen, ohne den Shop unnötig durch Apps oder Sonderlogik aufzublähen.

> Zusätzlich habe ich die Qualitätssicherung als Teil der Umsetzung behandelt: Ein Playwright-QA-Skript prüft Viewports, zentrale Routen, horizontale Überläufe, kaputte Bilder, relevante Netzwerkfehler und Kerninteraktionen wie Aroma-Finder und Recipe-to-Cart.

## Screenshot Checklist

Use screenshots that show concrete value:

- Homepage first viewport with premium imagery.
- Aroma Finder after selecting one use case.
- Recipe-to-cart block.
- Product detail page with variants and usage guidance.
- B2B/corporate gifts page.
- Mobile product page.
- Cart with upgrade/shipping logic.

Avoid screenshots that look like generic theme decoration.
