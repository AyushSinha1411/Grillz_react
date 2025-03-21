"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { foodItemsData } from "@/data/foodItems";

interface FoodItemsProps {
  activeCategory?: string;
  searchQuery?: string;
  sortOption?: string;
}

type SortOption = "popularity" | "price-low" | "price-high" | "rating";

export const FoodItems = ({ activeCategory = "", searchQuery = "", sortOption = "popularity" }: FoodItemsProps) => {
  const { cartItems, cartPrices, addToCart, removeFromCart, getTotalItems, getTotalPrice } = useCart();
  const [filteredItems, setFilteredItems] = useState<typeof foodItemsData>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [dailySpecialCategory, setDailySpecialCategory] = useState("");

  // Determine today's special category
  useEffect(() => {
    const categories = ["dessert", "burger", "pizza", "chicken", "fries", "drinks", "pizza"];
    const today = new Date();
    const dayIndex = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
    setDailySpecialCategory(categories[dayIndex]);
  }, []);

  // Update filtered items when props or sort option changes
  useEffect(() => {
    // Check if we're filtering
    const filtering = activeCategory !== "" || searchQuery !== "";
    setIsFiltering(filtering);
    
    // Filter items based on active category and search query
    const filterItems = () => {
      // If not filtering, show only popular items with a limit of 6
      if (!filtering) {
        // Select top popular items from different categories (1 per category)
        const popularByCategory = new Map();
        
        foodItemsData.forEach(item => {
          if (item.popular && !popularByCategory.has(item.category)) {
            popularByCategory.set(item.category, item);
          }
        });
        
        // Get the featured items (up to 6)
        let featured = Array.from(popularByCategory.values());
        
        // If we don't have enough categories, add more popular items
        if (featured.length < 6) {
          const remainingPopular = foodItemsData
            .filter(item => item.popular && !featured.includes(item))
            .slice(0, 6 - featured.length);
          
          featured = [...featured, ...remainingPopular];
        }
        
        return featured.slice(0, 6);
      }
      
      // Otherwise, apply filters
      return foodItemsData.filter(item => {
        const matchesCategory = activeCategory === "all" || activeCategory === "" || item.category === activeCategory;
        const matchesSearch = searchQuery === "" || 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });
    };
    
    // Apply the initial filtering
    let filtered = filterItems();
    
    // Apply sorting
    switch (sortOption) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
      default:
        // Sort by popular flag first, then by rating
        filtered.sort((a, b) => {
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          return b.rating - a.rating;
        });
        break;
    }
    
    setFilteredItems(filtered);
  }, [activeCategory, searchQuery, sortOption]);

  // Notify header about cart updates
  useEffect(() => {
    // Dispatch a custom event to notify header about cart updates
    const event = new CustomEvent("cartUpdated");
    window.dispatchEvent(event);
  }, [cartItems]);

  // Calculate discounted price (10% off)
  const getDiscountedPrice = (originalPrice: number) => {
    return (originalPrice * 0.9).toFixed(2);
  };

  // Get display price and check if it has a discount
  const getItemPrice = (item: typeof foodItemsData[0]) => {
    const isDiscounted = item.category === dailySpecialCategory;
    const price = isDiscounted 
      ? { 
          original: item.price.toFixed(2), 
          discounted: getDiscountedPrice(item.price)
        }
      : { 
          original: item.price.toFixed(2),
          discounted: null
        };
    return { price, isDiscounted };
  };

  // Add to cart with correct price
  const handleAddToCart = (item: typeof foodItemsData[0]) => {
    const isDiscounted = item.category === dailySpecialCategory;
    addToCart(item.id, isDiscounted);
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {!isFiltering ? (
          <>
            <h3 className="text-xl font-bold">Featured Items</h3>
            <Link 
              href="/menu" 
              className="text-[var(--primary)] font-medium hover:text-[var(--primary-dark)] transition-colors flex items-center gap-1"
            >
              View All Items
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </>
        ) : (
          <div className="text-sm text-[var(--gray-dark)]">
            {filteredItems.length} items found
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const { price, isDiscounted } = getItemPrice(item);
            return (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48 bg-[var(--gray-light)]">
                  <div className="absolute inset-0 flex items-center justify-center text-[var(--gray)]">
                    <Image src={item.image} alt={item.name} width={200} height={200} className="object-cover" />
                  </div>
                  {item.popular && (
                    <div className="absolute top-2 right-2 bg-[var(--primary)] text-white px-2 py-1 rounded-md text-xs font-medium">
                      Popular
                    </div>
                  )}
                  {isDiscounted && (
                    <div className="absolute top-2 left-2 bg-[var(--secondary)] text-[var(--text-dark)] px-2 py-1 rounded-md text-xs font-medium">
                      10% OFF
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 px-2 py-1 rounded text-xs font-medium">
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <div className="flex items-center text-amber-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                      <span className="ml-1 text-sm text-[var(--text-dark)]">{item.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--gray-dark)] mb-3">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      {isDiscounted ? (
                        <>
                          <span className="text-[var(--gray-dark)] line-through text-sm">${price.original}</span>
                          <span className="text-[var(--primary)] font-bold">${price.discounted}</span>
                        </>
                      ) : (
                        <span className="text-[var(--primary)] font-bold">${price.original}</span>
                      )}
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
                            onClick={() => handleAddToCart(item)}
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
                          onClick={() => handleAddToCart(item)}
                          className="text-sm bg-[var(--primary)] text-white px-3 py-1 rounded-md flex items-center"
                          aria-label="Add to cart"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-lg text-[var(--gray-dark)]">No items found for "{searchQuery}" in this category.</p>
            <Link 
              href="/menu" 
              className="mt-4 inline-block px-4 py-2 bg-[var(--primary)] text-white rounded-md"
            >
              View All Items
            </Link>
          </div>
        )}
      </div>
      
      {Object.keys(cartItems).length > 0 && (
        <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Your Order</h3>
          <ul className="divide-y divide-[var(--gray-light)]">
            {Object.entries(cartItems).map(([itemId, quantity]) => {
              const itemIdNum = parseInt(itemId);
              const item = foodItemsData.find(i => i.id === itemIdNum);
              if (!item) return null;
              
              const itemPrice = cartPrices[itemIdNum] || item.price;
              
              return (
                <li key={itemId} className="py-2 flex justify-between">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-[var(--gray-dark)] ml-2">x{quantity}</span>
                  </div>
                  <span>${(itemPrice * quantity).toFixed(2)}</span>
                </li>
              );
            })}
            <li className="py-2 flex justify-between font-bold">
              <span>Total</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </li>
          </ul>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link 
              href="/cart" 
              className="text-center bg-white border border-[var(--primary)] text-[var(--primary)] py-2 rounded-md font-medium hover:bg-[var(--primary-light)] transition-colors"
            >
              View Cart
            </Link>
            <Link 
              href="/cart" 
              className="text-center bg-[var(--primary)] text-white py-2 rounded-md font-medium hover:bg-[var(--primary-dark)] transition-colors"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}; 