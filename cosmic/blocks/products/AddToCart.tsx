// @ts-nocheck
"use client";
import React, { useContext } from "react";
import { Button } from "@/cosmic/elements/Button";
import { useState } from "react";
import { Loader2, XIcon } from "lucide-react";
import { CartContext } from "@/components/cart-provider";

export type ProductType = {
  title: string;
  id: string;
  metadata: {
    stripe_product_id: string;
    image: {
      imgix_url: string;
    };
    price: number;
  };
};

export function AddToCart({
  product,
  className,
}: {
  product: ProductType;
  className?: string;
}) {
  const { setCart, setCartOpen } = useContext(CartContext);
  let cart: ProductType[] = [];
  if (typeof window !== "undefined") {
    cart = JSON.parse(localStorage.getItem("cart") || "[]");
  }
  function addProduct(cartItem: ProductType) {
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    setTimeout(() => setCartOpen(true), 500);
  }

  function removeProduct(productId: string) {
    if (!cart) return;
    let newCart = cart.filter(
      (product: ProductType) => product.id !== productId
    );
    localStorage.setItem("cart", JSON.stringify(newCart));
    return newCart;
  }

  function productInCart(product: ProductType) {
    let productInCart = cart.filter(
      (productLoop: ProductType) => productLoop.id === product.id
    )[0];
    return productInCart;
  }
  const [submitting, setSubmitting] = useState(false);
  async function handleSubmit() {
    setSubmitting(true);
    if (productInCart(product)) {
      removeProduct(product.id);
    } else {
      addProduct(product);
    }
    await setTimeout(() => setSubmitting(false), 500);
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }
  const inCart = productInCart(product);
  return (
    <div className={className}>
      {inCart ? (
        <Button
          variant="outline"
          disabled={submitting}
          type="submit"
          onClick={handleSubmit}
        >
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin mr-2" /> Updating
            </>
          ) : (
            <>
              <XIcon className="w-4 h-4 mr-2" /> Remove from cart
            </>
          )}
        </Button>
      ) : (
        <Button disabled={submitting} type="submit" onClick={handleSubmit}>
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin mr-2" /> Updating
            </>
          ) : (
            <>{inCart ? "Remove from cart" : "Add to cart"}</>
          )}
        </Button>
      )}
    </div>
  );
}
