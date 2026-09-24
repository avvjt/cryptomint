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
   * COUNTDOWN CLOCK
   * ============================================================
   */

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  /*
   * ============================================================
   * FETCH WALLET
   * ============================================================
   */

  const fetchWallet = useCallback(async () => {
    try {
      const headers = getAuthHeaders();

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

      const walletData =
        data?.wallet || null;

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

        const data =
          await response.json();

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

        const trades =
          Array.isArray(data?.trades)
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

  const refresh = useCallback(
    async () => {
      const token =
        localStorage.getItem("token");

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
    },
    [
      fetchWallet,
      fetchTradeHistory,
    ]
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  /*
   * ============================================================
   * BALANCES
   * ============================================================
   */

  const balance = Number(
    wallet?.availableBalance ?? 0
  );

  const availableBalance =
    balance;

  const lockedBalance = Number(
    wallet?.lockedBalance ?? 0
  );

  const totalBalance = Number(
    wallet?.totalBalance ??
      availableBalance +
        lockedBalance
  );

  /*
   * ============================================================
   * BACKEND AUTO TRADE STATE
   * ============================================================
   */

  const processingUntil =
    wallet?.processingUntil
      ? new Date(
          wallet.processingUntil
        ).getTime()
      : null;

  const cooldownUntil =
    wallet?.cooldownUntil
      ? new Date(
          wallet.cooldownUntil
        ).getTime()
      : null;

  /*
   * ============================================================
   * 5 MINUTE PROCESSING COUNTDOWN
   * ============================================================
   */

  const processingRemaining =
    processingUntil &&
    processingUntil > now
      ? processingUntil - now
      : 0;

  /*
   * ============================================================
   * 24 HOUR COOLDOWN COUNTDOWN
   * ============================================================
   */

  const cooldownRemaining =
    cooldownUntil &&
    cooldownUntil > now
      ? cooldownUntil - now
      : 0;

  const isLocked =
    processingRemaining > 0;

  const isCooldown =
    cooldownRemaining > 0;

  const lockRemaining =
    processingRemaining;

  /*
   * ============================================================
   * FORMAT DURATION
   * ============================================================
   */

  const formatDuration =
    useCallback(
      (milliseconds) => {
        const totalSeconds =
          Math.ceil(
            Math.max(
              0,
              milliseconds || 0
            ) / 1000
          );

        const hours =
          Math.floor(
            totalSeconds / 3600
          );

        const minutes =
          Math.floor(
            (totalSeconds % 3600) / 60
          );

        const seconds =
          totalSeconds % 60;

        return `${String(
          hours
        ).padStart(
          2,
          "0"
        )}:${String(
          minutes
        ).padStart(
          2,
          "0"
        )}:${String(
          seconds
        ).padStart(
          2,
          "0"
        )}`;
      },
      []
    );

  /*
   * ============================================================
   * AUTO TRADE STATUS
   *
   * Backend is authoritative.
   * ============================================================
   */

  const backendCanAutoTrade =
    wallet?.autoTrade
      ?.canAutoTrade === true;

  const canAutoTrade =
    backendCanAutoTrade &&
    !isLocked &&
    !isCooldown &&
    !processing;

  const autoTradeStatus =
    isLocked
      ? "PROCESSING"
      : isCooldown
      ? "COOLDOWN"
      : balance <= 0
      ? "NO_BALANCE"
      : "AVAILABLE";

  /*
   * ============================================================
   * POLL WHILE PROCESSING
   *
   * Backend finalizer checks expired trades.
   * Refresh every 5 seconds so UI gets the result.
   * ============================================================
   */

  useEffect(() => {
    if (!processingUntil) {
      return;
    }

    const interval =
      window.setInterval(() => {
        fetchWallet();
        fetchTradeHistory();
      }, 5000);

    return () => {
      window.clearInterval(
        interval
      );
    };
  }, [
    processingUntil,
    fetchWallet,
    fetchTradeHistory,
  ]);

  /*
   * ============================================================
   * REFRESH WHEN PROCESSING TIMER ENDS
   * ============================================================
   */

  useEffect(() => {
    if (
      processingUntil &&
      processingRemaining <= 0
    ) {
      fetchWallet();
      fetchTradeHistory();
    }
  }, [
    processingUntil,
    processingRemaining,
    fetchWallet,
    fetchTradeHistory,
  ]);

  /*
   * ============================================================
   * REFRESH WHEN COOLDOWN ENDS
   * ============================================================
   */

  useEffect(() => {
    if (
      cooldownUntil &&
      cooldownRemaining <= 0
    ) {
      fetchWallet();
      fetchTradeHistory();
    }
  }, [
    cooldownUntil,
    cooldownRemaining,
    fetchWallet,
    fetchTradeHistory,
  ]);

  /*
   * ============================================================
   * MANUAL TRADE
   *
   * Kept here for backend compatibility.
   * Trade.jsx will no longer call it.
   * ============================================================
   */

  const executeTrade =
    useCallback(
      async ({ symbol } = {}) => {
        if (processing) {
          return {
            success: false,
            message:
              "A trade is already being processed.",
          };
        }

        const headers =
          getAuthHeaders();

        if (!headers) {
          return {
            success: false,
            message:
              "Please login first.",
          };
        }

        setProcessing(true);
        setError("");

        try {
          const response =
            await fetch(
              `${API_BASE_URL}/api/trade/manual`,
              {
                method: "POST",
                headers,
                body: JSON.stringify({
                  symbol:
                    symbol || null,
                }),
              }
            );

          const data =
            await response.json();

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

  const startAutoTrade =
    useCallback(
      async ({ symbol } = {}) => {
        if (processing) {
          return {
            success: false,
            message:
              "A trade is already being processed.",
          };
        }

        if (isLocked) {
          return {
            success: false,
            message:
              "Auto Trade is currently processing.",
          };
        }

        if (isCooldown) {
          return {
            success: false,
            message:
              `Auto Trade is unavailable for ${formatDuration(
                cooldownRemaining
              )}.`,
          };
        }

        if (balance <= 0) {
          return {
            success: false,
            message:
              "Insufficient available balance.",
          };
        }

        const headers =
          getAuthHeaders();

        if (!headers) {
          return {
            success: false,
            message:
              "Please login first.",
          };
        }

        setProcessing(true);
        setError("");

        try {
          const response =
            await fetch(
              `${API_BASE_URL}/api/trade/auto`,
              {
                method: "POST",
                headers,
                body: JSON.stringify({
                  symbol:
                    symbol || null,
                }),
              }
            );

          const data =
            await response.json();

          if (!response.ok) {
            const message =
              data?.message ||
              "Unable to start Auto Trade.";

            setError(message);

            /*
             * Refresh in case backend state
             * changed before the error response.
             */
            await fetchWallet();

            return {
              success: false,
              message,
            };
          }

          setLastTrade(
            data?.trade || null
          );

          /*
           * IMPORTANT:
           *
           * Auto Trade is now PROCESSING.
           * Refresh wallet so frontend gets
           * processingUntil immediately.
           */
          await Promise.all([
            fetchWallet(),
            fetchTradeHistory(),
          ]);

          return {
            success: true,
            message:
              data?.message ||
              "Auto Trade started.",
            trade: data?.trade,
            earning: data?.earning,
            processingUntil:
              data?.processingUntil ||
              null,
            cooldownUntil:
              data?.cooldownUntil ||
              null,
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
        isLocked,
        isCooldown,
        cooldownRemaining,
        balance,
        formatDuration,
        fetchWallet,
        fetchTradeHistory,
      ]
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

    /*
     * Processing / 5 minute lock
     */
    lockedUntil:
      wallet?.processingUntil ||
      null,

    processingUntil:
      wallet?.processingUntil ||
      null,

    isLocked,

    lockRemaining,

    processingRemaining,

    processingTime:
      formatDuration(
        processingRemaining
      ),

    /*
     * 24 hour cooldown
     */
    cooldownUntil:
      wallet?.cooldownUntil ||
      null,

    isCooldown,

    cooldownRemaining,

    cooldownTimeRemaining:
      cooldownRemaining,

    cooldownTime:
      formatDuration(
        cooldownRemaining
      ),

    /*
     * Auto Trade
     */
    canAutoTrade,

    autoTradeStatus,

    /*
     * History
     */
    tradeHistory,
    lastTrade,

    /*
     * Actions
     */
    executeTrade,
    startAutoTrade,

    /*
     * Refresh
     */
    refresh,
    fetchWallet,
    fetchTradeHistory,

    /*
     * Utility
     */
    formatDuration,
  };
}