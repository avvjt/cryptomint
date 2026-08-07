import {
  Flame,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function TrendingCoins({

  data = [],

}) {

  const navigate = useNavigate();

  const trending = [...data]

    .sort((a, b) =>

      Number(b.volume.replace(/[A-Z]/g, "")) -
      Number(a.volume.replace(/[A-Z]/g, ""))

    )

    .slice(0, 6);

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

            Trending

          </p>

          <h2
            className="
            mt-2

            text-3xl

            font-bold
            "
          >

            Most Active Coins

          </h2>

        </div>

      </div>

      <div
        className="
        mt-8

        grid

        gap-5

        sm:grid-cols-2

        xl:grid-cols-3
        "
      >

        {

          trending.map((coin)=>(

            <div

              key={coin.id}

              className="
              group

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

                    <h3
                      className="
                      text-xl

                      font-bold
                      "
                    >

                      {coin.symbol}

                    </h3>

                    <p
                      className="
                      text-zinc-500
                      "
                    >

                      {coin.pair}

                    </p>

                  </div>

                </div>

                <div
                  className="
                  flex

                  h-10
                  w-10

                  items-center
                  justify-center

                  rounded-full

                  bg-orange-500/10
                  "
                >

                  <Flame
                    size={18}
                    className="text-orange-400"
                  />

                </div>

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

              {/* Bottom */}

              <div
                className="
                mt-6

                flex

                items-center

                justify-between
                "
              >

                <div>

                  <p
                    className="
                    text-sm

                    text-zinc-500
                    "
                  >

                    24h Change

                  </p>

                  <div
                    className="
                    mt-2

                    flex

                    items-center

                    gap-2
                    "
                  >

                    <TrendingUp
                      size={18}
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

                </div>

                <button

                  onClick={()=>
                    navigate(`/markets/${coin.symbol}`)
                  }

                  className="
                  flex

                  items-center

                  gap-2

                  rounded-full

                  bg-[#1D66FF]

                  px-5

                  py-2.5

                  text-sm

                  font-semibold

                  transition

                  hover:bg-[#3A7BFF]
                  "

                >

                  Trade

                  <ArrowUpRight
                    size={16}
                  />

                </button>

              </div>

              {/* Volume */}

              <div
                className="
                mt-8

                rounded-2xl

                bg-[#171B22]

                p-4
                "
              >

                <div
                  className="
                  flex

                  items-center

                  justify-between
                  "
                >

                  <span className="text-zinc-500">

                    Volume

                  </span>

                  <span className="font-semibold">

                    {coin.volume}

                  </span>

                </div>

                <div
                  className="
                  mt-4

                  h-2

                  rounded-full

                  bg-[#232B36]
                  "
                >

                  <div
                    className="
                    h-full

                    w-[75%]

                    rounded-full

                    bg-gradient-to-r

                    from-[#1D66FF]

                    to-[#3A7BFF]
                    "
                  />

                </div>

              </div>

            </div>

          ))

        }

      </div>

    </section>

  );

}