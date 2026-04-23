import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Sprout, ArrowRight } from "lucide-react";

const HERO_IMAGE =
  "https://images.pexels.com/photos/33864432/pexels-photo-33864432.jpeg?auto=compress&cs=tinysrgb&w=1200";

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
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-surface-secondary">
      {/* Left Panel — Hero Image + Overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Aerial view of a sprawling cornfield at sunrise — Tom Fisk on Pexels"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/85 via-brand-800/75 to-brand-900/90" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            <div className="flex items-center gap-2.5 mb-16">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm border border-white/20">
                <Sprout className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">
                ShambaSmart
              </span>
            </div>

            <h1 className="text-5xl font-semibold leading-[1.15] tracking-tight text-white">
              Cultivate
              <br />
              insights.
              <br />
              <span className="text-brand-200">Harvest clarity.</span>
            </h1>
            <p className="mt-6 text-base text-white/70 max-w-md leading-relaxed">
              Monitor fields, coordinate agents, and track crop growth from
              planting to harvest — all in one platform.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white/8 border border-white/10 p-5 backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">
                Real-time sync
              </p>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                Coordinate farmers, fields, and agents with instant status
                updates across your operation.
              </p>
            </div>
            <div className="rounded-xl bg-white/8 border border-white/10 p-5 backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">
                Smart alerts
              </p>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                Spot at-risk fields early and intervene before harvest is
                compromised.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex flex-1 items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-up">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
              <Sprout className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-slate-900">
              ShambaSmart
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Welcome back
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Sign in to your account. Users are managed by the administrator.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label-field">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="label-field">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700 flex items-center gap-2">
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3"
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Demo Credentials
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Admin</p>
                  <p className="text-xs font-medium text-slate-600 mt-1">admin@shambasmart.com</p>
                  <p className="text-xs text-slate-400 mt-0.5">admin123</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Agent</p>
                  <p className="text-xs font-medium text-slate-600 mt-1">agent1@shambasmart.com</p>
                  <p className="text-xs text-slate-400 mt-0.5">agent123</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
