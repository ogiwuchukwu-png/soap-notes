"use client";

import { useSyncExternalStore } from "react";
import {
  subscribeCart,
  getCartItems,
  getCartItemsServerSnapshot,
  cartCount,
  setCartOpen,
} from "@/lib/cart-store";
import styles from "./CartToggle.module.css";

export default function CartToggle() {
  const items = useSyncExternalStore(subscribeCart, getCartItems, getCartItemsServerSnapshot);
  const count = cartCount(items);

  return (
    <button type="button" className={styles.toggle} onClick={() => setCartOpen(true)}>
      Cart{count > 0 ? <> · <span className={styles.count}>{count}</span></> : null}
    </button>
  );
}
