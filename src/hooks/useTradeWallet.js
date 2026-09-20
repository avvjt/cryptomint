import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://backendxmint.onrender.com";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export default function useTradeWallet() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const [tradeHistory, setTradeHistory] = useState([]);
  const [lastTrade, setLastTrade] = useState(null);

  /*
   * ============================================================
   * FETCH WALLET
   * ============================================================
   */

  const fetchWallet = useCallback(async () => {
    try {
      const headers = getAuthHeaders();

      // User is not logged in
      if (!headers) {
        setWallet(null);
        return null;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/wallet`,
        {
          method: "GET",
          headers,
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setWallet(null);
          return null;
        }

        throw new Error(
          data?.message ||
            "Failed to load wallet."
        );
      }

      const walletData = data?.wallet || null;

      setWallet(walletData);

      return walletData;
    } catch (err) {
      console.error(
        "Wallet fetch error:",
        err
      );

      setError(
        err?.message ||
          "Failed to load wallet."
      );

      return null;
    }
  }, []);

  /*
   * ============================================================
   * FETCH TRADE HISTORY
   * ============================================================
   */

  const fetchTradeHistory = useCallback(
    async () => {
      try {
        const headers = getAuthHeaders();

        if (!headers) {
          setTradeHistory([]);
          return [];
        }

        const response = await fetch(
          `${API_BASE_URL}/api/trade/history`,
          {
            method: "GET",
            headers,
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            setTradeHistory([]);
            return [];
          }

          throw new Error(
            data?.message ||
              "Failed to load trade history."
          );
        }

        const trades = Array.isArray(
          data?.trades
        )
          ? data.trades
          : [];

        setTradeHistory(trades);

        return trades;
      } catch (err) {
        console.error(
          "Trade history error:",
          err
        );

        return [];
      }
    },
    []
  );

  /*
   * ============================================================
   * REFRESH
   * ============================================================
   */

  const refresh = useCallback(async () => {
    const token = localStorage.getItem("token");

    // Not logged in
    if (!token) {
      setWallet(null);
      setTradeHistory([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await Promise.all([
        fetchWallet(),
        fetchTradeHistory(),
      ]);
    } finally {
      setLoading(false);
    }
  }, [
    fetchWallet,
    fetchTradeHistory,
  ]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  /*
   * ============================================================
   * MANUAL TRADE
   * ============================================================
   */

  const executeTrade = useCallback(
    async ({ symbol } = {}) => {
      if (processing) {
        return {
          success: false,
          message:
            "A trade is already being processed.",
        };
      }

      const headers = getAuthHeaders();

      if (!headers) {
        return {
          success: false,
          message: "Please login first.",
        };
      }

      setProcessing(true);
      setError("");

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/trade/manual`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              symbol: symbol || null,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          const message =
            data?.message ||
            "Unable to complete trade.";

          setError(message);

          return {
            success: false,
            message,
          };
        }

        setLastTrade(
          data?.trade || null
        );

        await Promise.all([
          fetchWallet(),
          fetchTradeHistory(),
        ]);

        return {
          success: true,
          message:
            data?.message ||
            "Trade completed.",
          trade: data?.trade,
          earning: data?.earning,
        };
      } catch (err) {
        console.error(
          "Execute trade error:",
          err
        );

        const message =
          err?.message ||
          "Unable to complete trade.";

        setError(message);

        return {
          success: false,
          message,
        };
      } finally {
        setProcessing(false);
      }
    },
    [
      processing,
      fetchWallet,
      fetchTradeHistory,
    ]
  );

  /*
   * ============================================================
   * AUTO TRADE
   * ============================================================
   */

  const startAutoTrade = useCallback(
    async ({ symbol } = {}) => {
      if (processing) {
        return {
          success: false,
          message:
            "A trade is already being processed.",
        };
      }

      const headers = getAuthHeaders();

      if (!headers) {
        return {
          success: false,
          message: "Please login first.",
        };
      }

      setProcessing(true);
      setError("");

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/trade/auto`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              symbol: symbol || null,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          const message =
            data?.message ||
            "Unable to start Auto Trade.";

          setError(message);

          return {
            success: false,
            message,
          };
        }

        setLastTrade(
          data?.trade || null
        );

        await Promise.all([
          fetchWallet(),
          fetchTradeHistory(),
        ]);

        return {
          success: true,
          message:
            data?.message ||
            "Auto Trade completed.",
          trade: data?.trade,
          earning: data?.earning,
        };
      } catch (err) {
        console.error(
          "Auto Trade error:",
          err
        );

        const message =
          err?.message ||
          "Unable to start Auto Trade.";

        setError(message);

        return {
          success: false,
          message,
        };
      } finally {
        setProcessing(false);
      }
    },
    [
      processing,
      fetchWallet,
      fetchTradeHistory,
    ]
  );

  /*
   * ============================================================
   * BALANCES
   * ============================================================
   */

  const balance = Number(
    wallet?.availableBalance ?? 0
  );

  const availableBalance = balance;

  const lockedBalance = Number(
    wallet?.lockedBalance ?? 0
  );

  const totalBalance =
    availableBalance + lockedBalance;

  /*
   * ============================================================
   * DAILY TRADE STATUS
   * ============================================================
   */

  const today = useMemo(() => {
    return new Date()
      .toISOString()
      .slice(0, 10);
  }, []);

  const todayTrade =
    tradeHistory.find(
      (trade) =>
        trade.date === today &&
        trade.status === "COMPLETED"
    );

  const canAutoTrade =
    !todayTrade && !processing;

  const lockedUntil = null;
  const isLocked = false;
  const lockRemaining = 0;

  const formatDuration = useCallback(
    (milliseconds) => {
      const totalSeconds = Math.ceil(
        Math.max(
          0,
          milliseconds
        ) / 1000
      );

      const minutes = Math.floor(
        totalSeconds / 60
      );

      const seconds =
        totalSeconds % 60;

      return `${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    },
    []
  );

  /*
   * ============================================================
   * RETURN
   * ============================================================
   */

  return {
    wallet,

    balance,
    availableBalance,
    lockedBalance,
    totalBalance,

    loading,
    processing,
    error,

    lockedUntil,
    isLocked,
    lockRemaining,
    formatDuration,

    tradeHistory,
    lastTrade,

    canAutoTrade,

    executeTrade,
    startAutoTrade,

    refresh,
    fetchWallet,
    fetchTradeHistory,
  };
}