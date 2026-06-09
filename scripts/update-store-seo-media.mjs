#!/usr/bin/env node

import { execFileSync } from 'node:child_process';

const store = process.env.SHOPIFY_STORE || 'spicelift.myshopify.com';
const rawBase = process.env.SPICELIFT_RAW_BASE || 'https://raw.githubusercontent.com/skyyware/spicelift/main/assets';
const forceMedia = process.env.FORCE_MEDIA === '1';
const premiumAltSuffix = 'Premium Packshot';

const products = [
  {
    handle: 'bio-bagel-gewuerz',
    title: 'Bio Bagel Gewürz',
    image: 'spice-product-bio-bagel-gewuerz.jpg',
    description:
      'Eine Bio-Gewürzmischung für Bagels, Bowls, Stullen und Dips. Sesam, Zwiebel und Gewürze bringen herzhaften Crunch auf den Tisch.',
    seoTitle: 'Bio Bagel Gewürz kaufen | Spicelift',
    seoDescription:
      'Bio Bagel Gewürz von Spicelift für Bagels, Bowls, Stullen und Dips. Mit Sesam, Zwiebel und herzhaftem Crunch. Dose, Refill und Vorratsgröße.',
  },
  {
    handle: 'bio-avocado-gewuerz',
    title: 'Bio Avocado Gewürz',
    image: 'spice-product-bio-avocado-gewuerz.jpg',
    description:
      'Bio-Gewürzmischung für Avocado-Gerichte, Dips und leichte Küche. Passt zu Tomaten, Gurke, Joghurt und geröstetem Gemüse.',
    seoTitle: 'Bio Avocado Gewürz kaufen | Spicelift',
    seoDescription:
      'Frisches Bio Avocado Gewürz von Spicelift für Avocado, Salate und Dips. Kräuter, Chili und Zitrusnoten für leichte Küche.',
  },
  {
    handle: 'bio-cafe-de-paris-gewuerz',
    title: 'Bio Café de Paris Gewürz',
    image: 'spice-product-bio-cafe-de-paris-gewuerz.jpg',
    description:
      'Bio-Gewürzmischung für schnelle Kräuterbutter, Grillabende und Gemüsegerichte. Fein abgestimmt für Ofengemüse, Pilze und Kartoffeln.',
    seoTitle: 'Bio Café de Paris Gewürz kaufen | Spicelift',
    seoDescription:
      'Bio Café de Paris Gewürz von Spicelift für Kräuterbutter, Grillgemüse, Kartoffeln und Pilze. Kräutrig, buttrig und elegant.',
  },
  {
    handle: 'bio-gemuesebruehe',
    title: 'Bio Gemüsebrühe',
    image: 'spice-product-bio-gemuesebruehe.jpg',
    description:
      'Bio-Gemüsebrühe für Suppen, Saucen, Reisgerichte, Couscous und Gemüsepfannen. Herzhaft, klar und vielseitig.',
    seoTitle: 'Bio Gemüsebrühe kaufen | Spicelift',
    seoDescription:
      'Bio Gemüsebrühe von Spicelift als klare Basis für Suppen, Saucen, Risotto und schnelle Alltagsküche. Auch als Nachfüllpack.',
  },
  {
    handle: 'bio-grillabend-set',
    title: 'Bio Grillabend Set',
    image: 'spice-product-bio-grillabend-set.jpg',
    description:
      'Ein kuratiertes Bio-Gewürzset für Grillabende. Ideal als Geschenk oder als aromatischer Start in die Sommerküche.',
    seoTitle: 'Bio Grillabend Set kaufen | Spicelift',
    seoDescription:
      'Bio Grillabend Set von Spicelift für Grillgemüse, Dips, Kräuterbutter und Marinaden. Kuratiertes Gewürzset zum Verschenken.',
  },
  {
    handle: 'bio-brunch-bagel-set',
    title: 'Bio Brunch & Bagel Set',
    image: 'spice-product-bio-brunch-bagel-set.jpg',
    description:
      'Bio-Gewürzset für Brunch und Bagel-Rezepte. Ideal als Geschenk oder für ein entspanntes Frühstück am Wochenende.',
    seoTitle: 'Bio Brunch & Bagel Set kaufen | Spicelift',
    seoDescription:
      'Bio Brunch & Bagel Set von Spicelift für Bagel, Avocado, Ei, Dip und Bowls. Kuratiertes Gewürzset für Frühstück und Geschenk.',
  },
];

const collections = [
  {
    handle: 'gewuerzmischungen',
    title: 'Bio Gewürzmischungen',
    image: 'spice-editorial-workbench.jpg',
    description:
      'Kuratierte Bio-Gewürzmischungen nach Anlass, Aroma und Anwendung. Für Alltag, Brunch, Grillen, Dips und Vorrat.',
    seoTitle: 'Bio Gewürzmischungen kaufen | Spicelift',
    seoDescription:
      'Bio Gewürzmischungen von Spicelift nach Anlass und Aroma entdecken. Für Grillen, Brunch, Dips, Gemüse und Alltagsküche.',
  },
  {
    handle: 'gewuerzsets',
    title: 'Gewürzsets',
    image: 'spice-product-bio-grillabend-set.jpg',
    description:
      'Sets für Geschenke, Brunch, Grillabende und saisonale Küche. Kuratiert für einfache Auswahl und besondere Anlässe.',
    seoTitle: 'Bio Gewürzsets kaufen | Spicelift',
    seoDescription:
      'Bio Gewürzsets von Spicelift für Brunch, Grillabend, Geschenk und saisonale Küche. Kuratierte Sets mit Premium-Packshots.',
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

function productByHandle(handle) {
  const data = execute(
    `query ProductByHandle($handle: String!) {
      products(first: 1, query: $handle) {
        nodes {
          id
          handle
          media(first: 20) { nodes { id alt } }
        }
      }
    }`,
    { handle: `handle:${handle}` },
  );
  return data.products.nodes.find((node) => node.handle === handle);
}

function collectionByHandle(handle) {
  const data = execute(
    `query CollectionByHandle($handle: String!) {
      collections(first: 1, query: $handle) {
        nodes { id handle image { url } }
      }
    }`,
    { handle: `handle:${handle}` },
  );
  return data.collections.nodes.find((node) => node.handle === handle);
}

for (const definition of products) {
  const product = productByHandle(definition.handle);
  if (!product) {
    console.warn(`missing product ${definition.handle}`);
    continue;
  }
  const premiumAlt = `${definition.title} von Spicelift - ${premiumAltSuffix}`;
  const existingPremiumMedia = product.media.nodes.find((node) => node.alt === premiumAlt);
  const media = (forceMedia && !existingPremiumMedia) || product.media.nodes.length === 0
    ? [{
        originalSource: `${rawBase}/${definition.image}`,
        alt: premiumAlt,
        mediaContentType: 'IMAGE',
      }]
    : [];
  const data = execute(
    `mutation UpdateProduct($product: ProductUpdateInput!, $media: [CreateMediaInput!]) {
      productUpdate(product: $product, media: $media) {
        product {
          id
          handle
          title
          vendor
          seo { title description }
          media(first: 20) { nodes { id alt } }
        }
        userErrors { field message }
      }
    }`,
    {
      product: {
        id: product.id,
        vendor: 'Spicelift',
        descriptionHtml: `<p>${definition.description}</p>`,
        seo: {
          title: definition.seoTitle,
          description: definition.seoDescription,
        },
      },
      media,
    },
  );
  reportErrors('productUpdate', data.productUpdate.userErrors);
  if (forceMedia || media.length) {
    const preferredMedia = data.productUpdate.product.media.nodes.find((node) => node.alt === premiumAlt);
    if (preferredMedia) {
      const reorder = execute(
        `mutation ReorderProductMedia($id: ID!, $moves: [MoveInput!]!) {
          productReorderMedia(id: $id, moves: $moves) {
            job { id done }
            mediaUserErrors { field message }
          }
        }`,
        {
          id: product.id,
          moves: [{ id: preferredMedia.id, newPosition: '0' }],
        },
      );
      reportErrors('productReorderMedia', reorder.productReorderMedia.mediaUserErrors);
      console.log(`moved premium media first for ${definition.handle}`);
    } else {
      console.warn(`premium media was not returned for ${definition.handle}`);
    }
  }
  console.log(`updated product ${definition.handle}`);
}

for (const definition of collections) {
  const collection = collectionByHandle(definition.handle);
  if (!collection) {
    console.warn(`missing collection ${definition.handle}`);
    continue;
  }
  const data = execute(
    `mutation UpdateCollection($input: CollectionInput!) {
      collectionUpdate(input: $input) {
        collection { id handle title seo { title description } image { url } }
        userErrors { field message }
      }
    }`,
    {
      input: {
        id: collection.id,
        descriptionHtml: `<p>${definition.description}</p>`,
        seo: {
          title: definition.seoTitle,
          description: definition.seoDescription,
        },
        image: collection.image?.url && !forceMedia
          ? undefined
          : { src: `${rawBase}/${definition.image}`, altText: `${definition.title} von Spicelift` },
      },
    },
  );
  reportErrors('collectionUpdate', data.collectionUpdate.userErrors);
  console.log(`updated collection ${definition.handle}`);
}

console.log('Store SEO and media update complete.');
