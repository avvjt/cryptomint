export default function BalanceCard({
  title,
  value,
}) {
  return (
    <div
      className="
      rounded-2xl
      border
      border-zinc-800
      bg-zinc-900
      p-5
      "
    >
      <p className="text-sm text-zinc-500">
        {title}
      </p>

      <h2 className="mt-3 text-2xl font-bold">
        {value}
      </h2>
    </div>
  );
}