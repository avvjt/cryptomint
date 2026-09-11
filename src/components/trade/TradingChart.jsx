import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AdvancedRealTimeChart,
} from "react-ts-tradingview-widgets";

import {
  BarChart3,
  Maximize2,
  Settings2,
  Loader2,
} from "lucide-react";

const TIMEFRAMES = [
  {
    label: "1m",
    value: "1",
  },
  {
    label: "5m",
    value: "5",
  },
  {
    label: "15m",
    value: "15",
  },
  {
    label: "30m",
    value: "30",
  },
  {
    label: "1H",
    value: "60",
  },
  {
    label: "4H",
    value: "240",
  },
  {
    label: "1D",
    value: "D",
  },
];

export default function TradingChart() {
  const [searchParams] = useSearchParams();

  const symbol =
    searchParams.get("symbol")?.toUpperCase() ||
    "BTCUSDT";

  const [timeframe, setTimeframe] =
    useState("15");

  const [loading, setLoading] =
    useState(true);

  /*
   * Whenever the coin changes,
   * immediately show the loading state.
   */
  useEffect(() => {
    setLoading(true);
  }, [symbol]);

  /*
   * TradingView can take a little time to
   * initialize its iframe.
   *
   * This removes the loading state after
   * a reasonable amount of time even if
   * TradingView doesn't expose a ready event.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [symbol, timeframe]);

  const tradingViewSymbol =
    `BINANCE:${symbol}`;

  return (
    <section
      className="
        relative
        overflow-hidden

        border-b
        border-[#1A1E24]

        bg-[#0B0E11]
      "
    >

      {/* =====================================================
          CHART TOOLBAR
      ===================================================== */}

      <div
        className="
          flex
          h-10

          items-center
          justify-between

          border-b
          border-[#171B21]

          px-2
          sm:px-3
        "
      >

        {/* Timeframes */}

        <div
          className="
            flex
            items-center
            gap-0.5

            overflow-x-auto

            scrollbar-hide
          "
        >

          {TIMEFRAMES.map((item) => {
            const active =
              timeframe === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() =>
                  setTimeframe(item.value)
                }
                className={`
                  shrink-0

                  rounded-md

                  px-2
                  py-1

                  text-[11px]

                  transition

                  ${
                    active
                      ? "bg-[#1D232B] text-white"
                      : "text-[#69727E] hover:bg-[#151A20] hover:text-white"
                  }
                `}
              >
                {item.label}
              </button>
            );
          })}

        </div>


        {/* Right controls */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-1
          "
        >

          <button
            type="button"
            className="
              hidden
              rounded-md

              px-2
              py-1

              text-[11px]

              text-[#69727E]

              hover:bg-[#171C22]
              hover:text-white

              sm:block
            "
          >
            Original
          </button>

          <button
            type="button"
            className="
              hidden
              rounded-md

              px-2
              py-1

              text-[11px]

              text-[#69727E]

              hover:bg-[#171C22]
              hover:text-white

              sm:block
            "
          >
            TradingView
          </button>

          <button
            type="button"
            className="
              flex
              h-7
              w-7

              items-center
              justify-center

              rounded-md

              text-[#69727E]

              transition

              hover:bg-[#171C22]
              hover:text-white
            "
          >
            <Settings2 size={14} />
          </button>

          <button
            type="button"
            className="
              flex
              h-7
              w-7

              items-center
              justify-center

              rounded-md

              text-[#69727E]

              transition

              hover:bg-[#171C22]
              hover:text-white
            "
          >
            <Maximize2 size={14} />
          </button>

        </div>

      </div>


      {/* =====================================================
          CHART
      ===================================================== */}

      <div
        className="
          relative

          h-[420px]

          sm:h-[500px]

          lg:h-[560px]

          xl:h-[calc(100vh-330px)]

          min-h-[420px]
        "
      >

        {/* Loading overlay */}

        {loading && (
          <div
            className="
              absolute
              inset-0
              z-10

              flex
              items-center
              justify-center

              bg-[#0B0E11]
            "
          >

            <div
              className="
                flex
                flex-col
                items-center
                gap-3
              "
            >

              <Loader2
                size={22}
                className="
                  animate-spin
                  text-[#4D8DFF]
                "
              />

              <div className="text-center">

                <p
                  className="
                    text-[12px]
                    font-medium
                    text-[#D8DDE4]
                  "
                >
                  Loading {symbol.replace("USDT", "/USDT")}
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                    text-[#59616D]
                  "
                >
                  Connecting to Binance market
                </p>

              </div>

            </div>

          </div>
        )}


        {/*

          IMPORTANT:

          key={tradingViewSymbol + timeframe}

          forces TradingView to create a new
          widget whenever either the coin or
          timeframe changes.

        */}

        <AdvancedRealTimeChart
          key={`${tradingViewSymbol}-${timeframe}`}

          theme="dark"

          symbol={tradingViewSymbol}

          autosize

          interval={timeframe}

          timezone="Etc/UTC"

          hide_side_toolbar={false}

          allow_symbol_change={false}

          withdateranges={false}

          save_image={false}

          style="1"

          locale="en"

          enable_publishing={false}

          hide_top_toolbar={false}

          hide_legend={false}

          backgroundColor="#0B0E11"

          gridLineColor="#171B21"
        />

      </div>


      {/* =====================================================
          BOTTOM INFO
      ===================================================== */}

      <div
        className="
          flex
          h-8

          items-center
          gap-5

          overflow-x-auto

          border-t
          border-[#171B21]

          px-3

          scrollbar-hide

          text-[10px]

          text-[#68717D]
        "
      >

        <span
          className="
            flex
            shrink-0
            items-center
            gap-1
          "
        >
          <BarChart3 size={11} />

          VOL(
          {symbol.replace("USDT", "")}
          )
        </span>

        <span className="shrink-0">
          MA(5)
        </span>

        <span className="shrink-0">
          MA(10)
        </span>

        <span className="shrink-0">
          MA(20)
        </span>

      </div>

    </section>
  );
}