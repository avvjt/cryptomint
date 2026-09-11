import {
  ArrowUpRight,
  Bot,
  ChevronRight,
  Clock3,
  History,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTradeWalletContext } from "../../context/TradeWalletContext";
import CoinLogo from "../markets/CoinLogo";

function formatMoney(value) {
  return `$${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatTime(date) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getBaseSymbol(symbol = "") {
  return symbol.endsWith("USDT")
    ? symbol.slice(0, -4)
    : symbol;
}

export default function RecentActivity() {
  const navigate = useNavigate();

  const { tradeHistory = [] } = useTradeWalletContext();

  const recentTrades = [...tradeHistory]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <section className="mt-7">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-white">
            Recent Activity
          </h2>

          <p className="mt-1 text-[11px] text-[#68717D]">
            Your latest trading activity
          </p>
        </div>

        {tradeHistory.length > 0 && (
          <button
            type="button"
            onClick={() => navigate("/trade")}
            className="flex items-center gap-1 text-[11px] font-medium text-[#7C8796] transition hover:text-white"
          >
            View all
            <ChevronRight size={13} />
          </button>
        )}
      </div>

      {/* Empty state */}
      {recentTrades.length === 0 ? (
        <div className="rounded-2xl border border-[#1A1E24] bg-[#0D1014] px-5 py-10 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-[#1A1E24] bg-[#11151A]">
            <History size={18} className="text-[#68717D]" />
          </div>

          <h3 className="mt-4 text-[13px] font-medium text-white">
            No trading activity yet
          </h3>

          <p className="mx-auto mt-1.5 max-w-[240px] text-[10px] leading-5 text-[#59616D]">
            Your completed trades and Auto Trades will appear here.
          </p>

          <button
            type="button"
            onClick={() => navigate("/markets")}
            className="mt-4 rounded-lg border border-[#252B34] bg-[#11151A] px-4 py-2 text-[11px] font-medium text-white transition hover:border-[#39414D] hover:bg-[#151A20]"
          >
            Explore Markets
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#1A1E24] bg-[#0D1014]">
          {recentTrades.map((trade, index) => {
            const baseSymbol = getBaseSymbol(trade.symbol);
            const isAutoTrade = trade.type === "Auto Trade";

            return (
              <div
                key={trade.id}
                className={`flex items-center gap-3 px-4 py-4 ${
                  index !== recentTrades.length - 1
                    ? "border-b border-[#1A1E24]"
                    : ""
                }`}
              >
                {/* Coin */}
                <div className="shrink-0">
                  <CoinLogo symbol={trade.symbol} />
                </div>

                {/* Main info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-[12px] font-semibold text-white">
                      {baseSymbol}/USDT
                    </p>

                    <span
                      className={`shrink-0 rounded-md px-1.5 py-0.5 text-[8px] font-medium ${
                        isAutoTrade
                          ? "bg-[#F6465D]/10 text-[#F6465D]"
                          : "bg-[#4D8DFF]/10 text-[#4D8DFF]"
                      }`}
                    >
                      {isAutoTrade ? "AUTO" : "TRADE"}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center gap-1.5 text-[9px] text-[#59616D]">
                    <Clock3 size={10} />
                    <span>{formatTime(trade.createdAt)}</span>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-right">
                  <p className="text-[12px] font-medium text-white">
                    {formatMoney(trade.amount)}
                  </p>

                  {isAutoTrade && Number(trade.returnAmount || 0) > 0 ? (
                    <p className="mt-1 text-[9px] font-medium text-[#08B77A]">
                      +{formatMoney(trade.returnAmount)}
                    </p>
                  ) : (
                    <p className="mt-1 text-[9px] text-[#59616D]">
                      {trade.status || "Completed"}
                    </p>
                  )}
                </div>

                {/* Type icon */}
                <div
                  className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg sm:flex ${
                    isAutoTrade
                      ? "bg-[#F6465D]/10"
                      : "bg-[#4D8DFF]/10"
                  }`}
                >
                  {isAutoTrade ? (
                    <Bot
                      size={14}
                      className="text-[#F6465D]"
                    />
                  ) : (
                    <ArrowUpRight
                      size={14}
                      className="text-[#4D8DFF]"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}