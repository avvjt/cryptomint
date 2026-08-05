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
      grid-cols-[3.8fr_1.2fr_1fr_1fr_1fr_120px]

      items-center

      px-6
      py-[15px]

      border-b
      border-[#1A1A1A]

      cursor-pointer

      transition-colors
      duration-150

      hover:bg-[#111318]
      "
    >
      {/* Pair */}

      <div className="flex items-center gap-3">

        <button
          onClick={(e) => e.stopPropagation()}
          className="
          text-zinc-600
          hover:text-yellow-400
          transition
          "
        >
          <Star size={16} />
        </button>

        <CoinLogo symbol={coin.symbol} />

        <div>

          <h2
            className="
            text-[15px]
            font-medium
            text-white
            "
          >
            {coin.symbol}
          </h2>

          <div className="mt-1 flex items-center gap-2">

            <span
              className="
              text-[12px]
              text-zinc-500
              "
            >
              Perpetual
            </span>

            <span
              className="
              rounded-sm

              bg-[#2157FF]

              px-1.5

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

      {/* Price */}

      <div>

        <AnimatedPrice
          price={coin.lastPrice}
          className="
          text-[15px]
          font-medium
          "
        />

        <p
          className="
          mt-1

          text-[12px]
          text-zinc-500
          "
        >
          $
          {Number(
            coin.lastPrice
          ).toLocaleString()}
        </p>

      </div>

      {/* Change */}

      <div>

        <span
          className={`
          text-[15px]
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
        </span>

      </div>

      {/* 24h High */}

      <div>

        <span
          className="
          text-[15px]
          text-white
          "
        >
          $
          {Number(
            coin.highPrice
          ).toLocaleString()}
        </span>

      </div>

      {/* 24h Low */}

      <div>

        <span
          className="
          text-[15px]
          text-white
          "
        >
          $
          {Number(
            coin.lowPrice
          ).toLocaleString()}
        </span>

      </div>

      {/* Action */}

      <div className="flex justify-end">

        <button
          onClick={(e) => {
            e.stopPropagation();

            navigate(
              `/trade?symbol=${coin.symbol}`
            );
          }}
          className="
          h-8
          w-20

          rounded-full

          border
          border-[#2B3442]

          text-[13px]
          font-medium

          text-white

          transition-all

          hover:border-white
          "
        >
          Trade
        </button>

      </div>

    </div>
  );
}