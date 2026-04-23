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
      // Mocking actual API if it fails during design showcase
      if (email === "admin@shamba.io" && password === "password123") {
        await login(email, password);
        navigate("/admin/dashboard", { replace: true });
      } else if (email === "agent@shamba.io" && password === "password123") {
        await login(email, password);
        navigate("/agent/dashboard", { replace: true });
      } else {
        const user = await login(email, password);
        navigate(user.role === "ADMIN" ? "/admin/dashboard" : "/agent/dashboard", { replace: true });
      }
    } catch (err) {
      setError("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#f0f9f4]">
      {/* Left side: Image and branding */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-[#244f3b]">
        <img
          src="farm2.jpg"
          alt="Lush green farm field"
          className="absolute inset-0 w-full h-full border border-red-300  mix-blend-overlay bg-no-repeat"
        />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#93dec1] font-semibold">
            SmartSeason Field Monitoring
          </p>
          <h1 className="mt-6 font-display text-5xl text-white leading-tight">
            Cultivate insights.<br />
            Harvest clarity.
          </h1>
        </div>
        
        <div className="relative z-10 grid gap-6 sm:grid-cols-2 mt-auto">
          <div className="rounded-2xl border border-[#36a783]/30 bg-[#1e5545]/60 backdrop-blur-md p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#c2ecd6] font-medium">Real-time sync</p>
            <p className="mt-3 text-sm text-[#e0f6e9] leading-relaxed">
              Coordinate farmers, fields, and agents seamlessly with instant status updates.
            </p>
          </div>
          <div className="rounded-2xl border border-[#36a783]/30 bg-[#1e5545]/60 backdrop-blur-md p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#c2ecd6] font-medium">Predictive yield</p>
            <p className="mt-3 text-sm text-[#e0f6e9] leading-relaxed">
              Spot at-risk fields weeks early and intervene before the harvest is compromised.
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Login form */}
      <div className="flex items-center justify-center p-6 lg:p-12 animate-in fade-in duration-700 slide-in-from-bottom-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="font-display text-3xl text-slate-900 mb-2">Welcome back</h2>
            <p className="text-slate-600">Sign in to coordinate the season.</p>
          </div>
          
          <div className="rounded-xl bg-white p-4 mb-6 shadow-sm border border-[#e0f6e9]">
            <p className="text-xs font-semibold text-[#36a783] uppercase tracking-wider mb-2">Demo Accounts</p>
            <div className="text-sm text-slate-600 space-y-1">
              <p>Admin: <span className="font-medium text-slate-900">admin@shamba.io</span> / password123</p>
              <p>Agent: <span className="font-medium text-slate-900">agent@shamba.io</span> / password123</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition-all focus:border-[#36a783] focus:outline-none focus:ring-4 focus:ring-[#e0f6e9]"
                placeholder="Ex. admin@shamba.io"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition-all focus:border-[#36a783] focus:outline-none focus:ring-4 focus:ring-[#e0f6e9]"
                placeholder="••••••••"
                required
              />
            </div>
            
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-100 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#244f3b] px-4 py-4 text-sm font-bold tracking-wide text-white transition hover:bg-[#1a3d2d] focus:ring-4 focus:ring-[#c2ecd6] disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? "Signing in..." : "Access Dashboard"}
                {!loading && (
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
