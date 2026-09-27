import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="*"
            element={
              <div className="app__not-found">
                <h1>Page not found</h1>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
