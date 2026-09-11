import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Clock3,
  LockKeyhole,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTradeWalletContext } from "../../context/TradeWalletContext";

function formatMoney(value) {
  return `$${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function AutoTradeStatus() {
  const navigate = useNavigate();

  const {
    isLocked = false,
    lockRemaining = 0,
    formatDuration,
    canAutoTrade = true,
    autoTradeBase = null,
    autoTradeReturn = null,
    lastAutoTrade = null,
  } = useTradeWalletContext();

  /*
   * --------------------------------------------------
   * ACTIVE AUTO TRADE
   * --------------------------------------------------
   */

  if (isLocked) {
    return (
      <section className="mt-7">
        <div className="mb-3">
          <h2 className="text-[15px] font-semibold text-white">
            Auto Trade
          </h2>

          <p className="mt-1 text-[11px] text-[#68717D]">
            Current automated trade status
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-[#F6465D]/20 bg-[#0D1014] p-4">
          {/* Background glow */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#F6465D]/5 blur-3xl" />

          <div className="relative">
            {/* Status */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F6465D]/10">
                  <Bot
                    size={18}
                    className="text-[#F6465D]"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-semibold text-white">
                      Auto Trade Active
                    </p>

                    <span className="h-1.5 w-1.5 rounded-full bg-[#F6465D]" />
                  </div>

                  <p className="mt-1 text-[10px] text-[#68717D]">
                    Wallet is temporarily locked
                  </p>
                </div>
              </div>

              <LockKeyhole
                size={15}
                className="text-[#F6465D]"
              />
            </div>

            {/* Countdown */}
            <div className="mt-5 rounded-xl border border-[#1A1E24] bg-[#101419] p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock3
                    size={13}
                    className="text-[#68717D]"
                  />

                  <span className="text-[10px] text-[#68717D]">
                    Processing time
                  </span>
                </div>

                <span className="font-mono text-[14px] font-semibold text-[#F6465D]">
                  {formatDuration
                    ? formatDuration(lockRemaining)
                    : "—"}
                </span>
              </div>
            </div>

            {/* Amount */}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <p className="text-[9px] text-[#59616D]">
                  Base amount
                </p>

                <p className="mt-1 text-[13px] font-medium text-white">
                  {formatMoney(autoTradeBase)}
                </p>
              </div>

              <div className="text-right">
                <p className="text-[9px] text-[#59616D]">
                  Expected return
                </p>

                <p className="mt-1 text-[13px] font-medium text-[#08B77A]">
                  +{formatMoney(autoTradeReturn)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /*
   * --------------------------------------------------
   * AUTO TRADE AVAILABLE
   * --------------------------------------------------
   */

  if (canAutoTrade) {
    return (
      <section className="mt-7">
        <div className="mb-3">
          <h2 className="text-[15px] font-semibold text-white">
            Auto Trade
          </h2>

          <p className="mt-1 text-[11px] text-[#68717D]">
            Automated trading is available
          </p>
        </div>

        <div className="rounded-2xl border border-[#1A1E24] bg-[#0D1014] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4D8DFF]/10">
              <Bot
                size={18}
                className="text-[#4D8DFF]"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-white">
                Auto Trade is ready
              </p>

              <p className="mt-1 text-[10px] text-[#68717D]">
                Select a package and start from the Trade page.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/trade")}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#252B34] bg-[#11151A] text-[#8C96A3] transition hover:border-[#39414D] hover:text-white"
            >
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </section>
    );
  }

  /*
   * --------------------------------------------------
   * COOLDOWN
   * --------------------------------------------------
   */

  return (
    <section className="mt-7">
      <div className="mb-3">
        <h2 className="text-[15px] font-semibold text-white">
          Auto Trade
        </h2>

        <p className="mt-1 text-[11px] text-[#68717D]">
          Daily Auto Trade status
        </p>
      </div>

      <div className="rounded-2xl border border-[#1A1E24] bg-[#0D1014] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#08B77A]/10">
            <CheckCircle2
              size={18}
              className="text-[#08B77A]"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-white">
              Auto Trade completed
            </p>

            <p className="mt-1 text-[10px] text-[#68717D]">
              Your next Auto Trade will be available after the
              daily cooldown.
            </p>
          </div>
        </div>

        {lastAutoTrade && (
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#1A1E24] pt-4">
            <div>
              <p className="text-[9px] text-[#59616D]">
                Last trade
              </p>

              <p className="mt-1 text-[11px] font-medium text-white">
                {new Date(lastAutoTrade).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[9px] text-[#59616D]">
                Return
              </p>

              <p className="mt-1 text-[11px] font-medium text-[#08B77A]">
                +{formatMoney(autoTradeReturn)}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}