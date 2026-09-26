import { Link } from 'react-router-dom';
import { useCartOperations } from '../hooks/useCartOperations';

export default function ProductCard({ product }) {
  const { addItem } = useCartOperations();

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__link">
        <div className="product-card__swatch" aria-hidden="true">
          {product.category.slice(0, 2).toUpperCase()}
        </div>
        <div className="product-card__body">
          <span className="product-card__category">{product.category}</span>
          <h3 className="product-card__name">{product.name}</h3>
          <span className="product-card__price">${product.price.toFixed(2)}</span>
        </div>
      </Link>
      <button
        type="button"
        className="product-card__add"
        onClick={() => addItem(product, 1)}
        disabled={product.stock === 0}
      >
        {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
      </button>
    </div>
  );
}
