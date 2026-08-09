export default function AuthDivider({ children = "or" }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-[#292B30]" />

      <span
        className="
          shrink-0
          text-[12px]
          text-[#737985]
        "
      >
        {children}
      </span>

      <div className="h-px flex-1 bg-[#292B30]" />
    </div>
  );
}