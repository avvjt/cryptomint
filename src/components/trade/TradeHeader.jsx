import {
  Star,
  ChevronDown,
  TrendingUp,
  Activity,
  DollarSign,
  BarChart3,
} from "lucide-react";

export default function TradeHeader() {

  const pair = {
    symbol: "BTC",
    pair: "BTC/USDT",
    price: 117250.4,
    change: 2.56,
    high: 118320,
    low: 114850,
    volume: "5.24B",
    marketCap: "2.33T",
  };

  return (

    <section
      className="
      rounded-[32px]

      border
      border-white/5

      bg-gradient-to-br
      from-[#111318]
      via-[#121826]
      to-[#0D1119]

      p-6

      lg:p-8
      "
    >

      {/* Top */}

      <div
        className="
        flex

        flex-col

        gap-8

        xl:flex-row

        xl:items-center

        xl:justify-between
        "
      >

        {/* Pair */}

        <div className="flex items-center gap-5">

          <img
            src="https://cryptoicons.org/api/icon/btc/200"
            alt="BTC"
            className="h-16 w-16 rounded-full"
          />

          <div>

            <button
              className="
              flex

              items-center

              gap-2
              "
            >

              <h1
                className="
                text-4xl

                font-bold
                "
              >

                {pair.pair}

              </h1>

              <ChevronDown
                size={20}
                className="text-zinc-500"
              />

            </button>

            <div
              className="
              mt-3

              flex

              items-center

              gap-3
              "
            >

              <span
                className="
                text-3xl

                font-bold
                "
              >

                ${pair.price.toLocaleString()}

              </span>

              <span
                className="
                rounded-full

                bg-green-500/10

                px-3

                py-1

                text-green-400

                font-semibold
                "
              >

                +{pair.change}%

              </span>

            </div>

          </div>

        </div>

        {/* Favorite */}

        <button
          className="
          flex

          h-12
          w-12

          items-center
          justify-center

          rounded-2xl

          border
          border-white/5

          bg-[#171B22]

          hover:border-yellow-400
          "
        >

          <Star
            size={20}
            className="text-zinc-500"
          />

        </button>

      </div>

      {/* Stats */}

      <div
        className="
        mt-10

        grid

        gap-5

        sm:grid-cols-2

        xl:grid-cols-4
        "
      >

        <Stat

          icon={TrendingUp}

          title="24H High"

          value={`$${pair.high.toLocaleString()}`}

          color="#00C076"

        />

        <Stat

          icon={Activity}

          title="24H Low"

          value={`$${pair.low.toLocaleString()}`}

          color="#FF4D67"

        />

        <Stat

          icon={BarChart3}

          title="24H Volume"

          value={pair.volume}

          color="#1D66FF"

        />

        <Stat

          icon={DollarSign}

          title="Market Cap"

          value={pair.marketCap}

          color="#F6C344"

        />

      </div>

    </section>

  );

}

function Stat({

  icon: Icon,

  title,

  value,

  color,

}) {

  return (

    <div
      className="
      rounded-3xl

      border
      border-white/5

      bg-[#171B22]

      p-5

      transition-all

      duration-300

      hover:-translate-y-1

      hover:border-[#1D66FF]/30
      "
    >

      <div
        className="
        flex

        h-12
        w-12

        items-center
        justify-center

        rounded-2xl
        "
        style={{
          background: `${color}20`,
        }}
      >

        <Icon
          size={22}
          style={{
            color,
          }}
        />

      </div>

      <p
        className="
        mt-5

        text-sm

        text-zinc-500
        "
      >

        {title}

      </p>

      <h3
        className="
        mt-2

        text-2xl

        font-bold
        "
      >

        {value}

      </h3>

    </div>

  );

}