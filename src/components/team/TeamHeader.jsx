import {
  Crown,
  Users,
  TrendingUp,
  Award,
} from "lucide-react";

export default function TeamHeader({

  level = 1,

  totalMembers = 0,

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

      {/* Blue Glow */}

      <div
        className="
        absolute

        -right-24
        -top-24

        h-80
        w-80

        rounded-full

        bg-[#1D66FF]/10

        blur-[120px]
        "
      />

      <div className="relative">

        {/* Top */}

        <div
          className="
          flex

          flex-col

          justify-between

          gap-6

          lg:flex-row

          lg:items-center
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

              Referral Team

            </p>

            <h1
              className="
              mt-3

              text-4xl

              font-bold

              lg:text-5xl
              "
            >

              Build Your Network

            </h1>

            <p
              className="
              mt-4

              max-w-xl

              leading-7

              text-zinc-400
              "
            >

              Grow your team, unlock higher
              commission levels, and earn daily
              passive rewards from your network.

            </p>

          </div>

          <div
            className="
            flex

            h-28
            w-28

            items-center
            justify-center

            rounded-full

            border
            border-[#1D66FF]/20

            bg-[#1D66FF]/10
            "
          >

            <Crown
              size={46}
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

          md:grid-cols-3
          "
        >

          <Stat

            icon={Award}

            color="#1D66FF"

            title="Current Level"

            value={`Level ${level}`}

          />

          <Stat

            icon={Users}

            color="#00C076"

            title="Total Members"

            value={totalMembers}

          />

          <Stat

            icon={TrendingUp}

            color="#F6C344"

            title="Today's Team Income"

            value="18.50 USDT"

          />

        </div>

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

      hover:shadow-[0_15px_40px_rgba(29,102,255,.12)]
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

        text-3xl

        font-bold
        "
      >

        {value}

      </h3>

    </div>

  );

}