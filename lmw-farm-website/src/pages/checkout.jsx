import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, createOrder, createCustomer } from '../services/api';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Customer info
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  });

  // Pickup location
  const [locationId, setLocationId] = useState(1); // Default to farm pickup

  const getSessionId = () => {
    return localStorage.getItem('cart_session_id');
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    const sessionId = getSessionId();
    if (!sessionId) {
      navigate('/cart');
      return;
    }

    try {
      const response = await getCart(sessionId);
      if (response.data.length === 0) {
        navigate('/cart');
      }
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      navigate('/cart');
    }
    setLoading(false);
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + parseFloat(item.line_total), 0).toFixed(2);
  };

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!customerInfo.email || !customerInfo.firstName || !customerInfo.lastName) {
    alert('Please fill in all required fields');
    return;
  }

  setSubmitting(true);

  try {
   const customerResponse = await createCustomer(customerInfo);
const customerId = customerResponse.data.customer_id;

    // Prepare order items
    const orderItems = cartItems.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity
    }));

    // Create order
    const orderResponse = await createOrder({
      customer_id: customerId,
      location_id: locationId,
      items: orderItems
    });

    // Clear cart session
    localStorage.removeItem('cart_session_id');

    alert(`Order placed! Order number: ${orderResponse.data.order_number}\nCheck your email for confirmation.`);
    navigate('/');
  } catch (error) {
    console.error('Error creating order:', error);
    alert('Failed to place order. Please try again.');
  }

  setSubmitting(false);
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-3xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Left: Customer Info Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={customerInfo.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={customerInfo.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                    placeholder="(555) 555-5555"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Pickup Location *</label>
                  <select
                    value={locationId}
                    onChange={(e) => setLocationId(parseInt(e.target.value))}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                  >
                    <option value={1}>Farm Pickup - Mount Airy, NC</option>
                    <option value={2}>Farmers Market</option>
                    <option value={3}>Delivery (contact for details)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-teal-600 text-white py-3 rounded-lg text-xl font-bold hover:bg-teal-700 transition disabled:bg-gray-400"
                >
                  {submitting ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.cart_id} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-semibold">{item.product_name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity} × ${parseFloat(item.unit_price).toFixed(2)}</p>
                    </div>
                    <p className="font-bold">${parseFloat(item.line_total).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t-2">
                <div className="flex justify-between items-center text-2xl font-bold">
                  <span>Total:</span>
                  <span className="text-teal-600">${calculateTotal()}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Orders are typically ready for pickup within 24-48 hours. We'll send you a confirmation email with pickup details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;