import {
  AdvancedRealTimeChart,
} from "react-ts-tradingview-widgets";

export default function TradingChart() {

  return (

    <section
      className="
      overflow-hidden

      rounded-[32px]

      border
      border-white/5

      bg-[#111318]
      "
    >

      <div
        className="
        flex

        items-center

        justify-between

        border-b
        border-white/5

        p-6
        "
      >

        <div>

          <p
            className="
            text-xs

            uppercase

            tracking-[0.25em]

            text-zinc-500
            "
          >
            Live Chart
          </p>

          <h2
            className="
            mt-2

            text-2xl

            font-bold
            "
          >
            BTC / USDT
          </h2>

        </div>

      </div>

      <AdvancedRealTimeChart

        theme="dark"

        symbol="BINANCE:BTCUSDT"

        autosize

        interval="30"

        timezone="Etc/UTC"

        hide_side_toolbar={false}

        allow_symbol_change={true}

        withdateranges={true}

        save_image={true}

        style="1"

        locale="en"

        enable_publishing={false}

      />

    </section>

  );

}