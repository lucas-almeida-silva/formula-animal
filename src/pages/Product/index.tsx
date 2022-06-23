import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Loader } from '../../components/Loader';
import { useCart } from '../../hooks/useCart';

import { api } from '../../services/api';
import { formatValue } from '../../utils/formatValue';

import {
  Container,
  Specifications,
  ProductInfo,
  ProductSummary,
} from './styles';

type Especification = {
  title: string;
  description: string;
};

type Deadline = {
  quantity: number;
  unity: string;
};

type Product = {
  id: string;
  title: string;
  description: string;
  image: string;
  value: number;
  valueFormatted: string;
  installments: number;
  installmentValue: string;
  freight: number;
  freightFormatted: string;
  deadline: Deadline;
  especifications: Especification[];
};

type ProductParams = {
  id: string;
};

export function Product() {
  const [product, setProduct] = useState<Product>({} as Product);
  const [isLoading, setIsLoading] = useState(true);

  const { addToCart } = useCart();
  const productParams = useParams<ProductParams>();
  const navigate = useNavigate();

  useEffect(() => {
    async function getProduct() {
      try {
        const { data } = await api.get(`/products/${productParams.id}`);

        const installmentValue = data.value / data.installments;

        setProduct({
          ...data,
          valueFormatted: formatValue(data.value),
          installmentValue: formatValue(installmentValue),
          freightFormatted: formatValue(data.freight),
        });
      } catch {
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    }

    getProduct();
  }, [navigate, productParams.id]);

  function handleAddToCart() {
    addToCart(product);
    navigate('/cart');
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <ProductSummary>
        <Card>
          <img src={product.image} alt={product.title} />
        </Card>

        <ProductInfo>
          <h1>{product.title}</h1>

          <div className="value">
            <strong>{product.valueFormatted}</strong>
            <span>
              {product.installments}x de R$ {product.installmentValue}
            </span>
          </div>

          <div>
            <strong>Frete</strong>
            <span>{product.freightFormatted || 'Grátis'}</span>
          </div>

          <div>
            <strong>Prazo de entrega</strong>
            <span>
              {product.deadline.quantity} {product.deadline.unity}
            </span>
          </div>

          <Button type="button" onClick={handleAddToCart}>
            Quero comprar
          </Button>
        </ProductInfo>
      </ProductSummary>

      <Specifications>
        <h2>Especificações</h2>

        <table>
          <tbody>
            {product?.especifications?.map((especification) => (
              <tr key={especification.title}>
                <td>{especification.title}</td>
                <td>{especification.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Specifications>
    </Container>
  );
}
