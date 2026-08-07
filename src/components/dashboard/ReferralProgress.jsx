import { Users } from "lucide-react";

export default function ReferralProgress({
  currentLevel = 2,
  levelA = 3,
  levelATarget = 6,
  levelBC = 18,
  levelBCTarget = 20,
}) {
  const total = levelA + levelBC;
  const totalTarget = levelATarget + levelBCTarget;

  const totalProgress = (total / totalTarget) * 100;

  return (
    <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-zinc-400">
            Referral Level
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Level {currentLevel}
          </h2>

        </div>

        <div className="rounded-2xl bg-blue-500/20 p-4">
          <Users
            size={28}
            className="text-blue-500"
          />
        </div>

      </div>

      {/* Progress */}

      <div className="mt-8">

        <div className="flex justify-between text-sm mb-2">

          <span className="text-zinc-400">
            Progress to Next Level
          </span>

          <span>
            {total}/{totalTarget}
          </span>

        </div>

        <div className="h-3 rounded-full overflow-hidden bg-zinc-800">

          <div
            className="h-full bg-linear-to-r from-blue-500 to-cyan-400"
            style={{
              width: `${totalProgress}%`,
            }}
          />

        </div>

      </div>

      {/* A */}

      <div className="mt-8 flex justify-between">

        <span className="text-zinc-400">
          Level A
        </span>

        <span>
          {levelA}/{levelATarget}
        </span>

      </div>

      {/* B+C */}

      <div className="mt-4 flex justify-between">

        <span className="text-zinc-400">
          Level B+C
        </span>

        <span>
          {levelBC}/{levelBCTarget}
        </span>

      </div>

    </div>
  );
}