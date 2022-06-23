import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Layout } from './components/Layout';
import { Product } from './pages/Product';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { CartProvider } from './context/cart';

import { theme } from './styles/themes/theme';
import { GlobalStyle } from './styles/global';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="products/:id" element={<Product />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>

      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
