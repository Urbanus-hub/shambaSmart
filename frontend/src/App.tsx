import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { LoginPage } from "./pages/LoginPage";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AgentDashboard } from "./pages/AgentDashboard";
import { FieldDetailPage } from "./pages/FieldDetailPage";
import { FieldManagement } from "./pages/FieldManagement";
import { AgentManagement } from "./pages/AgentManagement";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<DashboardLayout />}>
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/fields"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <FieldManagement />
              </ProtectedRoute>
            }
          />
          <Route
             path="/admin/agents"
             element={
               <ProtectedRoute allowedRoles={["ADMIN"]}>
                 <AgentManagement />
               </ProtectedRoute>
             }
          />
          <Route
            path="/agent/dashboard"
            element={
              <ProtectedRoute allowedRoles={["AGENT"]}>
                <AgentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agent/fields"
            element={
              <ProtectedRoute allowedRoles={["AGENT"]}>
                <FieldManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fields/:id"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "AGENT"]}>
                <FieldDetailPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}
