import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { gemstones } from "../data/gemstones";
import { fetchGemstoneImages, uploadGemstoneImage } from "../lib/gemstoneImages";
import { getSession, onAuthChange, signOut } from "../lib/auth";
import GemIcon from "../components/GemIcon";
import AdminLogin from "../components/AdminLogin";

const STATUS_OPTIONS = ["new", "contacted", "closed"];
const REVIEW_STATUS_OPTIONS = ["pending", "approved", "rejected"];

export default function Admin() {
  const [session, setSession] = useState(undefined); // undefined = still checking, null = logged out
  const [tab, setTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [gemImages, setGemImages] = useState({});
  const [uploadingId, setUploadingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getSession().then(setSession);
    const unsubscribe = onAuthChange(setSession);
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (session) load();
  }, [session]);

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

  async function deleteBooking(id) {
    if (!confirm("Delete this booking permanently?")) return;
    setBookings((b) => b.filter((x) => x.id !== id));
    await supabase.from("bookings").delete().eq("id", id);
  }

  async function updateReviewStatus(id, status) {
    setReviews((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
    await supabase.from("reviews").update({ status }).eq("id", id);
  }

  async function deleteReview(id) {
    if (!confirm("Delete this review permanently?")) return;
    setReviews((r) => r.filter((x) => x.id !== id));
    await supabase.from("reviews").delete().eq("id", id);
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

  function exportBookingsCSV() {
    const headers = ["Name", "Phone", "Service", "DOB", "Time of birth", "Place of birth", "Prefers", "Notes", "Status", "Received"];
    const rows = bookings.map((b) => [
      b.name, b.phone, b.service, b.dob, b.time_of_birth || "", b.place_of_birth || "",
      b.contact_preference, (b.notes || "").replace(/\n/g, " "), b.status, b.created_at,
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (session === undefined) {
    return <div className="flex min-h-screen items-center justify-center bg-cosmos text-parchment/50">Loading...</div>;
  }
  if (!session) {
    return <AdminLogin />;
  }

  const searched = search.trim()
    ? bookings.filter(
        (b) =>
          b.name?.toLowerCase().includes(search.toLowerCase()) ||
          b.phone?.toLowerCase().includes(search.toLowerCase())
      )
    : bookings;
  const visible = filter === "all" ? searched : searched.filter((b) => b.service === filter);
  const serviceNames = [...new Set(bookings.map((b) => b.service))];
  const newCount = bookings.filter((b) => b.status === "new").length;
  const pendingReviews = reviews.filter((r) => r.status === "pending").length;

  return (
    <div className="min-h-screen bg-cosmos px-6 py-10 font-body text-parchment md:px-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Admin</h1>
        <button onClick={signOut} className="text-sm text-parchment/50 hover:text-brass">
          Log out
        </button>
      </div>

      {!isSupabaseConfigured && (
        <p className="mt-4 border border-brass bg-brass/10 p-3 text-sm text-brassLight">
          Supabase isn't configured yet — create a .env file from .env.example with
          your project's URL and anon key.
        </p>
      )}

      {/* Stats bar */}
      <div className="mt-6 grid grid-cols-3 gap-4 sm:max-w-md">
        <div className="border border-brass/15 p-3 text-center">
          <p className="font-display text-2xl text-brassLight">{bookings.length}</p>
          <p className="text-xs text-parchment/50">Total bookings</p>
        </div>
        <div className="border border-brass/15 p-3 text-center">
          <p className="font-display text-2xl text-brassLight">{newCount}</p>
          <p className="text-xs text-parchment/50">New</p>
        </div>
        <div className="border border-brass/15 p-3 text-center">
          <p className="font-display text-2xl text-brassLight">{pendingReviews}</p>
          <p className="text-xs text-parchment/50">Pending reviews</p>
        </div>
      </div>

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
          Reviews ({pendingReviews} pending)
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
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <input
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-brass/30 bg-surface px-3 py-1.5 text-sm text-parchment placeholder:text-parchment/30 outline-none focus:border-brass"
            />
            <button
              onClick={exportBookingsCSV}
              disabled={bookings.length === 0}
              className="border border-brass/40 px-3 py-1.5 text-sm text-brass hover:bg-brass hover:text-cosmos disabled:opacity-40"
            >
              Export CSV
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-sm">
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
            <p className="mt-8 text-parchment/50">No requests found.</p>
          ) : (
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead>
                  <tr className="border-b border-brass/20 text-dusk">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Phone</th>
                    <th className="py-2 pr-4">Service</th>
                    <th className="py-2 pr-4">DOB</th>
                    <th className="py-2 pr-4">Prefers</th>
                    <th className="py-2 pr-4">Notes</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4"></th>
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
                      <td className="py-3 pr-4">
                        <button onClick={() => deleteBooking(b.id)} className="text-xs text-kumkumLight hover:underline">
                          Delete
                        </button>
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
                  <div className="flex items-center gap-3">
                    <select
                      value={r.status}
                      onChange={(e) => updateReviewStatus(r.id, e.target.value)}
                      className="border border-brass/30 bg-surface px-2 py-1 text-sm text-parchment"
                    >
                      {REVIEW_STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <button onClick={() => deleteReview(r.id)} className="text-xs text-kumkumLight hover:underline">
                      Delete
                    </button>
                  </div>
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
