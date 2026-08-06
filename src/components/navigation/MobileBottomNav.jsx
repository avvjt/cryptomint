import {
  Home,
  CandlestickChart,
  ArrowUpDown,
  Wallet,
  Users,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import useScrollDirection from "../../hooks/useScrollDirection";


export default function MobileBottomNav() {
  // const visible = useScrollDirection();

  const items = [
    {
      name: "Home",
      path: "/Dashboard",
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
      name: "Team",
      path: "/team",
      icon: Wallet,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: Users,
    },
  ];

  //root div visibality 
  /*
  ${
        visible
          ? "translate-y-0"
          : "translate-y-32"
      }
  */

  return (
    <div
  className="
  fixed
  bottom-0
  left-0
  right-0

  z-50

  transition-transform
  duration-300
  "
>
      <nav
  className="
  w-full

  border-t
  border-white/5

  bg-[#050A14]/95

  backdrop-blur-xl
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