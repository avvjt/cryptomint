import { useMemo, useState } from "react";

import {
  Eye,
  EyeOff,
  TrendingUp,
} from "lucide-react";

export default function BalanceCard({

  availableBalance = 0,

  todayIncome = 0,

}) {

  const [hideBalance, setHideBalance] =
    useState(false);

  const usdt = useMemo(
    () =>
      Number(availableBalance).toLocaleString(
        undefined,
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      ),
    [availableBalance]
  );

  // Dummy conversion
  const inr = useMemo(
    () =>
      Number(
        availableBalance * 87
      ).toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    [availableBalance]
  );

  return (

    <section
      className="
      relative

      overflow-hidden

      rounded-[32px]

      border
      border-white/5

      bg-gradient-to-br
      from-[#111318]
      to-[#0C1018]

      shadow-[0_20px_60px_rgba(0,0,0,.35)]
      "
    >

      {/* Glow */}

      <div
        className="
        absolute

        -right-24
        -top-24

        h-80
        w-80

        rounded-full

        bg-[#1D66FF]/15

        blur-[120px]
        "
      />

      <div className="relative p-6 lg:p-8">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <p
              className="
              uppercase

              tracking-[0.25em]

              text-xs

              text-zinc-500
              "
            >
              Available Balance
            </p>

            <div className="mt-4 flex items-center gap-3">

              <h2
                className="
                text-4xl

                font-bold

                tracking-tight

                lg:text-5xl
                "
              >

                {hideBalance
                  ? "********"
                  : `${usdt} USDT`}

              </h2>

              <button
                onClick={() =>
                  setHideBalance(!hideBalance)
                }
                className="
                rounded-full

                bg-[#171B22]

                p-2

                hover:bg-[#202633]
                "
              >

                {hideBalance
                  ? <Eye size={18}/>
                  : <EyeOff size={18}/>
                }

              </button>

            </div>

            <p
              className="
              mt-3

              text-sm

              text-zinc-500
              "
            >

              ≈ ₹{hideBalance ? "******" : inr}

            </p>

          </div>

          <div
            className="
            hidden

            lg:flex

            h-20
            w-20

            items-center
            justify-center

            rounded-3xl

            bg-[#1D66FF]/10
            "
          >

            <TrendingUp
              size={34}
              className="text-[#1D66FF]"
            />

          </div>

        </div>

        {/* Divider */}

        <div className="my-8 h-px bg-white/5"/>

        {/* Bottom */}

        <div
          className="
          grid

          grid-cols-2

          gap-6

          lg:grid-cols-4
          "
        >

          <Info
            label="Today's Income"
            value={`+${todayIncome} USDT`}
            color="text-[#00C076]"
          />

          <Info
            label="Investment"
            value={`${availableBalance} USDT`}
          />

          <Info
            label="Withdrawable"
            value={`${availableBalance} USDT`}
          />

          <Info
            label="Status"
            value="Active"
            color="text-[#1D66FF]"
          />

        </div>

      </div>

    </section>

  );

}

function Info({

  label,

  value,

  color = "text-white",

}) {

  return (

    <div>

      <p className="text-xs text-zinc-500">

        {label}

      </p>

      <h3
        className={`
        mt-2

        text-lg

        font-semibold

        ${color}
        `}
      >

        {value}

      </h3>

    </div>

  );

}