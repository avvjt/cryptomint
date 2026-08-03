import { Wallet, ArrowDownToLine } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">

      {/* Deposit */}

      <button
        className="
        group
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900
        p-6
        text-left
        transition
        hover:border-blue-500
        hover:bg-zinc-800
        "
      >
        <div className="flex items-center justify-between">

          <div>

            <p className="text-zinc-400">
              Add Funds
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Deposit
            </h2>

          </div>

          <div
            className="
            rounded-2xl
            bg-blue-500/20
            p-4
            text-blue-500
            "
          >
            <Wallet size={28} />
          </div>

        </div>
      </button>

      {/* Withdraw */}

      <button
        className="
        group
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900
        p-6
        text-left
        transition
        hover:border-red-500
        hover:bg-zinc-800
        "
      >
        <div className="flex items-center justify-between">

          <div>

            <p className="text-zinc-400">
              Cash Out
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Withdraw
            </h2>

          </div>

          <div
            className="
            rounded-2xl
            bg-red-500/20
            p-4
            text-red-500
            "
          >
            <ArrowDownToLine size={28} />
          </div>

        </div>
      </button>

    </div>
  );
}