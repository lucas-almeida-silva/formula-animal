import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import {
  Container, Specifications, ProductInfo, ProductSummary,
} from './styles';

export function Product() {
  return (
    <Container>
      <ProductSummary>
        <Card>
          <img src="https://img.freepik.com/vetores-gratis/frasco-de-remedio-comprimidos-e-ilustracao-de-icone-dos-desenhos-animados-de-pilulas-conceito-de-icone-de-medicina-de-saude-isolado-premium-estilo-flat-cartoon_138676-1625.jpg?w=2000" alt="Produto" />
        </Card>

        <ProductInfo>
          <h1>Dipirona Sódica 500mg Genérico EMS 10 Comprimidos</h1>

          <div className="price">
            <strong>R$ 20,00</strong>
            <span>2x de R$ 10,00</span>
          </div>

          <div>
            <strong>Frete</strong>
            <span>Grátis</span>
          </div>

          <div>
            <strong>Prazo de entrega</strong>
            <span>7 dias</span>
          </div>

          <Button>
            Quero comprar
          </Button>
        </ProductInfo>
      </ProductSummary>

      <Specifications>
        <h2>Especificações</h2>

        <table>
          <tbody>
            <tr>
              <td>Quantidade</td>
              <td>10ml</td>
            </tr>
            <tr>
              <td>Quantidade</td>
              <td>10ml</td>
            </tr>
          </tbody>
        </table>
      </Specifications>
    </Container>
  );
}
