import React, { createContext, useContext, useState } from 'react';
import { Cheese } from '../types/base';

interface CartItem {
  cheese: Cheese;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (cheese: Cheese, quantity: number) => void;
  getTotal: () => number;
  resetCart: () => void; 
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (cheese: Cheese, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.cheese.id === cheese.id);
      if (existingItem) {
        // Update quantity if already exists
        return prevItems.map(item =>
          item.cheese.id === cheese.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // Add new item to cart
      return [...prevItems, { cheese, quantity }];
    });
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + (item.cheese.pricePerKilo * item.quantity), 0);
  };

  const resetCart = () => {
    setCartItems([]); 
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, getTotal, resetCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
