import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCartState, useCartDispatch } from './CartContext';
import { config } from '../config';

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
const milk = { id: 1, name: 'Milk', price: 50, category: 'Dairy', stock: 10 };

beforeEach(() => {
  localStorage.clear();
});

describe('CartContext', () => {
  it('starts with an empty cart', () => {
    const { result } = renderHook(() => useCartState(), { wrapper });
    expect(result.current.items).toEqual([]);
  });

  it('saves the cart to localStorage when it changes', () => {
    const { result } = renderHook(
      () => ({ state: useCartState(), dispatch: useCartDispatch() }),
      { wrapper }
    );

    act(() =>
      result.current.dispatch({
        type: 'ADD_ITEM',
        payload: { product: milk, quantity: 2 },
      })
    );

    const saved = JSON.parse(localStorage.getItem(config.storageKey));
    expect(saved.items).toHaveLength(1);
    expect(saved.items[0].quantity).toBe(2);
  });

  it('restores the cart from localStorage after a page refresh', () => {
    localStorage.setItem(
      config.storageKey,
      JSON.stringify({ items: [{ ...milk, quantity: 3 }] })
    );

    const { result } = renderHook(() => useCartState(), { wrapper });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(3);
  });

  it('falls back to an empty cart when saved data is corrupted', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.setItem(config.storageKey, '{not valid json');

    const { result } = renderHook(() => useCartState(), { wrapper });
    expect(result.current.items).toEqual([]);
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('falls back to an empty cart when saved items is not an array', () => {
    localStorage.setItem(config.storageKey, JSON.stringify({ items: 'oops' }));
    const { result } = renderHook(() => useCartState(), { wrapper });
    expect(result.current.items).toEqual([]);
  });

  it('throws if hooks are used outside CartProvider', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useCartState())).toThrow(/CartProvider/);
    expect(() => renderHook(() => useCartDispatch())).toThrow(/CartProvider/);
    errorSpy.mockRestore();
  });
});
