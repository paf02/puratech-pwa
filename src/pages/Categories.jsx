import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid3x3, Package } from 'lucide-react';
import api from '../services/api';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const response = await api.getCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
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
    <div>
      <h1 className="text-3xl font-bold mb-6">Categorías</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.CategoriaID}
            to={`/productos?categoria=${category.CategoriaID}`}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-blue-200 transition"
          >
            <div className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
              <Grid3x3 className="w-24 h-24 text-blue-600" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{category.Nombre}</h3>
              {category.Descripcion && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {category.Descripcion}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No hay categorías disponibles</p>
        </div>
      )}
    </div>
  );
}
