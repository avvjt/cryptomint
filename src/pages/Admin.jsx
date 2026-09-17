import { useEffect, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  CheckCircle2,
  Clock3,
  XCircle,
  Copy,
  RefreshCw,
  ShieldCheck,
  Wallet,
} from "lucide-react";

const API = import.meta.env.VITE_API_BASE_URL;

const Admin = () => {
  const [activeTab, setActiveTab] = useState("deposits");

  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // ==========================================
  // FETCH ADMIN DATA
  // ==========================================

  const fetchAdminData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

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
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // ==========================================
  // UPDATE WITHDRAWAL
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

      await fetchAdminData(true);
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
  // HELPERS
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const shortAddress = (address, start = 8, end = 6) => {
    if (!address) return "-";

    if (address.length <= start + end) {
      return address;
    }

    return `${address.slice(0, start)}...${address.slice(
      -end
    )}`;
  };

  const copyText = async (text) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const statusStyle = (status) => {
    switch (status) {
      case "CONFIRMED":
      case "COMPLETED":
        return {
          wrapper:
            "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
          icon: <CheckCircle2 size={14} />,
        };

      case "PROCESSING":
      case "PENDING":
        return {
          wrapper:
            "bg-amber-500/10 border-amber-500/20 text-amber-400",
          icon: <Clock3 size={14} />,
        };

      case "FAILED":
        return {
          wrapper:
            "bg-red-500/10 border-red-500/20 text-red-400",
          icon: <XCircle size={14} />,
        };

      default:
        return {
          wrapper:
            "bg-white/5 border-white/10 text-gray-400",
          icon: <Clock3 size={14} />,
        };
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090d] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-white animate-spin" />

          <p className="text-sm text-gray-400">
            Loading admin panel...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // STATS
  // ==========================================

  const confirmedDeposits = deposits.filter(
    (item) => item.status === "CONFIRMED"
  ).length;

  const pendingWithdrawals = withdrawals.filter(
    (item) =>
      item.status === "PENDING" ||
      item.status === "PROCESSING"
  ).length;

  const totalDeposited = deposits.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const totalWithdrawn = withdrawals
    .filter((item) => item.status === "COMPLETED")
    .reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-[#07090d] text-white px-4 py-6 md:px-8 lg:px-10">

      <div className="max-w-[1600px] mx-auto">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>
            <div className="flex items-center gap-3 mb-2">

              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <ShieldCheck
                  size={21}
                  className="text-white"
                />
              </div>

              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Admin Panel
              </h1>

            </div>

            <p className="text-sm text-gray-500">
              Monitor deposits and manage withdrawal requests.
            </p>
          </div>

          <button
            onClick={() => fetchAdminData(true)}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] transition text-sm text-gray-300 disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={
                refreshing ? "animate-spin" : ""
              }
            />

            Refresh
          </button>

        </div>

        {/* ======================================
            STATS
        ====================================== */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-7">

          <div className="rounded-2xl border border-white/10 bg-[#0d1117] p-4 md:p-5">

            <div className="flex items-center justify-between mb-4">

              <span className="text-xs text-gray-500">
                Total Deposits
              </span>

              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <ArrowDownToLine
                  size={16}
                  className="text-emerald-400"
                />
              </div>

            </div>

            <p className="text-xl md:text-2xl font-semibold">
              {deposits.length}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              {totalDeposited.toFixed(2)} USDT
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0d1117] p-4 md:p-5">

            <div className="flex items-center justify-between mb-4">

              <span className="text-xs text-gray-500">
                Confirmed
              </span>

              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2
                  size={16}
                  className="text-emerald-400"
                />
              </div>

            </div>

            <p className="text-xl md:text-2xl font-semibold">
              {confirmedDeposits}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Successfully received
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0d1117] p-4 md:p-5">

            <div className="flex items-center justify-between mb-4">

              <span className="text-xs text-gray-500">
                Pending Withdrawals
              </span>

              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Clock3
                  size={16}
                  className="text-amber-400"
                />
              </div>

            </div>

            <p className="text-xl md:text-2xl font-semibold">
              {pendingWithdrawals}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Need admin action
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0d1117] p-4 md:p-5">

            <div className="flex items-center justify-between mb-4">

              <span className="text-xs text-gray-500">
                Completed Withdrawals
              </span>

              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <ArrowUpFromLine
                  size={16}
                  className="text-blue-400"
                />
              </div>

            </div>

            <p className="text-xl md:text-2xl font-semibold">
              {totalWithdrawn.toFixed(2)}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              USDT paid out
            </p>

          </div>

        </div>

        {/* ======================================
            ERROR
        ====================================== */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* ======================================
            TABS
        ====================================== */}

        <div className="flex items-center gap-1 p-1 rounded-xl border border-white/10 bg-[#0d1117] w-fit mb-6">

          <button
            onClick={() => setActiveTab("deposits")}
            className={`flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-lg text-sm font-medium transition ${
              activeTab === "deposits"
                ? "bg-white text-black shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <ArrowDownToLine size={16} />
            Deposits
            <span className="text-xs opacity-60">
              {deposits.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("withdrawals")}
            className={`flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-lg text-sm font-medium transition ${
              activeTab === "withdrawals"
                ? "bg-white text-black shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <ArrowUpFromLine size={16} />
            Withdrawals
            <span className="text-xs opacity-60">
              {withdrawals.length}
            </span>
          </button>

        </div>

        {/* ======================================
            DEPOSITS
        ====================================== */}

        {activeTab === "deposits" && (
          <div className="rounded-2xl border border-white/10 bg-[#0d1117] overflow-hidden">

            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">

              <div>
                <h2 className="font-medium">
                  Deposit History
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Automatic blockchain deposits
                </p>
              </div>

              <Wallet
                size={18}
                className="text-gray-600"
              />

            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead>
                  <tr className="border-b border-white/10 text-xs text-gray-500">

                    <th className="text-left px-5 py-4 font-medium">
                      User
                    </th>

                    <th className="text-left px-5 py-4 font-medium">
                      Amount
                    </th>

                    <th className="text-left px-5 py-4 font-medium">
                      Deposit Address
                    </th>

                    <th className="text-left px-5 py-4 font-medium">
                      Transaction
                    </th>

                    <th className="text-left px-5 py-4 font-medium">
                      Status
                    </th>

                    <th className="text-left px-5 py-4 font-medium">
                      Date
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {deposits.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-16 text-gray-500"
                      >
                        No deposits yet
                      </td>
                    </tr>
                  ) : (
                    deposits.map((deposit) => {
                      const status =
                        statusStyle(deposit.status);

                      return (
                        <tr
                          key={deposit._id}
                          className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.02] transition"
                        >

                          <td className="px-5 py-4">

                            <div className="font-medium text-gray-200">
                              {deposit.user?.fullName ||
                                "Unknown User"}
                            </div>

                            <div className="text-xs text-gray-500 mt-1">
                              {deposit.user?.email || "-"}
                            </div>

                          </td>

                          <td className="px-5 py-4">

                            <div className="font-medium text-white">
                              {Number(
                                deposit.amount
                              ).toFixed(4)}
                            </div>

                            <div className="text-xs text-gray-500">
                              USDT · BEP20
                            </div>

                          </td>

                          <td className="px-5 py-4">

                            <div className="flex items-center gap-2">

                              <span className="font-mono text-xs text-gray-400">
                                {shortAddress(
                                  deposit.depositAddress
                                )}
                              </span>

                              <button
                                onClick={() =>
                                  copyText(
                                    deposit.depositAddress
                                  )
                                }
                                className="text-gray-600 hover:text-white transition"
                              >
                                <Copy size={14} />
                              </button>

                            </div>

                          </td>

                          <td className="px-5 py-4">

                            <div className="flex items-center gap-2">

                              <span className="font-mono text-xs text-gray-400">
                                {shortAddress(
                                  deposit.txHash
                                )}
                              </span>

                              <button
                                onClick={() =>
                                  copyText(
                                    deposit.txHash
                                  )
                                }
                                className="text-gray-600 hover:text-white transition"
                              >
                                <Copy size={14} />
                              </button>

                            </div>

                          </td>

                          <td className="px-5 py-4">

                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs ${status.wrapper}`}
                            >
                              {status.icon}
                              {deposit.status}
                            </span>

                          </td>

                          <td className="px-5 py-4 text-xs text-gray-500 whitespace-nowrap">
                            {formatDate(
                              deposit.createdAt
                            )}
                          </td>

                        </tr>
                      );
                    })
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
          <div className="rounded-2xl border border-white/10 bg-[#0d1117] overflow-hidden">

            <div className="px-5 py-4 border-b border-white/10">

              <h2 className="font-medium">
                Withdrawal Requests
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                Review and process user withdrawal requests
              </p>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead>
                  <tr className="border-b border-white/10 text-xs text-gray-500">

                    <th className="text-left px-5 py-4 font-medium">
                      User
                    </th>

                    <th className="text-left px-5 py-4 font-medium">
                      Amount
                    </th>

                    <th className="text-left px-5 py-4 font-medium">
                      Destination
                    </th>

                    <th className="text-left px-5 py-4 font-medium">
                      Status
                    </th>

                    <th className="text-left px-5 py-4 font-medium">
                      Tx Hash
                    </th>

                    <th className="text-left px-5 py-4 font-medium">
                      Date
                    </th>

                    <th className="text-left px-5 py-4 font-medium">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {withdrawals.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-16 text-gray-500"
                      >
                        No withdrawal requests yet
                      </td>
                    </tr>
                  ) : (
                    withdrawals.map((withdrawal) => {
                      const status =
                        statusStyle(
                          withdrawal.status
                        );

                      return (
                        <tr
                          key={withdrawal._id}
                          className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.02] transition"
                        >

                          <td className="px-5 py-4">

                            <div className="font-medium text-gray-200">
                              {withdrawal.user
                                ?.fullName ||
                                "Unknown User"}
                            </div>

                            <div className="text-xs text-gray-500 mt-1">
                              {withdrawal.user?.email ||
                                "-"}
                            </div>

                          </td>

                          <td className="px-5 py-4">

                            <div className="font-medium text-white">
                              {Number(
                                withdrawal.amount
                              ).toFixed(4)}
                            </div>

                            <div className="text-xs text-gray-500">
                              USDT · BEP20
                            </div>

                          </td>

                          <td className="px-5 py-4">

                            <div className="flex items-center gap-2">

                              <span className="font-mono text-xs text-gray-400">
                                {shortAddress(
                                  withdrawal.destinationAddress
                                )}
                              </span>

                              <button
                                onClick={() =>
                                  copyText(
                                    withdrawal.destinationAddress
                                  )
                                }
                                className="text-gray-600 hover:text-white transition"
                              >
                                <Copy size={14} />
                              </button>

                            </div>

                          </td>

                          <td className="px-5 py-4">

                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs ${status.wrapper}`}
                            >
                              {status.icon}
                              {withdrawal.status}
                            </span>

                          </td>

                          <td className="px-5 py-4">

                            <span className="font-mono text-xs text-gray-500">
                              {withdrawal.txHash
                                ? shortAddress(
                                    withdrawal.txHash
                                  )
                                : "-"}
                            </span>

                          </td>

                          <td className="px-5 py-4 text-xs text-gray-500 whitespace-nowrap">
                            {formatDate(
                              withdrawal.createdAt
                            )}
                          </td>

                          <td className="px-5 py-4">

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
                                  className="px-3 py-2 rounded-lg bg-white text-black text-xs font-medium hover:bg-gray-200 transition"
                                >
                                  Process
                                </button>

                                <button
                                  onClick={() =>
                                    updateWithdrawal(
                                      withdrawal._id,
                                      "FAILED"
                                    )
                                  }
                                  className="px-3 py-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-xs hover:bg-red-500/20 transition"
                                >
                                  Fail
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
                                  className="px-3 py-2 rounded-lg bg-emerald-500 text-black text-xs font-semibold hover:bg-emerald-400 transition"
                                >
                                  Complete
                                </button>

                                <button
                                  onClick={() =>
                                    updateWithdrawal(
                                      withdrawal._id,
                                      "FAILED"
                                    )
                                  }
                                  className="px-3 py-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-xs hover:bg-red-500/20 transition"
                                >
                                  Fail
                                </button>

                              </div>
                            )}

                            {(withdrawal.status ===
                              "COMPLETED" ||
                              withdrawal.status ===
                                "FAILED") && (
                              <span className="text-xs text-gray-600">
                                Final
                              </span>
                            )}

                          </td>

                        </tr>
                      );
                    })
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