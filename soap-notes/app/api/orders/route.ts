import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { CATALOG, type Sku } from "@/lib/catalog";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type OrderItemInput = { sku?: unknown; quantity?: unknown };
type OrderBody = { email?: unknown; items?: unknown };

function isSku(value: string): value is Sku {
  return value in CATALOG;
}

export async function POST(request: Request) {
  let body: OrderBody;
  try {
    body = (await request.json()) as OrderBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  // Quantities come from the client, but prices and names never do — every
  // line item is repriced here from the catalog so a tampered request can't
  // change what an order is actually worth.
  const rawItems = Array.isArray(body.items) ? (body.items as OrderItemInput[]) : [];
  const items = rawItems
    .map((item) => {
      const sku = typeof item.sku === "string" ? item.sku : "";
      const quantity = typeof item.quantity === "number" ? Math.floor(item.quantity) : 0;
      if (!isSku(sku) || quantity < 1) return null;
      const entry = CATALOG[sku];
      return { sku, name: entry.name, unitPriceCents: entry.priceCents, quantity };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const totalCents = items.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0);
  const orderId = crypto.randomUUID();

  try {
    const supabase = getSupabaseClient();

    const { error: orderError } = await supabase.from("orders").insert({
      id: orderId,
      email,
      total_cents: totalCents,
      status: "pending",
    });
    if (orderError) throw orderError;

    const { error: itemsError } = await supabase.from("order_items").insert(
      items.map((item) => ({
        order_id: orderId,
        sku: item.sku,
        name: item.name,
        unit_price_cents: item.unitPriceCents,
        quantity: item.quantity,
      }))
    );
    if (itemsError) throw itemsError;
  } catch (err) {
    console.error("order insert failed:", err);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please try again in a moment." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, orderId, totalCents });
}
