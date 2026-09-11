import {
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";

import useMarketData from "../../hooks/useMarketData";

export default function OrderBook({
  symbol = "BTCUSDT",
}) {
  const markets = useMarketData();

  const coin = markets.find(
    (item) => item.symbol === symbol
  );

  const currentPrice =
    Number(coin?.lastPrice) || getFallbackPrice(symbol);

  const baseAsset =
    symbol.endsWith("USDT")
      ? symbol.slice(0, -4)
      : symbol;

  const sellOrders = createOrders(
    currentPrice,
    "sell",
    symbol
  );

  const buyOrders = createOrders(
    currentPrice,
    "buy",
    symbol
  );

  const buyDepth = calculateDepth(
    buyOrders
  );

  const sellDepth = calculateDepth(
    sellOrders
  );

  const totalDepth =
    buyDepth + sellDepth;

  const buyPercent =
    totalDepth > 0
      ? (buyDepth / totalDepth) * 100
      : 50;

  const sellPercent =
    100 - buyPercent;

  return (
    <section
      className="
        overflow-hidden

        bg-[#0B0E11]
      "
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          flex
          h-11

          items-center
          justify-between

          border-b
          border-[#1A1E24]

          px-4
        "
      >

        <div
          className="
            flex
            items-center
            gap-5
          "
        >

          <span
            className="
              text-[14px]
              font-semibold
              text-white
            "
          >
            Order Book
          </span>

          <span
            className="
              text-[13px]
              text-[#68717D]
            "
          >
            Market Trades
          </span>

        </div>

        <button
          type="button"
          className="
            flex
            h-7
            w-7
            items-center
            justify-center

            rounded-md

            text-[#68717D]

            hover:bg-[#151A20]
            hover:text-white
          "
        >
          <MoreHorizontal size={16} />
        </button>

      </div>


      {/* =================================================
          PRECISION
      ================================================= */}

      <div
        className="
          flex
          items-center
          justify-end

          border-b
          border-[#171B21]

          px-4
          py-2
        "
      >

        <button
          type="button"
          className="
            flex
            items-center
            gap-1

            rounded-md

            px-2
            py-1

            text-[10px]
            text-[#68717D]

            hover:bg-[#151A20]
            hover:text-white
          "
        >
          0.01

          <ChevronDown size={11} />

        </button>

      </div>


      {/* =================================================
          COLUMN HEADER
      ================================================= */}

      <div
        className="
          grid
          grid-cols-3

          px-4
          py-2

          text-[10px]

          text-[#59626D]
        "
      >

        <span>
          Price (USDT)
        </span>

        <span className="text-right">
          Amount ({baseAsset})
        </span>

        <span className="text-right">
          Total (USDT)
        </span>

      </div>


      {/* =================================================
          SELL ORDERS
      ================================================= */}

      <div className="px-2">

        {sellOrders.map(
          (order, index) => (
            <Order
              key={`sell-${index}`}
              order={order}
              side="sell"
            />
          )
        )}

      </div>


      {/* =================================================
          CURRENT PRICE
      ================================================= */}

      <div
        className="
          border-y
          border-[#242A32]

          bg-[#101419]

          px-4
          py-3
        "
      >

        <div
          className="
            flex
            items-baseline
            gap-2
          "
        >

          <span
            className="
              text-[18px]
              font-semibold

              text-[#00C076]
            "
          >
            {formatPrice(currentPrice)}
          </span>

          <span
            className="
              text-[10px]
              text-[#68717D]
            "
          >
            ≈ $
            {formatPrice(currentPrice)}
          </span>

        </div>

        <p
          className="
            mt-0.5

            text-[9px]
            text-[#59626D]
          "
        >
          {baseAsset}/USDT
        </p>

      </div>


      {/* =================================================
          BUY ORDERS
      ================================================= */}

      <div className="px-2">

        {buyOrders.map(
          (order, index) => (
            <Order
              key={`buy-${index}`}
              order={order}
              side="buy"
            />
          )
        )}

      </div>


      {/* =================================================
          DEPTH
      ================================================= */}

      <div
        className="
          grid
          grid-cols-2

          border-t
          border-[#1A1E24]

          text-[10px]
        "
      >

        <div
          className="
            bg-[#00C076]/10

            px-3
            py-1.5

            text-[#00C076]
          "
        >
          B {buyPercent.toFixed(2)}%
        </div>

        <div
          className="
            bg-[#F6465D]/10

            px-3
            py-1.5

            text-right
            text-[#F6465D]
          "
        >
          {sellPercent.toFixed(2)}% S
        </div>

      </div>

    </section>
  );
}


/* =========================================================
   ORDER ROW
========================================================= */

function Order({
  order,
  side,
}) {
  const total =
    Number(order.price) *
    Number(order.amount);

  return (
    <div
      className="
        grid
        grid-cols-3

        items-center

        rounded-sm

        px-2
        py-[3px]

        text-[11px]

        transition

        hover:bg-[#14191F]
      "
    >

      <span
        className={
          side === "sell"
            ? "text-[#F6465D]"
            : "text-[#00C076]"
        }
      >
        {formatPrice(order.price)}
      </span>

      <span
        className="
          text-right
          text-[#CDD3DA]
        "
      >
        {Number(order.amount).toFixed(6)}
      </span>

      <span
        className="
          text-right
          text-[#CDD3DA]
        "
      >
        {total.toLocaleString(
          "en-US",
          {
            maximumFractionDigits: 2,
          }
        )}
      </span>

    </div>
  );
}


/* =========================================================
   CREATE REALISTIC BOOK AROUND CURRENT PRICE
========================================================= */

function createOrders(
  currentPrice,
  side,
  symbol
) {
  const seed =
    symbol
      .split("")
      .reduce(
        (sum, char) =>
          sum + char.charCodeAt(0),
        0
      );

  const priceStep =
    currentPrice >= 1000
      ? 8
      : currentPrice >= 100
        ? 0.5
        : currentPrice >= 1
          ? 0.01
          : 0.0001;

  return Array.from(
    { length: 13 },
    (_, index) => {

      const distance =
        (index + 1) * priceStep;

      const variation =
        ((seed + index * 17) % 100) / 100;

      const amount =
        0.02 +
        variation * 0.8 +
        (index % 4) * 0.05;

      const price =
        side === "sell"
          ? currentPrice + distance
          : currentPrice - distance;

      return {
        price,
        amount,
      };
    }
  );
}


/* =========================================================
   DEPTH
========================================================= */

function calculateDepth(
  orders
) {
  return orders.reduce(
    (sum, order) =>
      sum +
      Number(order.amount),
    0
  );
}


/* =========================================================
   FALLBACK PRICES
========================================================= */

function getFallbackPrice(
  symbol
) {
  const prices = {
    BTCUSDT: 117800,
    ETHUSDT: 4280,
    BNBUSDT: 815,
    SOLUSDT: 190,
    XRPUSDT: 3.08,
    DOGEUSDT: 0.24,
    ADAUSDT: 0.82,
    AVAXUSDT: 24,
    LINKUSDT: 23,
    DOTUSDT: 4.1,
  };

  return prices[symbol] || 100;
}


/* =========================================================
   PRICE FORMAT
========================================================= */

function formatPrice(
  price
) {
  if (price >= 1000) {
    return Number(price).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  }

  if (price >= 1) {
    return Number(price).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      }
    );
  }

  return Number(price).toLocaleString(
    "en-US",
    {
      minimumFractionDigits: 4,
      maximumFractionDigits: 6,
    }
  );
}