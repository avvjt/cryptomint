export default function MarketStats({ market }) {

  const positive = Number(market.priceChangePercent) >= 0;

  return (

    <div className="grid lg:grid-cols-6 grid-cols-2 gap-5">

      <Stat
        title="Last Price"
        value={`$${Number(market.lastPrice).toLocaleString()}`}
      />

      <Stat
        title="24H Change"
        value={`${Number(market.priceChangePercent).toFixed(2)}%`}
        color={
          positive
            ? "text-green-500"
            : "text-red-500"
        }
      />

      <Stat
        title="High"
        value={`$${Number(market.highPrice).toLocaleString()}`}
      />

      <Stat
        title="Low"
        value={`$${Number(market.lowPrice).toLocaleString()}`}
      />

      <Stat
        title="Volume"
        value={Number(market.quoteVolume).toLocaleString()}
      />

      <Stat
        title="Funding"
        value="0.01%"
      />

    </div>

  );

}

function Stat({
  title,
  value,
  color="text-white"
}){

return(

<div className="bg-zinc-900 rounded-xl p-5">

<p className="text-zinc-500">

{title}

</p>

<h2 className={`text-xl mt-3 font-semibold ${color}`}>

{value}

</h2>

</div>

)

}