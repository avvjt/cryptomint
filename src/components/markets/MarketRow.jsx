import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CoinLogo from "./CoinLogo";
import AnimatedPrice from "./AnimatedPrice";

export default function MarketRow({ coin }) {
  const navigate = useNavigate();

  const isPositive = Number(coin.priceChangePercent) >= 0;

  return (
    <div
      onClick={() => navigate(`/markets/${coin.symbol}`)}
      className="
      grid
      grid-cols-[2.5fr_1fr_1fr_140px]
      items-center
      border-b
      border-zinc-800
      px-6
      py-5
      hover:bg-zinc-800
      cursor-pointer
      transition-all
      duration-200
      "
    >
      {/* Pair */}

      <div className="flex items-center gap-4">

        <Star
          size={18}
          className="text-zinc-600 hover:text-yellow-400"
        />

        <CoinLogo symbol={coin.symbol} />

        <div>

          <h2 className="font-semibold text-white">

            {coin.symbol.replace("USDT", "")}

          </h2>

          <div className="flex gap-2 mt-2">

            <span
              className="
              text-xs
              text-zinc-500
              "
            >
              Perpetual
            </span>

            <span
              className="
              rounded
              bg-blue-600
              px-2
              py-[2px]
              text-[10px]
              font-semibold
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
          price={Number(coin.lastPrice)}
        />

        <p className="text-xs text-zinc-500">
    ${Number(coin.lastPrice).toFixed(2)}
</p>

      </div>

      {/* Change */}

      <div>

        <span
          className={`
          rounded-lg
          px-4
          py-2
          font-semibold
          text-white

          ${isPositive
              ? "bg-green-500"
              : "bg-red-500"
            }
          `}
        >
          {Number(coin.priceChangePercent).toFixed(2)}%
        </span>

      </div>

      {/* Trade */}

      <div className="flex justify-end">

        <button
          onClick={(e) => {
            e.stopPropagation();

            navigate(`/markets/${coin.symbol}`);
          }}
          className="
          rounded-full
          bg-blue-600
          px-6
          py-2
          font-semibold
          hover:bg-blue-500
          transition
          "
        >
          Trade
        </button>

      </div>

    </div>
  );
}