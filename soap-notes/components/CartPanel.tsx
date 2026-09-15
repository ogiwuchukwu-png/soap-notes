"use client";

import { useEffect, useState, useSyncExternalStore, type FormEvent } from "react";
import {
  subscribeCart,
  getCartItems,
  getCartItemsServerSnapshot,
  getCartOpen,
  getCartOpenServerSnapshot,
  setCartOpen,
  removeFromCart,
  clearCart,
  cartTotalCents,
} from "@/lib/cart-store";
import { CATALOG, formatCents } from "@/lib/catalog";
import primitives from "./primitives.module.css";
import styles from "./CartPanel.module.css";

type Status = "idle" | "submitting" | "error" | "success";

export default function CartPanel() {
  const items = useSyncExternalStore(subscribeCart, getCartItems, getCartItemsServerSnapshot);
  const open = useSyncExternalStore(subscribeCart, getCartOpen, getCartOpenServerSnapshot);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  function closePanel() {
    setCartOpen(false);
    // Reset so a future reopen (a different order) doesn't show a stale
    // success/error message — this component stays mounted the whole time
    // and only toggles its rendered output, so state wouldn't clear itself.
    setStatus("idle");
    setError("");
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!open) return null;

  const total = cartTotalCents(items);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, items }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      clearCart();
      setEmail("");
      setStatus("success");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) closePanel();
      }}
    >
      <div className={styles.panel} role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className={styles.header}>
          <h2 id="cart-title" className={styles.title}>
            Your order
          </h2>
          <button type="button" className={styles.close} onClick={closePanel}>
            Close
          </button>
        </div>

        {status === "success" ? (
          <p className={styles.success}>
            Got it — we&rsquo;ll follow up by email to arrange payment and shipping. Thank you.
          </p>
        ) : items.length === 0 ? (
          <p className={styles.empty}>Your cart is empty. Add a bar or the trio to get started.</p>
        ) : (
          <>
            <div className={styles.items}>
              {items.map((item) => (
                <div key={item.sku} className={styles.item}>
                  <div>
                    <div className={styles.itemName}>{CATALOG[item.sku].name}</div>
                    <button
                      type="button"
                      className={styles.remove}
                      onClick={() => removeFromCart(item.sku)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className={styles.itemMeta}>
                    <span className={styles.itemQty}>× {item.quantity}</span>
                    <span className={styles.itemPrice}>
                      {formatCents(CATALOG[item.sku].priceCents * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.total}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalPrice}>{formatCents(total)}</span>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                className={primitives.input}
                type="email"
                required
                placeholder="Your email address"
                aria-label="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {status === "error" ? (
                <p className={styles.error} role="alert">
                  {error}
                </p>
              ) : null}
              <button
                type="submit"
                className={`${primitives.btn} ${primitives.btnBlock}`}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Placing order…" : "Place order"}
              </button>
              <p className={styles.note}>
                This records your order — we&rsquo;ll email you to arrange payment and shipping.
                No payment is collected here yet.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
