import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Package, Search, Filter } from 'lucide-react';
import api from '../services/api';

export default function Products() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoria') || '');
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [productsRes, categoriesRes, brandsRes] = await Promise.all([
        api.getProducts(),
        api.getCategories(),
        api.getBrands(),
      ]);

      setProducts(productsRes.data || []);
      setCategories(categoriesRes.data || []);
      setBrands(brandsRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.Nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.Descripcion?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.CategoriaID === parseInt(selectedCategory);
    const matchesBrand = !selectedBrand || product.MarcaID === parseInt(selectedBrand);

    return matchesSearch && matchesCategory && matchesBrand;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">Productos</h1>

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="font-medium">Filtros</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category.CategoriaID} value={category.CategoriaID}>
                  {category.Nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marca
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas las marcas</option>
              {brands.map((brand) => (
                <option key={brand.MarcaID} value={brand.MarcaID}>
                  {brand.Nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="text-sm text-gray-600 mb-2">
        {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link
            key={product.ProductoID}
            to={`/productos/${product.ProductoID}`}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-blue-200 transition"
          >
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              <Package className="w-24 h-24 text-gray-400" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-2 min-h-[3rem]">
                {product.Nombre}
              </h3>
              <div className="text-sm text-gray-600 mb-3">
                {product.categoriaNombre || 'Sin categoría'}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600">
                  ₡{product.PrecioVenta?.toLocaleString()}
                </span>
                {product.Stock > 0 ? (
                  <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                    Stock: {product.Stock}
                  </span>
                ) : (
                  <span className="text-xs text-red-600 font-medium bg-red-50 px-2 py-1 rounded">
                    Agotado
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No se encontraron productos</p>
        </div>
      )}
    </div>
  );
}
