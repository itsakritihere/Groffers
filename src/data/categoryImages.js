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

export function getCategoryImage(category) {
  return CATEGORY_IMAGES[category]?.[0] ?? null;
}

export function getLocalProductImage(product) {
  const list = CATEGORY_IMAGES[product.category];
  if (!list || list.length === 0) return null;
  return list[product.id % list.length];
}

const CATEGORY_SEARCH_TERMS = {
  'Hand Tools': 'hand tools',
  Cookware: 'cookware kitchen',
  'Packs & Bags': 'backpack',
  Lighting: 'lamp lighting',
  'Cordage & Rigging': 'rope climbing',
  Footwear: 'shoes',
  Clothes: 'clothing fashion',
  EyeWear: 'sunglasses',
  Home: 'home decor',
  Skincare: 'skincare cosmetics',
};

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
console.log('PEXELS KEY', API_KEY);
const PHOTOS_PER_CATEGORY = 12; 

const photoCache = {};

const pendingFetches = {};

const subscribers = {};

function notify(category) {
  (subscribers[category] || []).forEach((cb) => cb());
}

export function subscribeToCategory(category, callback) {
  (subscribers[category] ||= []).push(callback);
  return () => {
    subscribers[category] = subscribers[category].filter((cb) => cb !== callback);
  };
}

async function fetchCategoryPhotos(category) {
  if (photoCache[category]) return photoCache[category];
  if (pendingFetches[category]) return pendingFetches[category];
  if (!API_KEY) return null; // no key configured -> caller falls back to local image

  const term = CATEGORY_SEARCH_TERMS[category] ?? category;

  pendingFetches[category] = fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(term)}&per_page=${PHOTOS_PER_CATEGORY}`,
    { headers: { Authorization: API_KEY } }
  )
    .then((res) => {
      if (!res.ok) throw new Error(`Pexels ${res.status}`);
      return res.json();
    })
    .then((data) => {
      const urls = (data.photos || []).map((p) => p.src.medium);
      photoCache[category] = urls.length > 0 ? urls : null;
      return photoCache[category];
    })
    .catch((err) => {
      console.error('Pexels fetch failed for', category, err);
      photoCache[category] = null;
      return null;
    })
    .finally(() => {
      delete pendingFetches[category];
      notify(category);
    });

  return pendingFetches[category];
}

export function prefetchAllCategoryPhotos() {
  Object.keys(CATEGORY_SEARCH_TERMS).forEach((category) => {
    fetchCategoryPhotos(category);
  });
}


export function getCachedProductImage(product) {
  const urls = photoCache[product.category];
  if (!urls) return null;
  return urls[product.id % urls.length];
}


export function getProductImage(product) {
  return getCachedProductImage(product) ?? getLocalProductImage(product);
}
