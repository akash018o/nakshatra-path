import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { submitReview, fetchApprovedReviews } from "../lib/reviews";
import { useLang } from "../i18n/LanguageContext";
import Reveal from "./Reveal";
import Ornament from "./Ornament";
import useParallax from "../hooks/useParallax";
import tarotDesk from "../assets/tarot-desk.webp";

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
          <Star size={20} fill={n <= value ? "#E8B93A" : "none"} strokeWidth={1.5} />
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
  const [bgRef, bgStyle] = useParallax(0.1);
  const { t } = useLang();

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
    <section id="reviews" className="relative overflow-hidden bg-surface px-6 py-28 md:px-12">
      <div ref={bgRef} className="absolute inset-0 -top-[8%] h-[116%]" style={bgStyle}>
        <img src={tarotDesk} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover opacity-[0.8]" />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(160deg, rgba(240,169,30,0.45) 0%, rgba(196,30,46,0.2) 100%)",
          mixBlendMode: "overlay",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(43,24,16,0.5) 0%, rgba(43,24,16,0.9) 100%)" }}
      />

      <div className="relative mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="eyebrow text-saffronLight">{t.reviews.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl text-parchment drop-shadow-[0_2px_10px_rgba(43,24,16,1)] md:text-5xl">
            {t.reviews.heading}
          </h2>
          <Ornament className="my-6" />
          <p className="font-serif-accent mx-auto max-w-xl text-lg text-parchment/85">
            {t.reviews.subtitle}
          </p>
        </Reveal>

        {!loading && reviews.length > 0 && (
          <div className="mt-10 space-y-6">
            {reviews.map((r) => (
              <div key={r.id} className="border border-brass/20 panel-gradient p-6">
                <div className="flex gap-1">
                  {Array.from({ length: r.rating }, (_, i) => (
                    <Star key={i} size={14} fill="#E8B93A" stroke="#E8B93A" />
                  ))}
                </div>
                <p className="font-serif-accent mt-3 text-base leading-relaxed text-parchment/85">{r.message}</p>
                <p className="eyebrow mt-3 text-dusk">— {r.name}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-14 border border-brass/20 panel-gradient p-8">
          <h3 className="font-display text-xl text-brassLight">{t.reviews.formHeading}</h3>
          <p className="mt-1 text-xs text-parchment/50">
            {t.reviews.emailNote}
          </p>

          {status === "sent" ? (
            <p className="mt-6 text-sm text-brassLight">
              {t.reviews.thanks}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <input
                required
                placeholder={t.reviews.name}
                className="w-full border-b border-brass/30 bg-transparent py-2 text-parchment placeholder:text-parchment/30 outline-none focus:border-brass"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
              <input
                required
                type="email"
                placeholder={t.reviews.email}
                className="w-full border-b border-brass/30 bg-transparent py-2 text-parchment placeholder:text-parchment/30 outline-none focus:border-brass"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
              <div>
                <p className="eyebrow mb-2 text-dusk">{t.reviews.rating}</p>
                <Stars value={form.rating} onChange={(n) => setForm((f) => ({ ...f, rating: n }))} />
              </div>
              <textarea
                required
                placeholder={t.reviews.message}
                className="min-h-[90px] w-full resize-none border-b border-brass/30 bg-transparent py-2 text-parchment placeholder:text-parchment/30 outline-none focus:border-brass"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              />
              {status === "error" && (
                <p className="text-sm text-kumkumLight">{t.reviews.error}</p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-press bg-gradient-to-r from-saffron via-brassLight to-saffron bg-[length:200%_auto] px-7 py-2.5 text-sm font-medium text-cosmos shadow-lg shadow-saffron/25 transition-transform hover:scale-[1.03] disabled:opacity-50 disabled:hover:scale-100"
              >
                {status === "sending" ? t.reviews.sending : t.reviews.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
