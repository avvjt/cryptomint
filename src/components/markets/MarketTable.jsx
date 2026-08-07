import {
  Star,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function MarketTable({ data = [] }) {

  const navigate = useNavigate();

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

      <div className="p-6 lg:p-8">

        <p
          className="
          uppercase

          tracking-[0.25em]

          text-xs

          text-zinc-500
          "
        >
          All Markets
        </p>

        <h2
          className="
          mt-3

          text-3xl

          font-bold
          "
        >
          Spot Market
        </h2>

      </div>

      {/* Desktop */}

      <div className="hidden lg:block overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-y border-white/5 bg-[#171B22]">

              <th className="px-8 py-5 text-left">

                Coin

              </th>

              <th className="text-center">

                Price

              </th>

              <th className="text-center">

                24H

              </th>

              <th className="text-center">

                Volume

              </th>

              <th className="text-center">

                Market Cap

              </th>

              <th className="text-center">

              </th>

            </tr>

          </thead>

          <tbody>

            {

              data.map((coin)=>(

                <tr

                  key={coin.id}

                  className="
                  border-b
                  border-white/5

                  transition-all

                  hover:bg-[#171B22]
                  "

                >

                  {/* Coin */}

                  <td className="px-8 py-6">

                    <div className="flex items-center gap-4">

                      <button>

                        <Star

                          size={18}

                          className={

                            coin.favorite

                            ? "fill-yellow-400 text-yellow-400"

                            : "text-zinc-600"

                          }

                        />

                      </button>

                      <img

                        src={`https://cryptoicons.org/api/icon/${coin.symbol.toLowerCase()}/100`}

                        alt={coin.symbol}

                        className="h-12 w-12 rounded-full"

                      />

                      <div>

                        <h3 className="font-semibold">

                          {coin.symbol}

                        </h3>

                        <p
                          className="
                          mt-1

                          text-sm

                          text-zinc-500
                          "
                        >

                          {coin.pair}

                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Price */}

                  <td className="text-center font-semibold">

                    ${coin.price.toLocaleString()}

                  </td>

                  {/* Change */}

                  <td>

                    <div className="flex justify-center">

                      <span
                        className={`
                        flex

                        items-center

                        gap-2

                        rounded-full

                        px-4

                        py-2

                        text-sm

                        font-semibold

                        ${
                          coin.change >= 0

                          ? "bg-green-500/10 text-green-400"

                          : "bg-red-500/10 text-red-400"
                        }
                        `}
                      >

                        {

                          coin.change >= 0

                          ? <ArrowUpRight size={16}/>

                          : <ArrowDownRight size={16}/>

                        }

                        {coin.change >= 0 ? "+" : ""}

                        {coin.change}%

                      </span>

                    </div>

                  </td>

                  {/* Volume */}

                  <td className="text-center">

                    {coin.volume}

                  </td>

                  {/* Market Cap */}

                  <td className="text-center">

                    {coin.marketCap}

                  </td>

                  {/* Trade */}

                  <td className="px-8">

                    <div className="flex justify-end">

                      <button

                        onClick={()=>
                          navigate(`/markets/${coin.symbol}`)
                        }

                        className="
                        rounded-full

                        bg-[#1D66FF]

                        px-6

                        py-2.5

                        font-medium

                        transition

                        hover:bg-[#3A7BFF]
                        "

                      >

                        Trade

                      </button>

                    </div>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

      {/* Mobile */}

      <div className="lg:hidden p-5 space-y-4">

        {

          data.map((coin)=>(

            <div

              key={coin.id}

              className="
              rounded-3xl

              border
              border-white/5

              bg-[#171B22]

              p-5
              "

            >

              <div className="flex justify-between">

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

                    <p className="text-sm text-zinc-500">

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

              <div
                className="
                mt-6

                grid

                grid-cols-2

                gap-4
                "
              >

                <Info
                  title="Price"
                  value={`$${coin.price.toLocaleString()}`}
                />

                <Info
                  title="Volume"
                  value={coin.volume}
                />

                <Info
                  title="Market Cap"
                  value={coin.marketCap}
                />

                <Info
                  title="24H"
                  value={`${coin.change}%`}
                  color={
                    coin.change >= 0

                    ? "text-green-400"

                    : "text-red-400"
                  }
                />

              </div>

              <button

                onClick={()=>
                  navigate(`/markets/${coin.symbol}`)
                }

                className="
                mt-6

                w-full

                rounded-full

                bg-[#1D66FF]

                py-3

                font-semibold

                transition

                hover:bg-[#3A7BFF]
                "

              >

                Trade

              </button>

            </div>

          ))

        }

      </div>

    </section>

  );

}

function Info({

  title,

  value,

  color="text-white",

}){

  return(

    <div>

      <p
        className="
        text-xs

        text-zinc-500
        "
      >

        {title}

      </p>

      <h3
        className={`
        mt-2

        font-semibold

        ${color}
        `}
      >

        {value}

      </h3>

    </div>

  );

}