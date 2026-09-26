import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
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
