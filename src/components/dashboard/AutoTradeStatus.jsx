import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Clock3,
  LockKeyhole,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useDashboard from "../../hooks/useDashboard";

function formatMoney(value) {
  return `$${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(date) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AutoTradeStatus() {
  const navigate = useNavigate();
  const { dashboard, loading } = useDashboard();

  if (loading) {
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

        <div className="h-40 animate-pulse rounded-2xl border border-[#1A1E24] bg-[#0D1014]" />
      </section>
    );
  }

  const trading = dashboard?.trading || {};
  const wallet = dashboard?.wallet || {};
  const earnings = dashboard?.earnings || {};

  const todayCompleted = Boolean(trading.todayCompleted);
  const lastTrade = trading.lastTrade;

  const todayEarning = Number(earnings.today || 0);

  const availableBalance = Number(
    wallet.availableBalance || 0
  );

  /*
   * Backend currently doesn't expose a temporary Auto Trade
   * countdown. Therefore "locked" means actual wallet funds
   * are locked, not the old frontend fake 5-minute timer.
   */
  const lockedBalance = Number(wallet.lockedBalance || 0);
  const isLocked = lockedBalance > 0;

  /*
   * --------------------------------------------------
   * ACTIVE / LOCKED
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
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#F6465D]/5 blur-3xl" />

          <div className="relative">
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
                    {formatMoney(lockedBalance)} currently locked
                  </p>
                </div>
              </div>

              <LockKeyhole
                size={15}
                className="text-[#F6465D]"
              />
            </div>

            <div className="mt-5 rounded-xl border border-[#1A1E24] bg-[#101419] p-3">
              <div className="flex items-center gap-2">
                <Clock3
                  size={13}
                  className="text-[#68717D]"
                />

                <span className="text-[10px] text-[#68717D]">
                  Locked balance
                </span>
              </div>

              <p className="mt-2 text-[16px] font-semibold text-[#F6465D]">
                {formatMoney(lockedBalance)}
              </p>
            </div>

            {lastTrade && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[9px] text-[#59616D]">
                    Trade type
                  </p>

                  <p className="mt-1 text-[11px] font-medium text-white">
                    {lastTrade.type === "AUTO"
                      ? "Auto Trade"
                      : lastTrade.type || "Trade"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[9px] text-[#59616D]">
                    Started
                  </p>

                  <p className="mt-1 text-[11px] font-medium text-white">
                    {formatDate(
                      lastTrade.createdAt ||
                        lastTrade.completedAt
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  /*
   * --------------------------------------------------
   * TODAY COMPLETED
   * --------------------------------------------------
   */

  if (todayCompleted) {
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
                Today's Trade completed
              </p>

              <p className="mt-1 text-[10px] text-[#68717D]">
                Your daily earning has already been processed.
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#1A1E24] pt-4">
            <div>
              <p className="text-[9px] text-[#59616D]">
                Today's return
              </p>

              <p className="mt-1 text-[12px] font-medium text-[#08B77A]">
                +{formatMoney(todayEarning)}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[9px] text-[#59616D]">
                Next trade
              </p>

              <p className="mt-1 text-[11px] font-medium text-white">
                Tomorrow
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /*
   * --------------------------------------------------
   * AVAILABLE
   * --------------------------------------------------
   */

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
              Available balance:{" "}
              <span className="font-medium text-white">
                {formatMoney(availableBalance)}
              </span>
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