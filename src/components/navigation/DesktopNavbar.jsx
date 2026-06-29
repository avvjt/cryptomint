import { NavLink } from "react-router-dom";
import { Bell, Globe, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Ticker from "../../components/Ticker";

export default function DesktopNavbar() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Markets", path: "/markets" },
    { name: "Trade", path: "/trade" },
    { name: "Futures", path: "/futures" },
    { name: "Assets", path: "/assets" },
  ];

  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-[#111827]">
      <Ticker />
      <div className="mx-auto flex h-16 max-w-[1700px] items-center justify-between px-8">

        {/* Left */}
        <div className="flex items-center gap-10">


          <NavLink
            to="/"
            className="flex items-center gap-2"
          >
            <img
              src={logo}
              alt="logo"
              className="h-12"
            />

            <span
              className="
              text-2xl
              font-bold
              text-white
              "
            >
              CryptoMintX
            </span>
          </NavLink>

          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `transition ${isActive
                    ? "text-white text-sm font-bold underline"
                    : "text-zinc-400 hover:text-white hover:underline text-sm font-medium"
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

          <div
            className="
                    flex
                    items-center
                    gap-2

                    w-[170px]
                    h-10

                    rounded-full

                    bg-[#111827]

                    px-4
                    "
          >
            <Search
              size={16}
              className="text-zinc-500"
            />

            <input
              placeholder="UNI"
              className="
                  w-full
                  bg-transparent
                  text-sm
                  outline-none
                  text-white
                  "
            />
          </div>

          <button className="rounded-full bg-zinc-900 p-2 hover:bg-zinc-800">
            <Bell size={18} />
          </button>

          <button className="rounded-full bg-zinc-900 p-2 hover:bg-zinc-800">
            <Globe size={18} />
          </button>

          <a href="/academy" className="hover:underline text-white text-sm">Academy</a>

          <a href="/help" className="hover:underline text-white text-sm">Help</a>

          <button
            onClick={() => navigate("/login")}
            className="bg-white text-sm text-black px-4 py-1 rounded-full font-medium hover:bg-gray-200 transition">
            Log in
          </button>




        </div>

      </div>
    </header>
  );
}