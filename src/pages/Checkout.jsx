import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartOperations } from '../hooks/useCartOperations';

export default function Checkout() {
  const {
    items,
    subtotal,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
  } = useCartOperations();
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <div className="checkout__status">
        <h1>Order placed</h1>
        <p>Thanks for your order — a confirmation is on its way.</p>
        <Link to="/catalog">Keep browsing</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="checkout__status">
        <h1>Your cart is empty</h1>
        <Link to="/catalog">Go to the catalog</Link>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h1 className="checkout__title">Your cart</h1>
      <ul className="checkout__list">
        {items.map((item) => (
          <li key={item.id} className="checkout__item">
            <div className="checkout__item-swatch" aria-hidden="true">
              {item.category.slice(0, 2).toUpperCase()}
            </div>
            <div className="checkout__item-info">
              <Link to={`/product/${item.id}`}>{item.name}</Link>
              <span>${item.price.toFixed(2)} each</span>
            </div>
            <div className="checkout__item-qty">
              <button type="button" onClick={() => decrementItem(item.id)}>
                −
              </button>
              <span>{item.quantity}</span>
              <button type="button" onClick={() => incrementItem(item.id)}>
                +
              </button>
            </div>
            <span className="checkout__item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            <button
              type="button"
              className="checkout__item-remove"
              onClick={() => removeItem(item.id)}
              aria-label={`Remove ${item.name}`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="checkout__summary">
        <div className="checkout__subtotal">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="checkout__actions">
          <button type="button" className="checkout__clear" onClick={clearCart}>
            Clear cart
          </button>
          <button
            type="button"
            className="checkout__place"
            onClick={() => setPlaced(true)}
          >
            Place order
          </button>
        </div>
      </div>
    </div>
  );
}
