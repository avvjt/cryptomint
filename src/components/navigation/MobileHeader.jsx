import {
  Bell,
  Search,
  User,
  Headphones,
} from "lucide-react";

export default function MobileHeader() {
  return (
    <header
      className="
      sticky
      top-0
      z-50
      border-b
      border-zinc-800
      bg-black/90
      backdrop-blur-xl
      "
    >
      <div className="flex items-center gap-3 p-4">

        {/* Profile */}
        <button>
          <User size={22} />
        </button>

        {/* Search */}
        <div
          className="
          flex
          flex-1
          items-center
          gap-2
          rounded-full
          bg-zinc-900
          px-4
          py-2
          "
        >
          <Search
            size={16}
            className="text-zinc-500"
          />

          <input
            placeholder="BTC"
            className="
            w-full
            bg-transparent
            text-sm
            outline-none
            "
          />
        </div>

        {/* Support */}
        <button>
          <Headphones size={20} />
        </button>

        {/* Notifications */}
        <button>
          <Bell size={20} />
        </button>

      </div>
    </header>
  );
}