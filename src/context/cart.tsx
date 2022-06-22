import {
  createContext, ReactNode, useCallback, useEffect, useMemo, useState,
} from 'react';

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
  quantity: number;
}

type CartContextData = {
  products: Product[];
  addToCart: (product: Omit<Product, 'quantity'>) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (product: string) => void;
}

type CardProviderProps = {
  children: ReactNode;
}

const PRODUCTS_KEY = '@FormulaAnimal:products';

export const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CardProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  const incrementQuantity = useCallback((productId: string) => {
    setProducts((prevState) => prevState.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }

      return product;
    }));
  }, []);

  const decrementQuantity = useCallback((productId: string) => {
    const product = products.find((p) => p.id === productId);

    if (product?.quantity === 1) {
      setProducts((prevState) => prevState.filter((p) => p.id !== productId));
    } else {
      setProducts((prevState) => prevState.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            quantity: p.quantity + 1,
          };
        }

        return p;
      }));
    }
  }, [products]);

  const addToCart = useCallback((product: Omit<Product, 'quantity'>) => {
    const productExists = products.find((p) => p.id === product.id);

    if (productExists) {
      incrementQuantity(product.id);
    } else {
      setProducts((prevState) => [
        ...prevState,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  }, [incrementQuantity, products]);

  const value = useMemo(() => ({
    products,
    addToCart,
    incrementQuantity,
    decrementQuantity,
  }), [products, addToCart, incrementQuantity, decrementQuantity]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
