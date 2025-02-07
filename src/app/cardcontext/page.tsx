'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';

// Define the structure of the cart item
interface Product {
  id: string;
  title: string;
  name: string;
  image: string;
  price: number;
  discountPercentage: number;
  category: string;
  stockLevel: number;
  quantity: number;
  description: string;
}

interface CartContextType {
  addToCart: (product: Product) => void;
  cartItems: Product[];
  deleteCartItem: (product: Product) => void;
  itemsCount: number;
  setItemsCount: React.Dispatch<React.SetStateAction<number>>;
  cartBarOpen: boolean;
  setCartBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clearCart: () => void;
  Subtotal: number;
  data: Product[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartBarOpen, setCartBarOpen] = useState(false);
  const [itemsCount, setItemsCount] = useState(1);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [Subtotal, setSubTotal] = useState(0);
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = JSON.parse(localStorage.getItem('cartItem') || '[]');
      setCartItems(storedCart);
    }
  }, []);

  useEffect(() => {
    const subtotal = cartItems.reduce((prev, curr) => {
      const discount = curr.discountPercentage || 0;
      const discountedPrice = curr.price - (curr.price * discount) / 100;
      return prev + discountedPrice * curr.quantity;
    }, 0);
    setSubTotal(subtotal);
  }, [cartItems]);

  useEffect(() => {
    const fetchData = async () => {
      const query =
        '*[_type=="product"]{"image":image.asset->url,discountPercentage, id , category , stockLevel, title, price, name, description, summary}';
      const response = await client.fetch(query);
      setData(response);
    };
    fetchData();
  }, []);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const isItemExists = prevItems.find((item) => item.id === product.id);
      let updatedCart;
      if (isItemExists) {
        updatedCart = prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + itemsCount } : item
        );
      } else {
        updatedCart = [...prevItems, { ...product, quantity: itemsCount }];
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('cartItem', JSON.stringify(updatedCart));
      }

      return updatedCart;
    });
  };

  const deleteCartItem = (product: Product) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== product.id);

      if (typeof window !== 'undefined') {
        localStorage.setItem('cartItem', JSON.stringify(updatedCart));
      }

      return updatedCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItem', JSON.stringify([]));
    }
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartItems,
        deleteCartItem,
        itemsCount,
        setItemsCount,
        cartBarOpen,
        setCartBarOpen,
        clearCart,
        Subtotal,
        data,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
