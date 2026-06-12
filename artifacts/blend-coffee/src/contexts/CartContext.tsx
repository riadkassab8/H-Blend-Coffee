import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";
import type { RoastLevel } from "@/data/roastProfiles";
import { getTranslation, type Language } from "@/contexts/LanguageContext";

function cartT(key: string) {
  const lang = (localStorage.getItem("aroma-language") || "en") as Language;
  return getTranslation(lang, key);
}

interface CartItem {
  productId: number;
  quantity: number;
  roast?: RoastLevel;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: number, quantity?: number, roast?: RoastLevel) => void;
  removeFromCart: (productId: number, roast?: RoastLevel) => void;
  updateQuantity: (productId: number, quantity: number, roast?: RoastLevel) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function matchesCartItem(item: CartItem, productId: number, roast?: RoastLevel) {
  return item.productId === productId && item.roast === roast;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (productId: number, quantity: number = 1, roast?: RoastLevel) => {
    setItems((prev) => {
      const existing = prev.find((item) => matchesCartItem(item, productId, roast));
      if (existing) {
        toast({
          title: cartT("cart.toast.updated"),
          description: cartT("cart.toast.updatedDesc"),
          duration: 3000,
        });
        return prev.map((item) =>
          matchesCartItem(item, productId, roast)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      toast({
        title: cartT("cart.toast.added"),
        description: cartT("cart.toast.addedDesc"),
        duration: 3000,
      });
      return [...prev, { productId, quantity, roast }];
    });
  };

  const removeFromCart = (productId: number, roast?: RoastLevel) => {
    setItems((prev) => prev.filter((item) => !matchesCartItem(item, productId, roast)));
    toast({
      title: cartT("cart.toast.removed"),
      description: cartT("cart.toast.removedDesc"),
      duration: 3000,
    });
  };

  const updateQuantity = (productId: number, quantity: number, roast?: RoastLevel) => {
    if (quantity <= 0) {
      removeFromCart(productId, roast);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        matchesCartItem(item, productId, roast) ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
