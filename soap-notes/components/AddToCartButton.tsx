"use client";

import type { ReactNode } from "react";
import { addToCart } from "@/lib/cart-store";
import type { Sku } from "@/lib/catalog";

type AddToCartButtonProps = {
  sku: Sku;
  className?: string;
  children: ReactNode;
};

export default function AddToCartButton({ sku, className, children }: AddToCartButtonProps) {
  return (
    <button type="button" className={className} onClick={() => addToCart(sku)}>
      {children}
    </button>
  );
}
