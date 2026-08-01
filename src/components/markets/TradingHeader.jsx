import CoinLogo from "./CoinLogo";
import { Star } from "lucide-react";

export default function TradingHeader({ market }) {
  const positive =
    Number(market.priceChangePercent) >= 0;

  return (
    <div className="flex items-center justify-between mb-8">

      <div className="flex items-center gap-4">

        <CoinLogo symbol={market.symbol} />

        <div>

          <h1 className="text-3xl font-bold">
            {market.symbol.replace("USDT", "/USDT")}
          </h1>

          <p className="text-zinc-500">
            Perpetual
          </p>

        </div>

      </div>

      <Star className="text-zinc-500" />

    </div>
  );
}