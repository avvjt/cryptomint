import { TrendingUp } from "lucide-react";

export default function InvestmentProgress() {
  // Dummy data (replace later with backend)
  const invested = 150;
  const nextPackage = 200;
  const progress = (invested / nextPackage) * 100;

  return (
    <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-zinc-400">
            Current Investment
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Starter
          </h2>

        </div>

        <div className="rounded-2xl bg-blue-500/20 p-4">

          <TrendingUp
            size={28}
            className="text-blue-500"
          />

        </div>

      </div>

      {/* Progress */}

      <div className="mt-8">

        <div className="mb-2 flex justify-between text-sm">

          <span className="text-zinc-400">

            Investment Progress

          </span>

          <span>

            {invested} / {nextPackage} USDT

          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

          <div
            style={{
              width: `${progress}%`,
            }}
            className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-blue-500
            to-cyan-400
            "
          />

        </div>

      </div>

      {/* Bottom */}

      <div className="mt-8 grid grid-cols-2 gap-4">

        <div>

          <p className="text-zinc-500 text-sm">

            Daily Return

          </p>

          <h3 className="mt-2 text-2xl font-bold text-green-500">

            1%

          </h3>

        </div>

        <div>

          <p className="text-zinc-500 text-sm">

            Daily Income

          </p>

          <h3 className="mt-2 text-2xl font-bold">

            1.50 USDT

          </h3>

        </div>

      </div>

    </div>
  );
}