import { Outlet, Link } from 'react-router-dom';
import { ShoppingCart, Home, Package, Grid3x3 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import InstallPrompt from './InstallPrompt';

export default function Layout() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Package className="w-8 h-8" />
              <span className="text-xl font-bold">PuraTech Store</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="hover:text-blue-200 transition">
                Inicio
              </Link>
              <Link to="/productos" className="hover:text-blue-200 transition">
                Productos
              </Link>
              <Link to="/categorias" className="hover:text-blue-200 transition">
                Categorías
              </Link>
            </nav>

            <Link to="/carrito" className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className="flex flex-col items-center justify-center flex-1 text-gray-600 hover:text-blue-600">
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Inicio</span>
          </Link>
          <Link to="/productos" className="flex flex-col items-center justify-center flex-1 text-gray-600 hover:text-blue-600">
            <Package className="w-6 h-6" />
            <span className="text-xs mt-1">Productos</span>
          </Link>
          <Link to="/categorias" className="flex flex-col items-center justify-center flex-1 text-gray-600 hover:text-blue-600">
            <Grid3x3 className="w-6 h-6" />
            <span className="text-xs mt-1">Categorías</span>
          </Link>
          <Link to="/carrito" className="flex flex-col items-center justify-center flex-1 text-gray-600 hover:text-blue-600 relative">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-6 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="text-xs mt-1">Carrito</span>
          </Link>
        </div>
      </nav>

      {/* Bottom padding for mobile nav */}
      <div className="h-16 md:hidden"></div>

      {/* PWA Install Prompt */}
      <InstallPrompt />
    </div>
  );
}
