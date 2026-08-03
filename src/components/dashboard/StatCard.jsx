export default function StatCard({
  title,
  value,
  color = "text-white",
}) {
  return (
    <div
      className="
      rounded-3xl
      border
      border-zinc-800
      bg-zinc-900
      p-6
      "
    >
      <p className="text-sm text-zinc-500">
        {title}
      </p>

      <h2
        className={`mt-3 text-3xl font-bold ${color}`}
      >
        {value}
      </h2>
    </div>
  );
}