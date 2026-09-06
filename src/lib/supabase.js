import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

let client;
let configured = false;

try {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY not set");
  }
  client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  configured = true;
} catch (err) {
  // Whatever the reason (missing, malformed URL, bad key format) — never let
  // a Supabase config problem crash the whole site. Fall back to a dummy
  // client so every page still renders; only Supabase-dependent features
  // (bookings, reviews, admin, gemstone photos) won't work until this is fixed.
  console.warn("[supabase] Falling back to unconfigured client:", err.message);
  client = createClient("https://placeholder.supabase.co", "placeholder-anon-key");
  configured = false;
}

export const supabase = client;
export const isSupabaseConfigured = configured;
