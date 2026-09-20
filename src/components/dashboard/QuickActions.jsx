import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Clock3,
  Repeat2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    label: "Deposit",
    icon: ArrowDownToLine,
    path: "/wallet?tab=deposit",
  },
  {
    label: "Withdraw",
    icon: ArrowUpFromLine,
    path: "/wallet?tab=withdraw",
  },
  {
    label: "Trade",
    icon: Repeat2,
    path: "/trade",
  },
  {
    label: "History",
    icon: Clock3,
    path: "/history",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <section className="grid grid-cols-4 gap-2 my-4">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <button
            key={action.label}
            type="button"
            onClick={() => navigate(action.path)}
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