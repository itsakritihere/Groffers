import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            Groffers<span>.</span>
          </Link>
          <p className="footer__tagline">
            Gear that outlasts the trip you bought it for.
          </p>
        </div>

        <nav className="footer__col" aria-label="Shop">
          <h3 className="footer__heading">Shop</h3>
          <Link to="/catalog">All products</Link>
          <Link to="/catalog?category=Cookware">Cookware</Link>
          <Link to="/catalog?category=Bags">Bags</Link>
          <Link to="/checkout">Cart</Link>
        </nav>

        <nav className="footer__col" aria-label="Help">
          <h3 className="footer__heading">Help</h3>
          <Link to="/">Shipping &amp; returns</Link>
          <Link to="/">FAQs</Link>
          <Link to="/">Track order</Link>
          <Link to="/">Contact us</Link>
        </nav>

        <div className="footer__col">
          <h3 className="footer__heading">Contact</h3>
          <a href="mailto:support@groffers.com">support@groffers.com</a>
          <a href="tel:+910000000000">+91 00000 00000</a>
          <span className="footer__muted">Mon–Sat, 9am–6pm</span>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {year} Groffers. All rights reserved.</p>
        <div className="footer__legal">
          <Link to="/">Privacy</Link>
          <Link to="/">Terms</Link>
        </div>
      </div>
    </footer>
  );
}