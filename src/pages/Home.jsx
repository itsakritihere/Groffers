import { Link } from 'react-router-dom';
import { CATEGORY_LIST, PRODUCT_COUNT } from '../data/products';
import banner from '../images/home (2).png';
import { getCategoryImage } from '../data/categoryImages';

export default function Home() {
  return (
    <div className="home">
      <section className="home__hero">
        <div className="home__banner-container">
          <img
            src={banner}
            alt="Groffers Festive Fashion"
            className="home__banner-image"
          />
        </div>

        <div className="home__content">
         
        </div>
      </section>

      <section className="home__explore">
        <div className="home__explore-head">
          <h2 className="home__explore-title">Explore by category</h2>
          <Link to="/catalog" className="home__explore-all">
            View all →
          </Link>
        </div>

        <div className="home__categories">
          {CATEGORY_LIST.map((category) => {
            const img = getCategoryImage(category);
            return (
              <Link
                key={category}
                to={`/catalog?category=${encodeURIComponent(category)}`}
                className="explore-card"
              >
                <div className="explore-card__media">
                  {img ? (
                    <img
                      src={img}
                      alt={category}
                      className="explore-card__img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="explore-card__fallback">
                      {category.charAt(0)}
                    </div>
                  )}
                </div>

                     <div className="explore-card__body">
                  <h3 className="explore-card__name">{category}</h3>
                     <span className="explore-card__cta">Explore →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}