import { useMemo, useState } from "react";
import { useTradeWalletContext } from "../../context/TradeWalletContext";

const NETWORKS = {
  TRC20: {
    label: "TRC20",
    fee: 1,
  },
  BEP20: {
    label: "BEP20",
    fee: 0.3,
  },
  ERC20: {
    label: "ERC20",
    fee: 8,
  },
};

export default function WithdrawForm() {
  const { availableBalance, loading } = useTradeWalletContext();

  const [network, setNetwork] = useState("BEP20");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const balance = Number(availableBalance || 0);

  const fee = NETWORKS[network]?.fee || 0;

  const numericAmount = Number(amount || 0);

  const receiveAmount = useMemo(() => {
    if (numericAmount <= 0) return 0;

    return Math.max(numericAmount - fee, 0);
  }, [numericAmount, fee]);

  const handleMax = () => {
    if (balance > fee) {
      setAmount((balance - fee).toFixed(2));
    } else {
      setAmount("0");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address.trim()) {
      alert("Please enter your withdrawal address.");
      return;
    }

    if (numericAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (numericAmount + fee > balance) {
      alert("Insufficient available balance.");
      return;
    }

    /*
      Backend withdrawal API should be connected here.

      Example:

      const response = await fetch(
        `${API_BASE_URL}/api/withdrawals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            amount: numericAmount,
            network,
            address,
          }),
        }
      );
    */

    try {
      setSubmitting(true);

      // Temporary until the withdrawal API is connected.
      console.log("Withdrawal request:", {
        amount: numericAmount,
        network,
        address,
        fee,
        receiveAmount,
      });

      alert("Withdrawal request submitted.");

      setAmount("");
      setAddress("");
    } catch (error) {
      console.error("Withdrawal error:", error);
      alert("Failed to submit withdrawal request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-[#111419] p-5"
    >
      {/* Balance */}
      <div className="mb-5">
        <p className="text-sm text-gray-400">
          Available Balance
        </p>

        <div className="mt-1 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">
            {loading
              ? "Loading..."
              : `${balance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })} USDT`}
          </h3>

          <button
            type="button"
            onClick={handleMax}
            disabled={loading || balance <= fee}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-gray-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            MAX
          </button>
        </div>
      </div>

      {/* Network */}
      <div className="mb-4">
        <label className="mb-2 block text-sm text-gray-400">
          Network
        </label>

        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#090B0E] px-4 py-3 text-white outline-none"
        >
          {Object.values(NETWORKS).map((item) => (
            <option key={item.label} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {/* Address */}
      <div className="mb-4">
        <label className="mb-2 block text-sm text-gray-400">
          Withdrawal Address
        </label>

        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter wallet address"
          className="w-full rounded-xl border border-white/10 bg-[#090B0E] px-4 py-3 text-white outline-none placeholder:text-gray-600"
        />
      </div>

      {/* Amount */}
      <div className="mb-4">
        <label className="mb-2 block text-sm text-gray-400">
          Amount
        </label>

        <div className="flex items-center rounded-xl border border-white/10 bg-[#090B0E] px-4">
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-transparent py-3 text-white outline-none placeholder:text-gray-600"
          />

          <span className="text-sm font-semibold text-gray-400">
            USDT
          </span>
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-2 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">
            Withdrawal Amount
          </span>

          <span className="text-white">
            {numericAmount.toFixed(2)} USDT
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-400">
            Network Fee
          </span>

          <span className="text-white">
            {fee.toFixed(2)} USDT
          </span>
        </div>

        <div className="my-2 border-t border-white/10" />

        <div className="flex justify-between text-sm font-semibold">
          <span className="text-gray-300">
            You Receive
          </span>

          <span className="text-white">
            {receiveAmount.toFixed(2)} USDT
          </span>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={
          submitting ||
          loading ||
          balance <= 0 ||
          numericAmount <= 0
        }
        className="mt-5 w-full rounded-xl bg-white py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Withdraw"}
      </button>
    </form>
  );
}