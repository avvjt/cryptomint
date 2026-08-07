import { useState } from "react";
import {
  Search,
  Star,
  TrendingUp,
} from "lucide-react";

const pairs = [

  {
    symbol: "BTC",
    pair: "BTC/USDT",
    price: "117,250.40",
    change: 2.56,
    favorite: true,
  },

  {
    symbol: "ETH",
    pair: "ETH/USDT",
    price: "4,285.62",
    change: -1.42,
    favorite: false,
  },

  {
    symbol: "SOL",
    pair: "SOL/USDT",
    price: "189.62",
    change: 8.72,
    favorite: true,
  },

  {
    symbol: "BNB",
    pair: "BNB/USDT",
    price: "815.11",
    change: 1.81,
    favorite: false,
  },

  {
    symbol: "XRP",
    pair: "XRP/USDT",
    price: "3.08",
    change: -3.11,
    favorite: false,
  },

];

export default function TradingPair() {

  const [active, setActive] =
    useState("BTC/USDT");

  const [search, setSearch] =
    useState("");

  const filtered = pairs.filter((coin) =>
    coin.pair
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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
      "
    >

      {/* Search */}

      <div
        className="
        flex

        items-center

        gap-3

        rounded-2xl

        border
        border-white/5

        bg-[#171B22]

        px-4

        h-12
        "
      >

        <Search
          size={18}
          className="text-zinc-500"
        />

        <input

          value={search}

          onChange={(e)=>
            setSearch(e.target.value)
          }

          placeholder="Search Pair"

          className="
          w-full

          bg-transparent

          outline-none
          "

        />

      </div>

      {/* Pair List */}

      <div
        className="
        mt-6

        flex

        gap-4

        overflow-x-auto

        pb-2

        scrollbar-hide
        "
      >

        {

          filtered.map((coin)=>(

            <button

              key={coin.pair}

              onClick={()=>
                setActive(coin.pair)
              }

              className={`
              min-w-[240px]

              rounded-3xl

              border

              p-5

              text-left

              transition-all

              duration-300

              ${
                active===coin.pair

                ? "border-[#1D66FF] bg-[#1D66FF]/10"

                : "border-white/5 bg-[#171B22]"
              }
              `}
            >

              <div
                className="
                flex

                justify-between
                "
              >

                <div className="flex items-center gap-3">

                  <img

                    src={`https://cryptoicons.org/api/icon/${coin.symbol.toLowerCase()}/100`}

                    alt={coin.symbol}

                    className="h-12 w-12"

                  />

                  <div>

                    <h3 className="font-semibold">

                      {coin.symbol}

                    </h3>

                    <p
                      className="
                      text-sm

                      text-zinc-500
                      "
                    >

                      {coin.pair}

                    </p>

                  </div>

                </div>

                <Star

                  size={18}

                  className={
                    coin.favorite

                    ? "fill-yellow-400 text-yellow-400"

                    : "text-zinc-600"
                  }

                />

              </div>

              <h2
                className="
                mt-6

                text-2xl

                font-bold
                "
              >

                ${coin.price}

              </h2>

              <div
                className="
                mt-3

                flex

                items-center

                gap-2
                "
              >

                <TrendingUp
                  size={16}
                  className={
                    coin.change >= 0

                    ? "text-green-400"

                    : "text-red-400"
                  }
                />

                <span
                  className={
                    coin.change >= 0

                    ? "font-semibold text-green-400"

                    : "font-semibold text-red-400"
                  }
                >

                  {coin.change >= 0 ? "+" : ""}

                  {coin.change}%

                </span>

              </div>

            </button>

          ))

        }

      </div>

    </section>

  );

}