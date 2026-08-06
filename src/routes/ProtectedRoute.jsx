import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SplashScreen from "../components/SplashScreen";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}