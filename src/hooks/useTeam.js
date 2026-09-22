import { useCallback, useEffect, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://backendxmint.onrender.com";

export function useTeam() {
  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [membersLoading, setMembersLoading] = useState(false);
  const [error, setError] = useState("");

  // ================================
  // AUTH HEADERS
  // ================================
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  // ================================
  // FETCH TEAM OVERVIEW
  // ================================
  const fetchTeam = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/team`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      const contentType =
        response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error(
          `Invalid API response from ${API_BASE_URL}/api/team`
        );
      }

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Session expired. Please log in again.");
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to load team information."
        );
      }

      setTeam(data.team || data);
    } catch (err) {
      console.error("Team overview error:", err);

      setError(
        err.message ||
          "Unable to load team information."
      );

      setTeam(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // ================================
  // FETCH TEAM MEMBERS
  // ================================
  const fetchMembers = useCallback(async (level) => {
    setMembersLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/team/members?level=${encodeURIComponent(level)}`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      const contentType =
        response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error(
          `Invalid API response from ${API_BASE_URL}/api/team/members`
        );
      }

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Session expired. Please log in again.");
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to load team members."
        );
      }

      setMembers(
        Array.isArray(data.members)
          ? data.members
          : []
      );
    } catch (err) {
      console.error("Team members error:", err);

      setError(
        err.message ||
          "Unable to load team members."
      );

      setMembers([]);
    } finally {
      setMembersLoading(false);
    }
  }, []);

  // ================================
  // INITIAL LOAD
  // ================================
  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  // ================================
  // RETURN
  // ================================
  return {
    team,
    members,
    loading,
    membersLoading,
    error,

    refreshTeam: fetchTeam,
    fetchMembers,
  };
}