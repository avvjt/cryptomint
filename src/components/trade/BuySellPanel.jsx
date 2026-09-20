import { useState } from "react";
import { useTradeWalletContext } from "../../context/TradeWalletContext";

const packages = [
  {
    name: "Starter",
    min: 50,
    max: 200,
    rate: 1,
  },
  {
    name: "Pro",
    min: 201,
    max: 1000,
    rate: 1.5,
  },
  {
    name: "Master",
    min: 1001,
    max: 2000,
    rate: 2.5,
  },
  {
    name: "Elite",
    min: 2001,
    max: 4500,
    rate: 3,
  },
  {
    name: "Empire",
    min: 4501,
    max: 10000,
    rate: 3.3,
  },
];

export default function BuySellPanel() {
  const { availableBalance, loading } = useTradeWalletContext();

  const [amount, setAmount] = useState("");

  const balance = Number(availableBalance || 0);

  const formatBalance = (value) =>
    Number(value || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const selectedPackage = packages.find(
    (pkg) => balance >= pkg.min && balance <= pkg.max
  );

  const handleMax = () => {
    if (balance > 0) {
      setAmount(balance.toFixed(2));
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111419] p-5">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">Wallet Balance</p>

          <h3 className="mt-1 text-xl font-bold text-white">
            {loading ? "Loading..." : `${formatBalance(balance)} USDT`}
          </h3>
        </div>

        <button
          type="button"
          onClick={handleMax}
          disabled={loading || balance <= 0}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-gray-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          MAX
        </button>
      </div>

      {/* Amount */}
      <div>
        <label className="mb-2 block text-sm text-gray-400">
          Amount
        </label>

        <div className="flex items-center rounded-xl border border-white/10 bg-[#090B0E] px-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
            max={balance}
            className="w-full bg-transparent py-3 text-white outline-none placeholder:text-gray-600"
          />

          <span className="text-sm font-semibold text-gray-400">
            USDT
          </span>
        </div>
      </div>

      {/* Package */}
      {selectedPackage && (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              Current Package
            </span>

            <span className="font-semibold text-white">
              {selectedPackage.name}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-gray-400">
              Daily Return
            </span>

            <span className="font-semibold text-green-400">
              {selectedPackage.rate}%
            </span>
          </div>
        </div>
      )}

      {/* No package */}
      {!loading && balance < 50 && (
        <div className="mt-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3 text-sm text-yellow-400">
          Minimum balance required is 50 USDT.
        </div>
      )}

      {/* Actions */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          className="rounded-xl bg-white py-3 font-semibold text-black transition hover:bg-gray-200"
        >
          Deposit
        </button>

        <button
          type="button"
          className="rounded-xl border border-white/10 py-3 font-semibold text-white transition hover:bg-white/5"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}