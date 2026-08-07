import {
  Users,
  ChevronRight,
} from "lucide-react";

export default function ReferralTree({

  level = 2,

  levelA = 3,

  levelB = 5,

  levelC = 2,

  onViewTeam,

}) {

  return (

    <section
      className="
      rounded-4xl
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
            Referral Network
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Level {level}
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

          <ChevronRight size={18}/>
        </button>

      </div>

      {/* Tree */}

      <div className="mt-10 flex flex-col items-center">

        {/* YOU */}

        <Node
          title="YOU"
          color="bg-[#1D66FF]"
        />

        <div className="h-8 w-0.5 bg-white/10"/>

        {/* A */}

        <div className="flex gap-10">

          <Node
            title={`A (${levelA})`}
            color="bg-[#00C076]"
          />

          <Node
            title={`B (${levelB})`}
            color="bg-[#F6C344]"
          />

          <Node
            title={`C (${levelC})`}
            color="bg-[#A855F7]"
          />

        </div>

      </div>

      {/* Footer */}

      <div
        className="
        mt-10

        grid

        grid-cols-3

        gap-4
        "
      >

        <Stat
          title="Total Team"
          value={levelA+levelB+levelC}
        />

        <Stat
          title="Current Level"
          value={level}
        />

        <Stat
          title="Referral Code"
          value="AB1234"
        />

      </div>

    </section>

  );

}

function Node({

  title,

  color,

}){

  return(

    <div className="flex flex-col items-center">

      <div
        className={`
        ${color}

        flex

        h-14
        w-14

        items-center
        justify-center

        rounded-full
        `}
      >

        <Users
          size={22}
          className="text-white"
        />

      </div>

      <span className="mt-3 text-sm">

        {title}

      </span>

    </div>

  );

}

function Stat({

  title,

  value,

}){

  return(

    <div
      className="
      rounded-2xl

      bg-[#171B22]

      p-4

      text-center
      "
    >

      <p className="text-xs text-zinc-500">

        {title}

      </p>

      <h3
        className="
        mt-2

        text-2xl

        font-bold
        "
      >

        {value}

      </h3>

    </div>

  );

}