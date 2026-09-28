import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { List } from 'react-window';
import { useProductFetcher } from '../hooks/useProductFetcher';
import ProductCard from '../components/ProductCard';
import { CATEGORY_LIST } from '../data/products';

const rowHeightFor = (containerWidth) => (containerWidth < 600 ? 285 : 325);

// Smaller minimum width on phones so we get 2 columns instead of 1.
function minCardWidth(containerWidth) {
  return containerWidth < 600 ? 150 : 220;
}

function CatalogRow({ index, style, products, columnCount }) {
  const start = index * columnCount;
  const rowProducts = products.slice(start, start + columnCount);

  return (
    <div style={style} className="catalog__row">
      {rowProducts.map((product) => (
        <div
          key={product.id}
          className="catalog__cell"
          style={{ width: `${100 / columnCount}%` }}
        >
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

  // Measure the real container (not the window) and re-measure on resize.
  const gridWrapRef = useRef(null);
  const [gridWidth, setGridWidth] = useState(0);
  const [gridHeight, setGridHeight] = useState(560);

  useEffect(() => {
    const el = gridWrapRef.current;
    if (!el) return undefined;

    const update = () => {
      setGridWidth(el.clientWidth);
      setGridHeight(Math.max(420, window.innerHeight - 220));
    };
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const columnCount = Math.max(
    1,
    Math.floor((gridWidth || 1000) / minCardWidth(gridWidth || 1000))
  );

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

      <div ref={gridWrapRef} className="catalog__grid-wrap">
        {status === 'ready' && products.length > 0 && (
          <List
            rowCount={rowCount}
            rowHeight={rowHeightFor(gridWidth || 1000)}
            rowComponent={CatalogRow}
            rowProps={{ products, columnCount }}
            style={{ height: gridHeight }}
            className="catalog__grid"
          />
        )}
      </div>
    </div>
  );
}
