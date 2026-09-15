import "server-only";
import { createClient } from "@supabase/supabase-js";

// Server-only: every write goes through a Route Handler using the anon key.
// RLS insert-only policies (see supabase/schema.sql) mean this client can
// never read back what it writes, so there's no meaningful difference in
// trust between using it here vs. in the browser — it's kept server-side
// anyway so a future change to the policies doesn't quietly widen exposure.
export function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be set");
  }
  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}
