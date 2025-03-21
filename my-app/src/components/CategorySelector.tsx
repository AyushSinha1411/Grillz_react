"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  { id: "all", name: "All" },
  { id: "burger", name: "Burgers" },
  { id: "pizza", name: "Pizza" },
  { id: "chicken", name: "Chicken" },
  { id: "fries", name: "Fries" },
  { id: "dessert", name: "Desserts" },
  { id: "drinks", name: "Drinks" }
];

interface CategorySelectorProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategorySelector = ({ activeCategory, onCategoryChange }: CategorySelectorProps) => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  
  const handleToggleCategories = () => {
    setShowAllCategories(!showAllCategories);
  };
  
  // Display all on larger screens, limit on mobile
  const visibleCategories = showAllCategories ? categories : categories.slice(0, 4);
  
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-2">
        {visibleCategories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? "bg-[var(--primary)] text-white"
                : "bg-white text-[var(--text-dark)] hover:bg-[var(--gray-light)]"
            }`}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
        
        <button
          className="px-4 py-2 rounded-full text-sm font-medium bg-white text-[var(--gray-dark)] hover:bg-[var(--gray-light)] transition-colors flex items-center gap-1 md:hidden"
          onClick={handleToggleCategories}
        >
          {showAllCategories ? "Show Less" : "More"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform ${showAllCategories ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <Link
          href="/menu"
          className="ml-auto text-[var(--primary)] hover:text-[var(--primary-dark)] flex items-center gap-1 text-sm font-medium transition-colors"
        >
          View All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}; 