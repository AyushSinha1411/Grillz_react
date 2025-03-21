"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { foodItemsData } from "@/data/foodItems";
import { useCart } from "@/context/CartContext";

export default function SpecialOffers() {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [dailyCategory, setDailyCategory] = useState("");
  const [discountItems, setDiscountItems] = useState<typeof foodItemsData>([]);
  
  // Determine the day of the week and set the featured category
  useEffect(() => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const categories = ["dessert", "burger", "pizza", "chicken", "fries", "drinks", "pizza"];
    
    const today = new Date();
    const dayIndex = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
    
    setDayOfWeek(days[dayIndex]);
    setDailyCategory(categories[dayIndex]);
    
    // Filter items from the daily category
    const categoryItems = foodItemsData.filter(item => item.category === categories[dayIndex]);
    setDiscountItems(categoryItems);
  }, []);
  
  // Format category name for display
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  // Calculate discounted price (10% off)
  const getDiscountedPrice = (originalPrice: number) => {
    return (originalPrice * 0.9).toFixed(2);
  };

  // Add to cart with discounted price
  const handleAddToCart = (itemId: number) => {
    addToCart(itemId, true); // Pass true to use the discounted price
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container-custom py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 font-heading">Special Offers</h1>
          
          {/* Daily Special Banner */}
          <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-lg p-6 md:p-8 mb-12 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Today's Special: {dayOfWeek} Discount!</h2>
                <p className="text-lg mb-4">Get 10% OFF on all {formatCategoryName(dailyCategory)} items today!</p>
                <a href="#daily-deals" className="inline-block bg-white text-[var(--primary)] px-6 py-3 rounded-full font-medium hover:bg-[var(--secondary)] hover:text-[var(--text-dark)] transition-colors">
                  View Deals
                </a>
              </div>
              <div className="mt-6 md:mt-0">
                <div className="bg-white bg-opacity-20 rounded-full p-4 md:p-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 md:h-24 md:w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Daily Deals Section */}
          <section id="daily-deals" className="mb-16">
            <h2 className="text-2xl font-bold mb-6 font-heading">
              {dayOfWeek}'s {formatCategoryName(dailyCategory)} Deals (10% OFF)
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {discountItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-[var(--primary)] relative">
                  {/* Discount Badge */}
                  <div className="absolute top-0 right-0 bg-[var(--primary)] text-white px-3 py-1 rounded-bl-lg font-bold">
                    10% OFF
                  </div>
                  
                  <div className="relative h-48 bg-[var(--gray-light)]">
                    <div className="absolute inset-0 flex items-center justify-center text-[var(--gray)]">
                      <Image src={item.image} alt={item.name} width={200} height={200} className="object-cover" />
                    </div>
                    <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 px-2 py-1 rounded text-xs font-medium">
                      {formatCategoryName(item.category)}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <div className="flex flex-col items-end">
                        <span className="text-[var(--gray-dark)] line-through text-sm">${item.price.toFixed(2)}</span>
                        <span className="text-[var(--primary)] font-bold">${getDiscountedPrice(item.price)}</span>
                      </div>
                    </div>
                    
                    <p className="text-[var(--gray-dark)] mb-4 text-sm">{item.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-4 w-4 ${i < Math.floor(item.rating) ? "text-yellow-400" : "text-[var(--gray)]"}`} 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-xs text-[var(--gray-dark)] ml-1">{item.rating.toFixed(1)}</span>
                      </div>
                      
                      <div className="flex items-center">
                        {cartItems[item.id] ? (
                          <>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="h-8 w-8 rounded-full bg-[var(--gray-light)] text-[var(--text-dark)] flex items-center justify-center"
                              aria-label="Decrease quantity"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="mx-2 w-4 text-center">{cartItems[item.id]}</span>
                            <button 
                              onClick={() => handleAddToCart(item.id)}
                              className="h-8 w-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center"
                              aria-label="Increase quantity"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <button 
                            onClick={() => handleAddToCart(item.id)}
                            className="flex items-center gap-1 bg-[var(--primary)] text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-[var(--primary-dark)] transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Information section about how discounts work */}
          <section className="mb-16 bg-[var(--gray-light)] p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 font-heading">How Our Daily Discounts Work</h2>
            <p className="mb-4">Every day of the week, we offer special discounts on different food categories:</p>
            
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><span className="font-medium">Sunday:</span> 10% off all Dessert items</li>
              <li><span className="font-medium">Monday:</span> 10% off all Burger items</li>
              <li><span className="font-medium">Tuesday:</span> 10% off all Pizza items</li>
              <li><span className="font-medium">Wednesday:</span> 10% off all Chicken items</li>
              <li><span className="font-medium">Thursday:</span> 10% off all Fries items</li>
              <li><span className="font-medium">Friday:</span> 10% off all Drinks items</li>
              <li><span className="font-medium">Saturday:</span> 10% off all Pizza items</li>
            </ul>
            
            <p>No coupon codes needed - discounts are automatically applied to your cart!</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
} 