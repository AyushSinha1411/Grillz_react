import Link from "next/link";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative bg-[var(--primary)] text-white pt-12 pb-20 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[var(--primary-light)] opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-[var(--primary-light)] opacity-20"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-[var(--secondary)] opacity-20"></div>
      
      <div className="container-custom relative">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-6">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-heading">
              Delicious Food <br />
              <span className="text-[var(--secondary)]">Delivered</span> Fast
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-lg">
              Order your favorite burgers, pizzas, and more from Grillz.
              Quick delivery and mouthwatering taste guaranteed!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                href="/special-offers" 
                className="btn-secondary"
              >
                View Special Offers
              </Link>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="relative w-64 h-64 md:w-[400px] md:h-[400px] mx-auto">
              {/* Placeholder for food image - in a real site, you'd use an actual image */}
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-4 rounded-full bg-[var(--gray-light)] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-20 mx-auto bg-[var(--primary-light)] rounded-t-full"></div>
                    <div className="w-40 h-8 mx-auto bg-[var(--secondary)] rounded-b-lg"></div>
                    <p className="mt-2 text-[var(--primary)] font-bold">Delicious Burger</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative food icons */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="w-10 h-10 bg-[var(--primary-light)] rounded-full"></div>
              </div>
              <div className="absolute bottom-10 -left-8 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="w-12 h-12 bg-[var(--secondary)] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Food delivery info */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white rounded-lg shadow-lg p-6 text-[var(--text-dark)]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[var(--gray-light)] rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold">Fast Delivery</h3>
              <p className="text-sm text-[var(--gray-dark)]">30 min or free</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[var(--gray-light)] rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold">Easy Ordering</h3>
              <p className="text-sm text-[var(--gray-dark)]">Online 24/7</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[var(--gray-light)] rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold">Best Prices</h3>
              <p className="text-sm text-[var(--gray-dark)]">Special offers</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[var(--gray-light)] rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold">Quality Food</h3>
              <p className="text-sm text-[var(--gray-dark)]">Always fresh</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 