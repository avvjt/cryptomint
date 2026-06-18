import {
  Home,
  CandlestickChart,
  ArrowUpDown,
  Wallet,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import useScrollDirection from "../../hooks/useScrollDirection";

export default function MobileBottomNav() {
  const visible = useScrollDirection();

  const items = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Markets",
      path: "/markets",
      icon: CandlestickChart,
    },
    {
      name: "Trade",
      path: "/trade",
      icon: ArrowUpDown,
    },
    {
      name: "Futures",
      path: "/futures",
      icon: CandlestickChart,
    },
    {
      name: "Assets",
      path: "/assets",
      icon: Wallet,
    },
  ];

  return (
    <div
      className={`
      fixed
      bottom-4
      left-4
      right-4

      z-50

      transition-transform
      duration-300

      ${
        visible
          ? "translate-y-0"
          : "translate-y-32"
      }
      `}
    >
      <nav
        className="
        rounded-3xl

        border
        border-[#1f2937]

        bg-[#050A14]/95

        backdrop-blur-2xl

        shadow-[0_0_40px_rgba(29,102,255,.15)]
        "
      >
        <div className="grid grid-cols-5 py-2">

          {items.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1

                  text-xs

                  transition-all

                  ${
                    isActive
                      ? "text-blue-500"
                      : "text-zinc-400"
                  }
                  `
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`
                      rounded-full
                      p-2

                      ${
                        isActive
                          ? "bg-blue-500/15"
                          : ""
                      }
                      `}
                    >
                      <Icon size={20} />
                    </div>

                    <span>
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}

        </div>
      </nav>
    </div>
  );
}