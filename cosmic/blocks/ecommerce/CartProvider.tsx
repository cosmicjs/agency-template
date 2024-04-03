"use client";

import { createContext, useState, ReactNode } from "react";

// TODO: Add Cart Type
type CartItem = any;

interface CartContextType {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  cartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
  cartOpen: false,
  setCartOpen: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  let defaultCart: CartItem[] = [];
  if (typeof window !== "undefined") {
    defaultCart = JSON.parse(localStorage.getItem("cart") || "[]");
  }
  const [cart, setCart] = useState<CartItem[]>(defaultCart);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  return (
    <CartContext.Provider value={{ cart, setCart, cartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}
