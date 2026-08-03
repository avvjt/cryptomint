import { ChevronRight } from "lucide-react";

export default function MenuItem({
  icon: Icon,
  title,
  subtitle,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="
      flex
      w-full
      items-center
      justify-between
      rounded-2xl
      bg-zinc-900
      p-5
      transition
      hover:bg-zinc-800
      "
    >
      <div className="flex items-center gap-4">

        <Icon
          size={22}
          className="text-blue-500"
        />

        <div className="text-left">

          <h3 className="font-semibold">
            {title}
          </h3>

          <p className="text-sm text-zinc-500">
            {subtitle}
          </p>

        </div>

      </div>

      <ChevronRight />

    </button>
  );
}