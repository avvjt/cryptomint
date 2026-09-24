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

/* ============================================================
   HELPERS
============================================================ */

function formatPrice(value) {
  const price = Number(value || 0);

  if (!price) return "$0.00";

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

/* ============================================================
   MARKET CARD
============================================================ */

function MarketCard({
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
        rounded-[18px]
        border
        border-[#1A2029]
        bg-[#0A0E13]
        p-4
        text-left
        transition-all
        duration-200
        hover:border-[#293340]
        hover:bg-[#0D1218]
        active:scale-[0.98]
        sm:min-w-0
        sm:flex-1
      "
    >

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div className="flex min-w-0 items-center gap-2.5">

          <CoinLogo
            symbol={coin.symbol}
          />

          <div className="min-w-0">

            <p className="truncate text-[12px] font-semibold text-white">
              {baseSymbol}
            </p>

            <p className="mt-0.5 text-[9px] text-[#59616D]">
              /USDT
            </p>

          </div>

        </div>

        {/* CHANGE ICON */}

        <div
          className={`
            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            rounded-lg
            ${
              positive
                ? "bg-[#08B77A]/[0.08]"
                : "bg-[#F6465D]/[0.08]"
            }
            transition-transform
            duration-300
            ${
              priceChanged
                ? "scale-110"
                : "scale-100"
            }
          `}
        >

          {positive ? (
            <TrendingUp
              size={13}
              className="text-[#08B77A]"
            />
          ) : (
            <TrendingDown
              size={13}
              className="text-[#F6465D]"
            />
          )}

        </div>

      </div>

      {/* PRICE */}

      <div className="mt-7">

        <p
          className={`
            text-[20px]
            font-semibold
            tracking-[-0.035em]
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
            mt-1.5
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

/* ============================================================
   LOADING CARD
============================================================ */

function LoadingCard() {
  return (
    <div
      className="
        min-w-[178px]
        shrink-0
        animate-pulse
        rounded-[18px]
        border
        border-[#1A2029]
        bg-[#0A0E13]
        p-4
        sm:min-w-0
        sm:flex-1
      "
    >

      <div className="flex items-center gap-2.5">

        <div className="h-8 w-8 rounded-full bg-[#151A20]" />

        <div>
          <div className="h-3 w-14 rounded bg-[#151A20]" />

          <div className="mt-1.5 h-2 w-8 rounded bg-[#151A20]" />
        </div>

      </div>

      <div className="mt-7 h-5 w-28 rounded bg-[#151A20]" />

      <div className="mt-2 h-3 w-14 rounded bg-[#151A20]" />

    </div>
  );
}

/* ============================================================
   MARKET ROW
============================================================ */

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
        pb-1
        scrollbar-none
        sm:mx-0
        sm:px-0
      "
    >

      {coins.length > 0 ? (
        coins.map((coin) => (
          <MarketCard
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

/* ============================================================
   MAIN
============================================================ */

export default function ZeroFeeSection() {

  const navigate = useNavigate();

  const markets = useMarketData();

  /* ==========================================================
     MARKET GROUPS
  ========================================================== */

  const popularSymbols = [
    "BTCUSDT",
    "ETHUSDT",
    "SOLUSDT",
    "XRPUSDT",
  ];

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

  const popularMarkets =
    getMarkets(popularSymbols);

  const internationalMarkets =
    getMarkets(internationalSymbols);

  return (
    <section className="relative overflow-hidden bg-[#05070A]">

      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute left-1/2 top-[20%] h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#246BFF]/[0.025] blur-[120px]" />

      <div className="relative mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="flex items-end justify-between gap-4">

          <div>

            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#596473]">
              Markets
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
              Trade what moves.
            </h2>

            <p className="mt-3 max-w-[420px] text-xs leading-5 text-[#68717D] sm:text-sm">
              Explore popular markets and follow price
              movements in real time.
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/markets")
            }
            className="
              hidden
              shrink-0
              items-center
              gap-1
              text-[11px]
              font-medium
              text-[#68717D]
              transition
              hover:text-white
              sm:flex
            "
          >
            View markets
            <ChevronRight size={14} />
          </button>

        </div>

        {/* ====================================================
            MOBILE VIEW MARKETS BUTTON
        ==================================================== */}

        <button
          type="button"
          onClick={() =>
            navigate("/markets")
          }
          className="
            mt-5
            flex
            items-center
            gap-1
            text-[11px]
            font-medium
            text-[#68717D]
            sm:hidden
          "
        >
          View all markets
          <ChevronRight size={13} />
        </button>

        {/* ====================================================
            TOP MARKETS
        ==================================================== */}

        <div className="mt-8">

          <div className="mb-3 flex items-center justify-between">

            <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#4F5967]">
              Top Markets
            </p>

            <span className="text-[9px] text-[#3F4854]">
              Live
            </span>

          </div>

          <MarketRow
            coins={popularMarkets}
            navigate={navigate}
          />

        </div>

        {/* ====================================================
            INTERNATIONAL FAVORITES
        ==================================================== */}

        <div className="mt-7">

          <div className="mb-3">

            <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#4F5967]">
              International Favorites
            </p>

          </div>

          <MarketRow
            coins={internationalMarkets}
            navigate={navigate}
          />

        </div>

        {/* ====================================================
            BOTTOM CTA
        ==================================================== */}

        <div className="mt-10 border-t border-[#141A21] pt-5">

          <button
            type="button"
            onClick={() =>
              navigate("/markets")
            }
            className="
              group
              flex
              w-full
              items-center
              justify-between
              gap-4
              text-left
            "
          >

            <div>

              <p className="text-sm font-medium text-white">
                Explore all markets
              </p>

              <p className="mt-1 text-[10px] text-[#596473]">
                Discover more trading pairs
              </p>

            </div>

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#1C242E]
                text-[#68717D]
                transition
                group-hover:border-[#394553]
                group-hover:text-white
              "
            >
              <ChevronRight size={15} />
            </div>

          </button>

        </div>

      </div>

    </section>
  );
}