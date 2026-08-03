import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-5">

      <button
        className="
        flex
        items-center
        justify-center
        gap-3
        rounded-2xl
        bg-green-600
        py-4
        font-semibold
        transition
        hover:bg-green-500
        "
      >
        <ArrowDownToLine />
        Deposit
      </button>

      <button
        className="
        flex
        items-center
        justify-center
        gap-3
        rounded-2xl
        bg-red-600
        py-4
        font-semibold
        transition
        hover:bg-red-500
        "
      >
        <ArrowUpFromLine />
        Withdraw
      </button>

    </div>
  );
}