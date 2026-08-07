import {
  Crown,
  ArrowUp,
  Users,
  Trophy,
} from "lucide-react";

export default function LevelProgress() {

  const currentLevel = 2;

  const levelA = 3;

  const levelBC = 4;

  const targetA = 3;

  const targetBC = 5;

  const progress = Math.round(
    ((levelA + levelBC) /
      (targetA + targetBC)) *
      100
  );

  return (

    <section
      className="
      rounded-[32px]

      border
      border-white/5

      bg-gradient-to-br
      from-[#111318]
      to-[#0D1119]

      p-6

      lg:p-8
      "
    >

      <div
        className="
        flex

        items-center

        justify-between
        "
      >

        <div>

          <p
            className="
            text-xs

            uppercase

            tracking-[0.25em]

            text-zinc-500
            "
          >

            Upgrade Progress

          </p>

          <h2
            className="
            mt-3

            text-3xl

            font-bold
            "
          >

            Reach Level {currentLevel + 1}

          </h2>

        </div>

        <div
          className="
          flex

          h-16
          w-16

          items-center
          justify-center

          rounded-2xl

          bg-[#1D66FF]/10
          "
        >

          <Crown
            size={28}
            className="text-[#1D66FF]"
          />

        </div>

      </div>

      {/* Progress */}

      <div className="mt-10">

        <div
          className="
          flex

          items-center

          justify-between
          "
        >

          <span className="text-zinc-400">

            Overall Progress

          </span>

          <span
            className="
            font-bold

            text-[#1D66FF]
            "
          >

            {progress}%

          </span>

        </div>

        <div
          className="
          mt-3

          h-3

          overflow-hidden

          rounded-full

          bg-[#1A1F28]
          "
        >

          <div
            className="
            h-full

            rounded-full

            bg-gradient-to-r

            from-[#1D66FF]

            to-[#3F8CFF]

            transition-all

            duration-700
            "
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* Requirements */}

      <div
        className="
        mt-10

        grid

        gap-5

        md:grid-cols-2
        "
      >

        <Requirement

          icon={Users}

          title="Level A"

          current={levelA}

          required={targetA}

          color="#1D66FF"

        />

        <Requirement

          icon={ArrowUp}

          title="Level B + C"

          current={levelBC}

          required={targetBC}

          color="#00C076"

        />

      </div>

      {/* Reward */}

      <div
        className="
        mt-8

        flex

        items-center

        gap-4

        rounded-3xl

        border

        border-yellow-500/20

        bg-yellow-500/10

        p-5
        "
      >

        <Trophy
          className="text-yellow-400"
          size={28}
        />

        <div>

          <h3
            className="
            font-semibold

            text-yellow-300
            "
          >

            Next Level Reward

          </h3>

          <p
            className="
            mt-1

            text-sm

            text-yellow-100/80
            "
          >

            Unlock higher referral commission
            percentages after reaching
            Level {currentLevel + 1}.

          </p>

        </div>

      </div>

    </section>

  );

}

function Requirement({

  icon: Icon,

  title,

  current,

  required,

  color,

}) {

  const percent =
    Math.min(
      (current / required) * 100,
      100
    );

  return (

    <div
      className="
      rounded-3xl

      border
      border-white/5

      bg-[#171B22]

      p-5
      "
    >

      <div
        className="
        flex

        items-center

        gap-3
        "
      >

        <div
          className="
          flex

          h-12
          w-12

          items-center
          justify-center

          rounded-2xl
          "
          style={{
            background: `${color}20`,
          }}
        >

          <Icon
            size={22}
            style={{
              color,
            }}
          />

        </div>

        <div>

          <h3 className="font-semibold">

            {title}

          </h3>

          <p
            className="
            text-sm

            text-zinc-500
            "
          >

            {current} / {required}

          </p>

        </div>

      </div>

      <div
        className="
        mt-5

        h-2

        rounded-full

        bg-[#1A1F28]
        "
      >

        <div
          className="
          h-full

          rounded-full
          "
          style={{
            width: `${percent}%`,
            background: color,
          }}
        />

      </div>

    </div>

  );

}