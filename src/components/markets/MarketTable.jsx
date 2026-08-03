import MarketRow from "./MarketRow";
import MobileMarketRow from "./MobileMarketRow";
import useMarketData from "../../hooks/useMarketData";

export default function MarketTable() {

  const markets = useMarketData();

  return (
    <>

      {/* Desktop */}

      <div
        className="
        hidden
        lg:block

        mt-8

        overflow-hidden

        rounded-3xl

        border
        border-[#1F2937]

        bg-[#111318]
        "
      >

        {/* Header */}

        <div
          className="
          grid

          grid-cols-[3fr_1.2fr_1fr_1.2fr_130px]

          border-b
          border-[#1F2937]

          bg-[#171B22]

          px-6
          py-4

          text-sm
          font-semibold
          text-zinc-400
          "
        >

          <div>Markets</div>

          <div>Last Price</div>

          <div>24h Change</div>

          <div>24h Volume</div>

          <div className="text-right">
            Trade
          </div>

        </div>

        {/* Rows */}

        {markets
          .slice(0, 30)
          .map((coin) => (

            <MarketRow
              key={coin.symbol}
              coin={coin}
            />

          ))}

      </div>

      {/* Mobile */}

      <div
        className="
        lg:hidden

        mt-6

        space-y-3
        "
      >

        {markets
          .slice(0, 30)
          .map((coin) => (

            <MobileMarketRow
              key={coin.symbol}
              coin={coin}
            />

          ))}

      </div>

    </>
  );

}