import { NavLink } from "react-router-dom";
import { Bell, Globe, Search } from "lucide-react";

export default function DesktopNavbar() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Markets", path: "/markets" },
    { name: "Trade", path: "/trade" },
    { name: "Futures", path: "/futures" },
    { name: "Assets", path: "/assets" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Left */}
        <div className="flex items-center gap-10">

          <NavLink
            to="/"
            className="text-2xl font-bold text-white"
          >
            MEXC
          </NavLink>

          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `transition ${
                    isActive
                      ? "text-white"
                      : "text-zinc-400 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          <button className="rounded-full bg-zinc-900 p-2 hover:bg-zinc-800">
            <Search size={18} />
          </button>

          <button className="rounded-full bg-zinc-900 p-2 hover:bg-zinc-800">
            <Bell size={18} />
          </button>

          <button className="rounded-full bg-zinc-900 p-2 hover:bg-zinc-800">
            <Globe size={18} />
          </button>

          <button className="rounded-full border border-zinc-700 px-5 py-2 text-sm">
            Login
          </button>

          <button className="rounded-full bg-blue-600 px-5 py-2 text-sm hover:bg-blue-700">
            Sign Up
          </button>

        </div>

      </div>
    </header>
  );
}