import { FiShoppingCart } from 'react-icons/fi';
import { Link, Outlet } from 'react-router-dom';

import { useCart } from '../../hooks/useCart';

import { Container, Content, Footer, Header } from './styles';

export function Layout() {
  const { totalItems } = useCart();

  return (
    <Container>
      <Header>
        <div>
          <img
            src="https://img.freepik.com/vetores-gratis/frasco-de-remedio-comprimidos-e-ilustracao-de-icone-dos-desenhos-animados-de-pilulas-conceito-de-icone-de-medicina-de-saude-isolado-premium-estilo-flat-cartoon_138676-1625.jpg?w=2000"
            alt="Fórmula Animal"
          />

          <Link to="/cart">
            <FiShoppingCart />
            <span>{totalItems}</span>
          </Link>
        </div>
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer>
        <div>
          <span>Fórmula Animal</span>
        </div>
      </Footer>
    </Container>
  );
}
