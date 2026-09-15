import { CATALOG, type Sku } from "./catalog";

// Same pub-sub pattern as sticky-bar-store.ts: the cart toggle (nav), the
// add-to-cart buttons (scattered through product cards), and the cart panel
// (rendered once near the page root) are all far apart in the tree.
export type CartItem = { sku: Sku; quantity: number };

type Listener = () => void;

let items: CartItem[] = [];
let open = false;
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function addToCart(sku: Sku) {
  const existing = items.find((item) => item.sku === sku);
  items = existing
    ? items.map((item) => (item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item))
    : [...items, { sku, quantity: 1 }];
  open = true;
  emit();
}

export function removeFromCart(sku: Sku) {
  items = items.filter((item) => item.sku !== sku);
  emit();
}

export function clearCart() {
  items = [];
  emit();
}

export function setCartOpen(next: boolean) {
  if (next === open) return;
  open = next;
  emit();
}

export function subscribeCart(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getCartItems() {
  return items;
}

export function getCartItemsServerSnapshot(): CartItem[] {
  return [];
}

export function getCartOpen() {
  return open;
}

export function getCartOpenServerSnapshot() {
  return false;
}

export function cartCount(cartItems: CartItem[]) {
  return cartItems.reduce((sum, item) => sum + item.quantity, 0);
}

export function cartTotalCents(cartItems: CartItem[]) {
  return cartItems.reduce((sum, item) => sum + CATALOG[item.sku].priceCents * item.quantity, 0);
}
