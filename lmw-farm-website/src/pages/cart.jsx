import { useState, useEffect } from 'react';
import { getCart, removeFromCart, updateCartQuantity } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const getSessionId = () => {
    let sessionId = localStorage.getItem('cart_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('cart_session_id', sessionId);
    }
    return sessionId;
  };

  const sessionId = getSessionId();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await getCart(sessionId);
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
    setLoading(false);
  };

  const handleRemoveItem = async (cartId) => {
    try {
      await removeFromCart(cartId);
      fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleUpdateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(cartId);
      return;
    }
    try {
      await updateCartQuantity(cartId, newQuantity);
      fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + parseFloat(item.line_total), 0).toFixed(2);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-3xl">Loading cart...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
          <p className="text-2xl text-gray-600 mb-8">Your cart is empty</p>
          <a
            href="/products"
            className="inline-block bg-teal-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-teal-700 transition"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Shopping Cart</h1>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            {cartItems.map((item) => (
              <div key={item.cart_id} className="flex items-center gap-4 py-4 border-b last:border-b-0">
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{item.product_name}</h3>
                  <p className="text-gray-600">${parseFloat(item.unit_price).toFixed(2)} each</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.cart_id, item.quantity - 1)}
                      className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-bold">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.cart_id, item.quantity + 1)}
                      className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  <div className="w-24 text-right font-bold">
                    ${parseFloat(item.line_total).toFixed(2)}
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.cart_id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold">Total:</span>
              <span className="text-3xl font-bold text-teal-600">${calculateTotal()}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-teal-600 text-white py-4 rounded-lg text-xl font-bold hover:bg-teal-700 transition"
            >
              Proceed to Checkout
            </button>

            <a
              href="/products"
              className="block text-center mt-4 text-teal-600 hover:text-teal-700 font-semibold"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;