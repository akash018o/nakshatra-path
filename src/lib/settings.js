import { supabase } from "./supabase";

// Fallbacks used until Supabase settings are loaded (or if it's never been
// configured) — keeps the site fully functional with no database at all.
export const DEFAULT_SETTINGS = {
  whatsapp_number: "918630352867",
  telegram_number: "918630352867",
};

export async function fetchSettings() {
  const { data, error } = await supabase.from("site_settings").select("key, value");
  if (error) throw error;
  const map = { ...DEFAULT_SETTINGS };
  (data || []).forEach((row) => { map[row.key] = row.value; });
  return map;
}

export async function updateSetting(key, value) {
  const { error } = await supabase.from("site_settings").upsert({ key, value });
  if (error) throw error;
}
