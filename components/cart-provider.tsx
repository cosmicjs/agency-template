// @ts-nocheck
"use client";

import { createContext, useState } from "react";
export const CartContext = createContext([]);

export function CartProvider({ children }: { children: React.ReactNode }) {
  let defaultCart: any = [];
  if (typeof window !== "undefined") {
    defaultCart = JSON.parse(localStorage.getItem("cart") || "[]");
  }
  const [cart, setCart] = useState(defaultCart);
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <CartContext.Provider value={{ cart, setCart, cartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}
