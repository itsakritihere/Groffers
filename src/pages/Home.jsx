import { Link } from 'react-router-dom';
import { CATEGORY_LIST, PRODUCT_COUNT } from '../data/products';
import banner from '../images/home (2).png';
import bags from '../images/bags.jpg';
import cookware from '../images/cookware.jpg';
import cords from '../images/cords.jpg';
import heels from '../images/heels.jpg';
import tools from '../images/tools.jpg';
import eyes from '../images/eyes.jpg';
import light from '../images/light.jpg';
import skin from '../images/skin.jpg';
import cloth from '../images/cloth.jpg';
import home from '../images/home.jpg';
// Order matters: the first matching rule wins.
// A keyword matches only at the START of a word in the category name.
const CATEGORY_IMAGE_RULES = [
  { keywords: ['cook', 'kitchen'], image: cookware },
  { keywords: ['bag', 'luggage', 'backpack'], image: bags },
  { keywords: ['cord', 'rope', 'cable'], image: cords },
  { keywords: ['heel', 'hell', 'shoe', 'footwear', 'foot', 'boot'], image: heels },
  { keywords: ['tool', 'hardware'], image: tools },
  { keywords: ['eye', 'glass', 'sunglass', 'optic'], image: eyes },
  { keywords: ['light', 'lamp', 'led', 'bulb', 'aesthetic', 'decor'], image: light },
  { keywords: ['skin', 'beauty', 'cosmetic', 'moisturizer', 'cream'], image: skin },
  { keywords: ['cloth', 'apparel', 'dress', 'pant', 'wear', 'fashion'], image: cloth },
   { keywords: ['homeDecor', 'home', 'hanging'], image: home },
];

const getCategoryImage = (category) => {
  const name = category.trim().toLowerCase();
  const rule = CATEGORY_IMAGE_RULES.find(({ keywords }) =>
    keywords.some((k) => new RegExp(`\\b${k}`).test(name))
  );
  return rule ? rule.image : null;
};

export default function Home() {
  return (
    <div className="home">
      <section className="home__hero">
        <div className="home__banner-container">
          <img
            src={banner}
            alt="Groffers Festive Fashion Extravaganza - Flat 40% Off"
            className="home__banner-image"
          />
        </div>

        <div className="home__content">
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