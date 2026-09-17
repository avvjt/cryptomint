import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_BASE_URL;

const Admin = () => {
  const [activeTab, setActiveTab] = useState("deposits");

  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // ==========================================
  // FETCH ADMIN DATA
  // ==========================================

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError("");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [depositResponse, withdrawalResponse] =
        await Promise.all([
          fetch(`${API}/api/admin/deposits`, {
            headers,
          }),

          fetch(`${API}/api/admin/withdrawals`, {
            headers,
          }),
        ]);

      const depositData = await depositResponse.json();
      const withdrawalData = await withdrawalResponse.json();

      if (!depositResponse.ok) {
        throw new Error(
          depositData.message || "Failed to load deposits"
        );
      }

      if (!withdrawalResponse.ok) {
        throw new Error(
          withdrawalData.message || "Failed to load withdrawals"
        );
      }

      setDeposits(depositData.deposits || []);
      setWithdrawals(withdrawalData.withdrawals || []);
    } catch (error) {
      console.error("Admin data error:", error);

      setError(
        error.message || "Failed to load admin data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // ==========================================
  // UPDATE WITHDRAWAL STATUS
  // ==========================================

  const updateWithdrawal = async (
    withdrawalId,
    status
  ) => {
    try {
      let txHash = "";
      let failureReason = "";

      if (status === "COMPLETED") {
        txHash = window.prompt(
          "Enter the real blockchain transaction hash:"
        );

        if (!txHash?.trim()) {
          return;
        }
      }

      if (status === "FAILED") {
        failureReason =
          window.prompt(
            "Enter failure reason:"
          ) || "Withdrawal failed";
      }

      const response = await fetch(
        `${API}/api/withdrawals/${withdrawalId}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            status,
            txHash: txHash.trim(),
            failureReason,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update withdrawal"
        );
      }

      // Refresh both tables
      await fetchAdminData();
    } catch (error) {
      console.error(
        "Withdrawal update error:",
        error
      );

      alert(
        error.message ||
          "Failed to update withdrawal"
      );
    }
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString();
  };

  // ==========================================
  // UI
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}

      <div className="max-w-7xl mx-auto">

        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Admin Panel
          </h1>

          <p className="text-gray-500 mt-1">
            Manage deposits and withdrawals
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-5 rounded-lg bg-red-100 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        {/* TABS */}

        <div className="flex gap-2 border-b mb-6">

          <button
            onClick={() => setActiveTab("deposits")}
            className={`px-5 py-3 font-medium border-b-2 ${
              activeTab === "deposits"
                ? "border-black text-black"
                : "border-transparent text-gray-500"
            }`}
          >
            Deposits ({deposits.length})
          </button>

          <button
            onClick={() => setActiveTab("withdrawals")}
            className={`px-5 py-3 font-medium border-b-2 ${
              activeTab === "withdrawals"
                ? "border-black text-black"
                : "border-transparent text-gray-500"
            }`}
          >
            Withdrawals ({withdrawals.length})
          </button>

        </div>

        {/* ======================================
            DEPOSITS
        ====================================== */}

        {activeTab === "deposits" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-gray-100">

                  <tr>
                    <th className="text-left px-4 py-3">
                      User
                    </th>

                    <th className="text-left px-4 py-3">
                      Amount
                    </th>

                    <th className="text-left px-4 py-3">
                      Deposit Address
                    </th>

                    <th className="text-left px-4 py-3">
                      Tx Hash
                    </th>

                    <th className="text-left px-4 py-3">
                      Status
                    </th>

                    <th className="text-left px-4 py-3">
                      Date
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {deposits.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-10 text-gray-500"
                      >
                        No deposits yet
                      </td>
                    </tr>
                  ) : (
                    deposits.map((deposit) => (
                      <tr
                        key={deposit._id}
                        className="border-t"
                      >

                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium">
                              {deposit.user?.fullName ||
                                "Unknown"}
                            </div>

                            <div className="text-gray-500">
                              {deposit.user?.email ||
                                "-"}
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3 font-medium">
                          {deposit.amount} USDT
                        </td>

                        <td className="px-4 py-3">
                          <span className="font-mono text-xs">
                            {deposit.depositAddress}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          <span className="font-mono text-xs">
                            {deposit.txHash}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          {deposit.status}
                        </td>

                        <td className="px-4 py-3">
                          {formatDate(
                            deposit.createdAt
                          )}
                        </td>

                      </tr>
                    ))
                  )}

                </tbody>

              </table>

            </div>

          </div>
        )}

        {/* ======================================
            WITHDRAWALS
        ====================================== */}

        {activeTab === "withdrawals" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="text-left px-4 py-3">
                      User
                    </th>

                    <th className="text-left px-4 py-3">
                      Amount
                    </th>

                    <th className="text-left px-4 py-3">
                      Destination
                    </th>

                    <th className="text-left px-4 py-3">
                      Status
                    </th>

                    <th className="text-left px-4 py-3">
                      Tx Hash
                    </th>

                    <th className="text-left px-4 py-3">
                      Date
                    </th>

                    <th className="text-left px-4 py-3">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {withdrawals.length === 0 ? (
                    <tr>

                      <td
                        colSpan="7"
                        className="text-center py-10 text-gray-500"
                      >
                        No withdrawals yet
                      </td>

                    </tr>
                  ) : (
                    withdrawals.map(
                      (withdrawal) => (
                        <tr
                          key={withdrawal._id}
                          className="border-t"
                        >

                          <td className="px-4 py-3">
                            <div>
                              <div className="font-medium">
                                {withdrawal.user
                                  ?.fullName ||
                                  "Unknown"}
                              </div>

                              <div className="text-gray-500">
                                {withdrawal.user
                                  ?.email || "-"}
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-3 font-medium">
                            {withdrawal.amount} USDT
                          </td>

                          <td className="px-4 py-3">
                            <span className="font-mono text-xs">
                              {
                                withdrawal.destinationAddress
                              }
                            </span>
                          </td>

                          <td className="px-4 py-3">
                            {withdrawal.status}
                          </td>

                          <td className="px-4 py-3">
                            <span className="font-mono text-xs">
                              {withdrawal.txHash ||
                                "-"}
                            </span>
                          </td>

                          <td className="px-4 py-3">
                            {formatDate(
                              withdrawal.createdAt
                            )}
                          </td>

                          <td className="px-4 py-3">

                            {withdrawal.status ===
                              "PENDING" && (
                              <div className="flex gap-2">

                                <button
                                  onClick={() =>
                                    updateWithdrawal(
                                      withdrawal._id,
                                      "PROCESSING"
                                    )
                                  }
                                  className="px-3 py-2 rounded-lg bg-black text-white text-xs"
                                >
                                  Processing
                                </button>

                                <button
                                  onClick={() =>
                                    updateWithdrawal(
                                      withdrawal._id,
                                      "FAILED"
                                    )
                                  }
                                  className="px-3 py-2 rounded-lg bg-red-600 text-white text-xs"
                                >
                                  Failed
                                </button>

                              </div>
                            )}

                            {withdrawal.status ===
                              "PROCESSING" && (
                              <div className="flex gap-2">

                                <button
                                  onClick={() =>
                                    updateWithdrawal(
                                      withdrawal._id,
                                      "COMPLETED"
                                    )
                                  }
                                  className="px-3 py-2 rounded-lg bg-green-600 text-white text-xs"
                                >
                                  Completed
                                </button>

                                <button
                                  onClick={() =>
                                    updateWithdrawal(
                                      withdrawal._id,
                                      "FAILED"
                                    )
                                  }
                                  className="px-3 py-2 rounded-lg bg-red-600 text-white text-xs"
                                >
                                  Failed
                                </button>

                              </div>
                            )}

                            {(withdrawal.status ===
                              "COMPLETED" ||
                              withdrawal.status ===
                                "FAILED") && (
                              <span className="text-gray-400 text-xs">
                                Final
                              </span>
                            )}

                          </td>

                        </tr>
                      )
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;