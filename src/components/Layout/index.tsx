import { Outlet } from 'react-router-dom';
import {
  Container, Content, Footer, Header,
} from './styles';

export function Layout() {
  return (
    <Container>
      <Header>
        <div>
          <img
            src="https://img.freepik.com/vetores-gratis/frasco-de-remedio-comprimidos-e-ilustracao-de-icone-dos-desenhos-animados-de-pilulas-conceito-de-icone-de-medicina-de-saude-isolado-premium-estilo-flat-cartoon_138676-1625.jpg?w=2000"
            alt="Fórmula Animal"
          />
        </div>
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer>
        <span>Fórmula Animal</span>
      </Footer>
    </Container>
  );
}
