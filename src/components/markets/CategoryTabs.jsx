import {
  LayoutGrid,
  Flame,
  Sparkles,
  Laugh,
  Landmark,
  Gamepad2,
  Layers3,
  Network,
} from "lucide-react";

const tabs = [
  {
    id: "All",
    label: "All",
    icon: LayoutGrid,
  },
  {
    id: "Trending",
    label: "Trending",
    icon: Flame,
  },
  {
    id: "AI",
    label: "AI",
    icon: Sparkles,
  },
  {
    id: "Meme",
    label: "Meme",
    icon: Laugh,
  },
  {
    id: "DeFi",
    label: "DeFi",
    icon: Landmark,
  },
  {
    id: "Gaming",
    label: "Gaming",
    icon: Gamepad2,
  },
  {
    id: "Layer 1",
    label: "Layer 1",
    icon: Layers3,
  },
  {
    id: "Infrastructure",
    label: "Infra",
    icon: Network,
  },
];

export default function CategoryTabs({
  active = "All",
  onChange,
}) {
  return (
    <div
      className="
        w-full

        overflow-x-auto
        scrollbar-hide

        border-b
        border-[#171C22]
      "
    >
      <div
        className="
          flex
          min-w-max

          items-center

          gap-1
        "
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange?.(tab.id)}
              className={`
                group

                relative

                flex
                h-[52px]

                items-center
                gap-2

                px-3.5

                text-[13px]
                font-medium

                transition-all
                duration-200

                ${
                  isActive
                    ? "text-white"
                    : "text-[#626A75] hover:text-[#D4D9E0]"
                }
              `}
            >
              <Icon
                size={15}
                strokeWidth={
                  isActive ? 2 : 1.7
                }
                className={`
                  transition-colors

                  ${
                    isActive
                      ? "text-[#6F9FFF]"
                      : "text-[#5A6370] group-hover:text-[#929BA7]"
                  }
                `}
              />

              <span>
                {tab.label}
              </span>

              {isActive && (
                <>
                  <span
                    className="
                      absolute

                      bottom-[-1px]
                      left-2
                      right-2

                      h-[2px]

                      rounded-full

                      bg-[#4D8DFF]

                      shadow-[0_0_12px_rgba(77,141,255,.55)]
                    "
                  />

                  <span
                    className="
                      pointer-events-none

                      absolute
                      inset-x-3
                      bottom-0

                      h-6

                      bg-[#4D8DFF]/5

                      blur-xl
                    "
                  />
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}