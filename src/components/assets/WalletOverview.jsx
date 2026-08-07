import {
  Wallet,
  Landmark,
  ArrowUpCircle,
  Clock3,
} from "lucide-react";

export default function WalletOverview({

  investment = 0,

  profit = 0,

  withdrawable = 0,

  pending = 0,

}) {

  const format = (value) =>
    Number(value).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const cards = [

    {
      title: "Investment Wallet",
      value: `${format(investment)} USDT`,
      subtitle: "Active Capital",
      icon: Wallet,
      color: "#1D66FF",
    },

    {
      title: "Profit Wallet",
      value: `${format(profit)} USDT`,
      subtitle: "Earned Rewards",
      icon: Landmark,
      color: "#00C076",
    },

    {
      title: "Withdrawable",
      value: `${format(withdrawable)} USDT`,
      subtitle: "Ready to Withdraw",
      icon: ArrowUpCircle,
      color: "#F6C344",
    },

    {
      title: "Pending",
      value: `${format(pending)} USDT`,
      subtitle: "Processing",
      icon: Clock3,
      color: "#FF4D67",
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
          text-sm

          uppercase

          tracking-[0.25em]

          text-zinc-500
          "
        >
          Wallet Overview
        </p>

        <h2
          className="
          mt-2

          text-2xl

          font-bold
          "
        >
          Your Wallets
        </h2>

      </div>

      {/* Wallet Cards */}

      <div
        className="
        mt-8

        grid

        grid-cols-1

        gap-4

        sm:grid-cols-2
        "
      >

        {cards.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.title}
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

              hover:border-white/10
              "
            >

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm text-zinc-500">

                    {item.title}

                  </p>

                  <h3
                    className="
                    mt-3

                    text-xl

                    font-bold
                    "
                  >

                    {item.value}

                  </h3>

                  <p
                    className="
                    mt-2

                    text-xs

                    text-zinc-500
                    "
                  >

                    {item.subtitle}

                  </p>

                </div>

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

              </div>

            </div>

          );

        })}

      </div>

    </section>

  );

}