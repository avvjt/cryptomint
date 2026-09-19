import { useCallback, useEffect, useState } from "react";
import { TEAM_CONFIG } from "../config/teamConfig";

const DEMO_MODE = false;

export function useTeam() {
  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [membersLoading, setMembersLoading] = useState(false);
  const [error, setError] = useState("");

  // ================================
  // FETCH TEAM OVERVIEW
  // ================================
  const fetchTeam = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      if (DEMO_MODE) {
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch(
        TEAM_CONFIG.api.overview,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to load team information."
        );
      }

      // Supports both:
      // { team: {...} }
      // and directly returned { level, stats, ... }
      setTeam(data.team || data);
    } catch (err) {
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
  const fetchMembers = useCallback(
    async (level) => {
      setMembersLoading(true);
      setError("");

      try {
        if (DEMO_MODE) {
          return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found.");
        }

        const response = await fetch(
          `${TEAM_CONFIG.api.members}?level=${level}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to load team members."
          );
        }

        setMembers(data.members || []);
      } catch (err) {
        setError(
          err.message ||
            "Unable to load team members."
        );
        setMembers([]);
      } finally {
        setMembersLoading(false);
      }
    },
    []
  );

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