import {
  Search,
  Globe,
  Headphones,
} from "lucide-react";

import logo from "../../assets/logo.png";
import Ticker from "../../components/Ticker";

export default function MobileHeader() {
  return (
    <header
      className="
      sticky
      top-0
      z-50

      bg-black/95
      backdrop-blur-xl

      border-b
      border-[#111827]
      "
    >
      <Ticker/>
      <div className="px-4 py-3">

        {/* Top Row */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="MEXC"
              className="h-7"
            />

            <span className="font-bold text-lg text-white">
              MEXC
            </span>
          </div>

          <div className="flex items-center gap-4">

            <button>
              <Headphones
                size={18}
                className="text-zinc-300"
              />
            </button>

            <button>
              <Globe
                size={18}
                className="text-zinc-300"
              />
            </button>

          </div>

        </div>

        {/* Search */}
        <div
          className="
          mt-4

          flex
          items-center
          gap-2

          rounded-full

          bg-[#111827]

          px-4
          py-3
          "
        >
          <Search
            size={16}
            className="text-zinc-500"
          />

          <input
            placeholder="Search coins"
            className="
            w-full
            bg-transparent
            text-sm
            outline-none
            text-white
            "
          />
        </div>

      </div>
    </header>
  );
}