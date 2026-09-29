import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import { useCartOperations } from './useCartOperations';

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
const milk = { id: 1, name: 'Milk', price: 50, category: 'Dairy', stock: 10 };
const bread = { id: 2, name: 'Bread', price: 30, category: 'Bakery', stock: 5 };

function setup() {
  return renderHook(() => useCartOperations(), { wrapper });
}

beforeEach(() => {
  localStorage.clear();
});

describe('useCartOperations', () => {
  it('adds a new item', () => {
    const { result } = setup();
    act(() => result.current.addItem(milk, 1));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toMatchObject({ id: 1, quantity: 1 });
  });

  it('increases quantity instead of duplicating when the same product is added', () => {
    const { result } = setup();
    act(() => result.current.addItem(milk, 1));
    act(() => result.current.addItem(milk, 2));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(3);
  });

  it('removes an item', () => {
    const { result } = setup();
    act(() => result.current.addItem(milk, 1));
    act(() => result.current.addItem(bread, 1));
    act(() => result.current.removeItem(1));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe(2);
  });

  it('increments and decrements quantity', () => {
    const { result } = setup();
    act(() => result.current.addItem(milk, 2));
    act(() => result.current.incrementItem(1));
    expect(result.current.items[0].quantity).toBe(3);
    act(() => result.current.decrementItem(1));
    expect(result.current.items[0].quantity).toBe(2);
  });

  it('removes the item when quantity drops to 0', () => {
    const { result } = setup();
    act(() => result.current.addItem(milk, 1));
    act(() => result.current.decrementItem(1));
    expect(result.current.items).toEqual([]);
  });

  it('sets an exact quantity', () => {
    const { result } = setup();
    act(() => result.current.addItem(milk, 1));
    act(() => result.current.setQuantity(1, 7));
    expect(result.current.items[0].quantity).toBe(7);
  });

  it('ignores increment for an item that is not in the cart', () => {
    const { result } = setup();
    act(() => result.current.incrementItem(999));
    expect(result.current.items).toEqual([]);
  });

  it('calculates itemCount and subtotal', () => {
    const { result } = setup();
    act(() => result.current.addItem(milk, 2)); // 100
    act(() => result.current.addItem(bread, 1)); // 30
    expect(result.current.itemCount).toBe(3);
    expect(result.current.subtotal).toBe(130);
  });

  it('clears the cart', () => {
    const { result } = setup();
    act(() => result.current.addItem(milk, 1));
    act(() => result.current.addItem(bread, 1));
    act(() => result.current.clearCart());
    expect(result.current.items).toEqual([]);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.subtotal).toBe(0);
  });
});
