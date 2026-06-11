# Dossier Notes

Last updated: 2026-06-11

These notes translate the Spicelift shop into application material for a Shopify freelance project. Keep this concise and evidence-based.

## Positioning

Spicelift is a Shopify-native proof of work for a premium food brand that needs ongoing technical development, theme work, UX improvements, conversion optimization and maintainable operations.

The shop demonstrates:

- Fullstack Shopify thinking, not only Liquid edits.
- Product and collection architecture for real buying intent.
- Guided search/discovery for dish, occasion, aroma and gift intent.
- Product pages that answer taste, fit, size and pairing before the buy button.
- Dedicated Recipe Hub with cart-ready dish paths.
- Geschenkfinder for host, team and corporate-gift intent.
- Refill and reorder guidance across PDP and cart.
- Conversion-oriented UX without loud growth-hack patterns.
- Maintainable Admin data structures.
- High-quality product imagery and social preview assets.
- A pragmatic path from D2C to B2B and corporate gifts.

## Prospect-Relevant Opportunities

See also `docs/prospect-opportunity-map.md` for the prioritized roadmap behind these points.

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

### 9. Recipe Hub

The Recipe Hub turns editorial content into a direct commerce path. Recipes are framed as structured buying journeys: dish, products, method, cart action and follow-up set.

Evidence in shop:

- `/pages/recipes`
- `sections/page-recipes.liquid`
- Cart API bundle interaction

### 10. Geschenkfinder

Gift buying should be guided by recipient, budget and occasion rather than generic set categories. The Geschenkfinder separates host, team and client-gift intent and points larger needs toward B2B.

Evidence in shop:

- `/pages/gift-finder`
- `sections/page-gift-finder.liquid`
- Links into gift collections and B2B logic

### 11. World-Class Baseline

Premium perception breaks when obvious details do not line up. The latest pass removes those breaks before adding more complexity: German storefront titles, mobile search, compact PDP decision support, clearer product-card typography, empty-cart recovery and BreadcrumbList structured data.

Evidence in shop:

- German page titles for `/pages/recipes`, `/pages/gift-finder` and `/pages/b2b-corporate-gifts`
- Mobile search in `sections/header.liquid`
- Compact mobile refill advisor in `assets/spicelift-store.css`
- Empty cart intent paths in `sections/cart.liquid`
- Breadcrumb JSON-LD in `sections/page-recipes.liquid` and `sections/page-gift-finder.liquid`

### 12. Live Design Polish

The final live-review pass focuses on the details a merchant or design lead notices immediately: full-width commercial bands, logo consistency, search suggestions, stable product-card actions, no breadcrumb clutter, cleaner cart spacing and clearer button states. This is not feature work; it is trust work.

Evidence in shop:

- Header search with compact icon action, typed suggestions and accessible labels in `sections/header.liquid`
- Full-bleed topbar, finder, gift and footer surfaces in `sections/header.liquid`, `sections/home-spicelift.liquid` and `sections/footer.liquid`
- PDP refill advisor moved into a full-width decision surface in `sections/product.liquid`
- Quick-add feedback states in `assets/spicelift-store.js`
- Final responsive polish and cart button fixes in `assets/spicelift-store.css`

## Short Dossier Language

Suggested concise wording:

> Für die Bewerbung habe ich eine lauffähige Shopify-Arbeitsprobe aufgebaut: einen Premium-Gewürzshop unter der Marke Spicelift. Der Fokus liegt nicht auf einem reinen Theme-Mockup, sondern auf Shopify-nativer Orientierung: anlassbasierte Collections, ein Aroma-Finder, Recipe-to-Cart, Refill-/Vorratslogik, hochwertige Produktbilder, SEO-/Sharing-Basics und ein erster Business-/Corporate-Gifts-Einstieg.

> Die Umsetzung zeigt, wie ich technische Shopify-Entwicklung mit Produktdenken verbinde: Liquid, Sections, JSON Templates, Admin GraphQL, Produkte, Varianten, Collections, Metafields, Metaobjects und progressive Cart-Interaktionen greifen zusammen, ohne den Shop unnötig durch Apps oder Sonderlogik aufzublähen.

> Zusätzlich habe ich die Qualitätssicherung als Teil der Umsetzung behandelt: Ein Playwright-QA-Skript prüft Viewports, zentrale Routen, horizontale Überläufe, kaputte Bilder, relevante Netzwerkfehler und Kerninteraktionen wie Aroma-Finder und Recipe-to-Cart.

> Im zweiten Optimierungspass habe ich die Flächen gebaut, die am stärksten auf die Ausschreibung einzahlen: Recipe Hub, Geschenkfinder, Refill-/Vorratsentscheidung auf der PDP und Weiterführung im Warenkorb. Damit deckt die Arbeitsprobe Theme-Entwicklung, Landingpages, Cross-/Upselling, Conversion, UX und laufende Wartbarkeit ab.

> Im anschließenden Qualitäts-Pass habe ich offensichtliche Premium-Brüche entfernt: einheitliche deutsche Storefront-Sprache, mobile Suche, kompaktere PDP-Entscheidungshilfe, bessere leere Warenkorbführung und strukturierte Breadcrumb-Daten. Das zeigt, dass ich nicht nur Features baue, sondern die Store-Erfahrung als Gesamtsystem prüfe.

> In der finalen Live-Review habe ich die Details geschärft, die aus einem guten Store einen glaubwürdigen Premium-Store machen: volle Breiten für kommerzielle Flächen, konsistente Logo-Optik, Suchvorschläge, klare Quick-Add-Zustände, stabile Produktkarten, ruhigere PDP- und Cart-Layouts und Button-Kontraste ohne Unsicherheit.

> Im Real-Store-Polish habe ich die letzten Demo-Signale entfernt: reduzierte Top-Navigation, reines Textlogo, echte Icon-Actions für Suche und Warenkorb, keine unterstrichenen Links, realistischere Geschenk-/Business-Texte, sauberere Cart-Assurance und Store-Daten, die nicht mehr durch alte Metaobject-Copy überschrieben werden.

## Screenshot Checklist

Use screenshots that show concrete value:

- Homepage first viewport with premium imagery.
- Aroma Finder after selecting one use case.
- Recipe-to-cart block.
- Recipe Hub with multiple cart-ready dish paths.
- Geschenkfinder recommendation state.
- Product detail page with variants and usage guidance.
- Refill advisor on product detail page.
- B2B/corporate gifts page.
- Mobile product page.
- Cart with upgrade/shipping logic.

Avoid screenshots that look like generic theme decoration.
