const API_URL = import.meta.env.VITE_API_URL || 'https://puratech-store-api.puratechtest01.workers.dev/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Products
  getProducts() {
    return this.request('/productos');
  }

  getProduct(id) {
    return this.request(`/productos/${id}`);
  }

  // Categories
  getCategories() {
    return this.request('/categorias');
  }

  // Brands
  getBrands() {
    return this.request('/marcas');
  }

  // Search
  searchProducts(query) {
    return this.request(`/productos?search=${encodeURIComponent(query)}`);
  }

  // Sales
  createSale(saleData) {
    return this.request('/ventas', {
      method: 'POST',
      body: JSON.stringify(saleData),
    });
  }

  getSale(id) {
    return this.request(`/ventas/${id}`);
  }
}

const api = new ApiService();
export default api;
