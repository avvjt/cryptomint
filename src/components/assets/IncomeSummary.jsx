import {
  TrendingUp,
  Gift,
  Users,
  PiggyBank,
} from "lucide-react";

export default function IncomeSummary({

  today = 0,

  total = 0,

  referral = 0,

  team = 0,

}) {

  const format = (value) =>
    Number(value).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const cards = [

    {
      title: "Today's Income",
      value: format(today),
      icon: TrendingUp,
      color: "#00C076",
      bg: "bg-[#00C076]/10",
    },

    {
      title: "Total Income",
      value: format(total),
      icon: PiggyBank,
      color: "#1D66FF",
      bg: "bg-[#1D66FF]/10",
    },

    {
      title: "Referral Bonus",
      value: format(referral),
      icon: Gift,
      color: "#F6C344",
      bg: "bg-[#F6C344]/10",
    },

    {
      title: "Team Income",
      value: format(team),
      icon: Users,
      color: "#A855F7",
      bg: "bg-[#A855F7]/10",
    },

  ];

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

      transition-all
      duration-300

      hover:border-[#1D66FF]/30
      hover:shadow-[0_20px_60px_rgba(29,102,255,.15)]
      "
    >

      {/* Header */}

      <div>

        <p
          className="
          text-xs

          uppercase

          tracking-[0.25em]

          text-zinc-500
          "
        >
          Income Summary
        </p>

        <h2
          className="
          mt-2

          text-2xl

          font-bold
          "
        >
          Earnings Overview
        </h2>

      </div>

      {/* Cards */}

      <div
        className="
        mt-8

        space-y-4
        "
      >

        {cards.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.title}
              className="
              group

              flex

              items-center

              justify-between

              rounded-2xl

              bg-[#171B22]

              p-4

              transition-all
              duration-300

              hover:bg-[#1C222C]
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className={`
                  ${item.bg}

                  flex

                  h-12
                  w-12

                  items-center
                  justify-center

                  rounded-2xl

                  transition-transform

                  duration-300

                  group-hover:scale-110
                  `}
                >

                  <Icon
                    size={22}
                    style={{
                      color: item.color,
                    }}
                  />

                </div>

                <div>

                  <p className="text-sm text-zinc-500">

                    {item.title}

                  </p>

                  <h3
                    className="
                    mt-1

                    text-lg

                    font-semibold
                    "
                  >

                    {item.value} USDT

                  </h3>

                </div>

              </div>

              <div
                className="text-sm font-medium"
                style={{
                  color: item.color,
                }}
              >

                +100%

              </div>

            </div>

          );

        })}

      </div>

    </section>

  );

}