import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";

export function DashboardLayout() {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface-secondary">
      <Sidebar
        role={user.role}
        user={user}
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />

      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <Navbar onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
