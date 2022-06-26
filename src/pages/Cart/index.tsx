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
    totalFreight,
    totalValueProducts,
    totalValue,
    incrementQuantity,
    decrementQuantity,
    changeQuantity,
    removeFromCart,
  } = useCart();

  const navigate = useNavigate();

  const totalValueProductsFormatted = formatValue(totalValueProducts);
  const totalFreightFormatted = formatValue(totalFreight);
  const totalCartFormatted = formatValue(totalValue);

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
                  <img src={product.images[0]} alt={product.title} />
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

                <strong>{formatValue(product.value)}</strong>
              </article>
            ))}
          </CartItems>

          <footer>
            <div>
              <Summary>
                <li>
                  <span>
                    {`${totalItems} ${totalItems > 1 ? 'produtos' : 'produto'}`}
                  </span>

                  <span>{totalValueProductsFormatted}</span>
                </li>
                <li>
                  <span>Frete</span>
                  <span>{totalFreightFormatted}</span>
                </li>

                <li>
                  <span>Total</span>
                  <strong>{totalCartFormatted}</strong>
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
