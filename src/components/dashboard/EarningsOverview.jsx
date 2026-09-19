import {
  ArrowUpRight,
  BarChart3,
  Users,
} from "lucide-react";

import useDashboard from "../../hooks/useDashboard";

function formatMoney(value) {
  return `$${Number(
    value || 0
  ).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function EarningsOverview() {
  const {
    dashboard,
    loading,
  } = useDashboard();

  const earnings =
    dashboard?.earnings || {};

  const trading =
    dashboard?.trading || {};

  const todayEarning =
    Number(earnings.today || 0);

  const totalEarnings =
    Number(earnings.total || 0);

  const teamIncome =
    Number(earnings.teamIncome || 0);

  if (loading && !dashboard) {
    return (
      <section className="mt-6">
        <div className="mb-3">
          <h2 className="text-[15px] font-semibold text-white">
            Earnings Overview
          </h2>

          <p className="mt-1 text-[11px] text-[#68717D]">
            Loading your account performance...
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="h-[120px] animate-pulse rounded-2xl border border-[#1A1E24] bg-[#0D1014]" />
          <div className="h-[120px] animate-pulse rounded-2xl border border-[#1A1E24] bg-[#0D1014]" />
        </div>
      </section>
    );
  }

  return (
    <section className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-white">
            Earnings Overview
          </h2>

          <p className="mt-1 text-[11px] text-[#68717D]">
            Real account earnings
          </p>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1A1E24] bg-[#0D1014]">
          <BarChart3
            size={15}
            className="text-[#7C8796]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Total Earnings */}

        <div className="rounded-2xl border border-[#1A1E24] bg-[#0D1014] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] text-[#68717D]">
              Total Earnings
            </span>

            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#08B77A]/10">
              <ArrowUpRight
                size={13}
                className="text-[#08B77A]"
              />
            </div>
          </div>

          <p className="text-[20px] font-semibold tracking-[-0.02em] text-white">
            {formatMoney(totalEarnings)}
          </p>

          <p className="mt-1 text-[10px] text-[#59616D]">
            Daily package returns
          </p>
        </div>

        {/* Today's Earnings */}

        <div className="rounded-2xl border border-[#1A1E24] bg-[#0D1014] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] text-[#68717D]">
              Today's Return
            </span>

            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#4D8DFF]/10">
              <BarChart3
                size={13}
                className="text-[#4D8DFF]"
              />
            </div>
          </div>

          <p className="text-[20px] font-semibold tracking-[-0.02em] text-white">
            {formatMoney(todayEarning)}
          </p>

          <p className="mt-1 text-[10px] text-[#59616D]">
            Today's completed earning
          </p>
        </div>
      </div>

      {/* Activity stats */}

      <div className="mt-3 grid grid-cols-3 divide-x divide-[#1A1E24] rounded-2xl border border-[#1A1E24] bg-[#0D1014]">
        <div className="px-3 py-3 text-center">
          <p className="text-[16px] font-semibold text-white">
            {trading.total || 0}
          </p>

          <p className="mt-1 text-[9px] text-[#68717D]">
            Completed
          </p>
        </div>

        <div className="px-3 py-3 text-center">
          <p className="text-[16px] font-semibold text-white">
            {trading.manual || 0}
          </p>

          <p className="mt-1 text-[9px] text-[#68717D]">
            Trades
          </p>
        </div>

        <div className="px-3 py-3 text-center">
          <p className="text-[16px] font-semibold text-white">
            {trading.auto || 0}
          </p>

          <p className="mt-1 text-[9px] text-[#68717D]">
            Auto Trades
          </p>
        </div>
      </div>

      {/* Team income */}

      <div className="mt-3 flex items-center justify-between rounded-2xl border border-[#1A1E24] bg-[#0D1014] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4D8DFF]/10">
            <Users
              size={14}
              className="text-[#6EA2FF]"
            />
          </div>

          <div>
            <p className="text-[11px] text-[#68717D]">
              Team Income
            </p>

            <p className="mt-0.5 text-[13px] font-semibold text-white">
              {formatMoney(teamIncome)}
            </p>
          </div>
        </div>

        <span className="text-[9px] text-[#59616D]">
          Total credited
        </span>
      </div>
    </section>
  );
}