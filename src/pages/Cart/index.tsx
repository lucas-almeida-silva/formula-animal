import { ChangeEvent, FocusEvent, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiMinus } from 'react-icons/fi';

import { Button } from '../../components/Button';

import { useCart } from '../../hooks/useCart';
import { formatValue } from '../../utils/formatValue';

import { CartItems, Container, Quantity, Summary } from './styles';

export function Cart() {
  const {
    products,
    totalItems,
    incrementQuantity,
    decrementQuantity,
    changeQuantity,
    removeFromCart,
  } = useCart();

  const navigate = useNavigate();

  const totalValueProducts = useMemo(() => {
    const totalValue = products.reduce(
      (accumulator, product) => accumulator + product.quantity * product.value,
      0,
    );

    return formatValue(totalValue);
  }, [products]);

  const totalFreight = useMemo(() => {
    const totalValue = products.reduce(
      (accumulator, product) => accumulator + product.freight,
      0,
    );

    return formatValue(totalValue);
  }, [products]);

  const totalCart = useMemo(() => {
    const totalValue = products.reduce(
      (accumulator, product) =>
        accumulator + product.freight + product.quantity * product.value,
      0,
    );

    return formatValue(totalValue);
  }, [products]);

  function handleChangeProductQuantity(
    event: ChangeEvent<HTMLInputElement>,
    productId: string,
  ) {
    const quantity = event.target.value;

    changeQuantity(productId, Number(quantity));
  }

  function handleBlurProductQuantity(
    event: FocusEvent<HTMLInputElement>,
    productId: string,
  ) {
    if (!event.target.value) {
      changeQuantity(productId, 1);
    }
  }

  function handleNavigateToCheckout() {
    navigate('/checkout');
  }

  return (
    <Container>
      <h1>Meu carrinho</h1>

      {totalItems > 0 ? (
        <>
          <CartItems>
            <header>
              <strong>Produto</strong>
              <strong>Quantidade</strong>
              <strong>Preço</strong>
            </header>

            {products.map((product) => (
              <article key={product.id}>
                <div>
                  <img src={product.image} alt={product.title} />
                  <span>{product.title}</span>
                </div>

                <Quantity>
                  <div>
                    <button
                      type="button"
                      onClick={() => decrementQuantity(product.id)}>
                      <FiMinus />
                    </button>
                    <input
                      type="number"
                      value={product.quantity || ''}
                      onChange={(event) =>
                        handleChangeProductQuantity(event, product.id)
                      }
                      onBlur={(event) =>
                        handleBlurProductQuantity(event, product.id)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => incrementQuantity(product.id)}>
                      <FiPlus />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}>
                    Remover
                  </button>
                </Quantity>

                <strong>{product.valueFormatted}</strong>
              </article>
            ))}
          </CartItems>

          <footer>
            <div>
              <Summary>
                <li>
                  <span>
                    {totalItems} {totalItems === 1 ? 'produto' : 'produtos'}
                  </span>

                  <span>{totalValueProducts}</span>
                </li>
                <li>
                  <span>Frete</span>
                  <span>{totalFreight}</span>
                </li>

                <li>
                  <span>Total</span>
                  <strong>{totalCart}</strong>
                </li>
              </Summary>

              <Button onClick={handleNavigateToCheckout}>Continuar</Button>
            </div>
          </footer>
        </>
      ) : (
        <p>Nenhum item adicionado ao carrinho</p>
      )}
    </Container>
  );
}
