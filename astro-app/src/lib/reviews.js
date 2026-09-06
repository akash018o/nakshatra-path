import { supabase } from "./supabase";

export async function submitReview({ name, email, rating, message }) {
  const { error } = await supabase
    .from("reviews")
    .insert([{ name, email, rating, message, status: "pending" }]);
  if (error) throw error;
}

// Only ever returns approved reviews — enforced by RLS as well, this is belt-and-braces.
export async function fetchApprovedReviews() {
  const { data, error } = await supabase
    .from("reviews")
    .select("id, name, rating, message, created_at")
    .eq("status", "approved")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}
