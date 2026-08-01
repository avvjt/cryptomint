import {
  AdvancedRealTimeChart,
} from "react-ts-tradingview-widgets";

export default function TradingChart({
  symbol,
}) {

  return (
    <div className="h-[700px] w-full overflow-hidden rounded-3xl">

      <AdvancedRealTimeChart
        theme="dark"
        autosize
        symbol={`BINANCE:${symbol}`}
        interval="15"
        hide_top_toolbar={false}
        hide_legend={false}
        allow_symbol_change={false}
      />

    </div>
  );
}