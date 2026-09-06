import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { submitReview, fetchApprovedReviews } from "../lib/reviews";

function Stars({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`${n} star`}
          className="text-brass"
        >
          <Star size={20} fill={n <= value ? "#C89B3C" : "none"} strokeWidth={1.5} />
        </button>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", rating: 5, message: "" });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    fetchApprovedReviews()
      .then(setReviews)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitReview(form);
      setStatus("sent");
      setForm({ name: "", email: "", rating: 5, message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="reviews" className="bg-surface px-6 py-24 md:px-12">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-3xl text-parchment md:text-4xl">
          From people we've helped
        </h2>
        <p className="mt-3 text-parchment/60">
          Real reviews from real clients — each one is checked before it goes up here.
        </p>

        {!loading && reviews.length > 0 && (
          <div className="mt-10 space-y-6">
            {reviews.map((r) => (
              <div key={r.id} className="border-l-2 border-brass/40 pl-4">
                <div className="flex gap-1">
                  {Array.from({ length: r.rating }, (_, i) => (
                    <Star key={i} size={14} fill="#C89B3C" stroke="#C89B3C" />
                  ))}
                </div>
                <p className="mt-2 text-sm text-parchment/80">{r.message}</p>
                <p className="mt-1 text-xs text-dusk">— {r.name}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-14 border-t border-brass/10 pt-10">
          <h3 className="font-display text-xl text-brassLight">Leave a review</h3>
          <p className="mt-1 text-xs text-parchment/50">
            Your email is only used to confirm this is a genuine review — it's never shown publicly.
          </p>

          {status === "sent" ? (
            <p className="mt-6 text-sm text-brassLight">
              Thank you — your review has been submitted and will appear here once checked.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <input
                required
                placeholder="Your name"
                className="w-full border-b border-brass/30 bg-transparent py-2 text-parchment placeholder:text-parchment/30 outline-none focus:border-brass"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
              <input
                required
                type="email"
                placeholder="Your email"
                className="w-full border-b border-brass/30 bg-transparent py-2 text-parchment placeholder:text-parchment/30 outline-none focus:border-brass"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
              <div>
                <p className="mb-2 text-xs uppercase tracking-wide text-dusk">Rating</p>
                <Stars value={form.rating} onChange={(n) => setForm((f) => ({ ...f, rating: n }))} />
              </div>
              <textarea
                required
                placeholder="How was your experience?"
                className="min-h-[90px] w-full resize-none border-b border-brass/30 bg-transparent py-2 text-parchment placeholder:text-parchment/30 outline-none focus:border-brass"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              />
              {status === "error" && (
                <p className="text-sm text-kumkumLight">Couldn't submit — please try again.</p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="border border-brass px-6 py-2 text-sm text-brass transition-colors hover:bg-brass hover:text-cosmos disabled:opacity-50"
              >
                {status === "sending" ? "Sending..." : "Submit review"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
