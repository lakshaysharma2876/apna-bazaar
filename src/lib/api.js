const API_BASE_URL = 'http://localhost:3001/api';

// Helper function to create headers with auth token
const createHeaders = (customHeaders = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };
  
  const token = localStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
};

// Helper function to handle response and errors
const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
};

// Fetch-based API client
const api = {
  get: async (url, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers: createHeaders(options.headers),
      ...options,
    });
    return { data: await handleResponse(response) };
  },
  
  post: async (url, data, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: createHeaders(options.headers),
      body: JSON.stringify(data),
      ...options,
    });
    return { data: await handleResponse(response) };
  },
  
  put: async (url, data, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      headers: createHeaders(options.headers),
      body: JSON.stringify(data),
      ...options,
    });
    return { data: await handleResponse(response) };
  },
  
  delete: async (url, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
      headers: createHeaders(options.headers),
      ...options,
    });
    return { data: await handleResponse(response) };
  },
};

export const authAPI = {
  register: async (email, password, fullName) => {
    const response = await api.post('/auth/register', { email, password, fullName });
    return response;
  },
  
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response;
  },
};

export const productsAPI = {
  getProducts: async (params) => {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    const response = await api.get(`/products${queryString}`);
    return response;
  },
  
  getCategories: async () => {
    const response = await api.get('/categories');
    return response;
  },
};

export const cartAPI = {
  getCart: async () => {
    const response = await api.get('/cart');
    return response;
  },
  
  addToCart: async (productId, quantity = 1) => {
    const response = await api.post('/cart', { productId, quantity });
    return response;
  },
  
  updateQuantity: async (productId, quantity) => {
    const response = await api.put(`/cart/${productId}`, { quantity });
    return response;
  },
  
  removeFromCart: async (productId) => {
    const response = await api.delete(`/cart/${productId}`);
    return response;
  },
  
  clearCart: async () => {
    const response = await api.delete('/cart');
    return response;
  },
};

export default api;
