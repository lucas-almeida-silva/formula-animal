import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

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
  quantity: number;
};

type CartContextData = {
  products: Product[];
  totalItems: number;
  addToCart: (product: Omit<Product, 'quantity'>) => void;
  removeFromCart: (productId: string) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (product: string) => void;
  changeQuantity: (product: string, quantity: number) => void;
};

type CardProviderProps = {
  children: ReactNode;
};

const PRODUCTS_KEY = '@FormulaAnimal:products';

export const CartContext = createContext<CartContextData>(
  {} as CartContextData,
);

export function CartProvider({ children }: CardProviderProps) {
  const [products, setProducts] = useState<Product[]>(() => {
    const productsStorage = localStorage.getItem(PRODUCTS_KEY);

    if (productsStorage) {
      return JSON.parse(productsStorage);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  const totalItems = useMemo(
    () =>
      products.reduce(
        (accumulator, product) => accumulator + product.quantity,
        0,
      ),
    [products],
  );

  const handleIncrementQuantity = useCallback((productId: string) => {
    setProducts((prevState) =>
      prevState.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }

        return product;
      }),
    );
  }, []);

  const handleDecrementQuantity = useCallback(
    (productId: string) => {
      const product = products.find((p) => p.id === productId);

      if (product?.quantity === 1) {
        setProducts((prevState) => prevState.filter((p) => p.id !== productId));
      } else {
        setProducts((prevState) =>
          prevState.map((p) => {
            if (p.id === productId) {
              return {
                ...p,
                quantity: p.quantity - 1,
              };
            }

            return p;
          }),
        );
      }
    },
    [products],
  );

  const handleChangeQuantity = useCallback(
    (productId: string, quantity: number) => {
      setProducts((prevState) =>
        prevState.map((product) => {
          if (product.id === productId) {
            return {
              ...product,
              quantity,
            };
          }

          return product;
        }),
      );
    },
    [],
  );

  const handleAddToCart = useCallback(
    (product: Omit<Product, 'quantity'>) => {
      const productExists = products.find((p) => p.id === product.id);

      if (productExists) {
        handleIncrementQuantity(product.id);
      } else {
        setProducts((prevState) => [
          ...prevState,
          {
            ...product,
            quantity: 1,
          },
        ]);
      }
    },
    [handleIncrementQuantity, products],
  );

  const handleRemoveFromCart = useCallback(
    (productId: string) => {
      setProducts(products.filter((product) => product.id !== productId));
    },
    [products],
  );

  const value = useMemo(
    () => ({
      products,
      addToCart: handleAddToCart,
      removeFromCart: handleRemoveFromCart,
      incrementQuantity: handleIncrementQuantity,
      decrementQuantity: handleDecrementQuantity,
      changeQuantity: handleChangeQuantity,
      totalItems,
    }),
    [
      handleAddToCart,
      handleChangeQuantity,
      handleDecrementQuantity,
      handleIncrementQuantity,
      handleRemoveFromCart,
      products,
      totalItems,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
