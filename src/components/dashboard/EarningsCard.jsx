import {
  TrendingUp,
  Gift,
  Users,
  DollarSign,
} from "lucide-react";

export default function EarningsCard({

  investmentIncome = 0,

  referralIncome = 0,

  teamIncome = 0,

}) {

  const total =
    Number(investmentIncome) +
    Number(referralIncome) +
    Number(teamIncome);

  const money = (value) =>
    Number(value).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (

    <section
      className="
      rounded-4xl

      border
      border-white/5

      bg-[#111318]

      p-5

      lg:p-7
      "
    >

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-zinc-500">
            Today's Earnings
          </p>

          <h2
            className="
            mt-2

            text-4xl

            font-bold

            text-[#00C076]
            "
          >
            +${money(total)}
          </h2>

        </div>

        <div
          className="
          flex

          h-14
          w-14

          items-center
          justify-center

          rounded-2xl

          bg-[#00C076]/15
          "
        >
          <DollarSign
            className="text-[#00C076]"
          />
        </div>

      </div>

      {/* Income Cards */}

      <div
        className="
        mt-8

        grid

        gap-4

        md:grid-cols-3
        "
      >

        <IncomeCard

          title="Investment"

          value={investmentIncome}

          icon={TrendingUp}

          color="#1D66FF"

        />

        <IncomeCard

          title="Referral Bonus"

          value={referralIncome}

          icon={Gift}

          color="#F6C344"

        />

        <IncomeCard

          title="Team Commission"

          value={teamIncome}

          icon={Users}

          color="#A855F7"

        />

      </div>

    </section>

  );

}

function IncomeCard({

  title,

  value,

  icon: Icon,

  color,

}) {

  return (

    <div
      className="
      rounded-2xl

      bg-[#171B22]

      p-5
      "
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-zinc-500">

            {title}

          </p>

          <h3
            className="mt-2 text-2xl font-bold"
            style={{ color }}
          >

            +${Number(value).toFixed(2)}

          </h3>

        </div>

        <div
          className="
          flex

          h-11
          w-11

          items-center
          justify-center

          rounded-xl
          "
          style={{
            backgroundColor: `${color}20`,
          }}
        >

          <Icon
            size={20}
            style={{ color }}
          />

        </div>

      </div>

    </div>

  );

}