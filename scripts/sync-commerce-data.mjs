#!/usr/bin/env node

import { execFileSync } from 'node:child_process';

const store = process.env.SHOPIFY_STORE || 'spicelift.myshopify.com';
const publicationId = process.env.SHOPIFY_PUBLICATION_ID || 'gid://shopify/Publication/192855605474';
const syncMetaobjects = process.env.SHOPIFY_SYNC_METAOBJECTS === '1';

const productHandles = {
  bagel: 'bio-bagel-gewuerz',
  avocado: 'bio-avocado-gewuerz',
  cafe: 'bio-cafe-de-paris-gewuerz',
  bruehe: 'bio-gemuesebruehe',
  grillSet: 'bio-grillabend-set',
  brunchSet: 'bio-brunch-bagel-set',
};

const collectionHandles = {
  spices: 'gewuerzmischungen',
  sets: 'gewuerzsets',
};

const smartCollections = [
  {
    title: 'Brunch & Frühstück',
    handle: 'brunch-fruehstueck',
    description: 'Produkte für Bagel, Avocado, Ei, Bowl und ein schnelles Frühstück mit klarer Würzlogik.',
    seoTitle: 'Bio Gewürze für Brunch & Frühstück | Spicelift',
    seoDescription: 'Kuratierte Bio-Gewürze und Sets für Bagel, Avocado, Ei, Bowls und Frühstücksideen.',
    rules: [
      { column: 'TAG', relation: 'EQUALS', condition: 'brunch' },
      { column: 'TAG', relation: 'EQUALS', condition: 'bagel' },
    ],
  },
  {
    title: 'Grillen & Sommer',
    handle: 'grillen-sommer',
    description: 'Gewürze und Sets für Grillgemüse, Kräuterbutter, Dips, Brot und sommerliche Geschenke.',
    seoTitle: 'Bio Gewürze zum Grillen kaufen | Spicelift',
    seoDescription: 'Bio Gewürze und Geschenksets für Grillgemüse, Kräuterbutter, Dips und Sommerabende.',
    rules: [
      { column: 'TAG', relation: 'EQUALS', condition: 'grillen' },
      { column: 'TAG', relation: 'EQUALS', condition: 'kraeuterbutter' },
    ],
  },
  {
    title: 'Dips & Saucen',
    handle: 'dips-saucen',
    description: 'Schnelle Würzpfade für Avocado-Dip, Joghurt, Kräuterbutter, Saucen und frische Bowls.',
    seoTitle: 'Bio Gewürze für Dips & Saucen | Spicelift',
    seoDescription: 'Bio Gewürze für Avocado-Dip, Kräuterbutter, Joghurt, Saucen und schnelle Küche.',
    rules: [
      { column: 'TAG', relation: 'EQUALS', condition: 'dip' },
      { column: 'TAG', relation: 'EQUALS', condition: 'kraeuterbutter' },
    ],
  },
  {
    title: 'Geschenkideen',
    handle: 'geschenkideen',
    description: 'Kuratierte Gewürzsets für Gastgeber, Kundengeschenke, Teams und saisonale Anlässe.',
    seoTitle: 'Bio Gewürz-Geschenke kaufen | Spicelift',
    seoDescription: 'Bio Gewürzsets als Geschenkidee für Gastgeber, Kundschaft, Teams und saisonale Küche.',
    rules: [
      { column: 'TAG', relation: 'EQUALS', condition: 'geschenk' },
      { column: 'TAG', relation: 'EQUALS', condition: 'set' },
    ],
  },
  {
    title: 'Nachfüllpacks & Vorrat',
    handle: 'nachfuellpacks-vorrat',
    description: 'Refill- und Vorratslogik für Wiederkauf, Vielkocher, Teams und weniger Verpackungswechsel.',
    seoTitle: 'Bio Gewürze als Nachfüllpack & Vorrat | Spicelift',
    seoDescription: 'Nachfüllpacks, Vorratsgrößen und Gastro-Varianten für wiederkehrende Bio-Gewürz-Käufe.',
    rules: [
      { column: 'VARIANT_TITLE', relation: 'CONTAINS', condition: 'Nachfüll' },
      { column: 'VARIANT_TITLE', relation: 'CONTAINS', condition: 'Gastro' },
      { column: 'VARIANT_TITLE', relation: 'CONTAINS', condition: 'Vorrat' },
    ],
  },
];

const useCases = [
  {
    handle: 'brunch',
    title: 'Brunch',
    subtitle: 'Bagel, Avocado, Ei',
    heading: 'Frisch, nussig, sofort verständlich.',
    summary: 'Bagel-Gewürz und Avocado-Gewürz bilden einen einfachen Brunch-Pfad mit hoher Wiederkauflogik.',
    metric: '2 Empfehlungen',
    collection: 'brunch-fruehstueck',
    products: ['bio-bagel-gewuerz', 'bio-avocado-gewuerz'],
  },
  {
    handle: 'grill',
    title: 'Grillen',
    subtitle: 'Gemüse, Dip, Butter',
    heading: 'Kräuterbutter, Grillgemüse, Geschenk.',
    summary: 'Café de Paris plus Grillabend-Set macht aus einzelnen Produkten einen Anlasskorb.',
    metric: '1 Anlasskorb',
    collection: 'grillen-sommer',
    products: ['bio-cafe-de-paris-gewuerz', 'bio-grillabend-set'],
  },
  {
    handle: 'alltag',
    title: 'Alltag',
    subtitle: 'Suppe, Risotto, Meal Prep',
    heading: 'Basis für die schnelle Küche.',
    summary: 'Gemüsebrühe und Avocado-Gewürz lösen zwei wiederkehrende Fälle: Basis und frisches Finish.',
    metric: '2 Bedarfsmomente',
    collection: 'nachfuellpacks-vorrat',
    products: ['bio-gemuesebruehe', 'bio-avocado-gewuerz'],
  },
  {
    handle: 'geschenk',
    title: 'Geschenk',
    subtitle: 'Kuratierte Sets',
    heading: 'Auswahl ohne Geschenkrisiko.',
    summary: 'Kuratierte Sets funktionieren für Gastgeber, Kundengeschenke und saisonale Kampagnen.',
    metric: '2 Setpfade',
    collection: 'geschenkideen',
    products: ['bio-brunch-bagel-set', 'bio-grillabend-set'],
  },
];

const recipes = [
  {
    handle: 'knusprige-bagel-bowl',
    title: 'Knusprige Bagel Bowl mit Avocado-Dip',
    occasion: 'Rezept des Tages',
    summary: 'Ein schneller Brunch-Favorit mit zwei Gewürzen, die Bagel, Avocado und Dip zusammenbringen.',
    ctaLabel: 'Rezeptkorb hinzufügen',
    products: ['bio-bagel-gewuerz', 'bio-avocado-gewuerz'],
    steps: [
      'Rezept als Warenkorb denken: Content erklärt und führt direkt zu passenden Produkten.',
      'Dose und Refill sichtbar machen: Erstkauf und Wiederkauf bekommen je einen klaren Einstieg.',
    ],
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
  const output = execFileSync('shopify', args, { encoding: 'utf8', maxBuffer: 1024 * 1024 * 10 });
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

function resourceByHandle(resource, handle) {
  const data = execute(
    `query ResourceByHandle($query: String!) {
      ${resource}(first: 1, query: $query) {
        nodes { id handle title }
      }
    }`,
    { query: `handle:${handle}` },
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

function ensureMetaobjectDefinition(definition) {
  const existing = execute(
    `query DefinitionByType($type: String!) {
      metaobjectDefinitionByType(type: $type) {
        id
        type
        name
        fieldDefinitions { key }
      }
    }`,
    { type: definition.type },
  ).metaobjectDefinitionByType;

  if (!existing) {
    const data = execute(
      `mutation CreateDefinition($definition: MetaobjectDefinitionCreateInput!) {
        metaobjectDefinitionCreate(definition: $definition) {
          metaobjectDefinition { id type name }
          userErrors { field message }
        }
      }`,
      { definition },
    );
    reportErrors('metaobjectDefinitionCreate', data.metaobjectDefinitionCreate.userErrors);
    console.log(`created metaobject definition: ${definition.type}`);
    return data.metaobjectDefinitionCreate.metaobjectDefinition.id;
  }

  const existingKeys = new Set(existing.fieldDefinitions.map((field) => field.key));
  const missing = definition.fieldDefinitions.filter((field) => !existingKeys.has(field.key));
  if (missing.length) {
    const data = execute(
      `mutation UpdateDefinition($id: ID!, $definition: MetaobjectDefinitionUpdateInput!) {
        metaobjectDefinitionUpdate(id: $id, definition: $definition) {
          metaobjectDefinition { id type name }
          userErrors { field message }
        }
      }`,
      { id: existing.id, definition: { fieldDefinitions: missing.map((field) => ({ create: field })) } },
    );
    reportErrors('metaobjectDefinitionUpdate', data.metaobjectDefinitionUpdate.userErrors);
    console.log(`added ${missing.length} fields to metaobject definition: ${definition.type}`);
  } else {
    console.log(`metaobject definition exists: ${definition.type}`);
  }
  return existing.id;
}

function upsertMetaobject(type, handle, fields) {
  const existing = execute(
    `query MetaobjectsByType($type: String!) {
      metaobjects(first: 50, type: $type) {
        nodes { id handle type }
      }
    }`,
    { type },
  ).metaobjects.nodes.find((node) => node.handle === handle);

  const metaobject = {
    handle,
    fields: Object.entries(fields).map(([key, value]) => ({ key, value: String(value) })),
    capabilities: { publishable: { status: 'ACTIVE' } },
  };

  if (existing) {
    const data = execute(
      `mutation UpdateMetaobject($id: ID!, $metaobject: MetaobjectUpdateInput!) {
        metaobjectUpdate(id: $id, metaobject: $metaobject) {
          metaobject { id handle type }
          userErrors { field message }
        }
      }`,
      { id: existing.id, metaobject },
    );
    reportErrors('metaobjectUpdate', data.metaobjectUpdate.userErrors);
    console.log(`updated metaobject: ${type}/${handle}`);
    return existing.id;
  }

  const data = execute(
    `mutation CreateMetaobject($metaobject: MetaobjectCreateInput!) {
      metaobjectCreate(metaobject: $metaobject) {
        metaobject { id handle type }
        userErrors { field message }
      }
    }`,
    { metaobject: { type, ...metaobject } },
  );
  reportErrors('metaobjectCreate', data.metaobjectCreate.userErrors);
  console.log(`created metaobject: ${type}/${handle}`);
  return data.metaobjectCreate.metaobject.id;
}

function upsertSmartCollection(definition) {
  const existing = resourceByHandle('collections', definition.handle);
  const input = {
    title: definition.title,
    handle: definition.handle,
    descriptionHtml: `<p>${definition.description}</p>`,
    sortOrder: 'BEST_SELLING',
    ruleSet: {
      appliedDisjunctively: true,
      rules: definition.rules,
    },
    seo: {
      title: definition.seoTitle,
      description: definition.seoDescription,
    },
  };

  if (existing) {
    const data = execute(
      `mutation UpdateCollection($input: CollectionInput!) {
        collectionUpdate(input: $input) {
          collection { id handle title }
          userErrors { field message }
        }
      }`,
      { input: { id: existing.id, ...input } },
    );
    reportErrors('collectionUpdate', data.collectionUpdate.userErrors);
    publish(existing.id);
    console.log(`updated smart collection: ${definition.handle}`);
    return existing.id;
  }

  const data = execute(
    `mutation CreateCollection($input: CollectionInput!) {
      collectionCreate(input: $input) {
        collection { id handle title }
        userErrors { field message }
      }
    }`,
    { input },
  );
  reportErrors('collectionCreate', data.collectionCreate.userErrors);
  publish(data.collectionCreate.collection.id);
  console.log(`created smart collection: ${definition.handle}`);
  return data.collectionCreate.collection.id;
}

function upsertPage(page) {
  const existing = execute(
    `query PageByHandle($query: String!) {
      pages(first: 1, query: $query) {
        nodes { id handle title }
      }
    }`,
    { query: `handle:${page.handle}` },
  ).pages.nodes.find((node) => node.handle === page.handle);

  if (existing) {
    const data = execute(
      `mutation UpdatePage($id: ID!, $page: PageUpdateInput!) {
        pageUpdate(id: $id, page: $page) {
          page { id handle title }
          userErrors { field message }
        }
      }`,
      { id: existing.id, page },
    );
    reportErrors('pageUpdate', data.pageUpdate.userErrors);
    console.log(`updated page: ${page.handle}`);
    return existing.id;
  }

  const data = execute(
    `mutation CreatePage($page: PageCreateInput!) {
      pageCreate(page: $page) {
        page { id handle title }
        userErrors { field message }
      }
    }`,
    { page },
  );
  reportErrors('pageCreate', data.pageCreate.userErrors);
  console.log(`created page: ${page.handle}`);
  return data.pageCreate.page.id;
}

const productIds = new Map();
for (const handle of Object.values(productHandles)) {
  const product = resourceByHandle('products', handle);
  if (!product) throw new Error(`Missing product: ${handle}`);
  productIds.set(handle, product.id);
}

const collectionIds = new Map();
for (const handle of Object.values(collectionHandles)) {
  const collection = resourceByHandle('collections', handle);
  if (!collection) throw new Error(`Missing collection: ${handle}`);
  collectionIds.set(handle, collection.id);
}

for (const collection of smartCollections) {
  collectionIds.set(collection.handle, upsertSmartCollection(collection));
}

if (syncMetaobjects) {
  ensureMetaobjectDefinition({
    name: 'Spicelift Use Case',
    type: 'spicelift_use_case',
    description: 'Guided-selling tiles that connect cooking occasions to products and collections.',
    access: { storefront: 'PUBLIC_READ' },
    displayNameKey: 'title',
    capabilities: { publishable: { enabled: true } },
    fieldDefinitions: [
      { key: 'title', name: 'Title', type: 'single_line_text_field', required: true },
      { key: 'subtitle', name: 'Subtitle', type: 'single_line_text_field' },
      { key: 'heading', name: 'Heading', type: 'single_line_text_field' },
      { key: 'summary', name: 'Summary', type: 'multi_line_text_field' },
      { key: 'metric', name: 'Metric', type: 'single_line_text_field' },
      { key: 'products', name: 'Products', type: 'list.product_reference' },
      { key: 'collection', name: 'Collection', type: 'collection_reference' },
    ],
  });

  ensureMetaobjectDefinition({
    name: 'Spicelift Recipe',
    type: 'spicelift_recipe',
    description: 'Recipe-led commerce entries that connect editorial content to cart-ready products.',
    access: { storefront: 'PUBLIC_READ' },
    displayNameKey: 'title',
    capabilities: { publishable: { enabled: true } },
    fieldDefinitions: [
      { key: 'title', name: 'Title', type: 'single_line_text_field', required: true },
      { key: 'occasion', name: 'Occasion', type: 'single_line_text_field' },
      { key: 'summary', name: 'Summary', type: 'multi_line_text_field' },
      { key: 'cta_label', name: 'CTA label', type: 'single_line_text_field' },
      { key: 'products', name: 'Products', type: 'list.product_reference' },
      { key: 'steps', name: 'Steps', type: 'list.single_line_text_field' },
    ],
  });

  for (const useCase of useCases) {
    upsertMetaobject('spicelift_use_case', useCase.handle, {
      title: useCase.title,
      subtitle: useCase.subtitle,
      heading: useCase.heading,
      summary: useCase.summary,
      metric: useCase.metric,
      products: JSON.stringify(useCase.products.map((handle) => productIds.get(handle))),
      collection: collectionIds.get(useCase.collection),
    });
  }

  for (const recipe of recipes) {
    upsertMetaobject('spicelift_recipe', recipe.handle, {
      title: recipe.title,
      occasion: recipe.occasion,
      summary: recipe.summary,
      cta_label: recipe.ctaLabel,
      products: JSON.stringify(recipe.products.map((handle) => productIds.get(handle))),
      steps: JSON.stringify(recipe.steps),
    });
  }
} else {
  console.log('skipped metaobject sync: direct Shopify connector/Admin API owns this content layer');
  console.log('set SHOPIFY_SYNC_METAOBJECTS=1 only when the active Admin API app can read/write these definitions');
}

upsertPage({
  title: 'B2B & Corporate Gifts',
  handle: 'b2b-corporate-gifts',
  body:
    '<p>Spicelift zeigt, wie ein Gewürzshop Geschäftskunden, Geschenksets und Wiederverkäufer klar führen kann: Anlass, Menge, Personalisierung und Lieferfähigkeit stehen vor einer Anfrage.</p>',
  isPublished: true,
  templateSuffix: 'b2b',
  metafields: [
    {
      namespace: 'custom',
      key: 'lead',
      type: 'multi_line_text_field',
      value: 'Firmengeschenke, Gastro, Wiederverkauf und Private Label brauchen klare Einstiegspfade statt generischer Kontaktseiten.',
    },
  ],
});

console.log('Commerce data sync complete.');
