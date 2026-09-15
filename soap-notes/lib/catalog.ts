// The order-capture source of truth for names and prices. Shared by client
// (cart display) and server (order route handler, which never trusts a
// client-supplied price) code, so it stays a plain module with no
// server-only imports.
export type Sku = "agora" | "eros" | "kairos" | "logos" | "trio";

export const CATALOG: Record<Sku, { name: string; priceCents: number }> = {
  agora: { name: "Agora", priceCents: 1800 },
  eros: { name: "Eros", priceCents: 1800 },
  kairos: { name: "Kairos", priceCents: 1800 },
  logos: { name: "Logos", priceCents: 1800 },
  trio: { name: "The Founding Trio (Eros, Kairos, Logos)", priceCents: 4800 },
};

export function formatCents(cents: number) {
  return `$${(cents / 100).toFixed(2).replace(/\.00$/, "")}`;
}
