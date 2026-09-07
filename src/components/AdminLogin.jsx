import { useState } from "react";
import { signIn } from "../lib/auth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      // onAuthChange listener in Admin.jsx picks up the new session automatically.
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cosmos px-6 font-body">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border border-brass/20 bg-surface p-8">
        <h1 className="font-display text-2xl text-parchment">Admin login</h1>
        <p className="mt-1 text-sm text-parchment/50">Nakshatra Path</p>

        <div className="mt-6 space-y-4">
          <input
            required
            type="email"
            placeholder="Email"
            className="w-full border-b border-brass/30 bg-transparent py-2 text-parchment placeholder:text-parchment/30 outline-none focus:border-brass"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            placeholder="Password"
            className="w-full border-b border-brass/30 bg-transparent py-2 text-parchment placeholder:text-parchment/30 outline-none focus:border-brass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="mt-4 text-sm text-kumkumLight">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full border border-brass py-2.5 text-sm text-brass transition-colors hover:bg-brass hover:text-cosmos disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
