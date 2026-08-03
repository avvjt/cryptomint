import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

import CoinLogo from "./CoinLogo";
import AnimatedPrice from "./AnimatedPrice";

export default function MarketRow({ coin }) {

  const navigate = useNavigate();

  const positive =
    Number(coin.priceChangePercent) >= 0;

  return (

    <div
      onClick={() =>
        navigate(`/trade?symbol=${coin.symbol}`)
      }
      className="
      grid
      grid-cols-[3fr_1.2fr_1fr_1.2fr_120px]

      items-center

      px-6
      py-5

      border-b
      border-[#1A1A1A]

      transition-colors

      hover:bg-[#14161B]

      cursor-pointer
      "
    >

      {/* Pair */}

      <div className="flex items-center gap-4">

        <Star
          size={17}
          strokeWidth={1.8}
          className="
          text-zinc-600
          hover:text-yellow-400
          "
        />

        <CoinLogo symbol={coin.symbol} />

        <div>

          <h2 className="font-medium text-[18px]">

            {coin.symbol}

          </h2>

          <div className="mt-1 flex items-center gap-2">

            <span className="text-sm text-zinc-500">

              Perpetual

            </span>

            <span
              className="
              rounded

              bg-[#2157FF]

              px-1.5

              text-[11px]

              text-white
              "
            >
              50x
            </span>

          </div>

        </div>

      </div>

      {/* Price */}

      <div>

        <AnimatedPrice
          price={coin.lastPrice}
          className="
          text-lg
          font-medium
          "
        />

        <p className="mt-1 text-sm text-zinc-500">

          $

          {Number(
            coin.lastPrice
          ).toLocaleString()}

        </p>

      </div>

      {/* Change */}

      <div>

        <p
          className={`
          text-lg
          font-medium

          ${
            positive
              ? "text-[#00C076]"
              : "text-[#FF4D67]"
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

      {/* Volume */}

      <div>

        <p className="text-lg">

          {Number(
            coin.quoteVolume
          ).toLocaleString(
            undefined,
            {
              notation: "compact",
              maximumFractionDigits: 2,
            }
          )}

        </p>

      </div>

      {/* Trade */}

      <div className="flex justify-end">

        <button
          onClick={(e) => {

            e.stopPropagation();

            navigate(
              `/trade?symbol=${coin.symbol}`
            );

          }}
          className="
          rounded-full

          border
          border-[#2D3642]

          px-6
          py-2

          text-sm

          transition

          hover:border-[#1D66FF]

          hover:text-white
          "
        >
          Trade
        </button>

      </div>

    </div>

  );

}