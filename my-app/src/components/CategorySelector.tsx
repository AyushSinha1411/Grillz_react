"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const categories = [
  {
    id: "pizza",
    name: "Pizza",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.91 11.672a4.328 4.328 0 00-8.064 0M12 7v.01M10 10.5v.01M14 10.5v.01M16 14v.01M8 14v.01M11 16.5v.01M13 16.5v.01" />
      </svg>
    )
  },
  {
    id: "burger",
    name: "Burger",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4M4 9h16M4 15h16M7 18h10a1 1 0 001-1v-2M7 18a1 1 0 01-1-1v-2m1 3v3m10-3v3m-3-6v.01M7 12v.01" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 6H9a3 3 0 00-3 3v1h12V9a3 3 0 00-3-3z" />
      </svg>
    )
  },
  {
    id: "fries",
    name: "Fries",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 18V6c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v12M3 18h18M9 10v4m2-4v4m2-4v4" />
      </svg>
    )
  },
  {
    id: "drinks",
    name: "Drinks",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 5h-4.17L9.4 3H6l6.2 10.8c.5.8.5 1.8 0 2.6-.5.9-1.6 1.4-2.6 1.1l-.5.9h8.6l-.5-.9c-1-.2-2.1-.7-2.6-1.6-.5-.8-.5-1.8 0-2.6L20 3h-2v2z" />
      </svg>
    )
  },
  {
    id: "chicken",
    name: "Chicken",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm-9 6v-2a3 3 0 013-3h6a3 3 0 013 3v2" />
      </svg>
    )
  },
  {
    id: "dessert",
    name: "Dessert",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h6a2 2 0 012 2v12M8 4a2 2 0 00-2 2v12m12 0a2 2 0 01-2 2H6a2 2 0 01-2-2m5 5v-4h4v4" />
      </svg>
    )
  }
];

interface CategorySelectorProps {
  onCategoryChange?: (category: string) => void;
}

export const CategorySelector = ({ onCategoryChange }: CategorySelectorProps) => {
  const [activeCategory, setActiveCategory] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);
  
  // Initially only show 4 categories
  const visibleCategories = showAllCategories ? categories : categories.slice(0, 4);
  
  const handleCategoryClick = (categoryId: string) => {
    // Toggle off the category if it's already active
    if (activeCategory === categoryId) {
      setActiveCategory("");
      if (onCategoryChange) {
        onCategoryChange("all");
      }
    } else {
      setActiveCategory(categoryId);
      if (onCategoryChange) {
        onCategoryChange(categoryId);
      }
    }
  };
  
  const handleViewAllCategories = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowAllCategories(true);
  };
  
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-6 min-w-max">
        {visibleCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`flex flex-col items-center p-4 rounded-lg transition-all duration-200 min-w-[100px] ${
              activeCategory === category.id
                ? "bg-[var(--primary)] text-white shadow-md"
                : "bg-white hover:bg-[var(--gray-light)] text-[var(--text-dark)]"
            }`}
            aria-label={`Select ${category.name} category`}
          >
            <div className={`mb-2 ${
              activeCategory === category.id
                ? "text-white"
                : "text-[var(--primary)]"
            }`}>
              {category.icon}
            </div>
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-6 flex justify-center md:justify-end">
        {!showAllCategories ? (
          <button 
            onClick={handleViewAllCategories}
            className="text-[var(--primary)] font-medium hover:text-[var(--primary-dark)] transition-colors flex items-center gap-1"
          >
            View All Categories
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </button>
        ) : (
          <button 
            onClick={() => setShowAllCategories(false)}
            className="text-[var(--primary)] font-medium hover:text-[var(--primary-dark)] transition-colors flex items-center gap-1"
          >
            Show Less
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 15l7-7 7 7" 
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}; 