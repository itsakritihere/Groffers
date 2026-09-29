import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProductFetcher, useProductDetail } from './useProductFetcher';

// Use a small fake dataset instead of the real product list.
vi.mock('../data/products', () => {
  const PRODUCTS = [
    { id: 1, name: 'Apple', price: 10, category: 'Fruits', stock: 5 },
    { id: 2, name: 'Banana', price: 5, category: 'Fruits', stock: 5 },
    { id: 3, name: 'Milk', price: 50, category: 'Dairy', stock: 5 },
  ];
  return {
    PRODUCTS,
    getProductById: (id) => PRODUCTS.find((p) => String(p.id) === String(id)),
  };
});

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('useProductFetcher', () => {
  it('starts in loading state, then becomes ready with all products', () => {
    const { result } = renderHook(() => useProductFetcher());
    expect(result.current.status).toBe('loading');
    expect(result.current.products).toEqual([]);

    act(() => vi.advanceTimersByTime(250));

    expect(result.current.status).toBe('ready');
    expect(result.current.products).toHaveLength(3);
    expect(result.current.total).toBe(3);
  });

  it('filters by category', () => {
    const { result } = renderHook(() => useProductFetcher({ category: 'Fruits' }));
    act(() => vi.advanceTimersByTime(250));
    expect(result.current.products.map((p) => p.name)).toEqual(['Apple', 'Banana']);
  });

  it('returns everything when category is "All"', () => {
    const { result } = renderHook(() => useProductFetcher({ category: 'All' }));
    act(() => vi.advanceTimersByTime(250));
    expect(result.current.products).toHaveLength(3);
  });

  it('searches by name, case-insensitive', () => {
    const { result } = renderHook(() => useProductFetcher({ query: '  mILK ' }));
    act(() => vi.advanceTimersByTime(250));
    expect(result.current.products.map((p) => p.name)).toEqual(['Milk']);
  });

  it('searches by category text too', () => {
    const { result } = renderHook(() => useProductFetcher({ query: 'fruit' }));
    act(() => vi.advanceTimersByTime(250));
    expect(result.current.products).toHaveLength(2);
  });

  it('returns an empty list when nothing matches', () => {
    const { result } = renderHook(() => useProductFetcher({ query: 'zzz' }));
    act(() => vi.advanceTimersByTime(250));
    expect(result.current.status).toBe('ready');
    expect(result.current.products).toEqual([]);
    expect(result.current.total).toBe(3);
  });
});

describe('useProductDetail', () => {
  it('loads an existing product', () => {
    const { result } = renderHook(() => useProductDetail('3'));
    expect(result.current.status).toBe('loading');
    act(() => vi.advanceTimersByTime(200));
    expect(result.current.status).toBe('ready');
    expect(result.current.product.name).toBe('Milk');
  });

  it('reports an error for an unknown id', () => {
    const { result } = renderHook(() => useProductDetail('999'));
    act(() => vi.advanceTimersByTime(200));
    expect(result.current.status).toBe('error');
    expect(result.current.product).toBeNull();
  });
});
