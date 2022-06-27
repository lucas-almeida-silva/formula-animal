import { FiCheck } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { Container } from './styles';

type Params = {
  orderId: string;
};

export function CompletedOrder() {
  const { orderId } = useParams<Params>();

  return (
    <Container>
      <div>
        <FiCheck />
      </div>

      <strong>Pedido realizado</strong>
      <span>
        Código do pedido: <strong>{orderId}</strong>
      </span>
    </Container>
  );
}
