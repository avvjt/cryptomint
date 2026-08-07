import {
  ArrowDown,
  ArrowUp,
} from "lucide-react";

const sellOrders = [
  { price: 117340.52, amount: 0.152 },
  { price: 117330.18, amount: 0.643 },
  { price: 117322.10, amount: 1.241 },
  { price: 117315.44, amount: 0.891 },
  { price: 117308.72, amount: 2.113 },
];

const buyOrders = [
  { price: 117245.20, amount: 0.522 },
  { price: 117238.41, amount: 0.884 },
  { price: 117230.90, amount: 1.552 },
  { price: 117224.13, amount: 0.736 },
  { price: 117215.82, amount: 2.483 },
];

export default function OrderBook() {

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
          text-xs
          uppercase
          tracking-[0.25em]
          text-zinc-500
          "
        >
          Live Market
        </p>

        <h2
          className="
          mt-2
          text-2xl
          font-bold
          "
        >
          Order Book
        </h2>

      </div>

      {/* Header */}

      <div
        className="
        grid
        grid-cols-2
        px-6
        py-3
        text-xs
        uppercase
        tracking-wide
        text-zinc-500
        "
      >

        <span>Price</span>

        <span className="text-right">

          Amount

        </span>

      </div>

      {/* Sell Orders */}

      <div className="px-4">

        {sellOrders.map((item, index) => (

          <div
            key={index}
            className="
            flex
            items-center
            justify-between

            rounded-xl

            px-3
            py-2

            transition

            hover:bg-red-500/5
            "
          >

            <div
              className="
              flex
              items-center
              gap-2
              "
            >

              <ArrowDown
                size={14}
                className="text-red-400"
              />

              <span className="text-red-400">

                {item.price.toLocaleString()}

              </span>

            </div>

            <span className="text-zinc-300">

              {item.amount}

            </span>

          </div>

        ))}

      </div>

      {/* Current Price */}

      <div
        className="
        mx-4
        my-4

        rounded-2xl

        bg-[#171B22]

        py-4

        text-center
        "
      >

        <h2
          className="
          text-2xl
          font-bold
          text-green-400
          "
        >

          117,250.40

        </h2>

        <p className="text-sm text-zinc-500">

          Last Traded Price

        </p>

      </div>

      {/* Buy Orders */}

      <div className="px-4 pb-5">

        {buyOrders.map((item, index) => (

          <div
            key={index}
            className="
            flex
            items-center
            justify-between

            rounded-xl

            px-3
            py-2

            transition

            hover:bg-green-500/5
            "
          >

            <div
              className="
              flex
              items-center
              gap-2
              "
            >

              <ArrowUp
                size={14}
                className="text-green-400"
              />

              <span className="text-green-400">

                {item.price.toLocaleString()}

              </span>

            </div>

            <span className="text-zinc-300">

              {item.amount}

            </span>

          </div>

        ))}

      </div>

    </section>

  );

}