import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(email, password);
      navigate(
        user.role === "ADMIN" ? "/admin/dashboard" : "/agent/dashboard",
        { replace: true },
      );
    } catch (err) {
      setError("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-emerald-700">
                Field monitoring system
              </p>
              <h1 className="mt-4 font-display text-4xl text-slate-900">
                Coordinate the season with clarity.
              </h1>
              <p className="mt-3 text-sm text-slate-600">
                ShambaSmart keeps every field, update, and agent aligned. Get a
                live pulse on readiness, risks, and harvest windows.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
                  Season pulse
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  Track stage changes and catch stalled fields before they go
                  off schedule.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
                  Agent focus
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  Give agents a clean view of assigned plots and expected
                  updates.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-emerald-700">
                    Demo access
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    admin@shamba.io / password123
                  </p>
                </div>
                <span className="rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                  Live
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
              Sign in
            </p>
            <h2 className="mt-3 font-display text-2xl text-slate-900">
              Welcome back.
            </h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  placeholder="agent@shamba.io"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  placeholder="••••••••"
                  required
                />
              </div>
              {error && <p className="text-sm text-rose-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-slate-900 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-slate-800 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
              <p className="text-xs text-slate-500">
                Need access? Contact the system coordinator to get your role
                assigned.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
