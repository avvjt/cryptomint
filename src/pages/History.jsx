import { useMemo, useState } from "react";
import { useTradeWalletContext } from "../context/TradeWalletContext";

const FILTERS = [
  "All",
  "Deposits",
  "Withdrawals",
  "Trades",
  "Auto Trade",
];

export default function History() {
  const { tradeHistory = [] } = useTradeWalletContext();

  const [filter, setFilter] = useState("All");

  const transactions = useMemo(() => {
    const mappedTrades = tradeHistory.map((item) => ({
      id: item.id,
      type: item.packageName ? "Auto Trade" : "Trade",
      title: item.packageName
        ? `Auto Trade · ${item.packageName}`
        : `Trade · ${item.symbol || "USDT"}`,
      amount: Number(item.amount || 0),
      returnAmount: Number(item.returnAmount || 0),
      status: item.status || "Completed",
      createdAt: item.createdAt,
    }));

    /*
      Later the backend will provide:

      deposits
      withdrawals
      trades
      autoTrades

      through one API or separate endpoints.

      For now we use your existing trade history.
    */

    return mappedTrades.filter((item) => {
      if (filter === "All") return true;
      return item.type === filter;
    });
  }, [tradeHistory, filter]);

  return (
    <main className="min-h-screen bg-[#090B0E] px-4 pb-28 pt-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1100px]">

        {/* Header */}

        <header className="mb-5">
          <h1 className="text-xl font-semibold">
            Transaction History
          </h1>

          <p className="mt-1 text-sm text-[#737B89]">
            View your deposits, withdrawals and trading activity
          </p>
        </header>


        {/* Filters */}

        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex min-w-max gap-2">

            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`
                  rounded-lg
                  border
                  px-4
                  py-2
                  text-xs
                  font-medium
                  transition

                  ${
                    filter === item
                      ? "border-[#4D8DFF] bg-[#4D8DFF]/10 text-white"
                      : "border-[#1A1E24] bg-[#0D1014] text-[#737B89] hover:text-white"
                  }
                `}
              >
                {item}
              </button>
            ))}

          </div>
        </div>


        {/* History */}

        <section className="mt-4 overflow-hidden rounded-2xl border border-[#1A1E24] bg-[#0D1014]">

          {transactions.length === 0 ? (
            <EmptyHistory />
          ) : (
            <div className="divide-y divide-[#1A1E24]">

              {transactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}


/* ============================================================
   TRANSACTION ROW
============================================================ */

function TransactionRow({ transaction }) {
  const isAutoTrade =
    transaction.type === "Auto Trade";

  return (
    <div className="p-4 sm:p-5">

      <div className="flex items-center justify-between gap-4">

        {/* Left */}

        <div className="flex min-w-0 items-center gap-3">

          <div
            className={`
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              text-xs
              font-semibold

              ${
                isAutoTrade
                  ? "bg-[#4D8DFF]/10 text-[#4D8DFF]"
                  : "bg-[#08B77A]/10 text-[#08B77A]"
              }
            `}
          >
            {isAutoTrade ? "AT" : "TR"}
          </div>


          <div className="min-w-0">

            <p className="truncate text-sm font-medium text-white">
              {transaction.title}
            </p>

            <p className="mt-1 text-xs text-[#737B89]">
              {formatDate(transaction.createdAt)}
            </p>

          </div>

        </div>


        {/* Right */}

        <div className="shrink-0 text-right">

          <p className="text-sm font-medium text-white">
            {transaction.amount.toFixed(2)} USDT
          </p>

          {transaction.returnAmount > 0 && (
            <p className="mt-1 text-xs text-[#08B77A]">
              +{transaction.returnAmount.toFixed(2)} USDT
            </p>
          )}

        </div>

      </div>


      {/* Status */}

      <div className="mt-3 flex items-center justify-between">

        <span className="text-xs text-[#737B89]">
          Status
        </span>

        <StatusBadge
          status={transaction.status}
        />

      </div>

    </div>
  );
}


/* ============================================================
   STATUS
============================================================ */

function StatusBadge({ status }) {
  const normalized =
    String(status).toLowerCase();

  const completed =
    normalized === "completed";

  const failed =
    normalized === "failed";

  return (
    <span
      className={`
        rounded-full
        border
        px-2.5
        py-1
        text-[10px]
        font-medium

        ${
          completed
            ? "border-[#08B77A]/20 bg-[#08B77A]/10 text-[#08B77A]"
            : failed
              ? "border-[#F6465D]/20 bg-[#F6465D]/10 text-[#F6465D]"
              : "border-[#F59E0B]/20 bg-[#F59E0B]/10 text-[#F59E0B]"
        }
      `}
    >
      {status}
    </span>
  );
}


/* ============================================================
   EMPTY
============================================================ */

function EmptyHistory() {
  return (
    <div className="p-10 text-center">

      <div
        className="
          mx-auto
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-[#1A1E24]
          text-sm
          text-[#737B89]
        "
      >
        —
      </div>

      <p className="mt-4 text-sm font-medium">
        No transactions yet
      </p>

      <p className="mt-1 text-xs text-[#737B89]">
        Your deposits, withdrawals and trades will appear here.
      </p>

    </div>
  );
}


/* ============================================================
   DATE
============================================================ */

function formatDate(date) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return parsed.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}