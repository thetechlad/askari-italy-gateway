import { Navigate, Outlet } from "react-router-dom";
import { usePortalAuth } from "@/contexts/PortalAuthContext";

export function ProtectedRoute() {
  const { isAuthenticated, isChecking } = usePortalAuth();

  if (isChecking) return null;
  if (!isAuthenticated) return <Navigate to="/portal/login" replace />;

  return <Outlet />;
}
