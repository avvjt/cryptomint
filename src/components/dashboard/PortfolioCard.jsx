import {
  Eye,
  EyeOff,
  ArrowDownToLine,
  ArrowUpFromLine,
  Users,
  History,
} from "lucide-react";

import { useState } from "react";

export default function PortfolioCard({

  balance = 0,

  todayIncome = 0,

  dailyRate = 1,

  packageName = "Starter",

  onDeposit,

  onWithdraw,

  onTeam,

  onHistory,

}) {

  const [hideBalance, setHideBalance] = useState(false);

  const formatMoney = (amount) =>
    Number(amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (

    <section
      className="
      overflow-hidden

      rounded-4xl

      border
      border-white/5

      bg-linear-to-br
      from-[#111318]
      to-[#0C1018]

      shadow-[0_0_50px_rgba(0,0,0,.35)]
      "
    >

      {/* Background Glow */}

      <div
        className="
        absolute
        pointer-events-none
        h-72
        w-72
        rounded-full
        bg-[#1D66FF]/10
        blur-[120px]
        "
      />

      <div className="relative p-5 lg:p-8">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div>

            <p className="text-sm text-zinc-500">
              Total Portfolio
            </p>

            <div className="mt-3 flex items-center gap-3">

              <h1
                className="
                text-4xl
                font-bold
                tracking-tight

                lg:text-5xl
                "
              >
                {hideBalance
                  ? "********"
                  : `$${formatMoney(balance)}`}
              </h1>

              <button
                onClick={() =>
                  setHideBalance(!hideBalance)
                }
                className="
                rounded-full

                bg-[#171B22]

                p-2

                hover:bg-[#1E2430]
                "
              >
                {hideBalance
                  ? <Eye size={18} />
                  : <EyeOff size={18} />
                }
              </button>

            </div>

          </div>

          <div
            className="
            rounded-full

            bg-[#1D66FF]/15

            px-4
            py-2

            text-sm

            font-medium

            text-[#6FA6FF]
            "
          >
            {packageName}
          </div>

        </div>

        {/* Statistics */}

        <div
          className="
          mt-8

          grid

          grid-cols-2

          gap-5

          lg:grid-cols-3
          "
        >

          <Stat
            title="Today's Profit"
            value={
              hideBalance
                ? "*****"
                : `+$${formatMoney(todayIncome)}`
            }
            color="text-[#00C076]"
          />

          <Stat
            title="Daily Return"
            value={`${dailyRate}%`}
          />

          <Stat
            title="Investment"
            value={
              hideBalance
                ? "*****"
                : `$${formatMoney(balance)}`
            }
            className="col-span-2 lg:col-span-1"
          />

        </div>

      </div>

      {/* Bottom Actions */}

      <div
        className="
        grid

        grid-cols-4

        border-t

        border-white/5

        bg-[#0B0F15]
        "
      >

        <Action

          icon={ArrowDownToLine}

          title="Deposit"

          onClick={onDeposit}

        />

        <Action

          icon={ArrowUpFromLine}

          title="Withdraw"

          onClick={onWithdraw}

        />

        <Action

          icon={Users}

          title="Team"

          onClick={onTeam}

        />

        <Action

          icon={History}

          title="History"

          onClick={onHistory}

        />

      </div>

    </section>

  );

}

function Stat({

  title,

  value,

  color = "text-white",

  className = "",

}) {

  return (

    <div className={className}>

      <p className="text-xs text-zinc-500">

        {title}

      </p>

      <h3
        className={`
        mt-2

        text-xl

        font-semibold

        lg:text-2xl

        ${color}
        `}
      >

        {value}

      </h3>

    </div>

  );

}

function Action({

  icon: Icon,

  title,

  onClick,

}) {

  return (

    <button

      onClick={onClick}

      className="
      flex

      flex-col

      items-center

      justify-center

      gap-2

      py-5

      transition-all

      duration-300

      hover:bg-[#171B22]

      active:scale-95
      "

    >

      <Icon

        size={22}

        className="text-[#1D66FF]"

      />

      <span
        className="
        text-xs

        font-medium

        text-zinc-300

        lg:text-sm
        "
      >

        {title}

      </span>

    </button>

  );

}