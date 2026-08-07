import {
  DollarSign,
  Activity,
  TrendingUp,
  BarChart3,
  Globe,
  Percent,
} from "lucide-react";

const stats = [

  {
    title: "Market Cap",
    value: "$2.33T",
    icon: DollarSign,
    color: "#1D66FF",
  },

  {
    title: "24H Volume",
    value: "$5.24B",
    icon: Activity,
    color: "#00C076",
  },

  {
    title: "Circulating Supply",
    value: "19.98M BTC",
    icon: Globe,
    color: "#F6C344",
  },

  {
    title: "24H High",
    value: "$118,320",
    icon: TrendingUp,
    color: "#00C076",
  },

  {
    title: "24H Low",
    value: "$114,850",
    icon: BarChart3,
    color: "#FF4D67",
  },

  {
    title: "Volatility",
    value: "3.42%",
    icon: Percent,
    color: "#A855F7",
  },

];

export default function MarketStats() {

  return (

    <section
      className="
      rounded-[32px]

      border
      border-white/5

      bg-gradient-to-br
      from-[#111318]
      to-[#0D1119]

      overflow-hidden
      "
    >

      <div className="p-6 border-b border-white/5">

        <p
          className="
          uppercase

          tracking-[0.25em]

          text-xs

          text-zinc-500
          "
        >
          Market Overview
        </p>

        <h2
          className="
          mt-2

          text-2xl

          font-bold
          "
        >
          Statistics
        </h2>

      </div>

      <div className="p-5 space-y-4">

        {stats.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.title}
              className="
              flex

              items-center

              justify-between

              rounded-2xl

              border
              border-white/5

              bg-[#171B22]

              p-4

              transition

              hover:border-[#1D66FF]/30
              "
            >

              <div className="flex items-center gap-4">

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
                    background: `${item.color}20`,
                  }}
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

                    font-semibold
                    "
                  >

                    {item.value}

                  </h3>

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </section>

  );

}