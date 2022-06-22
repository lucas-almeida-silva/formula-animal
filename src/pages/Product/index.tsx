import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { useCart } from '../../hooks/useCart';
import { api } from '../../services/api';
import { formatValue } from '../../utils/formatValue';

import {
  Container, Specifications, ProductInfo, ProductSummary,
} from './styles';

type Especification = {
  title: string;
  description: string;
}

type Product = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  priceFormatted: string;
  installments: number;
  installmentValue: string;
  especifications: Especification[];
}

type ProductParams = {
  id: string;
}

export function Product() {
  const [product, setProduct] = useState<Product>({} as Product);

  const { addToCart } = useCart();
  const productParams = useParams<ProductParams>();
  const navigate = useNavigate();

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await api.get(`/products/${productParams.id}`);

        const installmentValue = (response.data.price / response.data.installments);

        setProduct({
          ...response.data,
          priceFormatted: response.data.price.toLocaleString(),
          installmentValue: formatValue(installmentValue),
        });
      } catch {
        navigate('/');
      }
    }

    getProduct();
  }, [navigate, productParams.id]);

  function handleAddToCart() {
    addToCart(product);
    navigate('/cart');
  }

  return (
    <Container>
      <ProductSummary>
        <Card>
          <img src={product.image} alt={product.title} />
        </Card>

        <ProductInfo>
          <h1>{product.title}</h1>

          <div className="price">
            <strong>
              R$ {product?.priceFormatted}
            </strong>
            <span>{product.installments}x de R$ {product.installmentValue}</span>
          </div>

          <div>
            <strong>Frete</strong>
            <span>Grátis</span>
          </div>

          <div>
            <strong>Prazo de entrega</strong>
            <span>7 dias</span>
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
