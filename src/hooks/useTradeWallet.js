import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000";

const getAuthHeaders = () => {
  const token =
    localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export default function useTradeWallet() {
  /*
  |--------------------------------------------------------------------------
  | WALLET
  |--------------------------------------------------------------------------
  */

  const [wallet, setWallet] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [processing, setProcessing] =
    useState(false);

  const [error, setError] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | TRADE HISTORY
  |--------------------------------------------------------------------------
  */

  const [tradeHistory, setTradeHistory] =
    useState([]);

  /*
  |--------------------------------------------------------------------------
  | LAST TRADE
  |--------------------------------------------------------------------------
  */

  const [lastTrade, setLastTrade] =
    useState(null);

  /*
  |--------------------------------------------------------------------------
  | FETCH WALLET
  |--------------------------------------------------------------------------
  */

  const fetchWallet = useCallback(
    async () => {
      try {
        const response =
          await fetch(
            `${API_BASE_URL}/api/wallet`,
            {
              method: "GET",
              headers:
                getAuthHeaders(),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to load wallet."
          );
        }

        setWallet(
          data.wallet || null
        );

        return data.wallet;
      } catch (err) {
        console.error(
          "Wallet fetch error:",
          err
        );

        setError(
          err.message ||
            "Failed to load wallet."
        );

        return null;
      }
    },
    []
  );

  /*
  |--------------------------------------------------------------------------
  | FETCH TRADE HISTORY
  |--------------------------------------------------------------------------
  */

  const fetchTradeHistory =
    useCallback(async () => {
      try {
        const response =
          await fetch(
            `${API_BASE_URL}/api/trade/history`,
            {
              method: "GET",
              headers:
                getAuthHeaders(),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to load trade history."
          );
        }

        setTradeHistory(
          Array.isArray(data.trades)
            ? data.trades
            : []
        );

        return data.trades || [];
      } catch (err) {
        console.error(
          "Trade history error:",
          err
        );

        return [];
      }
    }, []);

  /*
  |--------------------------------------------------------------------------
  | INITIAL LOAD
  |--------------------------------------------------------------------------
  */

  const refresh = useCallback(
    async () => {
      setLoading(true);
      setError("");

      await Promise.all([
        fetchWallet(),
        fetchTradeHistory(),
      ]);

      setLoading(false);
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
  |--------------------------------------------------------------------------
  | REAL MANUAL TRADE
  |--------------------------------------------------------------------------
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

      setProcessing(true);
      setError("");

      try {
        const response =
          await fetch(
            `${API_BASE_URL}/api/trade/manual`,
            {
              method: "POST",
              headers:
                getAuthHeaders(),
              body: JSON.stringify({
                symbol:
                  symbol || null,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          return {
            success: false,
            message:
              data.message ||
              "Unable to complete trade.",
          };
        }

        setLastTrade(
          data.trade || null
        );

        /*
         * Backend is the source of truth.
         * Reload wallet after trade.
         */
        await Promise.all([
          fetchWallet(),
          fetchTradeHistory(),
        ]);

        return {
          success: true,
          message:
            data.message ||
            "Trade completed.",
          trade: data.trade,
          earning: data.earning,
        };
      } catch (err) {
        console.error(
          "Execute trade error:",
          err
        );

        return {
          success: false,
          message:
            err.message ||
            "Unable to complete trade.",
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
  |--------------------------------------------------------------------------
  | REAL AUTO TRADE
  |--------------------------------------------------------------------------
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

        setProcessing(true);
        setError("");

        try {
          const response =
            await fetch(
              `${API_BASE_URL}/api/trade/auto`,
              {
                method: "POST",
                headers:
                  getAuthHeaders(),
                body: JSON.stringify({
                  symbol:
                    symbol || null,
                }),
              }
            );

          const data =
            await response.json();

          if (!response.ok) {
            return {
              success: false,
              message:
                data.message ||
                "Unable to start Auto Trade.",
            };
          }

          setLastTrade(
            data.trade || null
          );

          await Promise.all([
            fetchWallet(),
            fetchTradeHistory(),
          ]);

          return {
            success: true,
            message:
              data.message ||
              "Auto Trade completed.",
            trade: data.trade,
            earning: data.earning,
          };
        } catch (err) {
          console.error(
            "Auto Trade error:",
            err
          );

          return {
            success: false,
            message:
              err.message ||
              "Unable to start Auto Trade.",
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
  |--------------------------------------------------------------------------
  | BALANCES
  |--------------------------------------------------------------------------
  */

  const balance = Number(
    wallet?.availableBalance || 0
  );

  const availableBalance = balance;

  const lockedBalance = Number(
    wallet?.lockedBalance || 0
  );

  /*
  |--------------------------------------------------------------------------
  | DAILY TRADE STATUS
  |--------------------------------------------------------------------------
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
        trade.status ===
          "COMPLETED"
    );

  const canAutoTrade =
    !todayTrade && !processing;

  /*
  |--------------------------------------------------------------------------
  | CURRENT LOCK
  |--------------------------------------------------------------------------
  |
  | Your current backend does not create a
  | 5-minute wallet lock. Therefore don't fake
  | one in the frontend.
  |
  */

  const lockedUntil = null;

  const isLocked = false;

  const lockRemaining = 0;

  const formatDuration =
    useCallback(
      (milliseconds) => {
        const totalSeconds =
          Math.ceil(
            Math.max(
              0,
              milliseconds
            ) / 1000
          );

        const minutes =
          Math.floor(
            totalSeconds / 60
          );

        const seconds =
          totalSeconds % 60;

        return `${String(
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
  |--------------------------------------------------------------------------
  | RETURN
  |--------------------------------------------------------------------------
  */

  return {
    /*
     * Wallet
     */
    wallet,
    balance,
    availableBalance,
    lockedBalance,

    /*
     * Loading
     */
    loading,
    processing,
    error,

    /*
     * Lock
     */
    lockedUntil,
    isLocked,
    lockRemaining,
    formatDuration,

    /*
     * History
     */
    tradeHistory,
    lastTrade,

    /*
     * Auto Trade
     */
    canAutoTrade,

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
  };
}