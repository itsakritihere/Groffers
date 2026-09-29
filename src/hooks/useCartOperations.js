import { useMemo } from 'react';
import { useCartState, useCartDispatch } from '../context/CartContext';
export function useCartOperations() {
  const { items } = useCartState();
  const dispatch = useCartDispatch();

  const addItem = (product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const setQuantity = (id, quantity) => {
    dispatch({ type: 'SET_QUANTITY', payload: { id, quantity } });
  };

  const incrementItem = (id) => {
    const item = items.find((i) => i.id === id);
    if (item) setQuantity(id, item.quantity + 1);
  };

  const decrementItem = (id) => {
    const item = items.find((i) => i.id === id);
    if (item) setQuantity(id, item.quantity - 1);
  };

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [items]
  );

  return {
    items,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    setQuantity,
    incrementItem,
    decrementItem,
    clearCart,
  };
}
