import { useEffect, useState } from 'react';
import { getProductImage, subscribeToCategory } from '../data/categoryImages';

export function useProductImage(product) {
  const [image, setImage] = useState(() => (product ? getProductImage(product) : null));

  useEffect(() => {
    if (!product) return undefined;
    setImage(getProductImage(product));
    return subscribeToCategory(product.category, () => {
      setImage(getProductImage(product));
    });
  }, [product]);

  return image;
}
