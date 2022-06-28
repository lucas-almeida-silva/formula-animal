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
  images: string[];
  value: number;
  installments: number;
  installmentValue: string;
  freight: number;
  deadline: Deadline;
  especifications: Especification[];
  quantity: number;
};

type CartContextData = {
  products: Product[];
  totalItems: number;
  totalFreight: number;
  totalValueProducts: number;
  totalValue: number;
  addToCart: (product: Omit<Product, 'quantity'>) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
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

  const totalFreight = useMemo(() => {
    const totalValue = products.reduce(
      (accumulator, product) => accumulator + product.freight,
      0,
    );

    return totalValue;
  }, [products]);

  const totalValueProducts = useMemo(() => {
    const total = products.reduce(
      (accumulator, product) => accumulator + product.quantity * product.value,
      0,
    );

    return total;
  }, [products]);

  const totalValue = useMemo(() => {
    const total = products.reduce(
      (accumulator, product) =>
        accumulator + product.freight + product.quantity * product.value,
      0,
    );

    return total;
  }, [products]);

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

  const handleAddToCart = useCallback((product: Omit<Product, 'quantity'>) => {
    setProducts((prevState) => {
      const productExists = prevState.find((p) => p.id === product.id);

      if (productExists) {
        return prevState.map((p) => {
          if (p.id === product.id) {
            return {
              ...product,
              quantity: p.quantity + 1,
            };
          }

          return p;
        });
      }

      return [
        ...prevState,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }, []);

  const handleRemoveFromCart = useCallback((productId: string) => {
    setProducts((prevState) =>
      prevState.filter((product) => product.id !== productId),
    );
  }, []);

  const handleClearCart = useCallback(() => {
    setProducts([]);
    localStorage.removeItem(PRODUCTS_KEY);
  }, []);

  const value = useMemo(
    () => ({
      products,
      totalItems,
      totalFreight,
      totalValueProducts,
      totalValue,
      addToCart: handleAddToCart,
      removeFromCart: handleRemoveFromCart,
      clearCart: handleClearCart,
      incrementQuantity: handleIncrementQuantity,
      decrementQuantity: handleDecrementQuantity,
      changeQuantity: handleChangeQuantity,
    }),
    [
      handleAddToCart,
      handleChangeQuantity,
      handleDecrementQuantity,
      handleIncrementQuantity,
      handleRemoveFromCart,
      handleClearCart,
      products,
      totalFreight,
      totalItems,
      totalValueProducts,
      totalValue,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
