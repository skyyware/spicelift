#!/usr/bin/env node

import { execFileSync } from 'node:child_process';

const store = process.env.SHOPIFY_STORE || 'spicelift.myshopify.com';
const publicationId = process.env.SHOPIFY_PUBLICATION_ID || 'gid://shopify/Publication/192855605474';

const products = [
  {
    title: 'Bio Bagel Gewürz',
    handle: 'bio-bagel-gewuerz',
    type: 'Gewürzmischung',
    accent: '#f0703c',
    subtitle: 'Knuspriger Sesam, Zwiebel und Kräuter für Bowls, Stullen und Brunch.',
    usage: 'Frühstück & Bowls',
    flavor: 'Nussig, herzhaft, rund',
    pairing: 'Passt zu Frischkäse, Avocado, Ei, Salatbowls und geröstetem Gemüse.',
    story: 'Die PDP führt direkt vom Brunch-Anlass zur passenden Nachfülloption und zu Rezepten mit Bundle-Potenzial.',
    description:
      'Eine Bio-Gewürzmischung für Bagels, Bowls, Stullen und Dips. Der Fokus liegt auf klarer Anwendung, schneller Orientierung und einem hochwertigen Wiederkaufpfad.',
    tags: ['bio', 'brunch', 'bagel', 'nachfüllbar'],
    variants: [
      { name: 'Gewürzdose 80g', price: '6.90', sku: 'SP-BAGEL-080' },
      { name: 'Nachfüllpack 250g', price: '13.90', sku: 'SP-BAGEL-250' },
      { name: 'Gastro 500g', price: '22.90', sku: 'SP-BAGEL-500' },
    ],
  },
  {
    title: 'Bio Avocado Gewürz',
    handle: 'bio-avocado-gewuerz',
    type: 'Gewürzmischung',
    accent: '#75a928',
    subtitle: 'Frische Kräuter, Chili und Zitrusnoten für Avocado, Salate und Dips.',
    usage: 'Salate & Dips',
    flavor: 'Frisch, zitronig, leicht scharf',
    pairing: 'Passt zu Avocado, Tomaten, Gurke, Joghurt-Dips, Ofenkartoffeln und Grillgemüse.',
    story: 'Ein Produktmodul mit schnellen Cross-Sells: Öl, Salz, Bagel-Gewürz und Brunch-Set.',
    description:
      'Bio-Gewürzmischung für Avocado-Gerichte, Dips und leichte Küche. Der Shop zeigt Anwendungsideen und Varianten ohne Suchaufwand.',
    tags: ['bio', 'avocado', 'salat', 'dip'],
    variants: [
      { name: 'Gewürzdose 70g', price: '6.90', sku: 'SP-AVO-070' },
      { name: 'Nachfüllpack 220g', price: '12.90', sku: 'SP-AVO-220' },
      { name: 'Gastro 500g', price: '23.90', sku: 'SP-AVO-500' },
    ],
  },
  {
    title: 'Bio Café de Paris Gewürz',
    handle: 'bio-cafe-de-paris-gewuerz',
    type: 'Gewürzmischung',
    accent: '#d7a744',
    subtitle: 'Kräuterbutter, Gemüse, Kartoffeln und Grillgut mit französischer Tiefe.',
    usage: 'Grillen & Ofengemüse',
    flavor: 'Kräutrig, buttrig, elegant',
    pairing: 'Passt zu Kräuterbutter, Grillgemüse, Kartoffeln, Pilzen, Fisch und Fleischalternativen.',
    story: 'Die Aromalogik verbindet Produkt, Rezept und Warenkorb-Schwelle in einem einfachen Kaufpfad.',
    description:
      'Bio-Gewürzmischung für schnelle Kräuterbutter, Grillabende und Gemüsegerichte. Ideal für Rezeptstrecken und saisonale Bundles.',
    tags: ['bio', 'grillen', 'kraeuterbutter', 'gemuese'],
    variants: [
      { name: 'Gewürzdose 80g', price: '7.50', sku: 'SP-CDP-080' },
      { name: 'Nachfüllpack 250g', price: '14.90', sku: 'SP-CDP-250' },
      { name: 'Gastro 500g', price: '25.90', sku: 'SP-CDP-500' },
    ],
  },
  {
    title: 'Bio Gemüsebrühe',
    handle: 'bio-gemuesebruehe',
    type: 'Gewürzmischung',
    accent: '#245b3f',
    subtitle: 'Klare Bio-Basis für Suppen, Saucen, Risotto und schnelle Küche.',
    usage: 'Alltagsküche',
    flavor: 'Herzhaft, klar, gemüsig',
    pairing: 'Passt zu Suppen, Saucen, Reisgerichten, Couscous, Gemüsepfannen und Meal Prep.',
    story: 'Ein wiederkehrendes Bedarfprodukt braucht Nachfülllogik, Abo-Option und sichtbare Vorratsgrößen.',
    description:
      'Bio-Gemüsebrühe als Basisprodukt für tägliche Küche. Im Store wird der Wiederkauf sichtbar und technisch einfach wartbar.',
    tags: ['bio', 'basis', 'bruehe', 'meal-prep'],
    variants: [
      { name: 'Glas 160g', price: '7.90', sku: 'SP-BRUEHE-160' },
      { name: 'Nachfüllpack 500g', price: '18.90', sku: 'SP-BRUEHE-500' },
      { name: 'Vorrat 1kg', price: '31.90', sku: 'SP-BRUEHE-1000' },
    ],
  },
  {
    title: 'Bio Grillabend Set',
    handle: 'bio-grillabend-set',
    type: 'Gewürzset',
    accent: '#9b2953',
    subtitle: 'Kuratiertes Set für Gemüse, Dip, Kräuterbutter und Marinaden.',
    usage: 'Geschenk & Grillen',
    flavor: 'Rauchig, kräutrig, würzig',
    pairing: 'Passt zu Grillgemüse, Kartoffeln, Dips, Brot, Marinaden und sommerlichen Geschenkideen.',
    story: 'Set-PDPs reduzieren Entscheidungslast und können saisonal mit Landingpages und Cross-Sells arbeiten.',
    description:
      'Ein kuratiertes Bio-Gewürzset für Grillabende. Die Darstellung priorisiert Geschenkfähigkeit, Anwendung und schnellen Warenkorb.',
    tags: ['bio', 'set', 'grillen', 'geschenk'],
    variants: [
      { name: '3er Set', price: '19.90', sku: 'SP-GRILL-3' },
      { name: '5er Set', price: '31.90', sku: 'SP-GRILL-5' },
    ],
  },
  {
    title: 'Bio Brunch & Bagel Set',
    handle: 'bio-brunch-bagel-set',
    type: 'Gewürzset',
    accent: '#4da9be',
    subtitle: 'Alles für Bagel, Avocado, Ei, Dip und Bowls in einem Geschenkpfad.',
    usage: 'Brunch & Geschenk',
    flavor: 'Frisch, nussig, leicht scharf',
    pairing: 'Passt zu Brunch-Tischen, Frühstücksboxen, Corporate Gifts und Rezept-Content.',
    story: 'Recipe-to-Cart verbindet Content und Commerce: ein Brunch-Rezept kann direkt ein Set verkaufen.',
    description:
      'Bio-Gewürzset für Brunch und Bagel-Rezepte. Ideal als Geschenk und als Einstieg in einen höheren Warenkorbwert.',
    tags: ['bio', 'set', 'brunch', 'bagel'],
    variants: [
      { name: '3er Set', price: '18.90', sku: 'SP-BRUNCH-3' },
      { name: '6er Set', price: '36.90', sku: 'SP-BRUNCH-6' },
    ],
  },
];

const collections = [
  {
    title: 'Bio Gewürzmischungen',
    handle: 'gewuerzmischungen',
    description:
      'Kuratierte Bio-Gewürzmischungen nach Anlass, Aroma und Anwendung. Die Collection ist auf schnelle Orientierung, Rezeptbezug und Wiederkauf ausgelegt.',
    products: ['bio-bagel-gewuerz', 'bio-avocado-gewuerz', 'bio-cafe-de-paris-gewuerz', 'bio-gemuesebruehe'],
  },
  {
    title: 'Gewürzsets',
    handle: 'gewuerzsets',
    description:
      'Sets für Geschenke, Brunch, Grillabende und saisonale Kampagnen. Die Collection zeigt, wie Shopify Bundles, Landingpages und Upsells sauber zusammenfinden.',
    products: ['bio-grillabend-set', 'bio-brunch-bagel-set'],
  },
];

function execute(query, variables = {}) {
  const args = ['store', 'execute', '--store', store, '--json', '--query', query];
  if (Object.keys(variables).length) {
    args.push('--variables', JSON.stringify(variables));
  }
  if (/^\s*mutation\b/.test(query)) {
    args.push('--allow-mutations');
  }
  const output = execFileSync(
    'shopify',
    args,
    { encoding: 'utf8', maxBuffer: 1024 * 1024 * 10 },
  );
  const jsonStart = output.indexOf('{');
  if (jsonStart === -1) {
    throw new Error(`Shopify CLI did not return JSON: ${output}`);
  }
  const payload = JSON.parse(output.slice(jsonStart));
  if (payload.errors?.length) {
    throw new Error(JSON.stringify(payload.errors, null, 2));
  }
  return payload.data ?? payload;
}

function reportErrors(action, errors) {
  if (!errors?.length) return;
  const printable = errors.map((error) => `${error.field?.join('.') || 'field'}: ${error.message}`).join('\n');
  throw new Error(`${action} failed:\n${printable}`);
}

function byHandle(resource, handle) {
  const data = execute(
    `query ByHandle($handle: String!) {
      ${resource}(first: 1, query: $handle) {
        nodes { id handle title }
      }
    }`,
    { handle: `handle:${handle}` },
  );
  return data[resource].nodes.find((node) => node.handle === handle);
}

function publish(id) {
  const data = execute(
    `mutation Publish($id: ID!, $input: [PublicationInput!]!) {
      publishablePublish(id: $id, input: $input) {
        userErrors { field message }
      }
    }`,
    { id, input: [{ publicationId }] },
  );
  reportErrors('publishablePublish', data.publishablePublish.userErrors);
}

function createProduct(definition) {
  const existing = byHandle('products', definition.handle);
  if (existing) {
    console.log(`product exists: ${definition.handle}`);
    publish(existing.id);
    return existing.id;
  }

  const data = execute(
    `mutation CreateProduct($input: ProductCreateInput!) {
      productCreate(product: $input) {
        product { id handle title }
        userErrors { field message }
      }
    }`,
    {
      input: {
        title: definition.title,
        handle: definition.handle,
        descriptionHtml: `<p>${definition.description}</p>`,
        vendor: 'Spiceflow Preview',
        productType: definition.type,
        status: 'ACTIVE',
        tags: definition.tags,
        productOptions: [
          {
            name: 'Verpackung',
            position: 1,
            values: definition.variants.map((variant) => ({ name: variant.name })),
          },
        ],
        metafields: [
          { namespace: 'custom', key: 'accent_color', type: 'single_line_text_field', value: definition.accent },
          { namespace: 'custom', key: 'subtitle', type: 'single_line_text_field', value: definition.subtitle },
          { namespace: 'custom', key: 'usage', type: 'single_line_text_field', value: definition.usage },
          { namespace: 'custom', key: 'flavor', type: 'single_line_text_field', value: definition.flavor },
          { namespace: 'custom', key: 'pairing', type: 'multi_line_text_field', value: definition.pairing },
          { namespace: 'custom', key: 'story', type: 'multi_line_text_field', value: definition.story },
        ],
      },
    },
  );
  reportErrors('productCreate', data.productCreate.userErrors);

  const productId = data.productCreate.product.id;
  const variants = definition.variants.map((variant) => ({
    price: variant.price,
    inventoryPolicy: 'CONTINUE',
    taxable: true,
    inventoryItem: {
      sku: variant.sku,
      tracked: false,
    },
    optionValues: [{ optionName: 'Verpackung', name: variant.name }],
  }));

  const variantsData = execute(
    `mutation CreateVariants($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkCreate(productId: $productId, variants: $variants, strategy: REMOVE_STANDALONE_VARIANT) {
        productVariants { id title price }
        userErrors { field message }
      }
    }`,
    { productId, variants },
  );
  reportErrors('productVariantsBulkCreate', variantsData.productVariantsBulkCreate.userErrors);
  publish(productId);
  console.log(`created product: ${definition.handle}`);
  return productId;
}

function createCollection(definition, productIds) {
  const existing = byHandle('collections', definition.handle);
  if (existing) {
    console.log(`collection exists: ${definition.handle}`);
    publish(existing.id);
    return existing.id;
  }

  const data = execute(
    `mutation CreateCollection($input: CollectionInput!) {
      collectionCreate(input: $input) {
        collection { id handle title }
        userErrors { field message }
      }
    }`,
    {
      input: {
        title: definition.title,
        handle: definition.handle,
        descriptionHtml: `<p>${definition.description}</p>`,
        products: productIds,
      },
    },
  );
  reportErrors('collectionCreate', data.collectionCreate.userErrors);
  publish(data.collectionCreate.collection.id);
  console.log(`created collection: ${definition.handle}`);
  return data.collectionCreate.collection.id;
}

const productIdsByHandle = new Map();
for (const product of products) {
  productIdsByHandle.set(product.handle, createProduct(product));
}

for (const collection of collections) {
  const productIds = collection.products.map((handle) => productIdsByHandle.get(handle)).filter(Boolean);
  createCollection(collection, productIds);
}

console.log('Store seed complete.');
