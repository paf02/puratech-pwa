import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Categories from './pages/Categories';

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="productos" element={<Products />} />
          <Route path="productos/:id" element={<ProductDetail />} />
          <Route path="categorias" element={<Categories />} />
          <Route path="carrito" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
