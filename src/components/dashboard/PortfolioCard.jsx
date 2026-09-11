import {
  Eye,
  EyeOff,
  LockKeyhole,
  Wallet,
} from "lucide-react";

import { useState } from "react";
import { useTradeWalletContext } from "../../context/TradeWalletContext";

export default function PortfolioCard() {
  const {
  balance = 0,
  availableBalance = 0,
  lockedBalance = 0,
  isLocked = false,
} = useTradeWalletContext();

  const [hidden, setHidden] = useState(false);

 

  const formatMoney = (value) =>
    Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-white/[0.07]
        bg-[#0D1117]
        p-5
        shadow-[0_18px_50px_rgba(0,0,0,0.28)]
        sm:p-6
      "
    >
      {/* subtle background glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-24
          h-48
          w-48
          rounded-full
          bg-[#1D66FF]/[0.07]
          blur-3xl
        "
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                border-[#315EA8]/30
                bg-[#1D66FF]/10
                text-[#6EA2FF]
              "
            >
              <Wallet
                size={17}
                strokeWidth={1.8}
              />
            </div>

            <div>
              <p
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.16em]
                  text-[#68717D]
                "
              >
                Portfolio
              </p>

              <p
                className="
                  mt-0.5
                  text-[13px]
                  font-medium
                  text-[#B8C0CA]
                "
              >
                Total wallet value
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setHidden((value) => !value)}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-white/[0.06]
              bg-white/[0.025]
              text-[#68717D]
              transition
              hover:text-white
              active:scale-95
            "
            aria-label={
              hidden
                ? "Show balance"
                : "Hide balance"
            }
          >
            {hidden ? (
              <Eye size={16} />
            ) : (
              <EyeOff size={16} />
            )}
          </button>
        </div>

        {/* Balance */}
        <div className="mt-7">
          <p
            className="
              text-[11px]
              font-medium
              uppercase
              tracking-[0.14em]
              text-[#606975]
            "
          >
            Available balance
          </p>

          <div className="mt-2 flex items-baseline gap-2">
            <span
              className="
                text-[32px]
                font-semibold
                tracking-[-0.035em]
                text-white
                sm:text-[38px]
              "
            >
              {hidden
                ? "••••••"
                : `$${formatMoney(availableBalance)}`}
            </span>

            {!hidden && (
              <span
                className="
                  text-[13px]
                  font-medium
                  text-[#68717D]
                "
              >
                USDT
              </span>
            )}
          </div>
        </div>

        {/* Bottom stats */}
        <div
          className="
            mt-6
            grid
            grid-cols-2
            gap-2
            border-t
            border-white/[0.06]
            pt-4
          "
        >
          <div>
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.12em]
                text-[#606975]
              "
            >
              Available
            </p>

            <p
              className="
                mt-1
                text-[13px]
                font-semibold
                text-[#DCE1E7]
              "
            >
              {hidden
                ? "••••"
                : `$${formatMoney(availableBalance)}`}
            </p>
          </div>

          <div className="border-l border-white/[0.06] pl-4">
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.12em]
                text-[#606975]
              "
            >
              {isLocked
                ? "In Trade"
                : "Locked"}
            </p>

            <div className="mt-1 flex items-center gap-1.5">
              {isLocked && (
                <LockKeyhole
                  size={12}
                  className="text-[#F6465D]"
                />
              )}

              <p
                className="
                  text-[13px]
                  font-semibold
                  text-[#DCE1E7]
                "
              >
                {hidden
                  ? "••••"
                  : `$${formatMoney(lockedBalance)}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}