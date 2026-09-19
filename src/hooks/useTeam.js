import { useCallback, useEffect, useState } from "react";
import { TEAM_CONFIG } from "../config/teamConfig";

const DEMO_MODE = true;

const DEMO_TEAM = {
  level: 2,

  referralCode: "ABHI8X92",

  stats: {
    levelA: 3,
    levelB: 2,
    levelC: 3,
    total: 8,
  },

  progress: {
    nextLevel: 3,
    requiredA: 6,
    requiredBC: 20,
    requiredTotal: 26,
  },

  commission: {
    levelA: 12,
    levelB: 5,
    levelC: 2,
  },

  income: {
    today: 24.5,
    levelA: 18,
    levelB: 4.5,
    levelC: 2,
  },

  referralBonus: {
    rate: 5,
    earned: 0,
  },
};

export function useTeam() {
  const [team, setTeam] = useState(null);

  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [membersLoading, setMembersLoading] =
    useState(false);

  const [error, setError] = useState("");

  const fetchTeam = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      if (DEMO_MODE) {
        await new Promise((resolve) =>
          window.setTimeout(resolve, 300)
        );

        setTeam(DEMO_TEAM);

        return;
      }

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        TEAM_CONFIG.api.overview,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

      setTeam(data);
    } catch (err) {
      setError(
        err.message ||
          "Unable to load team information."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMembers = useCallback(
    async (level) => {
      setMembersLoading(true);

      try {
        if (DEMO_MODE) {
          const demoMembers = {
            A: [
              {
                id: "a1",
                name: "Rahul",
                username: "@rahul",
                level: "A",
                status: "ACTIVE",
                todayEarning: 120,
              },
              {
                id: "a2",
                name: "Sourav",
                username: "@sourav",
                level: "A",
                status: "ACTIVE",
                todayEarning: 85,
              },
              {
                id: "a3",
                name: "Arjun",
                username: "@arjun",
                level: "A",
                status: "ACTIVE",
                todayEarning: 65,
              },
            ],

            B: [
              {
                id: "b1",
                name: "Amit",
                username: "@amit",
                level: "B",
                status: "ACTIVE",
                todayEarning: 70,
              },
              {
                id: "b2",
                name: "Rohit",
                username: "@rohit",
                level: "B",
                status: "ACTIVE",
                todayEarning: 20,
              },
            ],

            C: [
              {
                id: "c1",
                name: "Karan",
                username: "@karan",
                level: "C",
                status: "ACTIVE",
                todayEarning: 45,
              },
              {
                id: "c2",
                name: "Vikash",
                username: "@vikash",
                level: "C",
                status: "ACTIVE",
                todayEarning: 25,
              },
              {
                id: "c3",
                name: "Nikhil",
                username: "@nikhil",
                level: "C",
                status: "ACTIVE",
                todayEarning: 30,
              },
            ],
          };

          setMembers(
            demoMembers[level] || []
          );

          return;
        }

        const token =
          localStorage.getItem("token");

        const response = await fetch(
          `${TEAM_CONFIG.api.members}?level=${level}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
      } finally {
        setMembersLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

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