import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AccountStatusContext = createContext(null);

const DEMO_MODE = true;

const DEMO_DATA = {
  status: "ACTIVE",
  depositAddress:
    "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  depositAmount: 0,
  confirmations: 0,
  requiredConfirmations: 12,
};

export function AccountStatusProvider({ children }) {
  const [status, setStatus] = useState("PENDING");
  const [depositAddress, setDepositAddress] = useState("");
  const [depositAmount, setDepositAmount] = useState(0);
  const [confirmations, setConfirmations] = useState(0);
  const [requiredConfirmations, setRequiredConfirmations] = useState(12);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshStatus = useCallback(async () => {
    try {
      setError("");

      if (DEMO_MODE) {
        setStatus(DEMO_DATA.status);
        setDepositAddress(DEMO_DATA.depositAddress);
        setDepositAmount(DEMO_DATA.depositAmount);
        setConfirmations(DEMO_DATA.confirmations);
        setRequiredConfirmations(DEMO_DATA.requiredConfirmations);

        setLoading(false);
        return;
      }

      const response = await fetch("/api/account/status", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Unable to fetch account status");
      }

      const data = await response.json();

      setStatus(data.status || "PENDING");
      setDepositAddress(data.depositAddress || "");
      setDepositAmount(Number(data.depositAmount || 0));
      setConfirmations(Number(data.confirmations || 0));
      setRequiredConfirmations(
        Number(data.requiredConfirmations || 12)
      );
    } catch (err) {
      console.error("Account status error:", err);
      setError(err.message || "Unable to load account status");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshStatus();

    const interval = setInterval(() => {
      refreshStatus();
    }, 10000);

    return () => clearInterval(interval);
  }, [refreshStatus]);

  const isActive = status === "ACTIVE";
  const isPending =
    status === "PENDING" ||
    status === "DEPOSIT_DETECTED" ||
    status === "CONFIRMING";

  const verificationProgress =
    requiredConfirmations > 0
      ? Math.min(
          (confirmations / requiredConfirmations) * 100,
          100
        )
      : 0;

  const value = {
    status,

    isActive,
    isPending,

    depositAddress,
    depositAmount,

    confirmations,
    requiredConfirmations,
    verificationProgress,

    loading,
    error,

    refreshStatus,

    asset: "USDT",
    network: "BEP20",
    networkName: "BNB Smart Chain",
  };

  return (
    <AccountStatusContext.Provider value={value}>
      {children}
    </AccountStatusContext.Provider>
  );
}

export function useAccountStatusContext() {
  const context = useContext(AccountStatusContext);

  if (!context) {
    throw new Error(
      "useAccountStatusContext must be used inside AccountStatusProvider"
    );
  }

  return context;
}