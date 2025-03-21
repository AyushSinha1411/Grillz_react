"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define types for order items and orders
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
  status: "delivered" | "processing" | "cancelled";
  paymentMethod: "credit" | "cash" | "other";
}

// Define context type
interface OrderHistoryContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => void;
  clearOrderHistory: () => void;
}

// Create context
const OrderHistoryContext = createContext<OrderHistoryContextType | null>(null);

// Provider component
export const OrderHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Load orders from localStorage on mount
  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem("orderHistory");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error("Failed to load order history from localStorage:", error);
    }
  }, []);
  
  // Save orders to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem("orderHistory", JSON.stringify(orders));
    } catch (error) {
      console.error("Failed to save order history to localStorage:", error);
    }
  }, [orders]);
  
  // Add a new order
  const addOrder = (order: Omit<Order, "id" | "date" | "status">) => {
    const newOrder: Order = {
      ...order,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
      status: "processing",
    };
    
    setOrders(prevOrders => [newOrder, ...prevOrders]);
  };
  
  // Clear all order history
  const clearOrderHistory = () => {
    setOrders([]);
  };
  
  return (
    <OrderHistoryContext.Provider value={{ orders, addOrder, clearOrderHistory }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};

// Custom hook for using this context
export const useOrderHistory = () => {
  const context = useContext(OrderHistoryContext);
  if (!context) {
    throw new Error("useOrderHistory must be used within an OrderHistoryProvider");
  }
  return context;
}; 