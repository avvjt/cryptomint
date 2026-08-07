import {
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

const trades = [

  {
    id: 1,
    price: 117250.42,
    amount: 0.214,
    side: "buy",
    time: "19:25:14",
  },

  {
    id: 2,
    price: 117248.81,
    amount: 0.532,
    side: "sell",
    time: "19:25:12",
  },

  {
    id: 3,
    price: 117246.18,
    amount: 1.842,
    side: "buy",
    time: "19:25:09",
  },

  {
    id: 4,
    price: 117244.65,
    amount: 0.451,
    side: "sell",
    time: "19:25:07",
  },

  {
    id: 5,
    price: 117242.94,
    amount: 0.713,
    side: "buy",
    time: "19:25:04",
  },

  {
    id: 6,
    price: 117241.88,
    amount: 2.315,
    side: "buy",
    time: "19:25:02",
  },

  {
    id: 7,
    price: 117239.56,
    amount: 0.287,
    side: "sell",
    time: "19:24:59",
  },

];

export default function RecentTrades() {

  return (

    <section
      className="
      overflow-hidden

      rounded-[32px]

      border
      border-white/5

      bg-gradient-to-br
      from-[#111318]
      to-[#0D1119]
      "
    >

      {/* Header */}

      <div className="border-b border-white/5 p-6">

        <p
          className="
          text-xs

          uppercase

          tracking-[0.25em]

          text-zinc-500
          "
        >

          Market Activity

        </p>

        <h2
          className="
          mt-2

          text-2xl

          font-bold
          "
        >

          Recent Trades

        </h2>

      </div>

      {/* Table */}

      <div
        className="
        grid

        grid-cols-3

        px-6

        py-4

        text-xs

        uppercase

        tracking-wide

        text-zinc-500
        "
      >

        <span>Price</span>

        <span className="text-center">

          Amount

        </span>

        <span className="text-right">

          Time

        </span>

      </div>

      {trades.map((trade) => (

        <div

          key={trade.id}

          className="
          flex

          items-center

          justify-between

          px-6

          py-3

          transition

          hover:bg-[#171B22]
          "

        >

          {/* Price */}

          <div
            className="
            flex

            items-center

            gap-2
            "
          >

            {

              trade.side === "buy"

              ? (

                <ArrowUpRight
                  size={16}
                  className="text-green-400"
                />

              )

              : (

                <ArrowDownRight
                  size={16}
                  className="text-red-400"
                />

              )

            }

            <span
              className={
                trade.side === "buy"

                ? "font-semibold text-green-400"

                : "font-semibold text-red-400"
              }
            >

              {trade.price.toLocaleString()}

            </span>

          </div>

          {/* Amount */}

          <span className="text-zinc-300">

            {trade.amount}

          </span>

          {/* Time */}

          <span className="text-zinc-500">

            {trade.time}

          </span>

        </div>

      ))}

    </section>

  );

}