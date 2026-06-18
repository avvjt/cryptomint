export default function AuthDivider() {
  return (
    <div
      className="
      flex
      items-center
      gap-4
      "
    >
      <div className="h-px flex-1 bg-zinc-800" />

      <span className="text-zinc-500 text-sm">
        OR
      </span>

      <div className="h-px flex-1 bg-zinc-800" />
    </div>
  );
}