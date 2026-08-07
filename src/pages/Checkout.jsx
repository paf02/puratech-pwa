import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { CreditCard, Smartphone, Banknote, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../services/api';

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Cliente: '',
    Telefono: '',
    MetodoPago: 'SINPE',
    Observacion: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [saleId, setSaleId] = useState(null);

  const paymentMethods = [
    { value: 'SINPE', label: 'SINPE Móvil', icon: Smartphone, color: 'blue' },
    { value: 'Efectivo', label: 'Efectivo', icon: Banknote, color: 'green' },
    { value: 'Tarjeta', label: 'Tarjeta', icon: CreditCard, color: 'purple' },
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.Cliente) {
      setError('Por favor ingrese su nombre');
      setLoading(false);
      return;
    }

    if (cart.length === 0) {
      setError('El carrito está vacío');
      setLoading(false);
      return;
    }

    try {
      const total = getCartTotal();

      // Prepare products for sale
      const productos = cart.map(item => ({
        ProductoID: item.ProductoID,
        Cantidad: item.quantity,
        PrecioCompra: item.PrecioCompra || 0,
        Precio: item.PrecioVenta,
        SubTotal: item.PrecioVenta * item.quantity
      }));

      // Create sale
      const response = await api.createSale({
        Cliente: formData.Cliente,
        Telefono: formData.Telefono || null,
        MetodoPago: formData.MetodoPago,
        Observacion: formData.Observacion || null,
        Total: total,
        productos
      });

      if (response.success) {
        setSaleId(response.data.VentaID);
        setSuccess(true);
        clearCart();

        // Redirect after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setError(response.message || 'Error al procesar la compra');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Error al procesar la compra. Por favor intente nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  if (cart.length === 0 && !success) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Carrito Vacío</h2>
        <p className="text-gray-600 mb-6">Agrega productos antes de realizar tu compra</p>
        <button
          onClick={() => navigate('/productos')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Ver Productos
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-2">¡Compra Exitosa!</h2>
        <p className="text-gray-600 mb-4">
          Tu pedido #{saleId} ha sido registrado correctamente
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="font-semibold mb-2">Información de Pago</h3>
          {formData.MetodoPago === 'SINPE' && (
            <div className="text-sm text-gray-700">
              <p className="mb-1">Realiza tu pago SINPE Móvil a:</p>
              <p className="font-mono text-lg font-bold">8888-8888</p>
              <p className="text-sm text-gray-600 mt-2">Usa el número de pedido como referencia</p>
            </div>
          )}
          {formData.MetodoPago === 'Efectivo' && (
            <p className="text-sm text-gray-700">Paga en efectivo al recibir tu pedido</p>
          )}
          {formData.MetodoPago === 'Tarjeta' && (
            <p className="text-sm text-gray-700">Paga con tarjeta al recibir tu pedido</p>
          )}
        </div>
        <p className="text-sm text-gray-600">
          Serás redirigido en unos segundos...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Finalizar Compra</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-6">Información del Cliente</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                name="Cliente"
                value={formData.Cliente}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Juan Pérez"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                name="Telefono"
                value={formData.Telefono}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="8888-8888"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Método de Pago *
              </label>
              <div className="grid grid-cols-1 gap-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <label
                      key={method.value}
                      className={`
                        flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition
                        ${formData.MetodoPago === method.value
                          ? `border-${method.color}-500 bg-${method.color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="MetodoPago"
                        value={method.value}
                        checked={formData.MetodoPago === method.value}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <Icon className={`w-5 h-5 text-${method.color}-600`} />
                      <span className="font-medium">{method.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observaciones
              </label>
              <textarea
                name="Observacion"
                value={formData.Observacion}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Dirección de entrega, instrucciones especiales..."
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Procesando...' : 'Confirmar Compra'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>

            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.ProductoID} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.Nombre} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    ₡{(item.PrecioVenta * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₡{getCartTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Envío</span>
                <span className="font-medium text-green-600">Gratis</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold border-t border-gray-200 pt-4">
                <span>Total</span>
                <span className="text-blue-600">₡{getCartTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
