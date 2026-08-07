import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, Package } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <ShoppingCart className="w-24 h-24 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>
        <p className="text-gray-600 mb-6">Agrega productos para comenzar tu compra</p>
        <Link
          to="/productos"
          className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          <Package className="w-5 h-5 mr-2" />
          Ver Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Carrito de Compras</h1>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          Vaciar carrito
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div
            key={item.ProductoID}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"
          >
            <div className="flex gap-4">
              {/* Product Image */}
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-12 h-12 text-gray-400" />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <Link
                  to={`/productos/${item.ProductoID}`}
                  className="font-semibold text-lg hover:text-blue-600 transition line-clamp-1"
                >
                  {item.Nombre}
                </Link>
                <p className="text-gray-600 text-sm mb-2">{item.categoriaNombre}</p>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-blue-600">
                    ₡{item.PrecioVenta?.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">
                    c/u
                  </span>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeFromCart(item.ProductoID)}
                  className="text-red-600 hover:text-red-700 p-2"
                  title="Eliminar"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.ProductoID, item.quantity - 1)}
                    className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.ProductoID, item.quantity + 1)}
                    disabled={item.quantity >= item.Stock}
                    className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right mt-2">
                  <div className="text-sm text-gray-600">Subtotal</div>
                  <div className="font-bold text-lg">
                    ₡{(item.PrecioVenta * item.quantity).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky bottom-20 md:bottom-0">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-semibold">Total</span>
          <span className="text-3xl font-bold text-blue-600">
            ₡{getCartTotal().toLocaleString()}
          </span>
        </div>

        <div className="space-y-3">
          <Link
            to="/checkout"
            className="block w-full text-center bg-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Proceder al Pago
          </Link>

          <Link
            to="/productos"
            className="block w-full text-center bg-gray-100 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Continuar Comprando
          </Link>
        </div>

        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>💳 Aceptamos SINPE Móvil, efectivo y tarjetas</p>
        </div>
      </div>
    </div>
  );
}
