import useDepthSocket from "../../hooks/useDepthSocket";

export default function OrderBook({ symbol, currentPrice }) {
  const { bids, asks } = useDepthSocket(symbol);

  return (
    <div className="rounded-2xl bg-zinc-900 p-5">

      <h2 className="mb-5 text-lg font-bold">
        Order Book
      </h2>

      {/* Header */}

      <div className="grid grid-cols-3 text-xs text-zinc-500 mb-4">

        <span>Price (USDT)</span>

        <span className="text-center">
          Amount
        </span>

        <span className="text-right">
          Total
        </span>

      </div>

      {/* Sell Orders */}

      {asks
        .slice()
        .reverse()
        .map(([price, amount], index) => (
          <div
            key={index}
            className="grid grid-cols-3 py-1 text-sm"
          >
            <span className="text-red-500">
              {Number(price).toLocaleString()}
            </span>

            <span className="text-center">
              {Number(amount).toFixed(4)}
            </span>

            <span className="text-right">
              {(Number(price) * Number(amount)).toFixed(2)}
            </span>
          </div>
        ))}

      {/* Current Price */}

      <div
        className="
        my-4
        border-y
        border-zinc-700
        py-3
        text-center
        text-xl
        font-bold
        text-white
        "
      >
        ${Number(currentPrice).toLocaleString()}
      </div>

      {/* Buy Orders */}

      {bids.map(([price, amount], index) => (
        <div
          key={index}
          className="grid grid-cols-3 py-1 text-sm"
        >
          <span className="text-green-500">
            {Number(price).toLocaleString()}
          </span>

          <span className="text-center">
            {Number(amount).toFixed(4)}
          </span>

          <span className="text-right">
            {(Number(price) * Number(amount)).toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
}