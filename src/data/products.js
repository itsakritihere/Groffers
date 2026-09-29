const CATEGORIES = [
  'Hand Tools',
  'Cookware',
  'Packs & Bags',
  'Lighting',
  'Cordage & Rigging',
  'Footwear',
  'Clothes',
  'EyeWear',
  'Home',
  'Skincare',
];

const ADJECTIVES = [
  'Essential',
  'Classic',
  'Premium',
  'Urban',
  'Explorer',
  'Everyday',
  'Utility',
  'Adventure',
  'Pro',
  'Elite',
];

const MATERIALS = [
  'Stainless Steel',
  'Premium Leather',
  'Cotton',
  'Polyester',
  'Nylon',
  'Aluminum',
  'Genuine Leather',
  'Ceramic',
];

function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;

  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(42);

function buildProduct(id) {
  const category = CATEGORIES[id % CATEGORIES.length];
  const adjective = ADJECTIVES[(id * 7) % ADJECTIVES.length];
  const material = MATERIALS[(id * 3) % MATERIALS.length];

  const price = Math.round((15 + rand() * 260) * 100) / 100;
  const stock = Math.floor(rand() * 120);

  return {
    id,
    name: `${adjective} ${category.replace(/s$/, '')} No. ${100 + id}`,
    category,
    material,
    price,
    stock,
    rating: Math.round((3 + rand() * 2) * 10) / 10,

    description:
      `A ${material.toLowerCase()} ${category.toLowerCase()} designed for everyday use. ` +
      `Part of the ${adjective} collection, combining durability, comfort, and practical design.`,
  };
}

export const PRODUCT_COUNT = 5000;

export const PRODUCTS = Array.from(
  { length: PRODUCT_COUNT },
  (_, i) => buildProduct(i + 1)
);

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === Number(id));
}

export const CATEGORY_LIST = CATEGORIES;