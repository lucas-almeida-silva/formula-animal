import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Layout } from './components/Layout';
import { Product } from './pages/Product';
import { GlobalStyle } from './styles/global';

import { theme } from './styles/themes/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="products" element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
