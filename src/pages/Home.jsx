import { Link } from 'react-router-dom';
import { CATEGORY_LIST, PRODUCT_COUNT } from '../data/products';

export default function Home() {
  return (
    <div className="home">
      <section className="home__hero">
        <p className="home__eyebrow">Est. for the long haul</p>
        <h1 className="home__title">
          Gear that outlasts the trip you bought it for.
        </h1>
        <p className="home__subtitle">
          {PRODUCT_COUNT.toLocaleString()} field-tested SKUs across{' '}
          {CATEGORY_LIST.length} categories — from cookware to cold-weather
          shells. Built to be repaired, not replaced.
        </p>
        <Link to="/catalog" className="home__cta">
          Browse the catalog
        </Link>
      </section>

      <section className="home__categories">
        {CATEGORY_LIST.map((category) => (
          <Link
            key={category}
            to={`/catalog?category=${encodeURIComponent(category)}`}
            className="home__category-tile"
          >
            {category}
          </Link>
        ))}
      </section>
    </div>
  );
}
