import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

import CoinLogo from "./CoinLogo";
import AnimatedPrice from "./AnimatedPrice";

export default function MobileMarketRow({ coin }) {

  const navigate = useNavigate();

  const positive =
    Number(coin.priceChangePercent) >= 0;

  return (

    <div
      onClick={() =>
        navigate(`/trade?symbol=${coin.symbol}`)
      }
      className="
      flex
      items-center
      justify-between

      border-b
      border-[#1A1A1A]

      px-3
      py-3

      active:bg-[#16181D]
      "
    >

      {/* LEFT */}

      <div className="flex items-center gap-2 flex-1 min-w-0">

        <Star
          size={15}
          strokeWidth={1.8}
          className="text-zinc-600 shrink-0"
        />

        <CoinLogo symbol={coin.symbol} />

        <div className="min-w-0">

          <h2
            className="
            truncate

            text-[15px]
            font-semibold
            leading-none
            "
          >
            {coin.symbol}
          </h2>

          <div className="mt-1 flex items-center gap-1">

            <span className="text-[12px] text-zinc-500">

              {Number(
                coin.quoteVolume
              ).toLocaleString(undefined, {
                notation: "compact",
                maximumFractionDigits: 1,
              })}

            </span>

            <span className="text-[11px] text-zinc-500">

              Perpetual

            </span>

            <span
              className="
              rounded

              bg-[#2157FF]

              px-1.5
              py-px

              text-[10px]
              font-medium
              text-white
              "
            >
              50x
            </span>

          </div>

        </div>

      </div>

      {/* PRICE */}

      <div className="mr-4 text-right">

        <AnimatedPrice
          price={coin.lastPrice}
          className="
          text-[16px]
          font-semibold
          leading-none
          "
        />

        <p className="mt-1 text-[12px] text-zinc-500">

          $
          {Number(
            coin.lastPrice
          ).toLocaleString()}

        </p>

      </div>

      {/* CHANGE */}

      <div>

        <div
          className={`
          min-w-20.5

          rounded-lg

          py-2

          text-center

          text-[15px]
          font-semibold

          ${
            positive
              ? "bg-[#00C076] text-white"
              : "bg-[#FF4D67] text-white"
          }
          `}
        >

          {positive ? "+" : ""}

          {Number(
            coin.priceChangePercent
          ).toFixed(2)}
          %

        </div>

      </div>

    </div>

  );

}