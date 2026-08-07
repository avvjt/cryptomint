import TradeHeader from "../components/trade/TradeHeader";
import TradingPair from "../components/trade/TradingPair";
import TradingChart from "../components/trade/TradingChart";
import BuySellPanel from "../components/trade/BuySellPanel";
import OrderBook from "../components/trade/OrderBook";
import RecentTrades from "../components/trade/RecentTrades";
import OpenOrders from "../components/trade/OpenOrders";
import OrderHistory from "../components/trade/OrderHistory";
import CoinInformation from "../components/trade/CoinInformation";
import MarketStats from "../components/trade/MarketStats";

export default function Trade() {

  return (

    <div
      className="
      mx-auto
      max-w-[1800px]
      space-y-6
      px-4
      py-6
      lg:px-8
      "
    >

      <TradeHeader />

      <TradingPair />

      {/* Desktop */}

      <div
        className="
        hidden
        xl:grid
        xl:grid-cols-[1fr_380px]
        gap-6
        "
      >

        <div className="space-y-6">

          <TradingChart />

          <OpenOrders />

          <OrderHistory />

        </div>

        <div className="space-y-6">

          <MarketStats />

          <BuySellPanel />

          <OrderBook />

          <RecentTrades />

          <CoinInformation />

        </div>

      </div>

      {/* Mobile */}

      <div className="xl:hidden space-y-6">

        <TradingPair />

        <TradingChart />

        <MarketStats />

        <BuySellPanel />

        <OrderBook />

        <RecentTrades />

        <OpenOrders />

        <OrderHistory />

        <CoinInformation />

      </div>

    </div>

  );

}