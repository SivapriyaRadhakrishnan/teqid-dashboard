import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { AdminLayout } from "./layouts/AdminLayout";
import { AddClientPage } from "./pages/admin/AddClientPage";
import { AddServicePage } from "./pages/admin/AddServicePage";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { ExpiryListPage } from "./pages/admin/ExpiryListPage";
import { LoginPage } from "./pages/LoginPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="add-client" element={<AddClientPage />} />
              <Route path="add-service" element={<AddServicePage />} />
              <Route path="expiry-list" element={<ExpiryListPage />} />
              <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
