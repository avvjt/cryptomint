import { useSearchParams } from "react-router-dom";

import useMarket from "../hooks/useMarket";

import TradingHeader from "../components/markets/TradingHeader";
import MarketStats from "../components/markets/MarketStats";
import TradingChart from "../components/markets/TradingChart";
import RightSidebar from "../components/markets/RightSidebar";
import InvestmentCard from "../components/trade/InvestmentCard";
import InvestmentPanel from "../components/trade/InvestmentPanel";

export default function Trade() {

  const [searchParams] = useSearchParams();

  const symbol =
    searchParams.get("symbol") || "BTCUSDT";

  const market = useMarket(symbol);

  if (!market) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      <div className="mx-auto max-w-[1700px] p-5">

        <TradingHeader market={market} />

        <MarketStats market={market} />

        <div className="mt-8 grid gap-6 lg:grid-cols-12">

          <div className="lg:col-span-8 space-y-6">

            <TradingChart
              symbol={market.symbol}
            />

            <InvestmentCard />

          </div>

          <div className="lg:col-span-4">

            <InvestmentPanel />

            <RightSidebar
              symbol={market.symbol}
              currentPrice={market.lastPrice}
            />

          </div>

        </div>

      </div>

    </div>
  );
}