import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute() {
  const location = useLocation();
  const { loading, session } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-page">
        <div className="rounded-[28px] border border-[rgba(15,23,42,0.07)] bg-white px-8 py-7 text-center shadow-soft">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[rgba(14,165,233,0.16)] border-t-brand-primary" />
          <p className="mt-4 text-sm font-semibold text-text-primary">
            Restoring secure session
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
