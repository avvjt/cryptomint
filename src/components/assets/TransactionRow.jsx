export default function TransactionRow({
  transaction,
}) {
  return (
    <tr className="border-b border-zinc-800">

      <td className="py-4">
        {transaction.type}
      </td>

      <td>
        {transaction.amount}
      </td>

      <td>

        <span
          className={`
          rounded-full
          px-3
          py-1
          text-sm

          ${
            transaction.status === "Completed"
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }
          `}
        >
          {transaction.status}
        </span>

      </td>

      <td>
        {transaction.date}
      </td>

    </tr>
  );
}