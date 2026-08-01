import useMarkets from "../../hooks/useMarkets";
import AnimatedPrice from "./AnimatedPrice";

export default function MarketCards() {

  const markets = useMarkets();

  const hotTokens = [...markets]
    .sort((a, b) => Math.abs(b.priceChangePercent) - Math.abs(a.priceChangePercent))
    .slice(0, 3);

  const hotFutures = [...markets]
    .sort((a, b) => Number(b.quoteVolume) - Number(a.quoteVolume))
    .slice(0, 3);

  const newest = [...markets]
    .slice(-3)
    .reverse();


  return (

    <div className="grid gap-5 lg:grid-cols-3">

      <Card
        title="Hot Tokens"
        coins={hotTokens}
      />

      <Card
        title="Hot Futures"
        coins={hotFutures}
      />

      <Card
        title="Newest"
        coins={newest}
      />

    </div>

  );
}

function Card({ title, coins }) {

  return (

    <div className="rounded-3xl bg-zinc-900 p-6">

      <h2 className="mb-6 text-xl font-semibold">
        {title}
      </h2>

      {
        coins.map((coin) => (
          <div
            key={coin.symbol}
            className="mb-4 flex justify-between"
          >

            <span>
              {coin.symbol}
            </span>

            <AnimatedPrice
              price={coin.lastPrice}
              className="text-base"
            />

          </div>
        ))
      }

    </div>

  );

}