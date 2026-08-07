import {
  Users,
  UserRound,
  TrendingUp,
  DollarSign,
} from "lucide-react";

export default function TeamStats({

  levelA = 0,

  levelB = 0,

  levelC = 0,

  todayIncome = 0,

  totalIncome = 0,

}) {

  const cards = [

    {
      title: "Level A",
      value: levelA,
      subtitle: "Direct Referrals",
      icon: UserRound,
      color: "#1D66FF",
    },

    {
      title: "Level B",
      value: levelB,
      subtitle: "Second Level",
      icon: Users,
      color: "#00C076",
    },

    {
      title: "Level C",
      value: levelC,
      subtitle: "Third Level",
      icon: Users,
      color: "#F6C344",
    },

    {
      title: "Today's Income",
      value: `${todayIncome} USDT`,
      subtitle: "Commission",
      icon: TrendingUp,
      color: "#A855F7",
    },

    {
      title: "Total Income",
      value: `${totalIncome} USDT`,
      subtitle: "Lifetime",
      icon: DollarSign,
      color: "#00C076",
    },

  ];

  return (

    <section>

      <div
        className="
        grid

        gap-5

        sm:grid-cols-2

        xl:grid-cols-5
        "
      >

        {cards.map((card) => {

          const Icon = card.icon;

          return (

            <div

              key={card.title}

              className="
              group

              rounded-[28px]

              border
              border-white/5

              bg-gradient-to-br
              from-[#111318]
              to-[#0D1119]

              p-5

              transition-all
              duration-300

              hover:-translate-y-1

              hover:border-[#1D66FF]/30

              hover:shadow-[0_20px_50px_rgba(29,102,255,.15)]
              "

            >

              <div
                className="
                flex

                items-center

                justify-between
                "
              >

                <div>

                  <p className="text-sm text-zinc-500">

                    {card.title}

                  </p>

                  <h3
                    className="
                    mt-3

                    text-3xl

                    font-bold
                    "
                  >

                    {card.value}

                  </h3>

                  <p
                    className="
                    mt-2

                    text-xs

                    text-zinc-500
                    "
                  >

                    {card.subtitle}

                  </p>

                </div>

                <div
                  className="
                  flex

                  h-14
                  w-14

                  items-center
                  justify-center

                  rounded-2xl

                  transition-transform

                  duration-300

                  group-hover:scale-110
                  "
                  style={{
                    background: `${card.color}20`,
                  }}
                >

                  <Icon
                    size={26}
                    style={{
                      color: card.color,
                    }}
                  />

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </section>

  );

}