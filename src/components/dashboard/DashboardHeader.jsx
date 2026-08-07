import {
  Bell,
  ChevronDown,
} from "lucide-react";

export default function DashboardHeader({

  name = "Investor",

  email = "",

  level = 1,

}) {

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";

  else if (hour < 18) greeting = "Good Afternoon";

  const today = new Date().toLocaleDateString(
    undefined,
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    }
  );

  return (

    <header
      className="
      flex

      flex-col

      gap-6

      lg:flex-row

      lg:items-center

      lg:justify-between
      "
    >

      {/* Left */}

      <div className="flex items-center gap-4">

        <div
          className="
          flex

          h-16
          w-16

          items-center
          justify-center

          rounded-3xl

          bg-gradient-to-br

          from-[#1D66FF]

          to-[#4E8EFF]

          text-2xl

          font-bold

          text-white

          shadow-[0_15px_35px_rgba(29,102,255,.35)]
          "
        >

          {name.charAt(0).toUpperCase()}

        </div>

        <div>

          <p className="text-sm text-zinc-500">

            {greeting} 👋

          </p>

          <h1
            className="
            mt-1

            text-3xl

            font-bold

            lg:text-4xl
            "
          >

            {name}

          </h1>

          <div
            className="
            mt-2

            flex

            flex-wrap

            items-center

            gap-3

            text-sm

            text-zinc-400
            "
          >

            <span>

              {email}

            </span>

            <span className="h-1 w-1 rounded-full bg-zinc-600"/>

            <span>

              {today}

            </span>

          </div>

        </div>

      </div>

      {/* Right */}

      <div
        className="
        flex

        items-center

        gap-4
        "
      >

        {/* Level */}

        <div
          className="
          rounded-2xl

          border

          border-[#1F2937]

          bg-[#111318]

          px-5
          py-3
          "
        >

          <p className="text-xs text-zinc-500">

            Current Level

          </p>

          <div className="mt-2 flex items-center gap-2">

            <span
              className="
              rounded-full

              bg-[#1D66FF]/15

              px-3
              py-1

              text-sm

              font-semibold

              text-[#6FA6FF]
              "
            >

              LV {level}

            </span>

            <ChevronDown size={16}/>

          </div>

        </div>

        {/* Notification */}

        <button
          className="
          relative

          flex

          h-14
          w-14

          items-center

          justify-center

          rounded-2xl

          border

          border-[#1F2937]

          bg-[#111318]

          transition

          hover:border-[#1D66FF]
          "
        >

          <Bell size={22}/>

          <span
            className="
            absolute

            right-4
            top-4

            h-2.5
            w-2.5

            rounded-full

            bg-red-500
            "
          />

        </button>

      </div>

    </header>

  );

}