import { ChevronRight, TrendingDown, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useMarketData from "../../hooks/useMarketData";
import CoinLogo from "../markets/CoinLogo";

function formatPrice(value) {
  const price = Number(value || 0);

  if (price >= 1000) {
    return `$${price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  if (price >= 1) {
    return `$${price.toFixed(2)}`;
  }

  return `$${price.toFixed(4)}`;
}

function formatPercent(value) {
  const change = Number(value || 0);

  return `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;
}

function getBaseSymbol(symbol = "") {
  return symbol.endsWith("USDT")
    ? symbol.slice(0, -4)
    : symbol;
}

export default function MarketSnapshot() {
  const navigate = useNavigate();
  const markets = useMarketData();

  const popularSymbols = [
    "BTCUSDT",
    "ETHUSDT",
    "SOLUSDT",
    "XRPUSDT",
  ];

  const snapshot = popularSymbols
    .map((symbol) =>
      markets.find((market) => market.symbol === symbol)
    )
    .filter(Boolean);

  return (
    <section className="mt-7">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-white">
            Market Snapshot
          </h2>

          <p className="mt-1 text-[11px] text-[#68717D]">
            Popular markets right now
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/markets")}
          className="flex items-center gap-1 text-[11px] font-medium text-[#7C8796] transition hover:text-white"
        >
          View markets
          <ChevronRight size={13} />
        </button>
      </div>

      {/* Horizontal mobile cards */}
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:px-0">
        {snapshot.map((coin) => {
          const change = Number(coin.priceChangePercent || 0);
          const positive = change >= 0;
          const baseSymbol = getBaseSymbol(coin.symbol);

          return (
            <button
              key={coin.symbol}
              type="button"
              onClick={() =>
                navigate(`/trade?symbol=${coin.symbol}`)
              }
              className="min-w-[178px] flex-1 rounded-2xl border border-[#1A1E24] bg-[#0D1014] p-4 text-left transition hover:border-[#2A313B] hover:bg-[#101419] sm:min-w-0"
            >
              {/* Coin */}
              <div className="flex items-center justify-between">
                <div className="flex min-w-0 items-center gap-2.5">
                  <CoinLogo symbol={coin.symbol} />

                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-semibold text-white">
                      {baseSymbol}
                    </p>

                    <p className="mt-0.5 text-[9px] text-[#59616D]">
                      /USDT
                    </p>
                  </div>
                </div>

                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
                    positive
                      ? "bg-[#08B77A]/10"
                      : "bg-[#F6465D]/10"
                  }`}
                >
                  {positive ? (
                    <TrendingUp
                      size={12}
                      className="text-[#08B77A]"
                    />
                  ) : (
                    <TrendingDown
                      size={12}
                      className="text-[#F6465D]"
                    />
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="mt-5">
                <p className="text-[17px] font-semibold tracking-[-0.02em] text-white">
                  {formatPrice(coin.lastPrice)}
                </p>

                <p
                  className={`mt-1 text-[10px] font-medium ${
                    positive
                      ? "text-[#08B77A]"
                      : "text-[#F6465D]"
                  }`}
                >
                  {formatPercent(change)}
                </p>
              </div>
            </button>
          );
        })}

        {/* Loading */}
        {snapshot.length === 0 &&
          [1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="min-w-[178px] flex-1 animate-pulse rounded-2xl border border-[#1A1E24] bg-[#0D1014] p-4 sm:min-w-0"
            >
              <div className="h-8 w-24 rounded bg-[#151A20]" />

              <div className="mt-6 h-5 w-28 rounded bg-[#151A20]" />

              <div className="mt-2 h-3 w-14 rounded bg-[#151A20]" />
            </div>
          ))}
      </div>
    </section>
  );
}