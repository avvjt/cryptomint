import {
  Users,
  TrendingUp,
  Crown,
  ChevronRight,
} from "lucide-react";

export default function TeamOverview({

  userLevel = 1,

  levelA = 0,

  levelB = 0,

  levelC = 0,

  commissionToday = 0,

  totalTeam = 0,

  nextLevelA = 3,

  nextLevelBC = 5,

  onViewTeam,

}) {

  const progress = Math.min(
    ((levelA + levelB + levelC) /
      (nextLevelA + nextLevelBC)) *
      100,
    100
  );

  return (

    <section
      className="
      rounded-[32px]

      border
      border-white/5

      bg-[#111318]

      p-5

      lg:p-7
      "
    >

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-zinc-500">

            Team Overview

          </p>

          <h2
            className="
            mt-2

            text-3xl

            font-bold
            "
          >

            Level {userLevel}

          </h2>

        </div>

        <button
          onClick={onViewTeam}
          className="
          flex

          items-center

          gap-2

          rounded-full

          bg-[#171B22]

          px-4
          py-2

          text-sm

          hover:bg-[#202633]
          "
        >

          View Team

          <ChevronRight size={18} />

        </button>

      </div>

      {/* Statistics */}

      <div
        className="
        mt-8

        grid

        gap-4

        md:grid-cols-2

        xl:grid-cols-4
        "
      >

        <Box
          icon={Users}
          label="A Team"
          value={levelA}
        />

        <Box
          icon={Users}
          label="B Team"
          value={levelB}
        />

        <Box
          icon={Users}
          label="C Team"
          value={levelC}
        />

        <Box
          icon={TrendingUp}
          label="Today's Commission"
          value={`$${commissionToday}`}
          color="text-[#00C076]"
        />

      </div>

      {/* Total Team */}

      <div
        className="
        mt-6

        rounded-2xl

        bg-[#171B22]

        p-5
        "
      >

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-zinc-500">

              Total Team Members

            </p>

            <h3
              className="
              mt-2

              text-3xl

              font-bold
              "
            >

              {totalTeam}

            </h3>

          </div>

          <div
            className="
            flex

            h-14
            w-14

            items-center
            justify-center

            rounded-2xl

            bg-[#1D66FF]/15
            "
          >

            <Users
              className="text-[#1D66FF]"
            />

          </div>

        </div>

      </div>

      {/* Upgrade */}

      <div className="mt-8">

        <div className="flex items-center gap-2">

          <Crown
            size={18}
            className="text-yellow-400"
          />

          <span className="font-semibold">

            Upgrade Progress

          </span>

        </div>

        <div
          className="
          mt-4

          h-3

          overflow-hidden

          rounded-full

          bg-[#171B22]
          "
        >

          <div
            style={{
              width: `${progress}%`,
            }}
            className="
            h-full

            rounded-full

            bg-linear-to-r

            from-[#1D66FF]

            to-[#4E8EFF]
            "
          />

        </div>

        <div
          className="
          mt-4

          flex

          justify-between

          text-sm

          text-zinc-400
          "
        >

          <span>

            Need {nextLevelA - levelA > 0 ? nextLevelA - levelA : 0} A

          </span>

          <span>

            Need {nextLevelBC - (levelB + levelC) > 0 ? nextLevelBC - (levelB + levelC) : 0} B+C

          </span>

        </div>

      </div>

    </section>

  );

}

function Box({

  icon: Icon,

  label,

  value,

  color = "text-white",

}) {

  return (

    <div
      className="
      rounded-2xl

      bg-[#171B22]

      p-5
      "
    >

      <div className="flex items-center gap-3">

        <div
          className="
          flex

          h-10
          w-10

          items-center
          justify-center

          rounded-xl

          bg-[#1D66FF]/15
          "
        >

          <Icon
            size={18}
            className="text-[#1D66FF]"
          />

        </div>

        <div>

          <p className="text-xs text-zinc-500">

            {label}

          </p>

          <h3
            className={`
            mt-1

            text-xl

            font-semibold

            ${color}
            `}
          >

            {value}

          </h3>

        </div>

      </div>

    </div>

  );

}