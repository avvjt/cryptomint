import { Star } from "lucide-react";
import CoinLogo from "./CoinLogo";
import CoinSelector from "../trade/CoinSelector";

export default function TradingHeader({ market }) {
  const positive =
    Number(market.priceChangePercent) >= 0;

  return (
    <div
      className="
      mb-6
      flex
      flex-wrap
      items-center
      justify-between
      gap-6
      rounded-2xl
      bg-zinc-900
      p-5
      "
    >
      {/* Left */}

      <div className="flex items-center gap-4">

        <CoinLogo symbol={market.symbol} />

        <div>

          <CoinSelector
            currentSymbol={market.symbol}
          />

          <p className="text-sm text-zinc-500">
            Perpetual
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex flex-wrap items-center gap-8">

        <div>

          <p className="text-xs text-zinc-500">
            Last Price
          </p>

          <p className="text-xl font-bold">

            $
            {Number(
              market.lastPrice
            ).toLocaleString()}

          </p>

        </div>

        <div>

          <p className="text-xs text-zinc-500">
            24h Change
          </p>

          <p
            className={`font-bold ${positive
                ? "text-green-500"
                : "text-red-500"
              }`}
          >
            {Number(
              market.priceChangePercent
            ).toFixed(2)}
            %
          </p>

        </div>

        <div>

          <p className="text-xs text-zinc-500">
            24h High
          </p>

          <p>

            $
            {Number(
              market.highPrice
            ).toLocaleString()}

          </p>

        </div>

        <div>

          <p className="text-xs text-zinc-500">
            24h Low
          </p>

          <p>

            $
            {Number(
              market.lowPrice
            ).toLocaleString()}

          </p>

        </div>

        <Star
          className="
          text-zinc-500
          cursor-pointer
          hover:text-yellow-400
          "
        />

      </div>

    </div>
  );
}