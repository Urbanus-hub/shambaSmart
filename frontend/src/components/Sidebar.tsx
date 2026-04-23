import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Map,
  Users,
  X,
  Sprout,
} from "lucide-react";
import type { UserRole, User } from "../types";
import { useAuth } from "../hooks/useAuth";

interface SidebarProps {
  role: UserRole;
  user: User;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ role, user, isOpen, setIsOpen }: SidebarProps) {
  const { logout } = useAuth();

  const items =
    role === "ADMIN"
      ? [
          { to: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
          { to: "/admin/fields", label: "Fields", icon: Map },
          { to: "/admin/agents", label: "Agents", icon: Users },
        ]
      : [
          { to: "/agent/dashboard", label: "Dashboard", icon: LayoutDashboard },
          { to: "/agent/fields", label: "My Fields", icon: Map },
        ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-sidebar-bg text-white
          flex flex-col h-full
          transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500">
              <Sprout className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              ShambaSmart
            </span>
          </div>
          <button
            className="lg:hidden p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-sidebar-active text-sidebar-bg shadow-xs"
                      : "text-white/70 hover:text-white hover:bg-sidebar-hover"
                  }`
                }
              >
                <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={1.8} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* User Card */}
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-white/5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-brand-200 text-sm font-semibold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.name}
              </p>
              <p className="text-xs text-white/50 truncate">
                {user.role === "ADMIN" ? "Administrator" : "Field Agent"}
              </p>
            </div>
            <button
              onClick={logout}
              className="p-1.5 text-white/40 hover:text-red-300 hover:bg-white/10 rounded-md transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
