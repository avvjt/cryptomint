import { useCallback, useEffect, useState } from "react";
import { DEPOSIT_CONFIG } from "../config/depositConfig";

const DEMO_MODE = true;

export default function useAccountStatus() {
  const [status, setStatus] = useState("PENDING");
  const [depositAddress, setDepositAddress] =
    useState(DEPOSIT_CONFIG.demoAddress);

  const [depositAmount, setDepositAmount] =
    useState(0);

  const [confirmations, setConfirmations] =
    useState(0);

  const [requiredConfirmations] =
    useState(12);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const fetchAccountStatus = useCallback(
    async () => {
      try {
        setError(null);

        /*
         * ------------------------------------------------
         * DEVELOPMENT MODE
         * ------------------------------------------------
         *
         * Until the backend exists, we use the demo
         * address and keep the account pending.
         */

        if (DEMO_MODE) {
          setDepositAddress(
            DEPOSIT_CONFIG.demoAddress
          );

          setStatus("PENDING");

          setLoading(false);

          return;
        }

        /*
         * ------------------------------------------------
         * PRODUCTION/BACKEND
         * ------------------------------------------------
         */

        const response = await fetch(
          DEPOSIT_CONFIG.api.accountStatus,
          {
            credentials: "include",
            headers: {
              "Content-Type":
                "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load account status."
          );
        }

        const data = await response.json();

        setStatus(data.status || "PENDING");

        setDepositAddress(
          data.depositAddress || null
        );

        setDepositAmount(
          Number(data.depositAmount) || 0
        );

        setConfirmations(
          Number(data.confirmations) || 0
        );
      } catch (err) {
        console.error(
          "Account status error:",
          err
        );

        setError(
          err.message ||
            "Unable to check account status."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchAccountStatus();

    /*
     * Backend polling.
     *
     * Later we can replace this with WebSocket/SSE
     * or webhook-driven status updates.
     */

    const interval = window.setInterval(() => {
      fetchAccountStatus();
    }, 10000);

    return () => {
      window.clearInterval(interval);
    };
  }, [fetchAccountStatus]);

  const isActive = status === "ACTIVE";

  const isPending =
    status === "PENDING" ||
    status === "DEPOSIT_DETECTED" ||
    status === "CONFIRMING";

  return {
    status,
    isActive,
    isPending,

    depositAddress,

    depositAmount,
    confirmations,
    requiredConfirmations,

    loading,
    error,

    refreshStatus: fetchAccountStatus,

    network: DEPOSIT_CONFIG.network,
    networkName: DEPOSIT_CONFIG.networkName,
    asset: DEPOSIT_CONFIG.asset,
  };
}