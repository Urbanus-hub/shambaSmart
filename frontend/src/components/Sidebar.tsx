import { NavLink } from "react-router-dom";
import type { UserRole } from "../types";

interface SidebarProps {
  role: UserRole;
}

export function Sidebar({ role }: SidebarProps) {
  const items =
    role === "ADMIN"
      ? [
          { to: "/admin/dashboard", label: "Admin overview" },
          { to: "/fields/overview", label: "Field registry", disabled: false },
        ]
      : [
          { to: "/agent/dashboard", label: "Assigned fields" },
          { to: "/fields/overview", label: "My logbook", disabled: true },
        ];

  return (
    <aside className="w-full md:w-64 rounded-3xl border border-slate-200 bg-white p-5">
      <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 mb-6">
        Navigation
      </p>
      <nav className="space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                item.disabled
                  ? "text-slate-300 cursor-not-allowed"
                  : isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100"
              }`
            }
            onClick={(event) => {
              if (item.disabled) {
                event.preventDefault();
              }
            }}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-900">
        <p className="font-semibold">Field rhythm</p>
        <p className="text-xs mt-1">
          Log observations every 3 to 5 days to stay ahead of risk.
        </p>
      </div>
    </aside>
  );
}
