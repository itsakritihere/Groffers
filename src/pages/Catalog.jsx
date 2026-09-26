import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { List } from 'react-window';
import { useProductFetcher } from '../hooks/useProductFetcher';
import ProductCard from '../components/ProductCard';
import { CATEGORY_LIST } from '../data/products';

const CARD_WIDTH = 260;
const CARD_HEIGHT = 280;
const GRID_HEIGHT = 640;

// One virtualized row renders `columnCount` product cards side by side.
// react-window only mounts rows within (or just outside) the viewport, so
// with ~280px rows and a 640px window, roughly 3 rows / ~10-12 cards ever
// exist in the DOM at once, no matter how many thousand products there are.
function CatalogRow({ index, style, products, columnCount }) {
  const start = index * columnCount;
  const rowProducts = products.slice(start, start + columnCount);

  return (
    <div style={style} className="catalog__row">
      {rowProducts.map((product) => (
        <div key={product.id} className="catalog__cell">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'All';
  const [query, setQuery] = useState('');

  const { products, status, total } = useProductFetcher({ category, query });

  // Compute a responsive column count from the viewport once per mount.
  const columnCount = useMemo(() => {
    if (typeof window === 'undefined') return 4;
    return Math.max(1, Math.floor(window.innerWidth / CARD_WIDTH));
  }, []);

  const rowCount = Math.ceil(products.length / columnCount);

  function handleCategoryChange(next) {
    if (next === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', next);
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="catalog">
      <div className="catalog__controls">
        <input
          type="search"
          placeholder="Search the catalog…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="catalog__search"
        />
        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="catalog__filter"
        >
          <option value="All">All categories</option>
          {CATEGORY_LIST.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <span className="catalog__count">
          {status === 'loading'
            ? 'Loading…'
            : `${products.length.toLocaleString()} of ${total.toLocaleString()} items`}
        </span>
      </div>

      {status === 'loading' && <div className="catalog__status">Loading catalog…</div>}
      {status === 'error' && (
        <div className="catalog__status catalog__status--error">
          Couldn't load the catalog. Try again.
        </div>
      )}

      {status === 'ready' && products.length === 0 && (
        <div className="catalog__status">No items match your search.</div>
      )}

      {status === 'ready' && products.length > 0 && (
        <List
          rowCount={rowCount}
          rowHeight={CARD_HEIGHT}
          rowComponent={CatalogRow}
          rowProps={{ products, columnCount }}
          style={{ height: GRID_HEIGHT }}
          className="catalog__grid"
        />
      )}
    </div>
  );
}
