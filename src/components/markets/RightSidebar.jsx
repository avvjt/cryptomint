import { useState } from "react";
import OrderBook from "./OrderBook";
import RecentTrades from "./RecentTrades";

export default function RightSidebar({
  symbol,
  currentPrice,
}) {
  const [tab, setTab] = useState("book");

  return (
    <div className="rounded-2xl bg-zinc-900 h-full">

      <div className="flex border-b border-zinc-800">

        <button
          onClick={() => setTab("book")}
          className={`flex-1 py-4 ${
            tab === "book"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-zinc-400"
          }`}
        >
          Order Book
        </button>

        <button
          onClick={() => setTab("trades")}
          className={`flex-1 py-4 ${
            tab === "trades"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-zinc-400"
          }`}
        >
          Trades
        </button>

      </div>

      <div className="p-4">

        {tab === "book" ? (
          <OrderBook
            symbol={symbol}
            currentPrice={currentPrice}
          />
        ) : (
          <RecentTrades
            symbol={symbol}
          />
        )}

      </div>

    </div>
  );
}