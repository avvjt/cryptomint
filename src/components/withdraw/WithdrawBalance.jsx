import {
  Wallet,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

export default function WithdrawBalance({

  available = 0,

  minimum = 50,

}) {

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

        right-0
        top-0

        h-64
        w-64

        rounded-full

        bg-[#1D66FF]/10

        blur-[120px]
        "
      />

      <div className="relative">

        <div
          className="
          flex

          items-center

          justify-between
          "
        >

          <div>

            <p
              className="
              uppercase

              tracking-[0.25em]

              text-xs

              text-zinc-500
              "
            >

              Available Balance

            </p>

            <h2
              className="
              mt-3

              text-4xl

              font-bold

              lg:text-6xl
              "
            >

              {available.toFixed(2)} USDT

            </h2>

            <p
              className="
              mt-3

              text-zinc-500
              "
            >

              Ready for withdrawal

            </p>

          </div>

          <div
            className="
            hidden

            lg:flex

            h-24
            w-24

            items-center
            justify-center

            rounded-3xl

            bg-[#1D66FF]/10
            "
          >

            <Wallet
              size={42}
              className="text-[#1D66FF]"
            />

          </div>

        </div>

        {/* Stats */}

        <div
          className="
          mt-10

          grid

          gap-4

          md:grid-cols-3
          "
        >

          <Card

            icon={TrendingUp}

            title="Today's Profit"

            value="+18.50 USDT"

            color="#00C076"

          />

          <Card

            icon={ArrowUpRight}

            title="Withdraw Limit"

            value={`${minimum} USDT`}

            color="#F6C344"

          />

          <Card

            icon={Wallet}

            title="Available"

            value={`${available.toFixed(2)} USDT`}

            color="#1D66FF"

          />

        </div>

      </div>

    </section>

  );

}

function Card({

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

        text-xl

        font-semibold
        "
      >

        {value}

      </h3>

    </div>

  );

}