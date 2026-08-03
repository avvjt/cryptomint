import {
  LayoutDashboard,
  CandlestickChart,
  ArrowUpDown,
  Wallet,
  Users,
  User,
  LogOut,
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
      w-72

      border-r

      border-zinc-800

      bg-black

      flex

      flex-col
      "
    >

      {/* Logo */}

      <div className="p-6">

        <div className="flex items-center gap-3">

          <img
            src={logo}
            alt=""
            className="h-12"
          />

          <span className="text-2xl font-bold">

            CryptoMintX

          </span>

        </div>

      </div>

      {/* Menu */}

      <nav className="flex-1 px-4">

        {items.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                mb-2

                flex

                items-center

                gap-4

                rounded-xl

                px-4

                py-4

                transition

                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-zinc-400 hover:bg-zinc-900"
                }
              `}
            >

              <Icon size={20} />

              {item.name}

            </NavLink>

          );

        })}

      </nav>

      {/* Logout */}

      <div className="border-t border-zinc-800 p-4">

        <button
          onClick={() => {

            localStorage.removeItem("token");

            navigate("/login");

          }}
          className="
          flex

          w-full

          items-center

          gap-3

          rounded-xl

          bg-red-600

          px-4

          py-3

          hover:bg-red-500
          "
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>

  );
}