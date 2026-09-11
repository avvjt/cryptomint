import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const WALLET_KEY = "cryptomintx_wallet";
const HISTORY_KEY = "cryptomintx_trade_history";
const AUTO_TRADE_KEY = "cryptomintx_auto_trade";

const LOCKED_UNTIL_KEY = "cryptomintx_locked_until";
const AUTO_TRADE_BASE_KEY =
  "cryptomintx_auto_trade_base";
const AUTO_TRADE_RETURN_KEY =
  "cryptomintx_auto_trade_return";

const DEFAULT_BALANCE = 1520.5;

const AUTO_TRADE_LOCK_MS = 5 * 60 * 1000;
const AUTO_TRADE_COOLDOWN_MS =
  24 * 60 * 60 * 1000;

export default function useTradeWallet() {
  /*
   * --------------------------------------------------
   * BALANCE
   * --------------------------------------------------
   */

  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem(WALLET_KEY);

    if (saved === null) {
      return DEFAULT_BALANCE;
    }

    const parsed = Number(saved);

    return Number.isFinite(parsed)
      ? parsed
      : DEFAULT_BALANCE;
  });

  /*
   * --------------------------------------------------
   * TRADE HISTORY
   * --------------------------------------------------
   */

  const [tradeHistory, setTradeHistory] = useState(
    () => {
      try {
        const saved =
          localStorage.getItem(HISTORY_KEY);

        if (!saved) {
          return [];
        }

        const parsed = JSON.parse(saved);

        return Array.isArray(parsed)
          ? parsed
          : [];
      } catch {
        return [];
      }
    }
  );

  /*
   * --------------------------------------------------
   * LAST AUTO TRADE
   * --------------------------------------------------
   */

  const [lastAutoTrade, setLastAutoTrade] =
    useState(() => {
      const saved =
        localStorage.getItem(AUTO_TRADE_KEY);

      if (!saved) {
        return null;
      }

      const parsed = Number(saved);

      return Number.isFinite(parsed)
        ? parsed
        : null;
    });

  /*
   * --------------------------------------------------
   * LOCKED UNTIL
   * --------------------------------------------------
   */

  const [lockedUntil, setLockedUntil] =
    useState(() => {
      const saved =
        localStorage.getItem(
          LOCKED_UNTIL_KEY
        );

      if (!saved) {
        return null;
      }

      const parsed = Number(saved);

      if (!Number.isFinite(parsed)) {
        return null;
      }

      // Lock already finished.
      if (parsed <= Date.now()) {
        localStorage.removeItem(
          LOCKED_UNTIL_KEY
        );

        return null;
      }

      return parsed;
    });

  /*
   * --------------------------------------------------
   * AUTO TRADE BASE AMOUNT
   * --------------------------------------------------
   */

  const [autoTradeBase, setAutoTradeBase] =
    useState(() => {
      const saved =
        localStorage.getItem(
          AUTO_TRADE_BASE_KEY
        );

      if (!saved) {
        return null;
      }

      const parsed = Number(saved);

      return Number.isFinite(parsed)
        ? parsed
        : null;
    });

  /*
   * --------------------------------------------------
   * AUTO TRADE RETURN
   * --------------------------------------------------
   */

  const [
    autoTradeReturn,
    setAutoTradeReturn,
  ] = useState(() => {
    const saved =
      localStorage.getItem(
        AUTO_TRADE_RETURN_KEY
      );

    if (!saved) {
      return null;
    }

    const parsed = Number(saved);

    return Number.isFinite(parsed)
      ? parsed
      : null;
  });

  /*
   * --------------------------------------------------
   * LIVE CLOCK
   * --------------------------------------------------
   *
   * Updates every second.
   *
   * Used for:
   * - Lock countdown
   * - 24-hour Auto Trade cooldown
   */

  const [currentTime, setCurrentTime] =
    useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  /*
   * --------------------------------------------------
   * SAVE BALANCE
   * --------------------------------------------------
   */

  useEffect(() => {
    localStorage.setItem(
      WALLET_KEY,
      String(balance)
    );
  }, [balance]);

  /*
   * --------------------------------------------------
   * SAVE HISTORY
   * --------------------------------------------------
   */

  useEffect(() => {
    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(tradeHistory)
    );
  }, [tradeHistory]);

  /*
   * --------------------------------------------------
   * SAVE LAST AUTO TRADE
   * --------------------------------------------------
   */

  useEffect(() => {
    if (lastAutoTrade) {
      localStorage.setItem(
        AUTO_TRADE_KEY,
        String(lastAutoTrade)
      );
    }
  }, [lastAutoTrade]);

  /*
   * --------------------------------------------------
   * SAVE LOCK
   * --------------------------------------------------
   */

  useEffect(() => {
    if (lockedUntil) {
      localStorage.setItem(
        LOCKED_UNTIL_KEY,
        String(lockedUntil)
      );
    } else {
      localStorage.removeItem(
        LOCKED_UNTIL_KEY
      );
    }
  }, [lockedUntil]);

  /*
   * --------------------------------------------------
   * SAVE AUTO TRADE BASE
   * --------------------------------------------------
   */

  useEffect(() => {
    if (
      autoTradeBase !== null &&
      Number.isFinite(Number(autoTradeBase))
    ) {
      localStorage.setItem(
        AUTO_TRADE_BASE_KEY,
        String(autoTradeBase)
      );
    } else {
      localStorage.removeItem(
        AUTO_TRADE_BASE_KEY
      );
    }
  }, [autoTradeBase]);

  /*
   * --------------------------------------------------
   * SAVE AUTO TRADE RETURN
   * --------------------------------------------------
   */

  useEffect(() => {
    if (
      autoTradeReturn !== null &&
      Number.isFinite(Number(autoTradeReturn))
    ) {
      localStorage.setItem(
        AUTO_TRADE_RETURN_KEY,
        String(autoTradeReturn)
      );
    } else {
      localStorage.removeItem(
        AUTO_TRADE_RETURN_KEY
      );
    }
  }, [autoTradeReturn]);

  /*
   * --------------------------------------------------
   * RESTORE AUTO TRADE AFTER 5 MINUTES
   * --------------------------------------------------
   *
   * This survives page refresh.
   */

  useEffect(() => {
    if (!lockedUntil) {
      return;
    }

    const remaining =
      lockedUntil - Date.now();

    /*
     * Lock already finished while page
     * was closed.
     */

    if (remaining <= 0) {
      const base = Number(
        localStorage.getItem(
          AUTO_TRADE_BASE_KEY
        )
      );

      const profit = Number(
        localStorage.getItem(
          AUTO_TRADE_RETURN_KEY
        )
      );

      if (
        Number.isFinite(base) &&
        Number.isFinite(profit)
      ) {
        const restoredBalance =
          Number(
            (base + profit).toFixed(2)
          );

        setBalance(restoredBalance);
      }

      setLockedUntil(null);

      setAutoTradeBase(null);
      setAutoTradeReturn(null);

      localStorage.removeItem(
        AUTO_TRADE_BASE_KEY
      );

      localStorage.removeItem(
        AUTO_TRADE_RETURN_KEY
      );

      return;
    }

    /*
     * Wait until exact lock expiry.
     */

    const timer = window.setTimeout(() => {
      const base = Number(
        localStorage.getItem(
          AUTO_TRADE_BASE_KEY
        )
      );

      const profit = Number(
        localStorage.getItem(
          AUTO_TRADE_RETURN_KEY
        )
      );

      if (
        Number.isFinite(base) &&
        Number.isFinite(profit)
      ) {
        const restoredBalance =
          Number(
            (base + profit).toFixed(2)
          );

        setBalance(restoredBalance);
      }

      setLockedUntil(null);

      setAutoTradeBase(null);
      setAutoTradeReturn(null);

      localStorage.removeItem(
        AUTO_TRADE_BASE_KEY
      );

      localStorage.removeItem(
        AUTO_TRADE_RETURN_KEY
      );
    }, remaining);

    return () => {
      clearTimeout(timer);
    };
  }, [lockedUntil]);

  /*
   * --------------------------------------------------
   * ADD TRADE HISTORY
   * --------------------------------------------------
   */

  const addTrade = useCallback(
    ({
      symbol,
      type,
      amount,
      returnAmount = 0,
      packageName = null,
    }) => {
      const trade = {
        id: `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}`,

        symbol,

        type,

        amount: Number(amount),

        returnAmount:
          Number(returnAmount) || 0,

        packageName,

        status: "Completed",

        createdAt: Date.now(),
      };

      setTradeHistory((prev) => [
        trade,
        ...prev,
      ]);

      return trade;
    },
    []
  );

  /*
   * --------------------------------------------------
   * NORMAL TRADE
   * --------------------------------------------------
   */

  const executeTrade = useCallback(
    ({ symbol, amount }) => {
      const value = Number(amount);

      if (
        !Number.isFinite(value) ||
        value <= 0
      ) {
        return {
          success: false,
          message:
            "Invalid trade amount.",
        };
      }

      /*
       * Don't allow normal trading while
       * Auto Trade is active.
       */

      if (
        lockedUntil &&
        lockedUntil > Date.now()
      ) {
        return {
          success: false,
          message:
            "Your wallet is currently locked.",
        };
      }

      /*
       * Balance check.
       */

      if (value > balance) {
        return {
          success: false,
          message:
            "Insufficient wallet balance.",
        };
      }

      /*
       * Deduct balance.
       */

      setBalance((prev) =>
        Number(
          (prev - value).toFixed(2)
        )
      );

      /*
       * Add history.
       */

      addTrade({
        symbol,
        type: "Trade",
        amount: value,
      });

      return {
        success: true,
      };
    },
    [
      balance,
      lockedUntil,
      addTrade,
    ]
  );

  /*
   * --------------------------------------------------
   * AUTO TRADE
   * --------------------------------------------------
   */

  const startAutoTrade = useCallback(
    ({
      symbol,
      amount,
      packageName,
      dailyReturn,
    }) => {
      const value = Number(amount);
      const rate = Number(dailyReturn);

      /*
       * Validate amount.
       */

      if (
        !Number.isFinite(value) ||
        value <= 0
      ) {
        return {
          success: false,
          message:
            "Invalid amount.",
        };
      }

      /*
       * Validate return rate.
       */

      if (
        !Number.isFinite(rate) ||
        rate <= 0
      ) {
        return {
          success: false,
          message:
            "Invalid Auto Trade return.",
        };
      }

      /*
       * Don't allow another Auto Trade
       * while current one is processing.
       */

      if (
        lockedUntil &&
        lockedUntil > Date.now()
      ) {
        return {
          success: false,
          message:
            "Your wallet is currently being processed.",
        };
      }

      /*
       * Balance check.
       */

      if (value > balance) {
        return {
          success: false,
          message:
            "Insufficient wallet balance.",
        };
      }

      /*
       * 24-hour restriction.
       */

      const now = Date.now();

      if (
        lastAutoTrade &&
        now - lastAutoTrade <
          AUTO_TRADE_COOLDOWN_MS
      ) {
        return {
          success: false,
          message:
            "Auto Trade is already used today.",
        };
      }

      /*
       * Calculate fixed return.
       *
       * Example:
       *
       * $1,000 × 3% = $30
       *
       * Final:
       *
       * $1,030
       *
       * No compounding.
       */

      const returnAmount =
        Number(
          (value * rate).toFixed(2)
        );

      /*
       * 5-minute lock.
       */

      const lockedUntilTime =
        now + AUTO_TRADE_LOCK_MS;

      /*
       * Store recovery information.
       */

      localStorage.setItem(
        AUTO_TRADE_BASE_KEY,
        String(value)
      );

      localStorage.setItem(
        AUTO_TRADE_RETURN_KEY,
        String(returnAmount)
      );

      /*
       * IMPORTANT:
       *
       * Update React state immediately.
       *
       * This makes Dashboard and Trade UI
       * update without refreshing.
       */

      setAutoTradeBase(value);
      setAutoTradeReturn(returnAmount);

      /*
       * Wallet becomes temporarily unavailable.
       */

      setBalance(0);

      setLockedUntil(
        lockedUntilTime
      );

      /*
       * Mark Auto Trade as used.
       */

      setLastAutoTrade(now);

      /*
       * Add history.
       */

      addTrade({
        symbol,
        type: "Auto Trade",
        amount: value,
        returnAmount,
        packageName,
      });

      return {
        success: true,
        returnAmount,
      };
    },
    [
      balance,
      lastAutoTrade,
      lockedUntil,
      addTrade,
    ]
  );

  /*
   * --------------------------------------------------
   * CAN AUTO TRADE
   * --------------------------------------------------
   */

  const canAutoTrade = useMemo(() => {
    if (!lastAutoTrade) {
      return true;
    }

    return (
      currentTime - lastAutoTrade >=
      AUTO_TRADE_COOLDOWN_MS
    );
  }, [
    lastAutoTrade,
    currentTime,
  ]);

  /*
   * --------------------------------------------------
   * DERIVED WALLET STATE
   * --------------------------------------------------
   */

  const isLocked =
    Boolean(lockedUntil) &&
    Number(lockedUntil) > currentTime;

  const numericBalance =
    Number(balance) || 0;

  const availableBalance = isLocked
    ? 0
    : numericBalance;

  const lockedBalance = isLocked
    ? numericBalance
    : 0;

  const lockRemaining = isLocked
    ? Math.max(
        0,
        Number(lockedUntil) -
          currentTime
      )
    : 0;

  /*
   * --------------------------------------------------
   * FORMAT LOCK TIMER
   * --------------------------------------------------
   */

  const formatDuration = useCallback(
    (milliseconds) => {
      const totalSeconds = Math.ceil(
        Math.max(0, milliseconds) / 1000
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
   * --------------------------------------------------
   * RETURN API
   * --------------------------------------------------
   */

  return {
    /*
     * Wallet
     */
    balance,
    availableBalance,
    lockedBalance,

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

    /*
     * Auto Trade
     */
    canAutoTrade,
    lastAutoTrade,
    autoTradeBase,
    autoTradeReturn,

    /*
     * Actions
     */
    executeTrade,
    startAutoTrade,
  };
}