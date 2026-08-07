import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, TrendingUp, Grid3x3, ShoppingBag } from 'lucide-react';
import api from '../services/api';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        api.getProducts(),
        api.getCategories(),
      ]);

      // Get first 6 products as featured
      setFeaturedProducts(productsRes.data?.slice(0, 6) || []);
      setCategories(categoriesRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bienvenido a PuraTech Store
          </h1>
          <p className="text-xl mb-6 text-blue-100">
            Los mejores productos de tecnología al mejor precio
          </p>
          <Link
            to="/productos"
            className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Ver Productos
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Productos de Calidad</h3>
          <p className="text-gray-600">
            Solo productos originales y de las mejores marcas
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Mejores Precios</h3>
          <p className="text-gray-600">
            Precios competitivos y ofertas especiales
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Grid3x3 className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Gran Variedad</h3>
          <p className="text-gray-600">
            Amplio catálogo de productos tecnológicos
          </p>
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Categorías</h2>
          <Link to="/categorias" className="text-blue-600 hover:text-blue-700 font-medium">
            Ver todas
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(0, 8).map((category) => (
            <Link
              key={category.CategoriaID}
              to={`/productos?categoria=${category.CategoriaID}`}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition text-center"
            >
              <div className="bg-blue-50 w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Grid3x3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-medium">{category.Nombre}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Productos Destacados</h2>
          <Link to="/productos" className="text-blue-600 hover:text-blue-700 font-medium">
            Ver todos
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Link
              key={product.ProductoID}
              to={`/productos/${product.ProductoID}`}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-blue-200 transition"
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <Package className="w-24 h-24 text-gray-400" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2">{product.Nombre}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    ₡{product.PrecioVenta?.toLocaleString()}
                  </span>
                  {product.Stock > 0 ? (
                    <span className="text-xs text-green-600 font-medium">
                      En stock
                    </span>
                  ) : (
                    <span className="text-xs text-red-600 font-medium">
                      Agotado
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
