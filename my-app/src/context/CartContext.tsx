"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { foodItemsData } from "@/data/foodItems";

// Define the cart item type
export interface CartItem {
  id: number;
  quantity: number;
  price: number; // Store the price at the time of adding to cart
}

// Define the context type
interface CartContextType {
  cartItems: { [key: number]: number };
  cartPrices: { [key: number]: number }; // Store price info separately
  addToCart: (itemId: number, useDiscountedPrice?: boolean) => void;
  removeFromCart: (itemId: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearCart: () => void;
}

// Calculate discounted price (10% off)
const getDiscountedPrice = (originalPrice: number) => {
  return parseFloat((originalPrice * 0.9).toFixed(2));
};

// Create context with default values
const CartContext = createContext<CartContextType>({
  cartItems: {},
  cartPrices: {},
  addToCart: () => {},
  removeFromCart: () => {},
  getTotalItems: () => 0,
  getTotalPrice: () => 0,
  clearCart: () => {},
});

// Create a provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<{ [key: number]: number }>({});
  const [cartPrices, setCartPrices] = useState<{ [key: number]: number }>({});

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedPrices = localStorage.getItem("cartPrices");
    
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
    
    if (savedPrices) {
      try {
        setCartPrices(JSON.parse(savedPrices));
      } catch (e) {
        console.error("Failed to parse cartPrices from localStorage", e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("cartPrices", JSON.stringify(cartPrices));
  }, [cartItems, cartPrices]);

  // Add item to cart
  const addToCart = (itemId: number, useDiscountedPrice: boolean = false) => {
    // Find the item
    const item = foodItemsData.find(item => item.id === itemId);
    if (!item) return;

    // Calculate the price
    const price = useDiscountedPrice ? getDiscountedPrice(item.price) : item.price;
    
    setCartItems((prevCart) => ({
      ...prevCart,
      [itemId]: (prevCart[itemId] || 0) + 1,
    }));
    
    setCartPrices((prevPrices) => ({
      ...prevPrices,
      [itemId]: price,
    }));
  };

  // Remove item from cart
  const removeFromCart = (itemId: number) => {
    setCartItems((prevCart) => {
      const newCart = { ...prevCart };
      
      if (newCart[itemId]) {
        if (newCart[itemId] > 1) {
          newCart[itemId] -= 1;
        } else {
          delete newCart[itemId];
          
          // Also remove the price entry if quantity becomes zero
          setCartPrices((prevPrices) => {
            const newPrices = { ...prevPrices };
            delete newPrices[itemId];
            return newPrices;
          });
        }
      }
      
      return newCart;
    });
  };

  // Get total number of items in cart
  const getTotalItems = () => {
    return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
  };
  
  // Get total price of items in cart
  const getTotalPrice = () => {
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      const price = cartPrices[parseInt(itemId)] || 0;
      return total + (price * quantity);
    }, 0);
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems({});
    setCartPrices({});
  };

  return (
    <CartContext.Provider value={{ cartItems, cartPrices, addToCart, removeFromCart, getTotalItems, getTotalPrice, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext); 