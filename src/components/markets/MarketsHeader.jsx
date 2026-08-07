import {
  TrendingUp,
  ChartCandlestick,
  DollarSign,
  Activity,
} from "lucide-react";

export default function MarketsHeader() {

  return (

    <section
      className="
      relative

      overflow-hidden

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

      {/* Glow */}

      <div
        className="
        absolute

        -right-32
        -top-32

        h-[420px]
        w-[420px]

        rounded-full

        bg-[#1D66FF]/10

        blur-[140px]
        "
      />

      <div className="relative">

        {/* Header */}

        <div
          className="
          flex

          flex-col

          gap-6

          lg:flex-row

          lg:items-center

          lg:justify-between
          "
        >

          <div>

            <p
              className="
              uppercase

              tracking-[.25em]

              text-xs

              text-zinc-500
              "
            >

              Live Crypto Market

            </p>

            <h1
              className="
              mt-3

              text-4xl

              font-bold

              lg:text-5xl
              "
            >

              Global Markets

            </h1>

            <p
              className="
              mt-5

              max-w-2xl

              leading-7

              text-zinc-400
              "
            >

              Track real-time cryptocurrency prices,
              market movements, trading volume,
              and discover the biggest opportunities
              in the crypto market.

            </p>

          </div>

          <div
            className="
            hidden

            lg:flex

            h-28
            w-28

            items-center
            justify-center

            rounded-full

            bg-[#1D66FF]/10
            "
          >

            <ChartCandlestick
              size={48}
              className="text-[#1D66FF]"
            />

          </div>

        </div>

        {/* Stats */}

        <div
          className="
          mt-10

          grid

          gap-5

          md:grid-cols-2

          xl:grid-cols-4
          "
        >

          <StatCard
            icon={DollarSign}
            title="Market Cap"
            value="$4.12T"
            color="#1D66FF"
          />

          <StatCard
            icon={Activity}
            title="24h Volume"
            value="$184.2B"
            color="#00C076"
          />

          <StatCard
            icon={TrendingUp}
            title="BTC Dominance"
            value="61.3%"
            color="#F6C344"
          />

          <StatCard
            icon={ChartCandlestick}
            title="Fear & Greed"
            value="72 • Greed"
            color="#A855F7"
          />

        </div>

      </div>

    </section>

  );

}

function StatCard({

  icon: Icon,

  title,

  value,

  color,

}) {

  return (

    <div
      className="
      group

      rounded-3xl

      border
      border-white/5

      bg-[#171B22]

      p-5

      transition-all

      duration-300

      hover:-translate-y-1

      hover:border-[#1D66FF]/30

      hover:shadow-[0_15px_40px_rgba(29,102,255,.15)]
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

        transition-transform

        duration-300

        group-hover:scale-110
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