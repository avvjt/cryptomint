import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Clock3,
  Repeat2,
} from "lucide-react";

const actions = [
  {
    label: "Deposit",
    icon: ArrowDownToLine,
  },
  {
    label: "Withdraw",
    icon: ArrowUpFromLine,
  },
  {
    label: "Trade",
    icon: Repeat2,
  },
  {
    label: "History",
    icon: Clock3,
  },
];

export default function QuickActions() {
  return (
    <section className="grid grid-cols-4 gap-2">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <button
            key={action.label}
            type="button"
            className="
              flex
              min-w-0
              flex-col
              items-center
              gap-2
              rounded-2xl
              border
              border-white/[0.06]
              bg-[#0D1117]
              px-2
              py-3
              transition
              hover:border-white/[0.1]
              hover:bg-[#11161D]
              active:scale-[0.97]
            "
          >
            <span
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-[#151B23]
                text-[#8EA0B5]
              "
            >
              <Icon
                size={16}
                strokeWidth={1.8}
              />
            </span>

            <span
              className="
                truncate
                text-[10px]
                font-medium
                text-[#A8B0BA]
              "
            >
              {action.label}
            </span>
          </button>
        );
      })}
    </section>
  );
}