import { useAuth } from "../hooks/useAuth";
import { Menu, Sprout } from "lucide-react";

export function Navbar({ onMenuToggle }: { onMenuToggle: () => void }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700 hover:bg-surface-muted rounded-lg transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-600">
              <Sprout className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-semibold text-slate-900">
              ShambaSmart
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <>
              <span className="hidden sm:inline-flex items-center rounded-md bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-200/60 ring-inset">
                {user.role}
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white text-sm font-semibold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
