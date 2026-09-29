
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useAccountStatusContext } from "../../context/AccountStatusContext";
import { WALLET_CONFIG } from "../../config/walletConfig";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://backendxmint.onrender.com";

export default function DepositVerificationCard() {
  const {
    isActive,
    depositAddress,
    loading,
    error,
    refreshStatus,
  } = useAccountStatusContext();

  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");

  const copyAddress = async () => {
    if (!depositAddress) return;

    try {
      await navigator.clipboard.writeText(depositAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setFormError("Unable to copy the address. Please copy it manually.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setRequestMessage("");

    const numericAmount = Number(amount);
    const normalizedHash = txHash.trim();

    if (!Number.isFinite(numericAmount) || numericAmount < WALLET_CONFIG.minimumDeposit) {
      setFormError(
        `Minimum deposit is ${WALLET_CONFIG.minimumDeposit} USDT.`
      );
      return;
    }

    if (!/^0x[a-fA-F0-9]{64}$/.test(normalizedHash)) {
      setFormError(
        "Enter a valid BNB Smart Chain transaction hash (0x followed by 64 hexadecimal characters)."
      );
      return;
    }

    if (!depositAddress) {
      setFormError("The deposit address is unavailable. Please try again later.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setFormError("Your session may have expired. Please sign in again.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/deposits/manual`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: numericAmount,
          txHash: normalizedHash,
          network: WALLET_CONFIG.network,
          asset: WALLET_CONFIG.asset,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to submit your deposit request. Please try again later."
        );
      }

      setRequestSubmitted(true);
      setRequestMessage(
        data.message ||
          "Your request was received. It will remain pending until the transaction is verified and reviewed."
      );
      setAmount("");
      setTxHash("");
    } catch (err) {
      setFormError(
        err.message ||
          "Could not connect to the server. Your deposit request was not confirmed."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-[#1A1E24] bg-[#0D1014]">
      <div className="flex items-start justify-between gap-4 border-b border-[#1A1E24] p-5">
        <div>
          <p className="text-sm font-semibold">
            {isActive ? "Deposit USDT" : "Activate your account"}
          </p>

          <p className="mt-1 text-xs leading-5 text-[#737B89]">
            {isActive ? (
              "Send USDT to the address below."
            ) : (
              <>
                Deposit at least{" "}
                <span className="font-medium text-white">
                  {WALLET_CONFIG.minimumDeposit} USDT
                </span>{" "}
                to request account activation.
              </>
            )}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-medium ${
            isActive
              ? "border-[#08B77A]/20 bg-[#08B77A]/10 text-[#08B77A]"
              : "border-[#F59E0B]/20 bg-[#F59E0B]/10 text-[#F59E0B]"
          }`}
        >
          {isActive ? "Account Active" : "Activation Pending"}
        </span>
      </div>

      <div className="p-5">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="grid grid-cols-2 gap-3">
              <InfoBox label="Asset" value={WALLET_CONFIG.asset} />
              <InfoBox label="Network" value={WALLET_CONFIG.network} />
            </div>

            <div className="mt-4">
              <p className="text-xs text-[#737B89]">Deposit address</p>

              <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#1A1E24] bg-[#090B0E] p-3">
                <code className="min-w-0 flex-1 break-all text-xs leading-5 text-[#AAB1BD]">
                  {depositAddress || "Loading deposit address..."}
                </code>

                <button
                  type="button"
                  onClick={copyAddress}
                  disabled={!depositAddress}
                  className="shrink-0 rounded-lg border border-[#1A1E24] px-3 py-2 text-xs font-medium text-white hover:bg-[#14181E] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/5 p-3">
              <p className="text-xs font-medium text-[#F59E0B]">
                Send only USDT on BNB Smart Chain (BEP20).
              </p>
              <p className="mt-1 text-[11px] leading-5 text-[#737B89]">
                Check the address and network carefully before sending.
                Deposits sent to the wrong address or network may be lost.
              </p>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="rounded-2xl bg-white p-3">
              {depositAddress ? (
                <QRCodeSVG
                  value={depositAddress}
                  size={150}
                  bgColor="#ffffff"
                  fgColor="#090B0E"
                  level="M"
                />
              ) : (
                <div className="flex h-[150px] w-[150px] items-center justify-center text-xs text-[#737B89]">
                  Loading
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="my-6 border-t border-[#1A1E24]" />

        <div>
          <h3 className="text-sm font-semibold">Submit deposit for review</h3>
          <p className="mt-1 text-xs leading-5 text-[#737B89]">
            After sending your USDT, enter the exact amount and transaction
            hash. Your account balance will not be credited just by submitting
            this form.
          </p>
        </div>

        {requestSubmitted ? (
          <div className="mt-4 rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/5 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
              <p className="text-xs font-semibold text-[#F59E0B]">
                Pending review
              </p>
            </div>

            <p className="mt-2 text-xs leading-5 text-[#AAB1BD]">
              {requestMessage}
            </p>

            <button
              type="button"
              onClick={() => {
                setRequestSubmitted(false);
                setRequestMessage("");
                setFormError("");
              }}
              className="mt-4 rounded-lg border border-[#1A1E24] px-3 py-2 text-xs font-medium text-white hover:bg-[#14181E]"
            >
              Submit another deposit
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="deposit-amount"
                className="mb-2 block text-xs text-[#AAB1BD]"
              >
                Amount sent (USDT)
              </label>

              <input
                id="deposit-amount"
                type="number"
                min={WALLET_CONFIG.minimumDeposit}
                step="any"
                inputMode="decimal"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder={`Minimum ${WALLET_CONFIG.minimumDeposit} USDT`}
                required
                disabled={submitting}
                className="w-full rounded-xl border border-[#1A1E24] bg-[#090B0E] px-4 py-3 text-sm text-white outline-none placeholder:text-[#555D68] focus:border-[#4D8DFF] disabled:opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="deposit-tx-hash"
                className="mb-2 block text-xs text-[#AAB1BD]"
              >
                BNB Smart Chain transaction hash
              </label>

              <textarea
                id="deposit-tx-hash"
                value={txHash}
                onChange={(event) => setTxHash(event.target.value)}
                placeholder="0x..."
                rows={3}
                required
                disabled={submitting}
                className="w-full resize-y rounded-xl border border-[#1A1E24] bg-[#090B0E] px-4 py-3 font-mono text-xs leading-5 text-white outline-none placeholder:text-[#555D68] focus:border-[#4D8DFF] disabled:opacity-50"
              />

              <p className="mt-2 text-[11px] leading-5 text-[#555D68]">
                You can find the transaction hash in your wallet's transaction
                history or on BscScan.
              </p>
            </div>

            {formError && (
              <div
                role="alert"
                className="rounded-xl border border-[#F6465D]/20 bg-[#F6465D]/5 p-3 text-xs leading-5 text-[#F6465D]"
              >
                {formError}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || loading || !depositAddress}
              className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#DDE3EA] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit for admin review"}
            </button>

            <p className="text-center text-[11px] leading-5 text-[#555D68]">
              Submission does not guarantee approval. The transaction must be
              verified before any account credit or activation.
            </p>
          </form>
        )}

        {error && (
          <p className="mt-3 text-xs text-[#F6465D]">{error}</p>
        )}

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#1A1E24] pt-4">
          <p className="text-[11px] text-[#555D68]">
            {loading ? "Refreshing account status..." : "Account status"}
          </p>

          <button
            type="button"
            onClick={refreshStatus}
            disabled={loading || submitting}
            className="rounded-lg border border-[#1A1E24] px-3 py-2 text-xs font-medium text-[#AAB1BD] hover:bg-[#14181E] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Refreshing..." : "Refresh status"}
          </button>
        </div>
      </div>
    </section>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="rounded-xl border border-[#1A1E24] bg-[#090B0E] p-3">
      <p className="text-[10px] text-[#555D68]">{label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}