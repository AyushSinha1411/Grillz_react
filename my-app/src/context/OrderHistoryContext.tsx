"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { FoodItem } from "@/data/foodItems";

// Define order type
export interface OrderItem {
  itemId: number;
  quantity: number;
  price: number;
  name: string;
  category: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: 'processing' | 'delivered' | 'cancelled';
  paymentMethod: string;
}

// Define the context type
interface OrderHistoryContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "date">) => void;
  clearHistory: () => void;
}

// Create context with default values
const OrderHistoryContext = createContext<OrderHistoryContextType>({
  orders: [],
  addOrder: () => {},
  clearHistory: () => {},
});

// Create a provider component
export const OrderHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("orderHistory");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error("Failed to parse order history from localStorage", e);
      }
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("orderHistory", JSON.stringify(orders));
  }, [orders]);

  // Add a new order to the history
  const addOrder = (order: Omit<Order, "id" | "date">) => {
    const newOrder: Order = {
      ...order,
      id: Math.random().toString(36).substring(2, 9), // Simple random ID
      date: new Date().toISOString()
    };
    
    setOrders(prevOrders => [newOrder, ...prevOrders]);
  };

  // Clear order history
  const clearHistory = () => {
    setOrders([]);
  };

  return (
    <OrderHistoryContext.Provider value={{ orders, addOrder, clearHistory }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};

// Custom hook to use the order history context
export const useOrderHistory = () => useContext(OrderHistoryContext); 