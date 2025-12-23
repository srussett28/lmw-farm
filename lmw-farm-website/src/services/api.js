import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product endpoints
export const getProducts = () => api.get('/products/');
export const getProductsByCategory = (category) => api.get(`/products/category/${category}`);
export const getProduct = (productId) => api.get(`/products/${productId}`);

// Cart endpoints
export const addToCart = (item) => api.post('/cart/add', item);
export const getCart = (sessionId) => api.get(`/cart/${sessionId}`);
export const removeFromCart = (cartId) => api.delete(`/cart/${cartId}`);
export const updateCartQuantity = (cartId, quantity) => api.put(`/cart/${cartId}/quantity`, null, { params: { quantity } });

// Order endpoints
export const createOrder = (order) => api.post('/orders/', order);
export const getOrder = (orderNumber) => api.get(`/orders/${orderNumber}`);
export const getCustomerOrders = (customerId) => api.get(`/orders/customer/${customerId}`);

export const createCustomer = (customerData) => {
  return api.post('/customers/', {
    email: customerData.email,
    first_name: customerData.firstName,
    last_name: customerData.lastName,
    phone: customerData.phone || null
  });
};

export default api;