import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductDetail } from '../hooks/useProductFetcher';
import { useCartOperations } from '../hooks/useCartOperations';
import { getProductImage, localFallback } from '../data/categoryImages';

export default function ProductDetail() {
  const { id } = useParams();
  const { product, status } = useProductDetail(id);
  const { addItem } = useCartOperations();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (status === 'loading') {
    return <div className="detail__status">Loading product…</div>;
  }

  if (status === 'error' || !product) {
    return (
      <div className="detail__status">
        <p>We couldn't find that product.</p>
        <Link to="/catalog">Back to catalog</Link>
      </div>
    );
  }

  function handleAdd() {
    addItem(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <div className="detail">
      <Link to="/catalog" className="detail__back">
        ← Back to catalog
      </Link>
      <div className="detail__layout">
       
<div className="detail__swatch">
  {getProductImage(product) ? (
    <img
      src={getProductImage(product, 800, 800)}
      onError={localFallback(product)}
      alt={product.name}
      className="detail__img"
    />
  ) : (
    product.category.slice(0, 2).toUpperCase()
  )}
</div>
        <div className="detail__info">
          <span className="detail__category">{product.category}</span>
          <h1 className="detail__name">{product.name}</h1>
          <p className="detail__price">${product.price.toFixed(2)}</p>
          <p className="detail__description">{product.description}</p>
          <dl className="detail__specs">
            <div>
              <dt>Material</dt>
              <dd>{product.material}</dd>
            </div>
            <div>
              <dt>Rating</dt>
              <dd>{product.rating} / 5</dd>
            </div>
            <div>
              <dt>In stock</dt>
              <dd>{product.stock > 0 ? `${product.stock} units` : 'Out of stock'}</dd>
            </div>
          </dl>

          <div className="detail__purchase">
            <label htmlFor="qty">Quantity</label>
            <input
              id="qty"
              type="number"
              min="1"
              max={Math.max(product.stock, 1)}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            />
            <button
              type="button"
              onClick={handleAdd}
              disabled={product.stock === 0}
              className="detail__add"
            >
              {justAdded ? 'Added ✓' : 'Add to cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
