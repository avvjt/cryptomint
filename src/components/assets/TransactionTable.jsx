import TransactionRow from "./TransactionRow";

export default function TransactionTable({
  transactions,
}) {
  if (!transactions.length) {
    return (
      <div className="rounded-2xl bg-zinc-900 p-10 text-center text-zinc-500">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl bg-zinc-900">

      <table className="w-full">

        <thead>

          <tr className="border-b border-zinc-800 text-left">

            <th className="p-4">Type</th>

            <th>Amount</th>

            <th>Status</th>

            <th>Date</th>

          </tr>

        </thead>

        <tbody>

          {transactions.map((tx) => (

            <TransactionRow
              key={tx.id}
              transaction={tx}
            />

          ))}

        </tbody>

      </table>

    </div>
  );
}