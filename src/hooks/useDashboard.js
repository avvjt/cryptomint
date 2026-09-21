import {
  useCallback,
  useEffect,
  useState,
} from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://backendxmint.onrender.com";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export default function useDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Authentication token not found."
        );
      }

      const headers = getHeaders();

if (!headers) {
  setDashboard(null);
  setLoading(false);
  return null;
}

      const response = await fetch(
        `${API_BASE_URL}/api/dashboard`,
        {
          method: "GET",
          headers: getHeaders(),
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to load dashboard."
        );
      }

      const dashboardData =
        data?.dashboard || null;

      setDashboard(dashboardData);

      return dashboardData;
    } catch (error) {
      console.error(
        " Dashboard API error:",
        error
      );

      setDashboard(null);

      setError(
        error?.message ||
          "Failed to load dashboard."
      );

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboard,
    loading,
    error,
    refreshDashboard: fetchDashboard,
  };
}