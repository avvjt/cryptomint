import {
  useCallback,
  useEffect,
  useState,
} from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000";

const getHeaders = () => {
  const token =
    localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export default function useDashboard() {
  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchDashboard =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(
            `${API_BASE_URL}/api/dashboard`,
            {
              method: "GET",
              headers: getHeaders(),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to load dashboard."
          );
        }

        setDashboard(
          data.dashboard || null
        );

        return data.dashboard;
      } catch (error) {
        console.error(
          "Dashboard API error:",
          error
        );

        setError(
          error.message ||
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
    refreshDashboard:
      fetchDashboard,
  };
}