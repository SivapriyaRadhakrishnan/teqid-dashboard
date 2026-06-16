import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "./layouts/AdminLayout";
import { AddClientPage } from "./pages/admin/AddClientPage";
import { AddServicePage } from "./pages/admin/AddServicePage";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { ExpiryListPage } from "./pages/admin/ExpiryListPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="add-client" element={<AddClientPage />} />
          <Route path="add-service" element={<AddServicePage />} />
          <Route path="expiry-list" element={<ExpiryListPage />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
