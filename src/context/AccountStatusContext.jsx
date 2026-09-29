import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { WALLET_CONFIG } from "../config/walletConfig";

const AccountStatusContext = createContext(null);

export function AccountStatusProvider({ children }) {
  const [status, setStatus] = useState("PENDING");
  const [depositAddress, setDepositAddress] = useState("");
  const [depositAmount, setDepositAmount] = useState(0);
  const [confirmations, setConfirmations] = useState(0);
  const [requiredConfirmations, setRequiredConfirmations] =
    useState(12);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshStatus = useCallback(async () => {
    try {
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setStatus("PENDING");
        setDepositAddress("");
        setDepositAmount(0);
        setConfirmations(0);
        setLoading(false);
        return;
      }

      // ==========================================
      // FETCH USER STATUS
      // ==========================================

      const userResponse = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/me`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (userResponse.status === 401) {
        localStorage.removeItem("token");

        setStatus("PENDING");
        setDepositAddress("");
        setLoading(false);

        return;
      }

      if (!userResponse.ok) {
        throw new Error(
          "Unable to fetch account status"
        );
      }

      const userData = await userResponse.json();
      const user = userData.user;

      setStatus(
        user?.accountStatus || "PENDING"
      );

      // ==========================================
      // FETCH WALLET
      // ==========================================

      const walletResponse = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/wallet`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!walletResponse.ok) {
        throw new Error("Unable to fetch wallet");
      }

      const walletData =
        await walletResponse.json();

      const wallet = walletData.wallet;

      // ==========================================
      // FIXED CLIENT DEPOSIT ADDRESS
      // ==========================================

      setDepositAddress(
        WALLET_CONFIG.depositAddress
      );

      // ==========================================
      // OLD BLOCKCHAIN VERIFICATION VALUES
      // ==========================================
      // These will be replaced by the new
      // manual admin approval system later.

      setDepositAmount(0);
      setConfirmations(0);
      setRequiredConfirmations(12);

    } catch (err) {
      console.error(
        "Account status error:",
        err
      );

      setError(
        err.message ||
          "Unable to load account status"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================
  // INITIAL LOAD + AUTO REFRESH
  // ==========================================

  useEffect(() => {
    refreshStatus();

    const interval = setInterval(() => {
      refreshStatus();
    }, 10000);

    return () => clearInterval(interval);
  }, [refreshStatus]);

  // ==========================================
  // ACCOUNT STATE
  // ==========================================

  const isActive =
    status === "ACTIVE";

  const isPending =
    status === "PENDING" ||
    status === "DEPOSIT_DETECTED" ||
    status === "CONFIRMING";

  // ==========================================
  // VERIFICATION PROGRESS
  // ==========================================

  const verificationProgress =
    requiredConfirmations > 0
      ? Math.min(
          (confirmations /
            requiredConfirmations) *
            100,
          100
        )
      : 0;

  // ==========================================
  // CONTEXT VALUE
  // ==========================================

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
    <AccountStatusContext.Provider
      value={value}
    >
      {children}
    </AccountStatusContext.Provider>
  );
}

export function useAccountStatusContext() {
  const context =
    useContext(AccountStatusContext);

  if (!context) {
    throw new Error(
      "useAccountStatusContext must be used inside AccountStatusProvider"
    );
  }

  return context;
}