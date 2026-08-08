import { useMemo, useState } from "react";
import {
  ChevronRight,
  CalendarDays,
  BarChart3,
  Flame,
  Sparkles,
  Globe2,
  Layers3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import useMarkets from "../../hooks/useMarkets";
import AnimatedPrice from "./AnimatedPrice";
import CoinLogo from "./CoinLogo";

const MARKET_TABS = [
  {
    id: "markets",
    label: "Markets",
    icon: BarChart3,
  },
  {
    id: "rankings",
    label: "Rankings",
    icon: Flame,
  },
  {
    id: "trading",
    label: "Trading Data",
    icon: BarChart3,
  },
  {
    id: "featured",
    label: "Featured",
    icon: Sparkles,
  },
  {
    id: "world",
    label: "World Monitor",
    icon: Globe2,
  },
  {
    id: "heat",
    label: "Heat",
    icon: Layers3,
  },
];

export default function MarketCards() {
  const navigate = useNavigate();

  const markets = useMarkets();

  const [activeTab, setActiveTab] = useState("markets");

  /*
   * Keep only USDT markets.
   * This prevents random pairs from appearing in the cards.
   */
  const usdtMarkets = useMemo(() => {
    return markets.filter((coin) =>
      coin.symbol?.endsWith("USDT")
    );
  }, [markets]);

  /*
   * Generate the three sections from the currently
   * available market data.
   *
   * We intentionally calculate these dynamically instead
   * of hardcoding BTC/ETH/etc.
   */
  const hotTokens = useMemo(() => {
    return [...usdtMarkets]
      .sort(
        (a, b) =>
          Math.abs(Number(b.priceChangePercent)) -
          Math.abs(Number(a.priceChangePercent))
      )
      .slice(0, 3);
  }, [usdtMarkets]);

  const hotFutures = useMemo(() => {
    return [...usdtMarkets]
      .sort(
        (a, b) =>
          Number(b.quoteVolume || 0) -
          Number(a.quoteVolume || 0)
      )
      .slice(0, 3);
  }, [usdtMarkets]);

  const newest = useMemo(() => {
    return [...usdtMarkets]
      .sort(
        (a, b) =>
          Number(b.priceChangePercent) -
          Number(a.priceChangePercent)
      )
      .slice(0, 3);
  }, [usdtMarkets]);

  /*
   * Different tabs produce different rankings.
   *
   * This gives the interface functional behavior now,
   * while the backend/API can later provide the real
   * MEXC-style categories.
   */
  const getTabCoins = () => {
    switch (activeTab) {
      case "rankings":
        return {
          hotTokens: [...usdtMarkets]
            .sort(
              (a, b) =>
                Number(b.priceChangePercent) -
                Number(a.priceChangePercent)
            )
            .slice(0, 3),

          hotFutures: [...usdtMarkets]
            .sort(
              (a, b) =>
                Number(b.quoteVolume || 0) -
                Number(a.quoteVolume || 0)
            )
            .slice(0, 3),

          newest: [...usdtMarkets]
            .sort(
              (a, b) =>
                Number(a.priceChangePercent) -
                Number(b.priceChangePercent)
            )
            .slice(0, 3),
        };

      case "trading":
        return {
          hotTokens: [...usdtMarkets]
            .sort(
              (a, b) =>
                Number(b.quoteVolume || 0) -
                Number(a.quoteVolume || 0)
            )
            .slice(0, 3),

          hotFutures: [...usdtMarkets]
            .sort(
              (a, b) =>
                Math.abs(Number(b.priceChangePercent)) -
                Math.abs(Number(a.priceChangePercent))
            )
            .slice(0, 3),

          newest: [...usdtMarkets]
            .sort(
              (a, b) =>
                Number(b.lastPrice || 0) -
                Number(a.lastPrice || 0)
            )
            .slice(0, 3),
        };

      case "featured":
        return {
          hotTokens: [...usdtMarkets]
            .sort(
              (a, b) =>
                Number(b.priceChangePercent) -
                Number(a.priceChangePercent)
            )
            .slice(0, 3),

          hotFutures: [...usdtMarkets]
            .sort(
              (a, b) =>
                Number(b.quoteVolume || 0) -
                Number(a.quoteVolume || 0)
            )
            .slice(0, 3),

          newest: [...usdtMarkets]
            .slice(0, 3),
        };

      case "world":
        return {
          hotTokens: [...usdtMarkets]
            .sort(
              (a, b) =>
                Number(b.quoteVolume || 0) -
                Number(a.quoteVolume || 0)
            )
            .slice(0, 3),

          hotFutures: [...usdtMarkets]
            .sort(
              (a, b) =>
                Number(a.priceChangePercent) -
                Number(b.priceChangePercent)
            )
            .slice(0, 3),

          newest: [...usdtMarkets]
            .sort(
              (a, b) =>
                Math.abs(Number(b.priceChangePercent)) -
                Math.abs(Number(a.priceChangePercent))
            )
            .slice(0, 3),
        };

      case "heat":
        return {
          hotTokens: [...usdtMarkets]
            .sort(
              (a, b) =>
                Math.abs(Number(b.priceChangePercent)) -
                Math.abs(Number(a.priceChangePercent))
            )
            .slice(0, 3),

          hotFutures: [...usdtMarkets]
            .sort(
              (a, b) =>
                Math.abs(Number(b.priceChangePercent)) -
                Math.abs(Number(a.priceChangePercent))
            )
            .slice(0, 3),

          newest: [...usdtMarkets]
            .sort(
              (a, b) =>
                Math.abs(Number(b.priceChangePercent)) -
                Math.abs(Number(a.priceChangePercent))
            )
            .slice(0, 3),
        };

      default:
        return {
          hotTokens,
          hotFutures,
          newest,
        };
    }
  };

  const tabData = getTabCoins();

  return (
    <section className="w-full">

      {/* =====================================================
          MARKET NAVIGATION
      ====================================================== */}

      <div
        className="
        mb-6

        flex

        items-center

        gap-8

        overflow-x-auto

        border-b
        border-[#17191F]

        scrollbar-none

        md:gap-10
        "
      >
        {MARKET_TABS.map((tab) => {
          const Icon = tab.icon;

          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                group
                relative
                flex
                shrink-0
                items-center
                gap-2
                pb-4

                text-[17px]
                font-medium

                transition-colors
                duration-200

                md:text-[18px]
                lg:text-[20px]

                ${
                  active
                    ? "text-white"
                    : "text-[#626B7A] hover:text-[#A7AFBC]"
                }
              `}
            >
              {/*
               * Hide most icons on desktop because the
               * reference uses typography-heavy navigation.
               */}
              <Icon
                size={16}
                className="
                hidden

                text-[#697386]

                sm:block

                lg:hidden
                "
              />

              {tab.label}

              {tab.id === "featured" && (
                <span
                  className="
                  flex
                  h-5
                  items-center

                  rounded-[4px]

                  bg-white

                  px-1.5

                  text-[11px]
                  font-black

                  text-black
                  "
                >
                  AI
                </span>
              )}

              {active && (
                <span
                  className="
                  absolute
                  bottom-0
                  left-0
                  right-0

                  h-[2px]

                  rounded-full

                  bg-white
                  "
                />
              )}
            </button>
          );
        })}

        {/* Right arrow */}

        <button
          className="
          ml-auto

          hidden

          shrink-0

          items-center

          justify-center

          text-[#657080]

          transition

          hover:text-white

          lg:flex
          "
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* =====================================================
          CARDS
      ====================================================== */}

      <div
        className="
        grid

        gap-4

        md:grid-cols-2

        xl:grid-cols-3
        "
      >
        <MarketCard
          title="Hot Tokens"
          coins={tabData.hotTokens}
          navigate={navigate}
          type="spot"
          actionLabel="More"
        />

        <MarketCard
          title="Hot Futures"
          coins={tabData.hotFutures}
          navigate={navigate}
          type="future"
          actionLabel="More"
        />

        <MarketCard
          title="Newest"
          coins={tabData.newest}
          navigate={navigate}
          type="new"
          actionLabel="Calendar"
        />
      </div>
    </section>
  );
}

/* =========================================================
   CARD
========================================================= */

function MarketCard({
  title,
  coins = [],
  navigate,
  type,
  actionLabel,
}) {
  return (
    <div
      className="
      min-h-[238px]

      rounded-[12px]

      

      bg-[#101116]

      px-5
      py-5

      transition-colors
      duration-200

      hover:border-[#252932]
      "
    >
      {/* Header */}

      <div
        className="
        mb-5

        flex

        items-center

        justify-between
        "
      >
        <h2
          className="
          text-[14px]

          font-medium

          tracking-[-0.01em]

          text-white
          "
        >
          {title}
        </h2>

        <button
          onClick={() => {
            if (type === "future") {
              navigate("/markets?type=futures");
              return;
            }

            navigate("/markets");
          }}
          className="
          flex

          items-center

          gap-0.5

          text-[13px]

          text-[#687386]

          transition

          hover:text-white
          "
        >
          {actionLabel}

          <ChevronRight
            size={15}
            strokeWidth={1.8}
          />
        </button>
      </div>

      {/* Coins */}

      <div className="space-y-1">

        {coins.length > 0 ? (
          coins.map((coin) => (
            <MarketRow
              key={coin.symbol}
              coin={coin}
              type={type}
              navigate={navigate}
            />
          ))
        ) : (
          <EmptyMarket />
        )}

      </div>
    </div>
  );
}

/* =========================================================
   MARKET ROW
========================================================= */

function MarketRow({
  coin,
  type,
  navigate,
}) {
  const change = Number(
    coin.priceChangePercent || 0
  );

  const positive = change >= 0;

  const isFuture = type === "future";

  /*
   * Binance/MEXC style pair formatting.
   *
   * BTCUSDT -> BTC/USDT
   */
  const spotName = coin.symbol?.endsWith("USDT")
    ? coin.symbol.replace("USDT", "/USDT")
    : coin.symbol;

  return (
    <button
      type="button"
      onClick={() =>
        navigate(
          `/trade?symbol=${encodeURIComponent(
            coin.symbol
          )}`
        )
      }
      className="
      group

      flex
      w-full

      items-center
      justify-between

      rounded-[8px]

      px-0.5
      py-2.5

      text-left

      transition-colors
      duration-150

      hover:bg-[#17191F]
      "
    >
      {/* LEFT */}

      <div
        className="
        flex

        min-w-0

        items-center

        gap-2.5
        "
      >
        <CoinLogo
          symbol={coin.symbol}
        />

        <div className="min-w-0">

          <div className="flex items-center gap-1">

            <p
              className="
              truncate

              text-[14px]

              font-medium

              leading-[18px]

              text-[#E7E9ED]
              "
            >
              {isFuture
                ? coin.symbol
                : spotName}
            </p>

          </div>

          {isFuture && (
            <div
              className="
              mt-[2px]

              flex

              items-center

              gap-1
              "
            >
              <span
                className="
                text-[11px]

                leading-[13px]

                text-[#7B8492]
                "
              >
                Perpetual
              </span>

              <span
                className="
                rounded-[3px]

                bg-[#1745B8]

                px-[4px]
                py-[1px]

                text-[10px]

                font-medium

                leading-[13px]

                text-[#8DB2FF]
                "
              >
                50x
              </span>
            </div>
          )}

        </div>
      </div>

      {/* RIGHT */}

      <div
        className="
        ml-3

        shrink-0

        text-right
        "
      >
        <AnimatedPrice
          price={coin.lastPrice}
          className="
          text-[14px]

          font-medium

          leading-[18px]

          tracking-[-0.01em]

          text-[#E7E9ED]
          "
        />

        <p
          className={`
          mt-[3px]

          text-[13px]

          font-medium

          leading-[16px]

          ${
            positive
              ? "text-[#00C076]"
              : "text-[#FF4D6A]"
          }
          `}
        >
          {positive ? "+" : ""}
          {change.toFixed(2)}%
        </p>
      </div>
    </button>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyMarket() {
  return (
    <div
      className="
      flex

      min-h-[150px]

      items-center

      justify-center

      text-[13px]

      text-[#59616E]
      "
    >
      No market data
    </div>
  );
}