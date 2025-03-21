"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function OrderSuccess() {
  const [orderNumber, setOrderNumber] = useState<string>("");
  
  useEffect(() => {
    // Generate a random order number for demonstration purposes
    const randomOrderNumber = Math.floor(100000 + Math.random() * 900000).toString();
    setOrderNumber(randomOrderNumber);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container-custom py-12">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-green-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold mb-4 font-heading">Order Confirmed!</h1>
          <p className="text-[var(--gray-dark)] mb-2">Thank you for your order.</p>
          <p className="text-[var(--gray-dark)] mb-6">Your order number is: <span className="font-bold text-[var(--text-dark)]">#{orderNumber}</span></p>
          
          <div className="bg-[var(--gray-light)] p-6 rounded-lg mb-8 max-w-md mx-auto">
            <h2 className="font-bold text-lg mb-4">Order Details</h2>
            <div className="flex justify-between mb-2">
              <span>Order Status:</span>
              <span className="font-medium">Processing</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Estimated Delivery:</span>
              <span className="font-medium">30-45 minutes</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Method:</span>
              <span className="font-medium">Credit Card (xxxx)</span>
            </div>
          </div>
          
          <p className="text-[var(--gray-dark)] mb-6">
            A confirmation email has been sent to your email address with the order details.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/" 
              className="px-6 py-3 bg-[var(--primary)] text-white rounded-md font-medium hover:bg-[var(--primary-dark)] transition-colors"
            >
              Return to Homepage
            </Link>
            <button 
              className="px-6 py-3 border border-[var(--gray)] rounded-md font-medium hover:bg-[var(--gray-light)] transition-colors"
              onClick={() => window.print()}
            >
              Print Receipt
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 