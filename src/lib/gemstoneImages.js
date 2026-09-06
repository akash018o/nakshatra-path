import { supabase } from "./supabase";

// Returns a map like { ruby: "https://...jpg", pearl: "https://...jpg" }
export async function fetchGemstoneImages() {
  const { data, error } = await supabase.from("gemstone_images").select("id, image_url");
  if (error) throw error;
  const map = {};
  (data || []).forEach((row) => { map[row.id] = row.image_url; });
  return map;
}

// Uploads a file for a given stone id, overwriting any previous image, and
// records its public URL. Used from the admin panel only.
export async function uploadGemstoneImage(stoneId, file) {
  const ext = file.name.split(".").pop();
  const path = `${stoneId}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("gemstones")
    .upload(path, file, { upsert: true });
  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage.from("gemstones").getPublicUrl(path);
  // Cache-bust so the new image shows immediately instead of the browser's
  // cached copy of the old file at the same path.
  const image_url = `${urlData.publicUrl}?v=${Date.now()}`;

  const { error: upsertError } = await supabase
    .from("gemstone_images")
    .upsert({ id: stoneId, image_url });
  if (upsertError) throw upsertError;

  return image_url;
}
