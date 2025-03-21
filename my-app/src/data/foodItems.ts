// Define the FoodItem type for better type checking
export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  popular: boolean;
}

// Export the food items data
export const foodItemsData: FoodItem[] = [
  // PIZZA CATEGORY - 4 items
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and fresh basil",
    price: 12.99,
    category: "pizza",
    image: "/images/food/pizza-margherita.jpg",
    rating: 4.5,
    popular: true
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    description: "Traditional pizza topped with pepperoni slices and cheese",
    price: 14.99,
    category: "pizza",
    image: "/images/food/pizza-pepperoni.jpg",
    rating: 4.7,
    popular: true
  },
  {
    id: 3,
    name: "Vegetarian Pizza",
    description: "Fresh vegetables including bell peppers, mushrooms, and onions",
    price: 13.99,
    category: "pizza",
    image: "/images/food/pizza-vegetarian.jpg",
    rating: 4.3,
    popular: false
  },
  {
    id: 4,
    name: "BBQ Chicken Pizza",
    description: "Grilled chicken with BBQ sauce, red onions, and cilantro",
    price: 15.99,
    category: "pizza",
    image: "/images/food/pizza-bbq-chicken.jpg",
    rating: 4.6,
    popular: true
  },
  
  // BURGER CATEGORY - 4 items
  {
    id: 5,
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with cheese, lettuce, tomato, and special sauce",
    price: 9.99,
    category: "burger",
    image: "/images/food/burger-classic.jpg",
    rating: 4.4,
    popular: true
  },
  {
    id: 6,
    name: "Bacon Deluxe Burger",
    description: "Beef patty topped with crispy bacon, cheddar cheese, and BBQ sauce",
    price: 12.99,
    category: "burger",
    image: "/images/food/burger-bacon-deluxe.jpg",
    rating: 4.8,
    popular: true
  },
  {
    id: 7,
    name: "Veggie Burger",
    description: "Plant-based patty with fresh vegetables and vegan mayo",
    price: 10.99,
    category: "burger",
    image: "/images/food/burger-veggie.jpg",
    rating: 4.2,
    popular: false
  },
  {
    id: 8,
    name: "Spicy Jalapeño Burger",
    description: "Burger with pepper jack cheese, jalapeños, and spicy mayo",
    price: 11.99,
    category: "burger",
    image: "/images/food/burger-jalapeno.jpg",
    rating: 4.5,
    popular: true
  },
  
  // FRIES CATEGORY - 4 items
  {
    id: 9,
    name: "Classic French Fries",
    description: "Crispy golden fries with sea salt",
    price: 4.99,
    category: "fries",
    image: "/images/food/fries-classic.jpg",
    rating: 4.3,
    popular: true
  },
  {
    id: 10,
    name: "Cheese Fries",
    description: "French fries topped with melted cheese sauce",
    price: 6.99,
    category: "fries",
    image: "/images/food/fries-cheese.jpg",
    rating: 4.6,
    popular: true
  },
  {
    id: 11,
    name: "Garlic Parmesan Fries",
    description: "Fries tossed in garlic butter and parmesan cheese",
    price: 7.49,
    category: "fries",
    image: "/images/food/fries-garlic-parmesan.jpg",
    rating: 4.7,
    popular: true
  },
  {
    id: 12,
    name: "Sweet Potato Fries",
    description: "Crispy sweet potato fries with a hint of cinnamon",
    price: 5.99,
    category: "fries",
    image: "/images/food/fries-sweet-potato.jpg",
    rating: 4.4,
    popular: false
  },
  
  // DRINKS CATEGORY - 4 items
  {
    id: 13,
    name: "Classic Cola",
    description: "Refreshing cola served with ice",
    price: 2.99,
    category: "drinks",
    image: "/images/food/drink-cola.jpg",
    rating: 4.2,
    popular: true
  },
  {
    id: 14,
    name: "Fresh Lemonade",
    description: "Homemade lemonade with fresh lemons and mint",
    price: 3.99,
    category: "drinks",
    image: "/images/food/drink-lemonade.jpg",
    rating: 4.5,
    popular: true
  },
  {
    id: 15,
    name: "Strawberry Milkshake",
    description: "Creamy milkshake with fresh strawberries and whipped cream",
    price: 5.99,
    category: "drinks",
    image: "/images/food/drink-milkshake.jpg",
    rating: 4.7,
    popular: true
  },
  {
    id: 16,
    name: "Iced Tea",
    description: "Sweet tea brewed fresh daily with lemon",
    price: 2.49,
    category: "drinks",
    image: "/images/food/drink-iced-tea.jpg",
    rating: 4.1,
    popular: false
  },
  
  // CHICKEN CATEGORY - 4 items
  {
    id: 17,
    name: "Crispy Chicken Wings",
    description: "Crispy wings with your choice of sauce: BBQ, Buffalo, or Honey Garlic",
    price: 10.99,
    category: "chicken",
    image: "/images/food/chicken-wings.jpg",
    rating: 4.6,
    popular: true
  },
  {
    id: 18,
    name: "Chicken Tenders",
    description: "Tender chicken strips served with dipping sauce",
    price: 8.99,
    category: "chicken",
    image: "/images/food/chicken-tenders.jpg",
    rating: 4.4,
    popular: true
  },
  {
    id: 19,
    name: "Grilled Chicken Sandwich",
    description: "Grilled chicken breast with lettuce, tomato, and mayo on a brioche bun",
    price: 9.99,
    category: "chicken",
    image: "/images/food/chicken-sandwich.jpg",
    rating: 4.3,
    popular: false
  },
  {
    id: 20,
    name: "Spicy Chicken Wrap",
    description: "Spicy grilled chicken with veggies in a tortilla wrap",
    price: 8.49,
    category: "chicken",
    image: "/images/food/chicken-wrap.jpg",
    rating: 4.5,
    popular: true
  },
  
  // DESSERT CATEGORY - 4 items
  {
    id: 21,
    name: "Chocolate Brownie",
    description: "Warm chocolate brownie with vanilla ice cream",
    price: 6.99,
    category: "dessert",
    image: "/images/food/dessert-brownie.jpg",
    rating: 4.8,
    popular: true
  },
  {
    id: 22,
    name: "New York Cheesecake",
    description: "Creamy cheesecake with berry compote",
    price: 7.49,
    category: "dessert",
    image: "/images/food/dessert-cheesecake.jpg",
    rating: 4.7,
    popular: true
  },
  {
    id: 23,
    name: "Apple Pie",
    description: "Warm apple pie with a scoop of vanilla ice cream",
    price: 5.99,
    category: "dessert",
    image: "/images/food/dessert-apple-pie.jpg",
    rating: 4.5,
    popular: false
  },
  {
    id: 24,
    name: "Chocolate Chip Cookies",
    description: "Fresh baked cookies with chocolate chips",
    price: 4.49,
    category: "dessert",
    image: "/images/food/dessert-cookies.jpg",
    rating: 4.6,
    popular: true
  },
]; 