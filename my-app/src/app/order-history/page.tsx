"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useOrderHistory } from "@/context/OrderHistoryContext";

export default function OrderHistory() {
  const { orders, clearOrderHistory } = useOrderHistory();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  // Format a date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Toggle order details
  const toggleOrderDetails = (orderId: string) => {
    if (selectedOrder === orderId) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder(orderId);
    }
  };
  
  // Confirm clearing history
  const handleClearHistory = () => {
    clearOrderHistory();
    setShowClearConfirm(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container-custom py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-heading">Order History</h1>
          {orders.length > 0 && (
            <button 
              onClick={() => setShowClearConfirm(true)}
              className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear History
            </button>
          )}
        </div>
        
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 mx-auto text-[var(--gray)]" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
            <h2 className="text-xl font-bold mt-4 mb-2">No Order History</h2>
            <p className="text-[var(--gray-dark)] mb-6">You haven&apos;t placed any orders yet.</p>
            <Link 
              href="/" 
              className="inline-block bg-[var(--primary)] text-white px-6 py-3 rounded-md font-medium hover:bg-[var(--primary-dark)] transition-colors"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div 
                  onClick={() => toggleOrderDetails(order.id)}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg font-bold">Order #{order.id.slice(-6)}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--gray-dark)]">{formatDate(order.date)}</p>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="text-sm text-[var(--gray-dark)]">{order.items.reduce((total, item) => total + item.quantity, 0)} items</div>
                      <div className="font-bold">${order.total.toFixed(2)}</div>
                    </div>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-6 w-6 text-[var(--gray-dark)] transition-transform ${selectedOrder === order.id ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {selectedOrder === order.id && (
                  <div className="border-t border-[var(--gray-light)] p-4 sm:p-6">
                    <h3 className="font-bold mb-4">Order Details</h3>
                    <div className="divide-y divide-[var(--gray-light)]">
                      {order.items.map((item, index) => (
                        <div key={index} className="py-3 flex justify-between">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-[var(--gray-dark)] capitalize">{item.category}</div>
                          </div>
                          <div className="text-right">
                            <div>${item.price.toFixed(2)} × {item.quantity}</div>
                            <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-[var(--gray-light)]">
                      <div className="flex justify-between mb-2">
                        <span className="text-[var(--gray-dark)]">Subtotal</span>
                        <span>${order.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-[var(--gray-dark)]">Delivery Fee</span>
                        <span>$3.99</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-[var(--gray-dark)]">Tax</span>
                        <span>${(order.total - (order.items.reduce((total, item) => total + (item.price * item.quantity), 0) + 3.99)).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-[var(--gray-light)]">
                        <span>Total</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-sm">
                      <div className="mb-2"><span className="font-medium">Payment Method:</span> {order.paymentMethod}</div>
                      <div><span className="font-medium">Delivery Address:</span> 123 Example St, City, Country</div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button className="text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Receipt
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full mx-4 p-6">
              <h3 className="text-xl font-bold mb-4">Clear Order History</h3>
              <p className="mb-6">Are you sure you want to clear your entire order history? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 rounded-md border border-[var(--gray)] hover:bg-[var(--gray-light)] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleClearHistory}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Clear History
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
} 