import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, ArrowLeft, Tag, Box } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import api from '../services/api';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    try {
      const response = await api.getProduct(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleAddToCart() {
    if (product && product.Stock > 0) {
      addToCart(product, quantity);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg mb-4">Producto no encontrado</p>
        <button
          onClick={() => navigate('/productos')}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Volver a productos
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
            <Package className="w-48 h-48 text-gray-400" />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.Nombre}</h1>
            <p className="text-gray-600">{product.Descripcion}</p>
          </div>

          {/* Price */}
          <div className="bg-blue-50 rounded-xl p-6">
            <div className="text-sm text-gray-600 mb-1">Precio</div>
            <div className="text-4xl font-bold text-blue-600">
              ₡{product.PrecioVenta?.toLocaleString()}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div className="flex items-center text-gray-700">
              <Tag className="w-5 h-5 mr-3 text-gray-400" />
              <span className="font-medium mr-2">Categoría:</span>
              <span>{product.categoriaNombre || 'N/A'}</span>
            </div>

            <div className="flex items-center text-gray-700">
              <Package className="w-5 h-5 mr-3 text-gray-400" />
              <span className="font-medium mr-2">Marca:</span>
              <span>{product.marcaNombre || 'N/A'}</span>
            </div>

            <div className="flex items-center text-gray-700">
              <Box className="w-5 h-5 mr-3 text-gray-400" />
              <span className="font-medium mr-2">Stock:</span>
              <span className={product.Stock > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                {product.Stock > 0 ? `${product.Stock} unidades` : 'Agotado'}
              </span>
            </div>
          </div>

          {/* Add to Cart */}
          {product.Stock > 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 font-medium"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(product.Stock, parseInt(e.target.value) || 1)))}
                    className="w-20 text-center px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max={product.Stock}
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.Stock, quantity + 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 font-medium"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Agregar al Carrito</span>
              </button>

              {showSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                  ✓ Producto agregado al carrito
                </div>
              )}
            </div>
          )}

          {product.Stock === 0 && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
              Este producto está agotado
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
