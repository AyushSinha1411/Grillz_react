"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();
  
  // Update cart count whenever it changes
  useEffect(() => {
    setCartCount(getTotalItems());
    
    // We can also add a listener for cart updates if needed
    const updateCartCount = () => {
      setCartCount(getTotalItems());
    };
    
    window.addEventListener("cartUpdated", updateCartCount);
    
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, [getTotalItems]);
  
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Close mobile menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest(".mobile-menu-container") && !target.closest(".mobile-menu-button")) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener("click", handleClickOutside);
    
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Handle scroll to about or contact sections
  const handleScrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
    // If we're on the home page, scroll to the section
    if (pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If we're not on the home page, navigate to home page with hash
      window.location.href = `/#${sectionId}`;
    }
  };
  
  return (
    <header className="bg-[var(--primary)] text-white shadow-md">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-[var(--primary)] font-bold text-xl">G</span>
            </div>
            <span className="text-2xl font-bold font-heading">Grillz</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="font-medium hover:text-[var(--secondary)] transition-colors">
              Home
            </Link>
            <Link href="/menu" className="font-medium hover:text-[var(--secondary)] transition-colors">
              Menu
            </Link>
            <Link href="/special-offers" className="font-medium hover:text-[var(--secondary)] transition-colors">
              Special Offers
            </Link>
            <button 
              onClick={() => handleScrollToSection("about-us")}
              className="font-medium hover:text-[var(--secondary)] transition-colors bg-transparent border-none text-white cursor-pointer"
            >
              About Us
            </button>
            <button 
              onClick={() => handleScrollToSection("contact-us")}
              className="font-medium hover:text-[var(--secondary)] transition-colors bg-transparent border-none text-white cursor-pointer"
            >
              Contact
            </button>
          </nav>
          
          {/* User Actions */}
          <div className="flex items-center gap-4">
            {/* Order History */}
            <Link 
              href="/order-history" 
              className="relative p-2 hover:bg-[var(--primary-dark)] rounded-full transition-colors"
              aria-label="Order History"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                />
              </svg>
            </Link>
            
            {/* Cart */}
            <Link 
              href="/cart" 
              className="relative p-2 hover:bg-[var(--primary-dark)] rounded-full transition-colors"
              aria-label="Shopping Cart"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--secondary)] text-[var(--text-dark)] text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Login/Profile */}
            <button 
              className="hidden sm:flex items-center gap-2 bg-white text-[var(--primary)] py-2 px-4 rounded-md font-medium hover:bg-opacity-90 transition-colors"
              aria-label="Login or view profile"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
              Login
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-[var(--primary-dark)] rounded-full transition-colors mobile-menu-button"
              onClick={handleToggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 pb-4 md:hidden mobile-menu-container">
            <ul className="flex flex-col space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="block py-2 px-4 hover:bg-[var(--primary-dark)] rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/menu" 
                  className="block py-2 px-4 hover:bg-[var(--primary-dark)] rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link 
                  href="/special-offers" 
                  className="block py-2 px-4 hover:bg-[var(--primary-dark)] rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Special Offers
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollToSection("about-us")}
                  className="block py-2 px-4 hover:bg-[var(--primary-dark)] rounded-md transition-colors w-full text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollToSection("contact-us")}
                  className="block py-2 px-4 hover:bg-[var(--primary-dark)] rounded-md transition-colors w-full text-left"
                >
                  Contact
                </button>
              </li>
              <li>
                <Link 
                  href="/order-history" 
                  className="block py-2 px-4 hover:bg-[var(--primary-dark)] rounded-md transition-colors flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                    />
                  </svg>
                  Order History
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}; 