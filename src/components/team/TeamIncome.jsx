import {
  Wallet,
  TrendingUp,
  Users,
  ArrowUpRight,
} from "lucide-react";

export default function TeamIncome({

  totalIncome = 1285.40,

  todayIncome = 35.20,

  levelA = 20.15,

  levelB = 10.25,

  levelC = 4.80,

}) {

  return (

    <section
      className="
      rounded-[32px]

      border
      border-white/5

      bg-gradient-to-br
      from-[#111318]
      to-[#0D1119]

      p-6

      lg:p-8
      "
    >

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <p
            className="
            text-xs
            uppercase
            tracking-[0.25em]
            text-zinc-500
            "
          >
            Team Earnings
          </p>

          <h2
            className="
            mt-3
            text-3xl
            font-bold
            "
          >
            ${totalIncome.toFixed(2)}
          </h2>

          <p className="mt-2 text-zinc-500">

            Lifetime Team Commission

          </p>

        </div>

        <div
          className="
          flex

          h-16
          w-16

          items-center
          justify-center

          rounded-2xl

          bg-[#1D66FF]/10
          "
        >

          <Wallet
            size={28}
            className="text-[#1D66FF]"
          />

        </div>

      </div>

      {/* Today */}

      <div
        className="
        mt-8

        rounded-3xl

        border
        border-green-500/20

        bg-green-500/10

        p-5
        "
      >

        <div className="flex items-center gap-3">

          <TrendingUp
            size={22}
            className="text-green-400"
          />

          <div>

            <p className="text-sm text-green-300">

              Today's Commission

            </p>

            <h3 className="mt-1 text-2xl font-bold text-green-400">

              +${todayIncome.toFixed(2)}

            </h3>

          </div>

        </div>

      </div>

      {/* Breakdown */}

      <div className="mt-8">

        <h3 className="font-semibold">

          Commission Breakdown

        </h3>

        <div className="mt-5 space-y-5">

          <ProgressRow
            title="Level A"
            amount={levelA}
            color="bg-[#1D66FF]"
          />

          <ProgressRow
            title="Level B"
            amount={levelB}
            color="bg-[#00C076]"
          />

          <ProgressRow
            title="Level C"
            amount={levelC}
            color="bg-[#F6C344]"
          />

        </div>

      </div>

      {/* Bottom */}

      <div
        className="
        mt-8

        flex

        items-center

        justify-between

        rounded-3xl

        bg-[#171B22]

        p-5
        "
      >

        <div className="flex items-center gap-3">

          <Users
            size={24}
            className="text-[#1D66FF]"
          />

          <div>

            <p className="text-sm text-zinc-500">

              Team Status

            </p>

            <h3 className="font-semibold">

              Growing Successfully

            </h3>

          </div>

        </div>

        <ArrowUpRight
          size={22}
          className="text-[#1D66FF]"
        />

      </div>

    </section>

  );

}

function ProgressRow({

  title,

  amount,

  color,

}) {

  const percent = Math.min(amount * 4, 100);

  return (

    <div>

      <div className="flex justify-between">

        <span className="text-zinc-400">

          {title}

        </span>

        <span className="font-semibold">

          ${amount.toFixed(2)}

        </span>

      </div>

      <div
        className="
        mt-3

        h-2

        rounded-full

        bg-[#232B36]
        "
      >

        <div
          className={`h-full rounded-full ${color}`}
          style={{
            width: `${percent}%`,
          }}
        />

      </div>

    </div>

  );

}