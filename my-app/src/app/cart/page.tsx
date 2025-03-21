"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useOrderHistory, OrderItem } from "@/context/OrderHistoryContext";

// Import the food items data to display details
import { foodItemsData } from "@/data/foodItems";

export default function Cart() {
  const router = useRouter();
  const { cartItems, cartPrices, addToCart, removeFromCart, clearCart, getTotalItems, getTotalPrice } = useCart();
  const { addOrder } = useOrderHistory();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create order items for history
    const orderItems: OrderItem[] = Object.entries(cartItems).map(([itemId, quantity]) => {
      const itemIdNum = parseInt(itemId);
      const item = foodItemsData.find(i => i.id === itemIdNum);
      const price = cartPrices[itemIdNum] || (item?.price || 0);
      
      if (!item) {
        // This should never happen, but just in case
        return {
          itemId: itemIdNum,
          quantity,
          price: price,
          name: "Unknown Item",
          category: "unknown"
        };
      }
      
      return {
        itemId: item.id,
        quantity,
        price: price,
        name: item.name,
        category: item.category
      };
    });
    
    // Calculate totals
    const subtotal = getTotalPrice();
    const deliveryFee = 3.99;
    const tax = subtotal * 0.07;
    const total = subtotal + deliveryFee + tax;
    
    // Add order to history
    addOrder({
      items: orderItems,
      total,
      status: 'processing',
      paymentMethod: paymentMethod === 'credit' 
        ? `Credit Card (${formData.cardNumber.slice(-4)})` 
        : 'PayPal'
    });
    
    // Here we would normally integrate with a payment processor like Stripe
    alert("This is a placeholder for payment processing. In the future, this will use Stripe.");
    
    // Simulate a successful order
    clearCart();
    router.push("/order-success");
  };
  
  // If cart is empty, show a message and a button to go back to shopping
  if (Object.keys(cartItems).length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container-custom py-12">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="text-center py-12">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-24 w-24 mx-auto text-[var(--gray)]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              <h2 className="text-2xl font-bold mt-6 mb-2">Your cart is empty</h2>
              <p className="text-center text-[var(--gray-dark)]">You haven&apos;t added any items to your cart yet.</p>
              <Link 
                href="/" 
                className="inline-block bg-[var(--primary)] text-white px-6 py-3 rounded-md font-medium hover:bg-[var(--primary-dark)] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container-custom py-12">
        <h1 className="text-3xl font-bold mb-8 font-heading">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Takes up 2/3 of the space on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Cart Header */}
              <div className="bg-[var(--gray-light)] p-4 font-medium text-[var(--text-dark)]">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">Item</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
              </div>
              
              {/* Cart Items */}
              <div className="divide-y divide-[var(--gray-light)]">
                {Object.entries(cartItems).map(([itemId, quantity]) => {
                  const itemIdNum = parseInt(itemId);
                  const item = foodItemsData.find(i => i.id === itemIdNum);
                  if (!item) return null;
                  
                  // Get the price (either discounted or original) from cartPrices
                  const itemPrice = cartPrices[itemIdNum] || item.price;
                  const isDiscounted = itemPrice < item.price;
                  
                  return (
                    <div key={itemId} className="p-4">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Item Details */}
                        <div className="col-span-6 flex items-center gap-4">
                          <div className="relative h-16 w-16 bg-[var(--gray-light)] rounded-md overflow-hidden flex-shrink-0">
                            <Image 
                              src={item.image} 
                              alt={item.name} 
                              width={64} 
                              height={64} 
                              className="object-cover" 
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-[var(--text-dark)]">{item.name}</h3>
                            <p className="text-sm text-[var(--gray-dark)]">{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
                            <button 
                              onClick={() => {
                                // Remove this item completely
                                for (let i = 0; i < quantity; i++) {
                                  removeFromCart(parseInt(itemId));
                                }
                              }}
                              className="text-sm text-red-500 hover:underline mt-1 flex items-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="col-span-2 text-center text-[var(--gray-dark)]">
                          {isDiscounted ? (
                            <div className="flex flex-col items-center">
                              <span className="line-through text-xs">${item.price.toFixed(2)}</span>
                              <span className="text-[var(--primary)]">${itemPrice.toFixed(2)}</span>
                            </div>
                          ) : (
                            <span>${itemPrice.toFixed(2)}</span>
                          )}
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="col-span-2 flex justify-center items-center">
                          <button 
                            onClick={() => removeFromCart(parseInt(itemId))}
                            className="h-8 w-8 rounded-full bg-[var(--gray-light)] text-[var(--text-dark)] flex items-center justify-center"
                            aria-label="Decrease quantity"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="mx-3 w-4 text-center">{quantity}</span>
                          <button 
                            onClick={() => addToCart(parseInt(itemId))}
                            className="h-8 w-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center"
                            aria-label="Increase quantity"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                            </svg>
                          </button>
                        </div>
                        
                        {/* Total */}
                        <div className="col-span-2 text-right font-bold">
                          ${(itemPrice * quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Cart Footer */}
              <div className="p-4 bg-[var(--gray-light)] flex justify-between items-center">
                <Link 
                  href="/" 
                  className="text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Continue Shopping
                </Link>
                <button 
                  onClick={() => clearCart()}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Order Summary - Takes up 1/3 of the space on large screens */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[var(--gray-dark)]">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[var(--gray-dark)]">
                  <span>Delivery Fee</span>
                  <span>$3.99</span>
                </div>
                <div className="flex justify-between text-[var(--gray-dark)]">
                  <span>Tax</span>
                  <span>${(getTotalPrice() * 0.07).toFixed(2)}</span>
                </div>
                <div className="border-t border-[var(--gray-light)] my-3"></div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${(getTotalPrice() + 3.99 + getTotalPrice() * 0.07).toFixed(2)}</span>
                </div>
              </div>
              
              {!isCheckingOut ? (
                <button 
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full bg-[var(--primary)] text-white py-3 rounded-md font-medium hover:bg-[var(--primary-dark)] transition-colors"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-bold">Delivery Information</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Full Name" 
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md border border-[var(--gray)] focus:outline-none focus:border-[var(--primary)]"
                    />
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Email Address" 
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md border border-[var(--gray)] focus:outline-none focus:border-[var(--primary)]"
                    />
                    <input 
                      type="text" 
                      name="address" 
                      placeholder="Delivery Address" 
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md border border-[var(--gray)] focus:outline-none focus:border-[var(--primary)]"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        name="city" 
                        placeholder="City" 
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-md border border-[var(--gray)] focus:outline-none focus:border-[var(--primary)]"
                      />
                      <input 
                        type="text" 
                        name="zipCode" 
                        placeholder="ZIP Code" 
                        required
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-md border border-[var(--gray)] focus:outline-none focus:border-[var(--primary)]"
                      />
                    </div>
                  </div>
                  
                  <h3 className="font-bold pt-2">Payment Method</h3>
                  <div className="flex gap-4 mb-4">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="credit" 
                        checked={paymentMethod === "credit"}
                        onChange={() => setPaymentMethod("credit")}
                        className="mr-2"
                      />
                      Credit Card
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="paypal" 
                        checked={paymentMethod === "paypal"}
                        onChange={() => setPaymentMethod("paypal")}
                        className="mr-2"
                      />
                      PayPal
                    </label>
                  </div>
                  
                  {paymentMethod === "credit" && (
                    <div className="space-y-4">
                      <input 
                        type="text" 
                        name="cardNumber" 
                        placeholder="Card Number" 
                        required
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-md border border-[var(--gray)] focus:outline-none focus:border-[var(--primary)]"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          name="expiryDate" 
                          placeholder="MM/YY" 
                          required
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-md border border-[var(--gray)] focus:outline-none focus:border-[var(--primary)]"
                        />
                        <input 
                          type="text" 
                          name="cvv" 
                          placeholder="CVV" 
                          required
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-md border border-[var(--gray)] focus:outline-none focus:border-[var(--primary)]"
                        />
                      </div>
                    </div>
                  )}
                  
                  <button 
                    type="submit"
                    className="w-full bg-[var(--primary)] text-white py-3 rounded-md font-medium hover:bg-[var(--primary-dark)] transition-colors mt-4"
                  >
                    Place Order (Placeholder)
                  </button>
                  
                  <p className="text-xs text-[var(--gray-dark)] text-center mt-2">
                    This is a placeholder payment form. In the future, Stripe will be integrated for secure payments.
                  </p>
                  
                  <button 
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="w-full text-[var(--gray-dark)] hover:text-[var(--text-dark)] transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 