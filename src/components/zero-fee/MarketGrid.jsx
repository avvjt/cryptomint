import CoinCard from "./CoinCard";

export default function MarketGrid({
  coins,
}) {
  return (
    <div className="overflow-hidden h-[560px]">

      <div
        className="
        scroll-up
        grid
        grid-cols-3
        "
      >
        {[...coins, ...coins].map(
          (coin, index) => (
            <CoinCard
              key={index}
              coin={coin}
            />
          )
        )}
      </div>

    </div>
  );
}