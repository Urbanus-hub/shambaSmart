import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { useAuth } from "../hooks/useAuth";

export function DashboardLayout() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-6 md:flex-row">
        <Sidebar role={user.role} />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
