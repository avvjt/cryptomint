import useTickerSocket from "../../hooks/useTickerSocket";
import MarketRow from "./MarketRow";
import MobileMarketRow from "./MobileMarketRow";
import useMarketData from "../../hooks/useMarketData";


export default function MarketTable() {
  const markets = useMarketData();
  console.log(markets);

  return (
    <>
      {/* Desktop */}
      <div
        className="
        hidden
        lg:block
        mt-8
        rounded-xl
        bg-zinc-900
        overflow-hidden
        "
      >
        {/* Header */}
        <div
          className="
          grid
          grid-cols-[2.5fr_1fr_1fr_140px]
          bg-zinc-800
          p-4
          text-sm
          font-semibold
          text-zinc-400
          "
        >
          <div>Markets</div>

          <div>Last Price</div>

          <div>24h Change</div>

          <div className="text-right">
            Trade
          </div>
        </div>

        {/* Rows */}
        {markets.slice(0, 30).map((coin) => (
          <MarketRow
            key={coin.s}
            coin={coin}
          />
        ))}
      </div>

      {/* Mobile */}
      <div
        className="
        lg:hidden
        mt-6
        rounded-xl
        bg-zinc-900
        overflow-hidden
        "
      >
        {markets.slice(0, 30).map((coin) => (
          <MobileMarketRow
            key={coin.symble}
            coin={coin}
          />
        ))}
      </div>
    </>
  );
}