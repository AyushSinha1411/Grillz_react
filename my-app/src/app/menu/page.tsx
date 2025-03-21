"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategorySelector } from "@/components/CategorySelector";
import { FoodItems } from "@/components/FoodItems";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("popularity");

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

  // Add this effect for handling events
  useEffect(() => {
    const handleClearFiltersEvent = () => {
      handleClearFilters();
    };
    
    document.addEventListener("clearFilters", handleClearFiltersEvent);
    
    return () => {
      document.removeEventListener("clearFilters", handleClearFiltersEvent);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Menu Hero Banner */}
        <section className="bg-[var(--primary)] py-10 text-white">
          <div className="container-custom">
            <h1 className="text-4xl font-bold mb-4 font-heading">Our Menu</h1>
            <p className="text-lg max-w-2xl">
              Discover our delicious selection of food items. From mouthwatering burgers to crispy fries,
              we have something for everyone.
            </p>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="container-custom py-12">
          <h2 className="text-3xl font-bold mb-6 font-heading">Categories</h2>
          <CategorySelector onCategoryChange={handleCategoryChange} />
        </section>
        
        {/* Food Items Section */}
        <section className="container-custom py-12 bg-[var(--gray-light)]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-3xl font-bold font-heading">
                {activeCategory === "" 
                  ? "All Items" 
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
            
            <FoodItems 
              activeCategory={activeCategory === "" ? "all" : activeCategory} 
              searchQuery={searchQuery} 
              sortOption={sortOption} 
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 