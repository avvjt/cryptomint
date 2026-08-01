import CoinLogo from "./CoinLogo";

export default function MobileMarketRow({ coin }) {
  const isPositive = Number(coin.priceChangePercent) >= 0;

  return (
    <div
      className="
      flex
      items-center
      justify-between
      border-b
      border-zinc-800
      py-4
      px-3
      "
    >
      {/* Left */}

      <div className="flex items-center gap-3">

        <CoinLogo symbol={coin.symbol} />

        <div>

          <h2 className="font-semibold">
            {coin.symbol.replace("USDT", "/USDT")}
          </h2>

          <div className="flex items-center gap-2 mt-1">

            <span className="text-xs text-zinc-500">
              Perpetual
            </span>

            <span
              className="
              rounded
              bg-blue-600
              px-1
              text-xs
              "
            >
              50x
            </span>

          </div>

        </div>

      </div>

      {/* Right */}

      <div className="text-right">

        <p className="text-lg font-semibold">
          ${Number(coin.lastPrice).toLocaleString()}
        </p>

        <p className="text-sm text-zinc-500">
          ${Number(coin.closePrice).toLocaleString()}
        </p>

      </div>

      {/* Change */}

      <div
        className={`
          rounded-lg
          px-3
          py-2
          text-sm
          font-semibold
          text-white

          ${
            isPositive
              ? "bg-green-500"
              : "bg-red-500"
          }
        `}
      >
        {Number(coin.priceChangePercent).toFixed(2)}%
      </div>

    </div>
  );
}