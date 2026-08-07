import {
  Crown,
  ArrowUpRight,
  Clock3,
  Wallet,
} from "lucide-react";

export default function PackageCard({

  packageName = "Starter",

  investment = 0,

  dailyRate = 1,

  dailyIncome = 0,

  nextReward = "23:18:45",

  onUpgrade,

}) {

  const money = (value) =>
    Number(value).toLocaleString(undefined, {
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

      bg-[#111318]
      "
    >

      <div className="p-5 lg:p-7">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-zinc-500">
              Active Investment
            </p>

            <div className="mt-3 flex items-center gap-3">

              <div
                className="
                flex

                h-11
                w-11

                items-center
                justify-center

                rounded-2xl

                bg-[#1D66FF]/15
                "
              >
                <Crown
                  size={22}
                  className="text-[#1D66FF]"
                />
              </div>

              <div>

                <h2 className="text-2xl font-bold">

                  {packageName}

                </h2>

                <p className="text-sm text-zinc-500">

                  Investment Package

                </p>

              </div>

            </div>

          </div>

          <button
            onClick={onUpgrade}
            className="
            flex

            items-center

            gap-2

            rounded-full

            bg-[#1D66FF]

            px-4
            py-2

            text-sm
            font-medium

            hover:bg-[#3478ff]
            "
          >

            Upgrade

            <ArrowUpRight size={17} />

          </button>

        </div>

        {/* Stats */}

        <div
          className="
          mt-8

          grid

          gap-4

          md:grid-cols-2

          xl:grid-cols-4
          "
        >

          <Info

            icon={Wallet}

            label="Investment"

            value={`$${money(investment)}`}

          />

          <Info

            icon={ArrowUpRight}

            label="Daily Return"

            value={`${dailyRate}%`}

            valueColor="text-[#00C076]"

          />

          <Info

            icon={Wallet}

            label="Today's Reward"

            value={`$${money(dailyIncome)}`}

          />

          <Info

            icon={Clock3}

            label="Next Reward"

            value={nextReward}

          />

        </div>

      </div>

    </section>

  );

}

function Info({

  icon: Icon,

  label,

  value,

  valueColor = "text-white",

}) {

  return (

    <div
      className="
      rounded-2xl

      bg-[#171B22]

      p-5
      "
    >

      <div className="flex items-center gap-3">

        <div
          className="
          flex

          h-10
          w-10

          items-center
          justify-center

          rounded-xl

          bg-[#1D66FF]/15
          "
        >

          <Icon
            size={18}
            className="text-[#1D66FF]"
          />

        </div>

        <div>

          <p className="text-xs text-zinc-500">

            {label}

          </p>

          <h3
            className={`
            mt-1

            text-lg

            font-semibold

            ${valueColor}
            `}
          >

            {value}

          </h3>

        </div>

      </div>

    </div>

  );

}