import { useState } from "react";
import { Copy, Check, Users, TrendingUp, Gift, ChevronRight } from "lucide-react";
import { useTeam } from "../hooks/useTeam";
import { TEAM_COMMISSION_RATES } from "../config/teamConfig";

export default function Team() {
  const {
    team,
    members,
    loading,
    error,
    fetchMembers,
  } = useTeam();

  const [activeLevel, setActiveLevel] = useState("A");
  const [copied, setCopied] = useState(false);

  if (loading && !team) {
    return (
      <main className="min-h-screen bg-[#090B0E] px-4 pb-28 pt-5 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1700px]">
          <div className="mb-6">
            <div className="h-7 w-24 animate-pulse rounded bg-[#1A1E24]" />
            <div className="mt-2 h-4 w-48 animate-pulse rounded bg-[#1A1E24]" />
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>

          <div className="mt-4 h-64 animate-pulse rounded-2xl border border-[#1A1E24] bg-[#101318]" />
        </div>
      </main>
    );
  }

  if (error && !team) {
    return (
      <main className="min-h-screen bg-[#090B0E] px-4 pb-28 pt-5 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1700px]">
          <div className="rounded-2xl border border-red-500/20 bg-[#101318] p-6">
            <p className="text-sm font-semibold text-red-400">
              Unable to load team data
            </p>

            <p className="mt-2 text-sm text-gray-400">
              {error}
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!team) return null;

  const {
    level,
    referralCode,
    stats,
    progress,
    commission,
    income,
    referralBonus,
  } = team;

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      // Clipboard may be unavailable in some environments.
    }
  };

  const handleLevelChange = async (levelName) => {
    setActiveLevel(levelName);

    await fetchMembers(levelName);
  };

  const totalRequired = progress?.requiredTotal || 0;
  const totalMembers = stats?.total || 0;

  const progressPercent =
    totalRequired > 0
      ? Math.min((totalMembers / totalRequired) * 100, 100)
      : 100;

  return (
    <main className="min-h-screen bg-[#090B0E] px-4 pb-28 pt-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1700px]">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Team
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Referral network and team income
          </p>
        </div>

        {/* Top cards */}
        <div className="grid gap-4 lg:grid-cols-3">

          {/* Level */}
          <section className="rounded-2xl border border-[#1A1E24] bg-[#101318] p-5">

            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                  Current level
                </p>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold">
                    {level}
                  </span>

                  <span className="text-sm text-gray-500">
                    / 6
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-[#1A1E24] bg-[#0B0E12] p-3">
                <TrendingUp
                  size={20}
                  className="text-[#4D8DFF]"
                />
              </div>
            </div>

            {progress?.nextLevel ? (
              <>
                <div className="mt-5 flex items-center justify-between text-xs">
                  <span className="text-gray-500">
                    Progress to Level {progress.nextLevel}
                  </span>

                  <span className="font-medium text-gray-300">
                    {stats.total}/{progress.requiredTotal}
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#1A1E24]">
                  <div
                    className="h-full rounded-full bg-[#4D8DFF] transition-all duration-500"
                    style={{
                      width: `${progressPercent}%`,
                    }}
                  />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg bg-[#0B0E12] p-2">
                    <p className="text-gray-500">
                      Level A
                    </p>
                    <p className="mt-1 font-medium">
                      {stats.levelA} / {progress.requiredA}
                    </p>
                  </div>

                  <div className="rounded-lg bg-[#0B0E12] p-2">
                    <p className="text-gray-500">
                      Level B + C
                    </p>
                    <p className="mt-1 font-medium">
                      {stats.levelB + stats.levelC} / {progress.requiredBC}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-5 rounded-xl border border-[#1A1E24] bg-[#0B0E12] p-3">
                <p className="text-sm font-medium">
                  Maximum level reached
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  You are currently at the highest team level.
                </p>
              </div>
            )}
          </section>

          {/* Team stats */}
          <section className="rounded-2xl border border-[#1A1E24] bg-[#101318] p-5">

            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                  Team members
                </p>

                <p className="mt-2 text-4xl font-semibold">
                  {stats.total}
                </p>
              </div>

              <div className="rounded-xl border border-[#1A1E24] bg-[#0B0E12] p-3">
                <Users
                  size={20}
                  className="text-[#4D8DFF]"
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2">

              <TeamStat
                label="Level A"
                value={stats.levelA}
              />

              <TeamStat
                label="Level B"
                value={stats.levelB}
              />

              <TeamStat
                label="Level C"
                value={stats.levelC}
              />

            </div>
          </section>

          {/* Referral */}
          <section className="rounded-2xl border border-[#1A1E24] bg-[#101318] p-5">

            <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
              Referral code
            </p>

            <div className="mt-3 flex items-center gap-2">

              <div className="min-w-0 flex-1 rounded-xl border border-[#1A1E24] bg-[#0B0E12] px-4 py-3">
                <p className="truncate font-mono text-sm font-medium tracking-wide">
                  {referralCode}
                </p>
              </div>

              <button
                type="button"
                onClick={copyReferralCode}
                className="rounded-xl border border-[#285DB5] bg-[#285DB5] p-3 text-white transition hover:bg-[#326BC7]"
              >
                {copied ? (
                  <Check size={18} />
                ) : (
                  <Copy size={18} />
                )}
              </button>

            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl bg-[#0B0E12] p-3">
              <div className="flex items-center gap-3">

                <div className="rounded-lg bg-[#172131] p-2">
                  <Gift
                    size={17}
                    className="text-[#4D8DFF]"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Referral bonus
                  </p>

                  <p className="text-xs text-gray-500">
                    One-time bonus
                  </p>
                </div>

              </div>

              <div className="text-right">
                <p className="text-sm font-semibold">
                  {referralBonus.rate}%
                </p>

                <p className="text-xs text-gray-500">
                  Earned ${referralBonus.earned}
                </p>
              </div>
            </div>

          </section>
        </div>

        {/* Income */}
        <section className="mt-4 rounded-2xl border border-[#1A1E24] bg-[#101318] p-5">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                Today's team income
              </p>

              <p className="mt-2 text-3xl font-semibold">
                ${income.today.toFixed(2)}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-500">
                Commission rates
              </p>

              <p className="mt-1 text-sm font-medium">
                A {commission.levelA}% · B {commission.levelB}% · C{" "}
                {commission.levelC}%
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">

            <IncomeItem
              label="Level A"
              value={income.levelA}
              rate={commission.levelA}
            />

            <IncomeItem
              label="Level B"
              value={income.levelB}
              rate={commission.levelB}
            />

            <IncomeItem
              label="Level C"
              value={income.levelC}
              rate={commission.levelC}
            />

          </div>
        </section>

        {/* Team members */}
        <section className="mt-4 rounded-2xl border border-[#1A1E24] bg-[#101318]">

          <div className="border-b border-[#1A1E24] p-5">

            <div>
              <h2 className="text-base font-semibold">
                Team members
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Members in your referral network
              </p>
            </div>

            <div className="mt-4 grid grid-cols-3 rounded-xl bg-[#0B0E12] p-1">

              {["A", "B", "C"].map((levelName) => (
                <button
                  key={levelName}
                  type="button"
                  onClick={() => handleLevelChange(levelName)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    activeLevel === levelName
                      ? "bg-[#1A2535] text-white"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  Level {levelName}
                </button>
              ))}

            </div>
          </div>

          <div className="divide-y divide-[#1A1E24]">

            {members.length === 0 ? (
              <div className="px-5 py-12 text-center">

                <Users
                  size={28}
                  className="mx-auto text-gray-600"
                />

                <p className="mt-3 text-sm font-medium text-gray-300">
                  No Level {activeLevel} members
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Members will appear here when they join your network.
                </p>

              </div>
            ) : (
              members.map((member) => (
                <TeamMember
                  key={member.id}
                  member={member}
                />
              ))
            )}

          </div>
        </section>

        {/* Commission explanation */}
        <section className="mt-4 rounded-2xl border border-[#1A1E24] bg-[#101318] p-5">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">
                Commission structure
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Current rates based on your team level
              </p>
            </div>

            <ChevronRight
              size={18}
              className="text-gray-600"
            />
          </div>

          <div className="mt-5 overflow-x-auto">

            <table className="w-full min-w-[420px] text-left text-sm">

              <thead>
                <tr className="border-b border-[#1A1E24] text-xs text-gray-500">
                  <th className="pb-3 font-medium">
                    Your level
                  </th>

                  <th className="pb-3 font-medium">
                    Level A
                  </th>

                  <th className="pb-3 font-medium">
                    Level B
                  </th>

                  <th className="pb-3 font-medium">
                    Level C
                  </th>
                </tr>
              </thead>

              <tbody>
                {Object.entries(TEAM_COMMISSION_RATES).map(
                  ([levelNumber, rates]) => (
                    <tr
                      key={levelNumber}
                      className="border-b border-[#1A1E24] last:border-0"
                    >
                      <td className="py-3 font-medium">
                        Level {levelNumber}
                      </td>

                      <td className="py-3 text-gray-400">
                        {rates.A}%
                      </td>

                      <td className="py-3 text-gray-400">
                        {rates.B}%
                      </td>

                      <td className="py-3 text-gray-400">
                        {rates.C}%
                      </td>
                    </tr>
                  )
                )}
              </tbody>

            </table>
          </div>
        </section>

        {/* Hierarchy explanation */}
        <section className="mt-4 rounded-2xl border border-[#1A1E24] bg-[#101318] p-5">

          <h2 className="text-base font-semibold">
            How the team hierarchy works
          </h2>

          <div className="mt-4 space-y-3">

            <HierarchyRow
              level="A"
              text="People you directly refer"
            />

            <HierarchyRow
              level="B"
              text="People referred by your Level A members"
            />

            <HierarchyRow
              level="C"
              text="People referred by your Level B members"
            />

          </div>

        </section>

      </div>
    </main>
  );
}


/* ---------------- Components ---------------- */

function TeamStat({ label, value }) {
  return (
    <div className="rounded-xl bg-[#0B0E12] p-3">
      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-semibold">
        {value}
      </p>
    </div>
  );
}


function IncomeItem({ label, value, rate }) {
  return (
    <div className="rounded-xl bg-[#0B0E12] p-4">

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">
          {label}
        </p>

        <span className="text-xs text-gray-600">
          {rate}%
        </span>
      </div>

      <p className="mt-2 text-lg font-semibold">
        ${value.toFixed(2)}
      </p>

    </div>
  );
}


function TeamMember({ member }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">

      <div className="flex min-w-0 items-center gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1A2535] text-sm font-semibold text-[#4D8DFF]">
          {member.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div className="min-w-0">

          <p className="truncate text-sm font-medium">
            {member.name}
          </p>

          <p className="mt-0.5 truncate text-xs text-gray-500">
            @{member.username?.replace(/^@/, "")}
          </p>

        </div>

      </div>

      <div className="shrink-0 text-right">

        <span
          className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${
            member.status === "ACTIVE"
              ? "bg-[#10251E] text-[#08B77A]"
              : "bg-[#211E16] text-[#C5A55A]"
          }`}
        >
          {member.status}
        </span>

        <p className="mt-1 text-xs text-gray-500">
          ${Number(member.todayEarning || 0).toFixed(2)} today
        </p>

      </div>

    </div>
  );
}


function HierarchyRow({ level, text }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-[#0B0E12] p-3">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#1A1E24] text-xs font-semibold text-[#4D8DFF]">
        {level}
      </div>

      <p className="text-sm text-gray-400">
        {text}
      </p>

    </div>
  );
}


function SkeletonCard() {
  return (
    <div className="h-52 animate-pulse rounded-2xl border border-[#1A1E24] bg-[#101318]" />
  );
}