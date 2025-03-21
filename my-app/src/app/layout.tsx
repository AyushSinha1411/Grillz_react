import type { Metadata } from "next";
import { Poppins, Oswald } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { OrderHistoryProvider } from "@/context/OrderHistoryContext";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const oswald = Oswald({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "Grillz - Delicious Fast Food Delivered",
  description: "Order your favorite burgers, pizzas, fries and more from Grillz. Fast delivery, great taste!",
  keywords: ["food delivery", "fast food", "pizza", "burger", "fries", "Grillz"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${oswald.variable} font-sans antialiased`}>
        <CartProvider>
          <OrderHistoryProvider>
            {children}
          </OrderHistoryProvider>
        </CartProvider>
      </body>
    </html>
  );
}
