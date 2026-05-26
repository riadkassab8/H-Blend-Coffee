export interface Product {
  id: number;
  name: string;
  category: "hot" | "iced" | "signature" | "dessert" | "beans" | "merch";
  price: number;
  description: string;
  ingredients?: string;
  badge?: string;
  featured?: boolean;
  bestSeller?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Espresso",
    category: "hot",
    price: 65,
    description: "A concentrated shot of pure, bold espresso — the foundation of every great cup. Dark, intense, and perfectly extracted.",
    ingredients: "Single-origin espresso blend, filtered water",
    featured: false,
    bestSeller: true,
  },
  {
    id: 2,
    name: "Americano",
    category: "hot",
    price: 75,
    description: "Espresso diluted with hot water to reveal its full depth — earthy, smooth, and endlessly satisfying.",
    ingredients: "Double espresso, hot filtered water",
  },
  {
    id: 3,
    name: "Cappuccino",
    category: "hot",
    price: 85,
    description: "Equal parts espresso, steamed milk, and velvety foam. A timeless balance of boldness and softness.",
    ingredients: "Double espresso, steamed whole milk, milk foam",
    bestSeller: true,
  },
  {
    id: 4,
    name: "Oat Milk Latte",
    category: "hot",
    price: 95,
    description: "Our house espresso with silky oat milk, creating a naturally sweet, plant-forward cup with beautiful latte art.",
    ingredients: "Double espresso, steamed oat milk",
    badge: "Popular",
    bestSeller: true,
  },
  {
    id: 5,
    name: "Flat White",
    category: "hot",
    price: 90,
    description: "Ristretto shots with microfoam milk in a smaller, more intense format. Precision in every sip.",
    ingredients: "Double ristretto, velvety steamed milk",
  },
  {
    id: 6,
    name: "Ethiopian Pour-Over",
    category: "hot",
    price: 110,
    description: "Single-origin Yirgacheffe beans hand-poured to order. Bright, floral, and achingly delicate — coffee as it was meant to be experienced.",
    ingredients: "Ethiopian Yirgacheffe, filtered water",
    badge: "Single Origin",
    featured: true,
  },
  {
    id: 7,
    name: "Cardamom Blend",
    category: "signature",
    price: 100,
    description: "Our signature BLEND creation — rich espresso infused with green cardamom, a nod to the region's coffee heritage.",
    ingredients: "Double espresso, steamed milk, cardamom, raw honey",
    badge: "Signature",
    featured: true,
    bestSeller: true,
  },
  {
    id: 8,
    name: "Rose Latte",
    category: "signature",
    price: 105,
    description: "Delicate rose water and vanilla meet our espresso in a drink that's as beautiful to look at as it is to taste.",
    ingredients: "Double espresso, oat milk, rose water, vanilla",
    badge: "Signature",
    featured: true,
  },
  {
    id: 9,
    name: "Cold Brew",
    category: "iced",
    price: 95,
    description: "Steeped for 18 hours in cold water, our cold brew is smooth, low-acid, and intensely concentrated.",
    ingredients: "Coarsely ground blend, cold filtered water",
    featured: true,
  },
  {
    id: 10,
    name: "Iced Latte",
    category: "iced",
    price: 95,
    description: "Espresso over ice, finished with your choice of milk. Clean, refreshing, and endlessly customizable.",
    ingredients: "Double espresso, whole milk, ice",
    bestSeller: true,
  },
  {
    id: 11,
    name: "Nitro Cold Brew",
    category: "iced",
    price: 115,
    description: "Cold brew infused with nitrogen for a cascading, creamy pour that needs no milk or sugar.",
    ingredients: "Cold brew, nitrogen",
    badge: "Premium",
  },
  {
    id: 12,
    name: "Espresso Martini",
    category: "signature",
    price: 130,
    description: "A sophisticated evening sipper — cold brew, espresso, and a hint of vanilla. Shaken until it sings.",
    ingredients: "Double espresso, cold brew, vanilla, ice",
    badge: "Evening Menu",
    featured: true,
  },
  {
    id: 13,
    name: "Cheesecake Slice",
    category: "dessert",
    price: 75,
    description: "Velvety New York-style cheesecake on a buttery biscuit base. Baked fresh daily.",
    ingredients: "Cream cheese, eggs, digestive biscuits, vanilla",
  },
  {
    id: 14,
    name: "Butter Croissant",
    category: "dessert",
    price: 65,
    description: "Flaky, buttery, laminated to perfection. Imported French butter. Best paired with a flat white.",
    ingredients: "Flour, French butter, eggs, yeast, salt",
    bestSeller: true,
  },
  {
    id: 15,
    name: "BLEND Beans 250g",
    category: "beans",
    price: 280,
    description: "Our house espresso blend, roasted in-house and packaged within 48 hours. Bring BLEND home.",
    badge: "Retail",
  },
  {
    id: 16,
    name: "BLEND Tote Bag",
    category: "merch",
    price: 195,
    description: "Heavy canvas tote with the BLEND wordmark. Minimalist. Durable. Made to carry your daily load.",
    badge: "Limited",
  },
];

export const featuredProducts = products.filter((p) => p.featured);
export const bestSellers = products.filter((p) => p.bestSeller);

export const categoryLabels: Record<Product["category"], string> = {
  hot: "Hot Coffee",
  iced: "Iced Coffee",
  signature: "Signature",
  dessert: "Desserts",
  beans: "Beans",
  merch: "Merchandise",
};
