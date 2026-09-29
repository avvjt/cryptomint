
import { useCallback, useEffect, useState } from "react";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  "https://backendxmint.onrender.com"
).replace(/\/+$/, "");

const STATUS_OPTIONS = [
  "PENDING",
  "UNDER_REVIEW",
  "CONFIRMED",
  "REJECTED",
  "FAILED",
  "ALL",
];

export default function AdminDeposits() {
  const [deposits, setDeposits] = useState([]);
  const [status, setStatus] = useState("PENDING");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const getToken = () => localStorage.getItem("token");

  const request = async (path, options = {}) => {
    const token = getToken();

    if (!token) {
      throw new Error("Admin login required. Please sign in again.");
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.success === false) {
      throw new Error(data.message || `Request failed (${response.status}).`);
    }

    return data;
  };

  const loadDeposits = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const query = new URLSearchParams({
        status,
        page: String(page),
        limit: "20",
      });

      const data = await request(`/api/admin/deposits?${query}`);

      setDeposits(data.deposits || []);
      setPagination(data.pagination || {});
    } catch (err) {
      setError(err.message || "Unable to load deposits.");
    } finally {
      setLoading(false);
    }
  }, [status, page]);

  useEffect(() => {
    loadDeposits();
  }, [loadDeposits]);

  const approveDeposit = async (deposit) => {
    const confirmed = window.confirm(
      `Submit approval for ${deposit.amount} USDT?\n\n` +
        "The server must verify the on-chain transfer before crediting the wallet."
    );

    if (!confirmed) return;

    setBusyId(String(deposit._id));
    setError("");
    setNotice("");

    try {
      const data = await request(
        `/api/admin/deposits/${deposit._id}/approve`,
        { method: "POST" }
      );

      setNotice(data.message || "Deposit approved.");
      await loadDeposits();
    } catch (err) {
      setError(err.message || "Deposit approval failed.");
    } finally {
      setBusyId(null);
    }
  };

  const rejectDeposit = async (deposit) => {
    const reason = window.prompt(
      "Enter the reason for rejecting this deposit:"
    );

    if (reason === null) return;

    if (!reason.trim() || reason.trim().length > 500) {
      setError("Enter a rejection reason between 1 and 500 characters.");
      return;
    }

    setBusyId(String(deposit._id));
    setError("");
    setNotice("");

    try {
      const data = await request(
        `/api/admin/deposits/${deposit._id}/reject`,
        {
          method: "POST",
          body: JSON.stringify({ reason: reason.trim() }),
        }
      );

      setNotice(data.message || "Deposit rejected.");
      await loadDeposits();
    } catch (err) {
      setError(err.message || "Deposit rejection failed.");
    } finally {
      setBusyId(null);
    }
  };

  const copyText = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      setNotice("Copied to clipboard.");
    } catch {
      setError("Unable to copy. Please select and copy the text manually.");
    }
  };

  const formatDate = (value) => {
    if (!value) return "—";

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "—" : date.toLocaleString();
  };

  const shortHash = (hash) => {
    if (!hash) return "—";
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  const statusClass = (value) => {
    switch (value) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
      case "FAILED":
        return "bg-red-100 text-red-800";
      case "UNDER_REVIEW":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-amber-100 text-amber-800";
    }
  };

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Deposit Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Review USDT BEP20 deposits and transaction details.
          </p>
        </div>

        <button
          type="button"
          onClick={loadDeposits}
          disabled={loading || Boolean(busyId)}
          className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </header>

      <section className="rounded-xl border bg-white p-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Filter deposits
        </label>

        <select
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
          className="w-full max-w-xs rounded-lg border px-3 py-2"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option.replaceAll("_", " ")}
            </option>
          ))}
        </select>

        <p className="mt-3 text-sm text-gray-500">
          Total matching requests: {pagination.total ?? 0}
        </p>
      </section>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
        >
          {error}
        </div>
      )}

      {notice && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800"
        >
          {notice}
        </div>
      )}

      <section className="overflow-hidden rounded-xl border bg-white">
        {loading ? (
          <p className="p-8 text-center text-gray-500">
            Loading deposit requests...
          </p>
        ) : deposits.length === 0 ? (
          <p className="p-8 text-center text-gray-500">
            No deposits found for this status.
          </p>
        ) : (
          <div className="divide-y">
            {deposits.map((deposit) => {
              const id = String(deposit._id);
              const user =
                deposit.user && typeof deposit.user === "object"
                  ? deposit.user
                  : {};

              const canReview =
                ["PENDING", "UNDER_REVIEW"].includes(deposit.status) &&
                !deposit.creditedAt;

              return (
                <article key={id} className="space-y-4 p-4 sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">
                        {Number(deposit.amount).toLocaleString()} USDT
                      </p>
                      <p className="text-sm text-gray-500">
                        {user.name || "Unknown user"}
                        {user.email ? ` · ${user.email}` : ""}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        Submitted: {formatDate(deposit.submittedAt)}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                        deposit.status
                      )}`}
                    >
                      {deposit.status}
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="min-w-0 rounded-lg bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">Transaction hash</p>
                      <p className="mt-1 break-all font-mono text-sm">
                        {deposit.txHash || "—"}
                      </p>
                      {deposit.txHash && (
                        <button
                          type="button"
                          onClick={() => copyText(deposit.txHash)}
                          className="mt-2 text-sm font-medium text-blue-700 hover:underline"
                        >
                          Copy hash
                        </button>
                      )}
                    </div>

                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">Network</p>
                      <p className="mt-1 text-sm font-medium">
                        {deposit.network || "BEP20"} ·{" "}
                        {deposit.asset || "USDT"}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        Confirmations: {deposit.confirmations ?? 0}
                      </p>
                      {deposit.verifiedAmount != null && (
                        <p className="mt-1 text-xs text-gray-500">
                          Verified amount: {deposit.verifiedAmount} USDT
                        </p>
                      )}
                    </div>
                  </div>

                  {deposit.rejectionReason && (
                    <p className="text-sm text-red-700">
                      Rejection reason: {deposit.rejectionReason}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {canReview && (
                      <>
                        <button
                          type="button"
                          onClick={() => approveDeposit(deposit)}
                          disabled={Boolean(busyId)}
                          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                        >
                          {busyId === id ? "Processing..." : "Verify & Approve"}
                        </button>

                        <button
                          type="button"
                          onClick={() => rejectDeposit(deposit)}
                          disabled={Boolean(busyId)}
                          className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {deposit.txHash && (
                      <a
                        href={`https://bscscan.com/tx/${encodeURIComponent(
                          deposit.txHash
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                      >
                        View on BscScan ↗
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <footer className="flex items-center justify-between gap-3">
        <button
          type="button"
          disabled={loading || page <= 1}
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-sm text-gray-500">
          Page {pagination.page ?? page} of {Math.max(1, pagination.totalPages || 1)}
        </span>

        <button
          type="button"
          disabled={
            loading ||
            page >= (pagination.totalPages || 1)
          }
          onClick={() => setPage((current) => current + 1)}
          className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40"
        >
          Next
        </button>
      </footer>
    </main>
  );
}