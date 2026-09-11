import { ArrowUpRight, BarChart3 } from "lucide-react";
import { useTradeWalletContext } from "../../context/TradeWalletContext";

function formatMoney(value) {
  return `$${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function EarningsOverview() {
  const {
    tradeHistory = [],
    autoTradeBase = 0,
    autoTradeReturn = 0,
  } = useTradeWalletContext();

  const completedTrades = tradeHistory.filter(
    (trade) => trade.status === "Completed"
  );

  const normalTrades = completedTrades.filter(
    (trade) => trade.type === "Trade"
  );

  const autoTrades = completedTrades.filter(
    (trade) => trade.type === "Auto Trade"
  );

  const totalAutoTradeReturn = autoTrades.reduce(
    (total, trade) => total + Number(trade.returnAmount || 0),
    0
  );

  const totalTradeVolume = completedTrades.reduce(
    (total, trade) => total + Number(trade.amount || 0),
    0
  );

  const totalEarnings =
    totalAutoTradeReturn + Number(autoTradeReturn || 0);

  return (
    <section className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-white">
            Earnings Overview
          </h2>

          <p className="mt-1 text-[11px] text-[#68717D]">
            Performance from your trading activity
          </p>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1A1E24] bg-[#0D1014]">
          <BarChart3 size={15} className="text-[#7C8796]" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Total Earnings */}
        <div className="rounded-2xl border border-[#1A1E24] bg-[#0D1014] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] text-[#68717D]">
              Total Earnings
            </span>

            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#08B77A]/10">
              <ArrowUpRight
                size={13}
                className="text-[#08B77A]"
              />
            </div>
          </div>

          <p className="text-[20px] font-semibold tracking-[-0.02em] text-white">
            {formatMoney(totalEarnings)}
          </p>

          <p className="mt-1 text-[10px] text-[#59616D]">
            Auto Trade returns
          </p>
        </div>

        {/* Trading Volume */}
        <div className="rounded-2xl border border-[#1A1E24] bg-[#0D1014] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] text-[#68717D]">
              Trade Volume
            </span>

            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#4D8DFF]/10">
              <BarChart3
                size={13}
                className="text-[#4D8DFF]"
              />
            </div>
          </div>

          <p className="text-[20px] font-semibold tracking-[-0.02em] text-white">
            {formatMoney(totalTradeVolume)}
          </p>

          <p className="mt-1 text-[10px] text-[#59616D]">
            Across completed trades
          </p>
        </div>
      </div>

      {/* Activity stats */}
      <div className="mt-3 grid grid-cols-3 divide-x divide-[#1A1E24] rounded-2xl border border-[#1A1E24] bg-[#0D1014]">
        <div className="px-3 py-3 text-center">
          <p className="text-[16px] font-semibold text-white">
            {completedTrades.length}
          </p>

          <p className="mt-1 text-[9px] text-[#68717D]">
            Completed
          </p>
        </div>

        <div className="px-3 py-3 text-center">
          <p className="text-[16px] font-semibold text-white">
            {normalTrades.length}
          </p>

          <p className="mt-1 text-[9px] text-[#68717D]">
            Trades
          </p>
        </div>

        <div className="px-3 py-3 text-center">
          <p className="text-[16px] font-semibold text-white">
            {autoTrades.length}
          </p>

          <p className="mt-1 text-[9px] text-[#68717D]">
            Auto Trades
          </p>
        </div>
      </div>
    </section>
  );
}