import { useEffect, useMemo, useState } from 'react';
import { PRODUCTS, getProductById } from '../data/products';


export function useProductFetcher({ category = 'All', query = '' } = {}) {
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [rawProducts, setRawProducts] = useState([]);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');

    const timer = setTimeout(() => {
      if (cancelled) return;
      try {
        setRawProducts(PRODUCTS);
        setStatus('ready');
      } catch (err) {
        setStatus('error');
      }
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  const products = useMemo(() => {
    let list = rawProducts;

    if (category && category !== 'All') {
      list = list.filter((p) => p.category === category);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }

    return list;
  }, [rawProducts, category, query]);

  return { products, status, total: rawProducts.length };
}

export function useProductDetail(id) {
  const [status, setStatus] = useState('loading');
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setProduct(null);

    const timer = setTimeout(() => {
      if (cancelled) return;
      const found = getProductById(id);
      if (found) {
        setProduct(found);
        setStatus('ready');
      } else {
        setStatus('error');
      }
    }, 200);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [id]);

  return { product, status };
}