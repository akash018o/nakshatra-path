import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { gemstones } from "../data/gemstones";
import { fetchGemstoneImages, uploadGemstoneImage } from "../lib/gemstoneImages";
import GemIcon from "../components/GemIcon";

const STATUS_OPTIONS = ["new", "contacted", "closed"];
const REVIEW_STATUS_OPTIONS = ["pending", "approved", "rejected"];

export default function Admin() {
  const [tab, setTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [gemImages, setGemImages] = useState({});
  const [uploadingId, setUploadingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const [b, r, imgs] = await Promise.all([
      supabase.from("bookings").select("*").order("created_at", { ascending: false }),
      supabase.from("reviews").select("*").order("created_at", { ascending: false }),
      fetchGemstoneImages().catch(() => ({})),
    ]);
    if (b.error) setError(b.error.message);
    else setBookings(b.data || []);
    if (!r.error) setReviews(r.data || []);
    setGemImages(imgs);
    setLoading(false);
  }

  async function updateStatus(id, status) {
    setBookings((b) => b.map((x) => (x.id === id ? { ...x, status } : x)));
    await supabase.from("bookings").update({ status }).eq("id", id);
  }

  async function updateReviewStatus(id, status) {
    setReviews((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
    await supabase.from("reviews").update({ status }).eq("id", id);
  }

  async function handleImageUpload(stoneId, file) {
    setUploadingId(stoneId);
    try {
      const url = await uploadGemstoneImage(stoneId, file);
      setGemImages((prev) => ({ ...prev, [stoneId]: url }));
    } catch (err) {
      console.error(err);
      alert("Upload failed: " + err.message);
    } finally {
      setUploadingId(null);
    }
  }

  const visible =
    filter === "all" ? bookings : bookings.filter((b) => b.service === filter);

  const serviceNames = [...new Set(bookings.map((b) => b.service))];

  return (
    <div className="min-h-screen bg-cosmos px-6 py-10 font-body text-parchment md:px-12">
      <h1 className="font-display text-3xl">Admin</h1>

      {!isSupabaseConfigured && (
        <p className="mt-4 border border-brass bg-brass/10 p-3 text-sm text-brassLight">
          Supabase isn't configured yet — create a .env file from .env.example with
          your project's URL and anon key.
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-2 text-sm">
        <button
          onClick={() => setTab("bookings")}
          className={`border px-4 py-2 ${tab === "bookings" ? "border-brass text-brass" : "border-brass/20 text-parchment/60"}`}
        >
          Bookings ({bookings.length})
        </button>
        <button
          onClick={() => setTab("reviews")}
          className={`border px-4 py-2 ${tab === "reviews" ? "border-brass text-brass" : "border-brass/20 text-parchment/60"}`}
        >
          Reviews ({reviews.filter((r) => r.status === "pending").length} pending)
        </button>
        <button
          onClick={() => setTab("gemstones")}
          className={`border px-4 py-2 ${tab === "gemstones" ? "border-brass text-brass" : "border-brass/20 text-parchment/60"}`}
        >
          Gemstone photos
        </button>
      </div>

      {error && (
        <p className="mt-4 border border-kumkum bg-kumkum/10 p-3 text-sm text-kumkumLight">
          Couldn't load requests: {error}. Check your Supabase URL/key in the .env file
          and that the tables exist (run supabase/schema.sql).
        </p>
      )}

      {loading ? (
        <p className="mt-8 text-parchment/50">Loading...</p>
      ) : tab === "bookings" ? (
        <>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            <button
              onClick={() => setFilter("all")}
              className={`border px-3 py-1 ${filter === "all" ? "border-brass text-brass" : "border-brass/20 text-parchment/60"}`}
            >
              All
            </button>
            {serviceNames.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`border px-3 py-1 ${filter === s ? "border-brass text-brass" : "border-brass/20 text-parchment/60"}`}
              >
                {s}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="mt-8 text-parchment/50">No requests yet.</p>
          ) : (
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-brass/20 text-dusk">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Phone</th>
                    <th className="py-2 pr-4">Service</th>
                    <th className="py-2 pr-4">DOB</th>
                    <th className="py-2 pr-4">Prefers</th>
                    <th className="py-2 pr-4">Notes</th>
                    <th className="py-2 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((b) => (
                    <tr key={b.id} className="border-b border-brass/10 align-top">
                      <td className="py-3 pr-4">{b.name}</td>
                      <td className="py-3 pr-4">{b.phone}</td>
                      <td className="py-3 pr-4">{b.service}</td>
                      <td className="py-3 pr-4">
                        {b.dob}
                        {b.time_of_birth ? ` · ${b.time_of_birth}` : ""}
                      </td>
                      <td className="py-3 pr-4">{b.contact_preference}</td>
                      <td className="max-w-[200px] py-3 pr-4 text-parchment/60">{b.notes}</td>
                      <td className="py-3 pr-4">
                        <select
                          value={b.status}
                          onChange={(e) => updateStatus(b.id, e.target.value)}
                          className="border border-brass/30 bg-surface px-2 py-1 text-parchment"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : tab === "reviews" ? (
        <div className="mt-8 space-y-4">
          {reviews.length === 0 ? (
            <p className="text-parchment/50">No reviews yet.</p>
          ) : (
            reviews.map((r) => (
              <div key={r.id} className="border border-brass/15 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-display text-lg text-parchment">{r.name}</p>
                    <p className="text-xs text-dusk">{r.email} · {r.rating}★</p>
                  </div>
                  <select
                    value={r.status}
                    onChange={(e) => updateReviewStatus(r.id, e.target.value)}
                    className="border border-brass/30 bg-surface px-2 py-1 text-sm text-parchment"
                  >
                    {REVIEW_STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <p className="mt-3 text-sm text-parchment/70">{r.message}</p>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="mt-8">
          <p className="mb-6 max-w-lg text-sm text-parchment/60">
            Upload a real photo for any stone below — it replaces the placeholder icon
            on the site immediately, no code changes needed. JPG or PNG, ideally a
            square close-up shot on a plain background.
          </p>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {gemstones.map((g) => (
              <div key={g.id} className="border border-brass/15 p-4 text-center">
                {gemImages[g.id] ? (
                  <img
                    src={gemImages[g.id]}
                    alt={g.name}
                    className="mx-auto mb-3 h-20 w-20 rounded-full border border-brass/40 object-cover"
                  />
                ) : (
                  <GemIcon stoneId={g.id} className="mx-auto mb-3 h-16 w-16" />
                )}
                <p className="text-sm text-parchment">{g.name}</p>
                <label className="mt-3 block cursor-pointer border border-brass/30 px-3 py-1.5 text-xs text-brass hover:bg-brass hover:text-cosmos">
                  {uploadingId === g.id ? "Uploading..." : gemImages[g.id] ? "Replace photo" : "Upload photo"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingId === g.id}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(g.id, file);
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
