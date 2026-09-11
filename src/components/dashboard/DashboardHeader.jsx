import {
  Bell,
  Settings2,
} from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <p
          className="
            text-[10px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-[#606975]
          "
        >
          Account
        </p>

        <h1
          className="
            mt-1
            text-[22px]
            font-semibold
            tracking-[-0.025em]
            text-white
          "
        >
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="
            relative
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-[#20252C]
            bg-[#11151A]
            text-[#8A939E]
            transition
            hover:border-[#303741]
            hover:text-white
            active:scale-95
          "
          aria-label="Notifications"
        >
          <Bell
            size={17}
            strokeWidth={1.8}
          />

          <span
            className="
              absolute
              right-[8px]
              top-[7px]
              h-1.5
              w-1.5
              rounded-full
              bg-[#4D8DFF]
            "
          />
        </button>

        <button
          type="button"
          className="
            hidden
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-[#20252C]
            bg-[#11151A]
            text-[#8A939E]
            transition
            hover:border-[#303741]
            hover:text-white
            active:scale-95
            sm:flex
          "
          aria-label="Settings"
        >
          <Settings2
            size={17}
            strokeWidth={1.8}
          />
        </button>
      </div>
    </header>
  );
}