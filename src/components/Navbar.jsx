import { Link, NavLink } from 'react-router-dom';
import { useCartOperations } from '../hooks/useCartOperations';

export default function Navbar() {
  const { itemCount } = useCartOperations();

  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        Fieldstock Supply Co.
      </Link>
      <nav className="navbar__links">
        <NavLink to="/" end className="navbar__link">
          Home
        </NavLink>
        <NavLink to="/catalog" className="navbar__link">
          Catalog
        </NavLink>
        <NavLink to="/checkout" className="navbar__link navbar__link--cart">
          Cart
          {itemCount > 0 && <span className="navbar__badge">{itemCount}</span>}
        </NavLink>
      </nav>
    </header>
  );
}
