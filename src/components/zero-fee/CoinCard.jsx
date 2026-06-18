import {
  SiBitcoin,
  SiEthereum,
  SiSolana,
  SiXrp,
  SiDogecoin,
  SiBinance,
  SiCardano,
  SiChainlink,
  SiLitecoin,
 
} from "react-icons/si";

const icons = {
  BTC: SiBitcoin,
  ETH: SiEthereum,
  SOL: SiSolana,
  XRP: SiXrp,
  DOGE: SiDogecoin,
  BNB: SiBinance,
  ADA: SiCardano,
  LINK: SiChainlink,
  LTC: SiLitecoin,
 

  // Temporary fallback
  AVAX: SiBitcoin,
};

export default function CoinCard({ coin }) {
  const symbol = coin.symbol.replace(
    "USDT",
    ""
  );

  const Icon =
    icons[symbol] || SiBitcoin;

  const positive =
    Number(
      coin.priceChangePercent
    ) >= 0;

  return (
    <div
      className="
      border
      border-[#12203a]
      bg-[#050A14]
      p-5
      min-h-[170px]
      "
    >
      {/* Top */}

      <div className="flex items-center gap-4">

        <div
          className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[#091224]
          "
        >
          <Icon
            className="
            text-3xl
            text-white
            "
          />
        </div>

        <div>
          <h3 className="text-xl text-white">
            {symbol}
          </h3>

          <p className="text-zinc-500">
            {coin.symbol}
          </p>
        </div>

      </div>

      {/* Price */}

      <div className="mt-8">

        <h4
          className="
          text-4xl
          text-white
          "
        >
          $
          {Number(
            coin.lastPrice
          ).toLocaleString()}
        </h4>

        <p
          className={`mt-2 ${
            positive
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {positive ? "+" : ""}
          {Number(
            coin.priceChangePercent
          ).toFixed(2)}
          %
        </p>

      </div>

    </div>
  );
}