// Central place for settings that may change between environments.
// Values come from .env (Vite exposes only variables starting with VITE_).
export const config = {
  storageKey: import.meta.env.VITE_CART_STORAGE_KEY || 'zada-cart',
  apiUrl: import.meta.env.VITE_API_URL || '',
};
