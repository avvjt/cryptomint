import {
  useCallback,
  useEffect,
  useState,
} from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000";

const getHeaders = () => {
  const token = localStorage.getItem("token");

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

      const response = await fetch(
        `${API_BASE_URL}/api/dashboard`,
        {
          method: "GET",
          headers: getHeaders(),
          cache: "no-store",
        }
      );

      const data = await response.json();

      console.log(
        "🔥 DASHBOARD RESPONSE:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to load dashboard."
        );
      }

      const dashboardData =
        data?.dashboard || null;

      console.log(
        "💰 AVAILABLE BALANCE:",
        dashboardData?.wallet?.availableBalance
      );

      console.log(
        "🔒 LOCKED BALANCE:",
        dashboardData?.wallet?.lockedBalance
      );

      console.log(
        "💰 TOTAL BALANCE:",
        dashboardData?.wallet?.totalBalance
      );

      setDashboard(dashboardData);

      return dashboardData;
    } catch (error) {
      console.error(
        "❌ Dashboard API error:",
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