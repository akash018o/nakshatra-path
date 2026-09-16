import { useState } from "react";
import { X } from "lucide-react";
import { submitBooking } from "../lib/bookings";
import { buildBookingWhatsAppLink } from "../lib/whatsapp";

const inputClass =
  "w-full border-b border-brass/30 bg-transparent py-2 text-parchment placeholder:text-parchment/30 focus:border-brass outline-none";

export default function BookingModal({ service, onClose }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    dob: "",
    timeOfBirth: "",
    placeOfBirth: "",
    contactPreference: "chat",
    notes: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  if (!service) return null;

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitBooking({ ...form, service: service.name });
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-cosmos/85 p-4 backdrop-blur-md">
      <div className="relative my-auto w-full max-w-md border border-brass/35 panel-gradient p-8 shadow-[0_28px_70px_-12px_rgba(0,0,0,0.85)]">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-parchment/50 hover:text-brass"
        >
          <X size={20} />
        </button>

        {status === "sent" ? (
          <div className="py-8 text-center">
            <h3 className="font-display text-2xl text-brassLight">Request sent</h3>
            <p className="mt-3 text-sm text-parchment/70">
              Your details have been received. The astrologer will reach out based on
              the option you chose.
            </p>
            <a
              href={buildBookingWhatsAppLink({ ...form, service: service.name })}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block bg-gradient-to-r from-kumkum to-kumkumLight py-3 text-sm font-medium text-parchment shadow-lg shadow-kumkum/25 transition-transform hover:scale-[1.02]"
            >
              Also send via WhatsApp
            </a>
            <button
              onClick={onClose}
              className="mt-3 w-full border border-brass/50 px-6 py-2.5 text-sm text-brassLight transition-colors hover:bg-brass/10"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-display text-2xl text-brassLight">{service.name}</h3>
            <p className="mt-1 text-sm text-parchment/60">{service.tagline}</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <input required placeholder="Full name" className={inputClass} value={form.name} onChange={update("name")} />
              <input required placeholder="Phone number" className={inputClass} value={form.phone} onChange={update("phone")} />
              <input required type="date" aria-label="Date of birth" className={inputClass} value={form.dob} onChange={update("dob")} />
              <input type="time" aria-label="Time of birth (if known)" placeholder="Time of birth (if known)" className={inputClass} value={form.timeOfBirth} onChange={update("timeOfBirth")} />
              <input placeholder="Place of birth" className={inputClass} value={form.placeOfBirth} onChange={update("placeOfBirth")} />

              <div>
                <p className="mb-2 text-xs uppercase tracking-wide text-dusk">How should we reach you?</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  {[
                    { value: "call", label: "Call me" },
                    { value: "chat", label: "Chat with me" },
                    { value: "report_only", label: "Just send a report" },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 text-parchment/80">
                      <input
                        type="radio"
                        name="contactPreference"
                        value={opt.value}
                        checked={form.contactPreference === opt.value}
                        onChange={update("contactPreference")}
                        className="accent-brass"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <textarea
                placeholder="Anything else the astrologer should know? (optional)"
                className={inputClass + " min-h-[70px] resize-none"}
                value={form.notes}
                onChange={update("notes")}
              />

              {status === "error" && (
                <p className="text-sm text-kumkumLight">
                  Something went wrong sending your request. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-gradient-to-r from-brass to-brassLight py-3 text-sm font-medium text-cosmos shadow-lg shadow-brass/20 transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
              >
                {status === "sending" ? "Sending..." : "Send request"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
