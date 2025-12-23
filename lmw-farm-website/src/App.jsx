import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/home';
import About from './pages/about';
import Products from './pages/products';
import Animals from './pages/animals';
import Blog from './pages/blog';
import FuturePlans from './pages/future';
import Contact from './pages/contact';
import Cart from './pages/cart';
import Checkout from './pages/checkout';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navigation />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/animals" element={<Animals />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/future-plans" element={<FuturePlans />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;