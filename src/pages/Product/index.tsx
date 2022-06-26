import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Button } from '../../components/Button';
import { Loader } from '../../components/Loader';

import { useCart } from '../../hooks/useCart';
import { api } from '../../services/api';
import { formatValue } from '../../utils/formatValue';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import {
  Container,
  Specifications,
  ProductInfo,
  ProductSummary,
  Images,
  CarouselArrow,
} from './styles';
import { Card } from '../../components/Card';

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
  images: string[];
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
          <Images
            showArrows
            infiniteLoop
            showStatus={false}
            renderArrowPrev={(clickHandler, hasPrev, label) =>
              hasPrev && (
                <CarouselArrow className="left">
                  <button type="button" onClick={clickHandler} title={label}>
                    <FiChevronLeft />
                  </button>
                </CarouselArrow>
              )
            }
            renderArrowNext={(clickHandler, hasNext, label) =>
              hasNext && (
                <CarouselArrow className="right">
                  <button type="button" onClick={clickHandler} title={label}>
                    <FiChevronRight />
                  </button>
                </CarouselArrow>
              )
            }>
            {product.images.map((image) => (
              <img key={image} src={image} alt={product.title} />
            ))}
          </Images>
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
