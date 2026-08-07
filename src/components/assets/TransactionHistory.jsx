import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Gift,
  Users,
  ChevronRight,
} from "lucide-react";

export default function TransactionHistory({

  transactions = [],

}) {

  const demoTransactions = [

    {
      id: 1,
      type: "Deposit",
      amount: "+500 USDT",
      date: "Today • 10:32",
      status: "Completed",
      color: "text-[#00C076]",
      icon: ArrowDownToLine,
      bg: "bg-[#00C076]/10",
    },

    {
      id: 2,
      type: "Daily Income",
      amount: "+5.00 USDT",
      date: "Today • 08:00",
      status: "Completed",
      color: "text-[#1D66FF]",
      icon: Gift,
      bg: "bg-[#1D66FF]/10",
    },

    {
      id: 3,
      type: "Team Commission",
      amount: "+12.50 USDT",
      date: "Yesterday",
      status: "Completed",
      color: "text-[#F6C344]",
      icon: Users,
      bg: "bg-[#F6C344]/10",
    },

    {
      id: 4,
      type: "Withdrawal",
      amount: "-100 USDT",
      date: "Yesterday",
      status: "Pending",
      color: "text-[#FF4D67]",
      icon: ArrowUpFromLine,
      bg: "bg-[#FF4D67]/10",
    },

  ];

  const data =
    transactions.length
      ? transactions
      : demoTransactions;

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

      transition-all
      duration-300

      hover:border-[#1D66FF]/30
      hover:shadow-[0_20px_60px_rgba(29,102,255,.15)]
      "
    >

      {/* Header */}

      <div
        className="
        flex

        items-center

        justify-between

        border-b
        border-white/5

        p-6
        "
      >

        <div>

          <p
            className="
            text-xs

            uppercase

            tracking-[0.25em]

            text-zinc-500
            "
          >
            History
          </p>

          <h2
            className="
            mt-2

            text-2xl

            font-bold
            "
          >
            Recent Transactions
          </h2>

        </div>

        <button
          className="
          flex

          items-center

          gap-2

          rounded-full

          bg-[#171B22]

          px-5
          py-2

          text-sm

          transition

          hover:bg-[#202633]
          "
        >

          View All

          <ChevronRight size={18} />

        </button>

      </div>

      {/* Desktop */}

      <div className="hidden md:block">

        {data.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.id}
              className="
              grid

              grid-cols-[70px_1fr_170px_140px]

              items-center

              border-b
              border-white/5

              px-6
              py-5

              transition

              hover:bg-[#171B22]

              last:border-none
              "
            >

              <div
                className={`
                ${item.bg}

                flex

                h-12
                w-12

                items-center
                justify-center

                rounded-2xl
                `}
              >

                <Icon
                  size={22}
                  className={item.color}
                />

              </div>

              <div>

                <h3 className="font-semibold">

                  {item.type}

                </h3>

                <p className="mt-1 text-sm text-zinc-500">

                  {item.date}

                </p>

              </div>

              <h3
                className={`text-lg font-semibold ${item.color}`}
              >

                {item.amount}

              </h3>

              <div>

                <span
                  className={`
                  rounded-full

                  px-3
                  py-1

                  text-xs

                  ${
                    item.status === "Completed"

                      ? "bg-green-500/10 text-green-400"

                      : "bg-yellow-500/10 text-yellow-400"

                  }
                  `}
                >

                  {item.status}

                </span>

              </div>

            </div>

          );

        })}

      </div>

      {/* Mobile */}

      <div className="md:hidden">

        {data.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.id}
              className="
              flex

              items-center

              justify-between

              border-b
              border-white/5

              p-5

              last:border-none
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className={`
                  ${item.bg}

                  flex

                  h-11
                  w-11

                  items-center
                  justify-center

                  rounded-xl
                  `}
                >

                  <Icon
                    size={20}
                    className={item.color}
                  />

                </div>

                <div>

                  <h3 className="font-medium">

                    {item.type}

                  </h3>

                  <p className="text-xs text-zinc-500">

                    {item.date}

                  </p>

                </div>

              </div>

              <div className="text-right">

                <p
                  className={`font-semibold ${item.color}`}
                >

                  {item.amount}

                </p>

                <p className="mt-1 text-xs text-zinc-500">

                  {item.status}

                </p>

              </div>

            </div>

          );

        })}

      </div>

    </section>

  );

}