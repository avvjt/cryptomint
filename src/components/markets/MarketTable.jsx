import MarketRow from "./MarketRow";
import MobileMarketRow from "./MobileMarketRow";
import useMarketData from "../../hooks/useMarketData";

export default function MarketTable() {
  const markets = useMarketData();

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block mt-10">

        {/* Header */}

        <div
          className="
          grid
          grid-cols-[3.8fr_1.2fr_1fr_1fr_1fr_120px]

          px-6
          pb-4

          text-[13px]
          font-medium
          text-zinc-500
          "
        >
          <div>Trading Pair</div>

          <div>Price</div>

          <div>Change</div>

          <div>24h High</div>

          <div>24h Low</div>

          <div className="text-right">
            Action
          </div>
        </div>

        <div className="border-b border-[#1A1A1A]" />

        {markets.slice(0, 30).map((coin) => (
          <MarketRow
            key={coin.symbol}
            coin={coin}
          />
        ))}

      </div>

      {/* Mobile */}

      <div className="lg:hidden mt-5">

        {markets.slice(0, 30).map((coin) => (
          <MobileMarketRow
            key={coin.symbol}
            coin={coin}
          />
        ))}

      </div>
    </>
  );
}