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

    <div className="grid gap-6 lg:grid-cols-3">

      <Card
        title="Hot Tokens"
        coins={hotTokens}
        navigate={navigate}
      />

      <Card
        title="Hot Futures"
        coins={hotFutures}
        navigate={navigate}
      />

      <Card
        title="New Listings"
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
}) {

  return (

    <div
      className="
      rounded-3xl

      border
      border-[#1F2937]

      bg-[#111318]

      p-6

      transition-all
      duration-300

      hover:border-blue-500/30
      "
    >

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-semibold">

          {title}

        </h2>

        <button
          className="
          flex
          items-center
          gap-1

          text-sm
          text-zinc-500

          transition

          hover:text-white
          "
        >

          More

          <ChevronRight size={16} />

        </button>

      </div>

      {/* Coins */}

      <div className="space-y-5">

        {coins.map((coin) => {

          const positive =
            Number(
              coin.priceChangePercent
            ) >= 0;

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

              rounded-2xl

              px-2
              py-2

              transition-all

              hover:bg-[#171B22]
              "
            >

              {/* Left */}

              <div className="flex items-center gap-3">

                <CoinLogo
                  symbol={coin.symbol}
                />

                <div className="text-left">

                  <p className="font-medium">

                    {coin.symbol.replace(
                      "USDT",
                      "/USDT"
                    )}

                  </p>

                  <p className="text-xs text-zinc-500">

                    Perpetual

                  </p>

                </div>

              </div>

              {/* Right */}

              <div className="text-right">

                <AnimatedPrice
                  price={coin.lastPrice}
                  className="text-base font-semibold"
                />

                <p
                  className={`text-sm font-medium ${
                    positive
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >

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