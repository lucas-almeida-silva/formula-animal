import { FocusEvent, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { parse, isValid, isFuture, isSameMonth, isSameYear } from 'date-fns';
import { Col } from 'react-grid-system';
import CreditCard, { Focused } from 'react-credit-cards';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { InputMask } from '../../components/InputMask';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';

import { useCart } from '../../hooks/useCart';
import { stateOptions } from '../../utils/stateOptions';
import { formatValue } from '../../utils/formatValue';

import { Container, Form, FormGroupRow, Payment, Summary } from './styles';
import 'react-credit-cards/es/styles-compiled.css';
import { Loader } from '../../components/Loader';

type FormData = {
  address: {
    street: string;
    number: number;
    neighborhood: string;
    zipCode: string;
    referencePoint?: string;
    city: string;
    state: string;
  };
  payment: {
    creditCard: {
      number: string;
      name: string;
      expiry: string;
      cvc: string;
    };
    installments: number;
  };
};

const validationSchema = yup.object().shape({
  address: yup.object().shape({
    street: yup.string().trim().required('Logradouro obrigatório'),
    number: yup
      .number()
      .typeError('Número obrigatório')
      .positive('Número inválido'),
    neighborhood: yup.string().trim().required('Bairro obrigatório'),
    zipCode: yup.string().trim().required('CEP obrigatório'),
    city: yup.string().trim().required('Cidade obrigatória'),
    state: yup.string().trim().required('Estado obrigatório'),
    referecePoint: yup.string(),
  }),
  payment: yup.object().shape({
    creditCard: yup.object().shape({
      number: yup
        .string()
        .trim()
        .required('Número é obrigatório')
        .matches(/\d/, 'Número inválido')
        .length(16, 'O número deve ter 16 caracteres'),
      name: yup.string().trim().required('Nome é obrigatório'),
      expiry: yup
        .string()
        .trim()
        .required('Validade é obrigatória')
        .test('isValidExpiry', 'Data inválida', (value) => {
          if (!value) {
            return true;
          }

          const date = parse(value, 'MM/yy', new Date());

          return (
            isValid(date) &&
            (isFuture(date) ||
              (isSameMonth(date, new Date()) && isSameYear(date, new Date())))
          );
        }),
      cvc: yup
        .string()
        .trim()
        .required('CVC é obrigatório')
        .matches(/\d/, 'CVC inválido'),
    }),
  }),
});

export function Checkout() {
  const [addressFieldsDisabled, setAddressFieldsDisabled] = useState(true);
  const [creditCardInputFocused, setCreditCardInputFocused] =
    useState<Focused>();
  const [isLoading, setIsLoading] = useState(false);

  const { products, totalItems, totalFreight, totalValueProducts, totalValue } =
    useCart();

  const {
    register,
    control,
    setValue,
    getValues,
    clearErrors,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();

  const totalFreightFormatted = formatValue(totalFreight);
  const totalValueProductsFormatted = formatValue(totalValueProducts);
  const totalValueFormatted = formatValue(totalValue);

  const [creditCardNumber, creditCardName, creditCardExpiry, creditCardCVC] =
    watch(
      [
        'payment.creditCard.number',
        'payment.creditCard.name',
        'payment.creditCard.expiry',
        'payment.creditCard.cvc',
      ],
      {
        payment: {
          creditCard: {
            number: '',
            name: '',
            expiry: '',
            cvc: '',
          },
        },
      },
    );

  const installments = useMemo(() => {
    const installmentValues = [];

    const installmentsQuantity = products.reduce(
      (previous, current) =>
        current.installments > previous ? current.installments : previous,
      0,
    );

    const total = products.reduce(
      (accumulator, product) =>
        accumulator + product.freight + product.quantity * product.value,
      0,
    );

    for (let i = 1; i <= installmentsQuantity; i++) {
      installmentValues.push({
        quantity: i,
        value: total / i,
      });
    }

    return installmentValues;
  }, [products]);

  const installmentsOptions = useMemo(
    () =>
      installments.map((installment) => ({
        label: `${installment.quantity}x de ${formatValue(installment.value)}`,
        value: installment.quantity,
      })),
    [installments],
  );

  function handleInputCreditCardFocus(event: FocusEvent<HTMLInputElement>) {
    setCreditCardInputFocused(
      event.target.name.split('.').slice(-1)[0] as Focused,
    );
  }

  async function handleFillAddressByZipCode() {
    const zipCode = getValues('address.zipCode').replace(/\D/g, '');

    if (!zipCode || zipCode.length !== 8) {
      return;
    }

    const { data } = await axios.get(
      `https://viacep.com.br/ws/${zipCode}/json`,
    );

    if (!data.erro) {
      setValue('address.street', data.logradouro);
      setValue('address.neighborhood', data.bairro);
      setValue('address.city', data.localidade);
      setValue('address.state', data.uf);

      setAddressFieldsDisabled(true);

      clearErrors([
        'address.street',
        'address.state',
        'address.neighborhood',
        'address.city',
      ]);
    } else {
      setAddressFieldsDisabled(false);
    }
  }

  async function onSubmit(data: FormData) {
    try {
      console.log(data);
      setIsLoading(true);

      const { orderId } = await new Promise<{ orderId: string }>(
        (resolve, reject) => {
          setTimeout(() => {
            resolve({
              orderId: String(Math.random() * 1000),
            });
          }, 2000);
        },
      );

      toast('Pedido realizado com sucesso', {
        type: 'success',
      });
      navigate(`/completed-order/${orderId}`);
    } catch {
      toast('Ocorreu um erro ao finalizar o pedido', {
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Card>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>Endereço</legend>

            <Controller
              name="address.zipCode"
              control={control}
              render={({ field }) => (
                <InputMask
                  name={field.name}
                  label="CEP"
                  mask="99999-999"
                  maskChar=""
                  ref={field.ref}
                  defaultValue=""
                  error={errors.address?.zipCode?.message}
                  onChange={field.onChange}
                  onBlur={() => {
                    field.onBlur();
                    handleFillAddressByZipCode();
                  }}
                />
              )}
            />

            <FormGroupRow>
              <Col md={9}>
                <Input
                  label="Endereço"
                  disabled={addressFieldsDisabled}
                  error={errors.address?.street?.message}
                  {...register('address.street')}
                />
              </Col>

              <Col md={3}>
                <Input
                  type="number"
                  label="Número"
                  error={errors.address?.number?.message}
                  {...register('address.number')}
                />
              </Col>
            </FormGroupRow>

            <Input
              label="Bairro"
              disabled={addressFieldsDisabled}
              error={errors.address?.neighborhood?.message}
              {...register('address.neighborhood')}
            />

            <FormGroupRow>
              <Col md={9}>
                <Input
                  label="Cidade"
                  disabled={addressFieldsDisabled}
                  error={errors.address?.city?.message}
                  {...register('address.city')}
                />
              </Col>

              <Col md={3}>
                <Select
                  label="Estado"
                  options={stateOptions}
                  disabled={addressFieldsDisabled}
                  error={errors.address?.state?.message}
                  {...register('address.state')}
                />
              </Col>
            </FormGroupRow>

            <Input
              label="Ponto de Referência"
              error={errors.address?.referencePoint?.message}
              {...register('address.referencePoint')}
            />
          </fieldset>

          <fieldset>
            <legend>Pagamento</legend>

            <Payment>
              <CreditCard
                number={creditCardNumber}
                name={creditCardName}
                expiry={creditCardExpiry}
                cvc={creditCardCVC}
                focused={creditCardInputFocused}
                placeholders={{
                  name: 'SEU NOME',
                }}
                locale={{
                  valid: 'Validade',
                }}
              />

              <div>
                <Input
                  label="Número"
                  error={errors.payment?.creditCard?.number?.message}
                  maxLength={16}
                  onFocus={handleInputCreditCardFocus}
                  {...register('payment.creditCard.number')}
                />

                <Input
                  label="Nome"
                  error={errors.payment?.creditCard?.name?.message}
                  onFocus={handleInputCreditCardFocus}
                  {...register('payment.creditCard.name')}
                />

                <FormGroupRow>
                  <Col md={6} sm={6} xs={12}>
                    <Controller
                      name="payment.creditCard.expiry"
                      control={control}
                      render={({ field }) => (
                        <InputMask
                          name={field.name}
                          label="Validade"
                          mask="99/99"
                          maskChar=""
                          ref={field.ref}
                          defaultValue=""
                          error={errors.payment?.creditCard?.expiry?.message}
                          onFocus={handleInputCreditCardFocus}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                        />
                      )}
                    />
                  </Col>

                  <Col md={6} sm={6} xs={12}>
                    <Input
                      label="CVC"
                      maxLength={4}
                      error={errors.payment?.creditCard?.cvc?.message}
                      onFocus={handleInputCreditCardFocus}
                      {...register('payment.creditCard.cvc')}
                    />
                  </Col>
                </FormGroupRow>

                <Select
                  label="Parcelamento"
                  options={installmentsOptions}
                  error={errors.payment?.installments?.message}
                  {...register('payment.installments')}
                />
              </div>
            </Payment>
          </fieldset>

          <Button type="submit">Finalizar</Button>
        </Form>
      </Card>

      <Summary>
        <strong>Resumo do pedido</strong>

        <section>
          {products.map((product) => (
            <div key={product.id}>
              <div>
                <img src={product.images[0]} alt={product.title} />
                <span>{product.title}</span>
              </div>

              <div>
                <span>Quantidade</span>
                <span>{product.quantity}</span>
              </div>

              <div>
                <span>Total</span>
                <span>{formatValue(product.value * product.quantity)}</span>
              </div>
            </div>
          ))}
        </section>

        <footer>
          <div>
            <span>
              {`${totalItems} ${totalItems > 1 ? 'produtos' : 'produto'}`}
            </span>
            <span>{totalValueProductsFormatted}</span>
          </div>

          <div>
            <span>Frete</span>
            <span>{totalFreightFormatted}</span>
          </div>

          <div>
            <strong>Total</strong>
            <strong>{totalValueFormatted}</strong>
          </div>
        </footer>

        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          Finalizar
        </Button>
      </Summary>

      {isLoading && <Loader />}
    </Container>
  );
}
