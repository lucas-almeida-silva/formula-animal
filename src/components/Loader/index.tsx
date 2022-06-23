import { createPortal } from 'react-dom';
import { Container, Spinner } from './styles';

export function Loader() {
  return createPortal(
    <Container>
      <Spinner />
    </Container>,
    document.getElementById('overlay') as HTMLDivElement,
  );
}
