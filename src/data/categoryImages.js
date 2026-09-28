import tools from '../images/tools.jpg';
import cookware from '../images/cookware.jpg';
import bags from '../images/bags.jpg';
import light from '../images/light.jpg';
import cords from '../images/cords.jpg';
import heels from '../images/heels.jpg';
import cloth from '../images/cloth.jpg';
import eyes from '../images/eyes.jpg';
import home from '../images/home.jpg';
import skin from '../images/skin.jpg';

// Local images: used on the home page and as a fallback if online images fail.
export const CATEGORY_IMAGES = {
  'Hand Tools': [tools],
  Cookware: [cookware],
  'Packs & Bags': [bags],
  Lighting: [light],
  'Cordage & Rigging': [cords],
  Footwear: [heels],
  Clothes: [cloth],
  EyeWear: [eyes],
  Home: [home],
  Skincare: [skin],
};

// Home page category card -> first local image of the category.
export function getCategoryImage(category) {
  return CATEGORY_IMAGES[category]?.[0] ?? null;
}

// Search words sent to the online image service for each category.
const CATEGORY_KEYWORDS = {
  'Hand Tools': 'tools,hardware',
  Cookware: 'cookware,kitchen',
  'Packs & Bags': 'backpack,bag',
  Lighting: 'lamp,lighting',
  'Cordage & Rigging': 'rope',
  Footwear: 'shoes,sneakers',
  Clothes: 'clothes,fashion',
  EyeWear: 'sunglasses',
  Home: 'home,decor',
  Skincare: 'skincare,cosmetics',
};

// Local fallback image for a product.
export function getLocalProductImage(product) {
  const list = CATEGORY_IMAGES[product.category];
  if (!list || list.length === 0) return null;
  return list[product.id % list.length];
}

// ONLINE image. `lock=id` gives every product its own photo,
// and the same photo every time that product is shown.
export function getProductImage(product, width = 400, height = 400) {
  const keywords = CATEGORY_KEYWORDS[product.category];
  if (!keywords) return getLocalProductImage(product);
 // Picsum: reliable, but random photos (not matched to the category)
return `https://picsum.photos/seed/${product.id}/${width}/${height}`;
}

// For <img onError={...}>: if the online image fails, swap to the local one.
export function localFallback(product) {
  return (e) => {
    const local = getLocalProductImage(product);
    if (local && e.currentTarget.src !== local) {
      e.currentTarget.onerror = null; // prevents an infinite error loop
      e.currentTarget.src = local;
    }
  };
}