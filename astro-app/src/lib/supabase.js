import { createClient } from "@supabase/supabase-js";

// Fill these in from your Supabase project settings (Project Settings > API),
// via a .env file (see .env.example) — until then, the app still runs and
// renders fine, but any Supabase call (booking submit, admin page) will fail
// with a clear console warning instead of crashing the whole page.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

if (!isConfigured) {
  console.warn(
    "[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY not set. " +
    "Create a .env file from .env.example. Booking submissions and the /admin page won't work until this is set."
  );
}

// Use a harmless placeholder URL when not configured so createClient() doesn't
// throw and take down the whole app before it can even render.
export const supabase = createClient(
  SUPABASE_URL || "https://placeholder.supabase.co",
  SUPABASE_ANON_KEY || "placeholder-anon-key"
);

export const isSupabaseConfigured = isConfigured;
