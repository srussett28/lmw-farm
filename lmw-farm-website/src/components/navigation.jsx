import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCart } from '../services/api';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const getSessionId = () => {
    return localStorage.getItem('cart_session_id');
  };

  useEffect(() => {
    fetchCartCount();
    // Refresh cart count every 5 seconds when on the page
    const interval = setInterval(fetchCartCount, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchCartCount = async () => {
    const sessionId = getSessionId();
    if (!sessionId) return;
    
    try {
      const response = await getCart(sessionId);
      const totalItems = response.data.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  return (
    <nav className="bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <Link to="/" className="text-2xl font-bold">
            LMW Farm
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-green-200 transition">Home</Link>
            <Link to="/about" className="hover:text-green-200 transition">About</Link>
            <Link to="/products" className="hover:text-green-200 transition">Products</Link>
            <Link to="/animals" className="hover:text-green-200 transition">Meet the Animals</Link>
            <Link to="/blog" className="hover:text-green-200 transition">Blog</Link>
            <Link to="/future-plans" className="hover:text-green-200 transition">Future Plans</Link>
            <Link to="/contact" className="hover:text-green-200 transition">Contact</Link>
            
            {/* Cart Icon with Badge 
            <Link to="/cart" className="relative hover:text-green-200 transition">
              <span className="text-2xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link> */}
          </div>
          

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block hover:text-green-200 transition py-2" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" className="block hover:text-green-200 transition py-2" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/products" className="block hover:text-green-200 transition py-2" onClick={() => setIsOpen(false)}>Products</Link>
            <Link to="/animals" className="block hover:text-green-200 transition py-2" onClick={() => setIsOpen(false)}>Meet the Animals</Link>
            <Link to="/blog" className="block hover:text-green-200 transition py-2" onClick={() => setIsOpen(false)}>Blog</Link>
            <Link to="/future-plans" className="block hover:text-green-200 transition py-2" onClick={() => setIsOpen(false)}>Future Plans</Link>
            <Link to="/contact" className="block hover:text-green-200 transition py-2" onClick={() => setIsOpen(false)}>Contact</Link>
             {/* <Link to="/cart" className="block hover:text-green-200 transition py-2 flex items-center gap-2" onClick={() => setIsOpen(false)}>
              🛒 Cart {cartCount > 0 && `(${cartCount})`} 
            </Link> */}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;