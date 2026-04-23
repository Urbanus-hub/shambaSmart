import { NavLink } from "react-router-dom";
import { LayoutDashboard, LogOut, Map, Tractor, Users } from "lucide-react";
import type { UserRole, User } from "../types";
import { useAuth } from "../hooks/useAuth";

interface SidebarProps {
  role: UserRole;
  user: User;
}

export function Sidebar({ role, user }: SidebarProps) {
  const { logout } = useAuth();
  
  const items =
    role === "ADMIN"
      ? [
          { to: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
          { to: "/admin/fields", label: "Fields", icon: Map },
          { to: "/admin/agents", label: "Agents", icon: Users },
        ]
      : [
          { to: "/agent/dashboard", label: "Assignments", icon: Tractor },
          { to: "/agent/fields", label: "Logbook", icon: Map },
        ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-full bg-[#1e5545] border-r border-[#1a4a3c] text-[#e0f6e9] shadow-2xl relative z-10 animate-in slide-in-from-left duration-300">
      
      {/* Branding Header */}
      <div className="p-6 border-b border-[#36a783]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#36a783] flex items-center justify-center text-white font-display text-xl font-bold shadow-inner">
            S
          </div>
          <span className="font-display text-2xl text-white tracking-tight">
            Shamba<span className="text-[#93dec1]">Smart</span>
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
        <p className="px-2 text-[10px] uppercase tracking-[0.2em] text-[#36a783] mb-4 font-bold opacity-80">
          Navigation
        </p>
        <nav className="space-y-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3.5 text-sm font-semibold transition-all duration-200 rounded-2xl ${
                    isActive
                      ? "bg-[#2a755d] text-white shadow-sm ring-1 ring-[#36a783]/50"
                      : "text-[#c2ecd6] hover:bg-[#36a783]/20 hover:text-white"
                  }`
                }
              >
                <Icon className="w-5 h-5 opacity-90" strokeWidth={2} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User Section / Bottom */}
      <div className="p-5 border-t border-[#36a783]/20 bg-[#1a4a3c]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#f2fbf5] text-[#1e5545] flex items-center justify-center font-bold text-sm shadow-inner">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0 pr-2">
            <p className="text-sm font-bold text-white truncate">{user.name}</p>
            <p className="text-[10px] text-[#93dec1] uppercase tracking-widest mt-0.5">{user.role}</p>
          </div>
          <button 
            onClick={logout}
            className="p-2.5 text-[#93dec1] hover:text-white hover:bg-[#36a783]/30 rounded-xl transition-all hover:scale-105 active:scale-95"
            title="Sign out"
          >
            <LogOut className="w-4 h-4 translate-x-0.5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </aside>
  );
}
