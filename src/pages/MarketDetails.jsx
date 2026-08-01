import { useParams } from "react-router-dom";
import useMarket from "../hooks/useMarket";
import TradingHeader from "../components/markets/TradingHeader";
import MarketStats from "../components/markets/MarketStats";
import TradingChart from "../components/markets/TradingChart";
import RightSidebar from "../components/markets/RightSidebar";

export default function MarketDetails() {

  const { symbol } = useParams();
  const market = useMarket(symbol);


  if (!market) {
    return (
      <div className="text-white">
        Loading...
      </div>

    )

  }

  return (

    <div className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto p-5">

        <TradingHeader market={market} />

        <MarketStats market={market} />

        <div className="mt-8">

          <div className="mt-8 grid lg:grid-cols-12 gap-6">

            {/* Chart */}

            <div className="lg:col-span-8">

              <TradingChart
                symbol={market.symbol}
              />

            </div>

            {/* Sidebar */}

            <div className="lg:col-span-4">

              <RightSidebar
                symbol={market.symbol}
                currentPrice={market.lastPrice}
              />

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}