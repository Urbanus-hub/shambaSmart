import { useAuth } from "../hooks/useAuth";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-emerald-700">
            SmartSeason Field Monitoring
          </p>
          <h1 className="font-display text-2xl text-slate-900">ShambaSmart</h1>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">
                {user.name}
              </p>
              <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-700">
                {user.role}
              </span>
            </div>
          )}
          <button
            onClick={logout}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
