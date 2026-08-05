import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useMarkets from "../../hooks/useMarkets";
import AnimatedPrice from "./AnimatedPrice";
import CoinLogo from "./CoinLogo";

export default function MarketCards() {

  const navigate = useNavigate();

  const markets = useMarkets();

  const hotTokens = [...markets]
    .sort(
      (a, b) =>
        Math.abs(Number(b.priceChangePercent)) -
        Math.abs(Number(a.priceChangePercent))
    )
    .slice(0, 3);

  const hotFutures = [...markets]
    .sort(
      (a, b) =>
        Number(b.quoteVolume) -
        Number(a.quoteVolume)
    )
    .slice(0, 3);

  const newest = [...markets]
    .slice(-3)
    .reverse();

  return (

    <div className="grid gap-4 lg:grid-cols-3">

      <Card
        title="Hot Tokens"
        type="spot"
        coins={hotTokens}
        navigate={navigate}
      />

      <Card
        title="Hot Futures"
        type="future"
        coins={hotFutures}
        navigate={navigate}
      />

      <Card
        title="Newest"
        type="new"
        coins={newest}
        navigate={navigate}
      />

    </div>

  );

}

function Card({
  title,
  coins,
  navigate,
  type,
}) {

  return (

    <div
      className="
      rounded-2xl

      border
      border-[#1D2026]

      bg-[#111318]

      p-5

      transition-all
      duration-300

      hover:border-[#2A3442]
      "
    >

      {/* Header */}

      <div className="mb-5 flex items-center justify-between">

        <h2
          className="
          text-[20px]
          font-semibold
          text-white
          "
        >
          {title}
        </h2>

        <button
          className="
          flex
          items-center
          gap-1

          text-[14px]
          text-zinc-500

          transition

          hover:text-white
          "
        >

          More

          <ChevronRight
            size={16}
          />

        </button>

      </div>

      <div className="space-y-2">
                {coins.map((coin) => {

          const positive =
            Number(coin.priceChangePercent) >= 0;

          const isFuture =
            type === "future";

          return (

            <button
              key={coin.symbol}
              onClick={() =>
                navigate(
                  `/trade?symbol=${coin.symbol}`
                )
              }
              className="
              flex
              w-full
              items-center
              justify-between

              rounded-xl

              px-2
              py-2.5

              transition-all
              duration-200

              hover:bg-[#181B21]
              "
            >

              {/* Left */}

              <div className="flex items-center gap-2.5">

                <CoinLogo
                  symbol={coin.symbol}
                />

                <div className="text-left">

                  <p
                    className="
                    text-[15px]
                    font-medium
                    text-white
                    "
                  >

                    {
                      isFuture
                        ? coin.symbol
                        : coin.symbol.replace(
                            "USDT",
                            "/USDT"
                          )
                    }

                  </p>

                  {
                    isFuture && (

                      <div className="mt-1 flex items-center gap-1">

                        <span
                          className="
                          text-[12px]
                          leading-none
                          text-zinc-500
                          "
                        >
                          Perpetual
                        </span>

                        <span
                          className="
                          rounded-sm

                          bg-[#2157FF]

                          px-1

                          text-[10px]
                          leading-4
                          text-white
                          "
                        >
                          50x
                        </span>

                      </div>

                    )
                  }

                </div>

              </div>

              {/* Right */}

              <div className="text-right">

                <AnimatedPrice
                  price={coin.lastPrice}
                  className="
                  text-[15px]
                  font-medium
                  text-white
                  "
                />

                <p
                  className={`
                  mt-1

                  text-[15px]
                  font-medium

                  ${
                    positive
                      ? "text-[#00C076]"
                      : "text-[#FF5B6A]"
                  }
                  `}
                >

                  {positive ? "+" : ""}

                  {Number(
                    coin.priceChangePercent
                  ).toFixed(2)}
                  %

                </p>

              </div>

            </button>

          );

        })}

      </div>

    </div>

  );

}