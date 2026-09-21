import {
  ChevronRight,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

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

/*
 * ============================================================
 * LIVE COIN CARD
 * ============================================================
 */

function CoinCard({
  coin,
  navigate,
}) {
  const currentPrice = Number(
    coin.lastPrice || 0
  );

  const change = Number(
    coin.priceChangePercent || 0
  );

  const positive = change >= 0;

  const baseSymbol = getBaseSymbol(
    coin.symbol
  );

  const previousPrice =
    useRef(currentPrice);

  const [priceDirection, setPriceDirection] =
    useState(null);

  const [priceChanged, setPriceChanged] =
    useState(false);

  useEffect(() => {
    const previous =
      previousPrice.current;

    if (
      previous > 0 &&
      currentPrice !== previous
    ) {
      setPriceDirection(
        currentPrice > previous
          ? "up"
          : "down"
      );

      setPriceChanged(true);

      const timer = setTimeout(() => {
        setPriceChanged(false);
      }, 500);

      previousPrice.current =
        currentPrice;

      return () => clearTimeout(timer);
    }

    previousPrice.current =
      currentPrice;
  }, [currentPrice]);

  return (
    <button
      type="button"
      onClick={() =>
        navigate(
          `/trade?symbol=${coin.symbol}`
        )
      }
      className="
        group
        min-w-[178px]
        shrink-0
        rounded-2xl
        border
        border-[#1A1E24]
        bg-[#0D1014]
        p-4
        text-left
        transition-all
        duration-200
        hover:border-[#2A313B]
        hover:bg-[#101419]
        active:scale-[0.98]
        sm:min-w-0
        sm:flex-1
      "
    >
      {/* ====================================================== */}
      {/* COIN HEADER */}
      {/* ====================================================== */}

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

        {/* Direction indicator */}

        <div
          className={`
            flex
            h-6
            w-6
            shrink-0
            items-center
            justify-center
            rounded-md
            transition-all
            duration-300
            ${
              positive
                ? "bg-[#08B77A]/10"
                : "bg-[#F6465D]/10"
            }
            ${
              priceChanged
                ? priceDirection === "up"
                  ? "scale-110"
                  : "scale-110"
                : "scale-100"
            }
          `}
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

      {/* ====================================================== */}
      {/* PRICE */}
      {/* ====================================================== */}

      <div className="mt-5">
        <p
          className={`
            text-[17px]
            font-semibold
            tracking-[-0.02em]
            transition-all
            duration-300
            ${
              priceChanged
                ? priceDirection === "up"
                  ? "translate-y-[-1px] text-[#08B77A]"
                  : "translate-y-[1px] text-[#F6465D]"
                : "translate-y-0 text-white"
            }
          `}
        >
          {formatPrice(currentPrice)}
        </p>

        <p
          className={`
            mt-1
            text-[10px]
            font-medium
            ${
              positive
                ? "text-[#08B77A]"
                : "text-[#F6465D]"
            }
          `}
        >
          {formatPercent(change)}
        </p>
      </div>
    </button>
  );
}

/*
 * ============================================================
 * LOADING CARD
 * ============================================================
 */

function LoadingCard() {
  return (
    <div
      className="
        min-w-[178px]
        shrink-0
        animate-pulse
        rounded-2xl
        border
        border-[#1A1E24]
        bg-[#0D1014]
        p-4
        sm:min-w-0
        sm:flex-1
      "
    >
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-[#151A20]" />

        <div>
          <div className="h-3 w-14 rounded bg-[#151A20]" />
          <div className="mt-1 h-2 w-8 rounded bg-[#151A20]" />
        </div>
      </div>

      <div className="mt-6 h-5 w-28 rounded bg-[#151A20]" />

      <div className="mt-2 h-3 w-14 rounded bg-[#151A20]" />
    </div>
  );
}

/*
 * ============================================================
 * MARKET ROW
 * ============================================================
 */

function MarketRow({
  coins,
  navigate,
}) {
  return (
    <div
      className="
        -mx-4
        flex
        gap-3
        overflow-x-auto
        px-4
        pb-2
        scrollbar-none
        sm:mx-0
        sm:px-0
      "
    >
      {coins.length > 0 ? (
        coins.map((coin) => (
          <CoinCard
            key={coin.symbol}
            coin={coin}
            navigate={navigate}
          />
        ))
      ) : (
        <>
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </>
      )}
    </div>
  );
}

/*
 * ============================================================
 * MAIN COMPONENT
 * ============================================================
 */

export default function MarketSnapshot() {
  const navigate = useNavigate();

  const markets = useMarketData();

  /*
   * ============================================================
   * ROW 1
   * ============================================================
   */

  const popularSymbols = [
    "BTCUSDT",
    "ETHUSDT",
    "SOLUSDT",
    "XRPUSDT",
  ];

  /*
   * ============================================================
   * ROW 2
   * ============================================================
   */

  const internationalSymbols = [
    "BNBUSDT",
    "DOGEUSDT",
    "ADAUSDT",
    "AVAXUSDT",
    "LINKUSDT",
    "LTCUSDT",
  ];

  const getMarkets = (symbols) =>
    symbols
      .map((symbol) =>
        markets.find(
          (market) =>
            market.symbol === symbol
        )
      )
      .filter(Boolean);

  const snapshot =
    getMarkets(popularSymbols);

  const internationalMarkets =
    getMarkets(
      internationalSymbols
    );

  return (
    <section className="mt-7">

      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <div className="mb-4 flex items-center justify-between">
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
          onClick={() =>
            navigate("/markets")
          }
          className="
            flex
            items-center
            gap-1
            text-[11px]
            font-medium
            text-[#7C8796]
            transition
            hover:text-white
          "
        >
          View markets

          <ChevronRight size={13} />
        </button>
      </div>

      {/* ====================================================== */}
      {/* ROW 1 */}
      {/* ====================================================== */}

      <div>
        <p
          className="
            mb-2.5
            text-[10px]
            font-medium
            uppercase
            tracking-[0.14em]
            text-[#59616D]
          "
        >
          Top Markets
        </p>

        <MarketRow
          coins={snapshot}
          navigate={navigate}
        />
      </div>

      {/* ====================================================== */}
      {/* ROW 2 */}
      {/* ====================================================== */}

      <div className="mt-5">
        <p
          className="
            mb-2.5
            text-[10px]
            font-medium
            uppercase
            tracking-[0.14em]
            text-[#59616D]
          "
        >
          International Favorites
        </p>

        <MarketRow
          coins={internationalMarkets}
          navigate={navigate}
        />
      </div>

    </section>
  );
}