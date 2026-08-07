import {
  TrendingUp,
  ArrowUpRight,
  Star,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function TopMovers({

  data = [],

}) {

  const navigate = useNavigate();

  const movers = [...data]

    .sort((a, b) => b.change - a.change)

    .slice(0, 5);

  return (

    <section>

      <div className="flex items-center justify-between">

        <div>

          <p
            className="
            uppercase

            tracking-[0.25em]

            text-xs

            text-zinc-500
            "
          >

            Market Highlights

          </p>

          <h2
            className="
            mt-2

            text-3xl

            font-bold
            "
          >

            Top Gainers

          </h2>

        </div>

      </div>

      <div
        className="
        mt-8

        flex

        gap-5

        overflow-x-auto

        pb-3

        scrollbar-hide
        "
      >

        {

          movers.map((coin)=>(

            <div

              key={coin.id}

              className="
              group

              min-w-[300px]

              rounded-[28px]

              border
              border-white/5

              bg-gradient-to-br

              from-[#111318]

              to-[#0D1119]

              p-6

              transition-all

              duration-300

              hover:-translate-y-2

              hover:border-[#1D66FF]/30

              hover:shadow-[0_20px_50px_rgba(29,102,255,.15)]
              "

            >

              {/* Top */}

              <div className="flex justify-between">

                <div className="flex items-center gap-4">

                  <img

                    src={`https://cryptoicons.org/api/icon/${coin.symbol.toLowerCase()}/200`}

                    alt={coin.symbol}

                    className="h-14 w-14 rounded-full"

                  />

                  <div>

                    <h3 className="text-xl font-bold">

                      {coin.symbol}

                    </h3>

                    <p className="text-zinc-500">

                      {coin.pair}

                    </p>

                  </div>

                </div>

                <button>

                  <Star
                    size={20}
                    className={`
                    ${
                      coin.favorite

                      ? "fill-yellow-400 text-yellow-400"

                      : "text-zinc-600"
                    }
                    `}
                  />

                </button>

              </div>

              {/* Price */}

              <h2
                className="
                mt-8

                text-3xl

                font-bold
                "
              >

                ${coin.price.toLocaleString()}

              </h2>

              {/* Change */}

              <div
                className="
                mt-4

                flex

                items-center

                gap-2
                "
              >

                <TrendingUp
                  size={18}
                  className="text-green-400"
                />

                <span
                  className="
                  font-semibold

                  text-green-400
                  "
                >

                  +{coin.change}%

                </span>

              </div>

              {/* Fake Chart */}

              <div
                className="
                mt-8

                h-20

                rounded-2xl

                bg-gradient-to-r

                from-green-500/5

                to-green-500/20

                flex

                items-center

                justify-center

                text-green-400
                "
              >

                Mini Chart

              </div>

              {/* Button */}

              <button

                onClick={()=>
                  navigate(`/markets/${coin.symbol}`)
                }

                className="
                mt-8

                flex

                w-full

                items-center

                justify-center

                gap-2

                rounded-full

                bg-[#1D66FF]

                py-3

                font-semibold

                transition-all

                hover:bg-[#3A7BFF]
                "

              >

                Trade

                <ArrowUpRight size={18}/>

              </button>

            </div>

          ))

        }

      </div>

    </section>

  );

}