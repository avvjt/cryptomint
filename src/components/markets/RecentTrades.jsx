import useTradeSocket from "../../hooks/useTradeSocket";

export default function RecentTrades({ symbol }) {
  const trades = useTradeSocket(symbol);

  return (
    <div className="mt-6 rounded-2xl bg-zinc-900 p-5">

      <h2 className="mb-5 text-lg font-bold">
        Recent Trades
      </h2>

      {/* Header */}

      <div className="grid grid-cols-3 text-xs text-zinc-500 mb-3">

        <span>Price</span>

        <span className="text-center">
          Amount
        </span>

        <span className="text-right">
          Time
        </span>

      </div>

      <div className="max-h-[420px] overflow-y-auto">

        {trades.map((trade) => (

          <div
            key={trade.id}
            className="grid grid-cols-3 py-1 text-sm"
          >

            <span
              className={
                trade.buyerMaker
                  ? "text-red-500"
                  : "text-green-500"
              }
            >
              {trade.price.toLocaleString()}
            </span>

            <span className="text-center">
              {trade.quantity.toFixed(4)}
            </span>

            <span className="text-right text-zinc-400">
              {trade.time}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}