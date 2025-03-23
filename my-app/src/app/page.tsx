"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategorySelector } from "@/components/CategorySelector";
import { FoodItems } from "@/components/FoodItems";
import { Footer } from "@/components/Footer";
import { foodItemsData, FoodItem } from "@/data/foodItems";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("popularity");
  const [dailySpecialCategory, setDailySpecialCategory] = useState("");
  const [dailySpecialItems, setDailySpecialItems] = useState<FoodItem[]>([]);
  const [dayOfWeek, setDayOfWeek] = useState("");

  // Handle category change from CategorySelector
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setActiveCategory("");
    setSearchQuery("");
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  // Add this effect after the handleClearFilters function
  useEffect(() => {
    const handleClearFiltersEvent = () => {
      handleClearFilters();
    };
    
    document.addEventListener("clearFilters", handleClearFiltersEvent);
    
    return () => {
      document.removeEventListener("clearFilters", handleClearFiltersEvent);
    };
  }, []);

  // Determine today's special based on day of the week
  useEffect(() => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const categories = ["dessert", "burger", "pizza", "chicken", "fries", "drinks", "pizza"];
    
    const today = new Date();
    const dayIndex = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
    
    setDayOfWeek(days[dayIndex]);
    setDailySpecialCategory(categories[dayIndex]);
    
    // Filter items from the daily category (limit to 3 for homepage)
    const categoryItems = foodItemsData
      .filter(item => item.category === categories[dayIndex])
      .slice(0, 3); // Only show 3 items on homepage
    
    setDailySpecialItems(categoryItems);
  }, []);

  // Calculate discounted price (10% off)
  const getDiscountedPrice = (originalPrice: number) => {
    return (originalPrice * 0.9).toFixed(2);
  };

  // Format category name for display
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        
        {/* Today's Special Offers Section */}
        {dailySpecialItems.length > 0 && (
          <section className="container-custom py-12 bg-gradient-to-r from-[var(--primary-light)] to-[var(--primary)] text-white">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 font-heading">Today&apos;s Special: {dayOfWeek} Discount!</h2>
              <p className="text-xl">Get 10% OFF on all {formatCategoryName(dailySpecialCategory)} items today!</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dailySpecialItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden text-[var(--text-dark)] relative hover:shadow-xl transition-shadow">
                  {/* Discount Badge */}
                  <div className="absolute top-0 right-0 bg-[var(--secondary)] text-[var(--text-dark)] px-3 py-1 rounded-bl-lg font-bold">
                    10% OFF
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <p className="text-[var(--gray-dark)] my-2 text-sm line-clamp-2">{item.description}</p>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex flex-col">
                        <span className="text-[var(--gray-dark)] line-through text-sm">${item.price.toFixed(2)}</span>
                        <span className="text-[var(--primary)] font-bold">${getDiscountedPrice(item.price)}</span>
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
                              onClick={() => addToCart(item.id, true)}
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
                            onClick={() => addToCart(item.id, true)}
                            className="bg-[var(--primary)] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[var(--primary-dark)] transition-colors"
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link 
                href="/special-offers" 
                className="inline-block bg-white text-[var(--primary)] px-6 py-3 rounded-full font-medium hover:bg-[var(--secondary)] hover:text-[var(--text-dark)] transition-colors"
              >
                View All Deals
              </Link>
            </div>
          </section>
        )}
        
        <section className="container-custom py-12">
          <h2 className="text-3xl font-bold mb-6 font-heading">Categories</h2>
          <CategorySelector onCategoryChange={handleCategoryChange} />
        </section>
        
        <section className="container-custom py-12 bg-[var(--gray-light)]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-3xl font-bold font-heading">
                {activeCategory === "" 
                  ? "Our Menu" 
                  : activeCategory === "all" 
                    ? "All Items" 
                    : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`
                }
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <input 
                    type="text" 
                    placeholder="Search for items..." 
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-[var(--gray)] focus:outline-none focus:border-[var(--primary)]"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 absolute left-3 top-2.5 text-[var(--gray-dark)]" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {searchQuery && (
                    <button 
                      className="absolute right-3 top-2.5 text-[var(--gray-dark)]" 
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                {(activeCategory !== "" || searchQuery !== "") && (
                  <button 
                    className="bg-white px-4 py-2 rounded-md border border-[var(--gray)] text-[var(--gray-dark)] hover:bg-[var(--gray-light)] transition-colors flex items-center gap-2"
                    onClick={handleClearFilters}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Clear Filters
                  </button>
                )}
                <select 
                  className="p-2 rounded-md border border-[var(--gray)] focus:outline-none focus:border-[var(--primary)]"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="popularity">Sort by: Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
            
            <FoodItems activeCategory={activeCategory} searchQuery={searchQuery} sortOption={sortOption} />
          </div>
        </section>
        
        <section className="container-custom py-12">
          <h2 className="text-3xl font-bold mb-8 text-center font-heading">Why Choose Grillz?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[var(--primary-light)] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-[var(--gray-dark)]">Get your favorite food delivered in 30 minutes or less.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[var(--primary-light)] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fresh Ingredients</h3>
              <p className="text-[var(--gray-dark)]">We use only the freshest ingredients for all our menu items.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[var(--primary-light)] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Great Value</h3>
              <p className="text-[var(--gray-dark)]">Enjoy delicious meals at reasonable prices with frequent promotions.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
