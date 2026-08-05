import {
  LayoutDashboard,
  CandlestickChart,
  ArrowUpDown,
  Wallet,
  Users,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";

export default function DashboardSidebar() {
  const navigate = useNavigate();

  const items = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
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
      name: "Assets",
      path: "/assets",
      icon: Wallet,
    },
    {
      name: "Team",
      path: "/team",
      icon: Users,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <aside
      className="
      flex
      h-screen
      w-[280px]
      flex-col

      border-r
      border-white/5

      bg-[#0B0E11]
      "
    >
      {/* Logo */}

      <div
        className="
        border-b
        border-white/5

        px-6
        py-7
        "
      >
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt=""
            className="h-11 w-11"
          />

          <div>
            <h1
              className="
              text-xl
              font-bold
              tracking-wide
              "
            >
              CryptoMintX
            </h1>

            <p
              className="
              mt-1

              text-xs
              text-zinc-500
              "
            >
              Trade Smarter
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}

      <nav
        className="
        flex-1

        px-4
        py-6
        "
      >
        <p
          className="
          mb-3

          px-4

          text-xs
          font-semibold

          uppercase
          tracking-[0.18em]

          text-zinc-600
          "
        >
          Navigation
        </p>

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
            >
              {({ isActive }) => (
                <div
                  className={`
                  relative

                  mb-2

                  flex
                  items-center
                  justify-between

                  rounded-2xl

                  px-4
                  py-3

                  transition-all
                  duration-200

                  ${
                    isActive
                      ? "bg-[#151922] text-white"
                      : "text-zinc-400 hover:bg-[#14181F] hover:text-white"
                  }
                  `}
                >
                  {isActive && (
                    <span
                      className="
                      absolute

                      left-0
                      top-3
                      bottom-3

                      w-1

                      rounded-r-full

                      bg-[#1D66FF]
                      "
                    />
                  )}

                  <div className="flex items-center gap-4">
                    <Icon size={21} />

                    <span className="font-medium">
                      {item.name}
                    </span>
                  </div>

                  <ChevronRight
                    size={16}
                    className={
                      isActive
                        ? "text-white"
                        : "text-zinc-600"
                    }
                  />
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}

      <div
        className="
        border-t
        border-white/5

        p-5
        "
      >
        {/* User */}

        <div
          className="
          mb-5

          flex
          items-center
          gap-3

          rounded-2xl

          bg-[#14181F]

          p-4
          "
        >
          <div
            className="
            flex

            h-12
            w-12

            items-center
            justify-center

            rounded-full

            bg-[#1D66FF]

            text-lg
            font-bold
            "
          >
            A
          </div>

          <div className="flex-1">
            <p className="font-medium">
              Abhijit
            </p>

            <p
              className="
              mt-1

              text-xs

              text-zinc-500
              "
            >
              Verified User
            </p>
          </div>
        </div>

        {/* Logout */}

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="
          flex

          w-full

          items-center
          justify-center

          gap-3

          rounded-xl

          bg-[#1D66FF]

          py-3

          font-medium

          transition

          hover:bg-[#3478ff]
          "
        >
          <LogOut size={18} />

          Logout
        </button>
      </div>
    </aside>
  );
}