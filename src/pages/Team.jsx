import { useState } from "react";
import {
  Copy,
  Check,
  Users,
  TrendingUp,
  Gift,
  ChevronRight,
  ArrowUpRight,
  Share2,
  MessageCircle,
  Send,
} from "lucide-react";
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
  const [selectedMember, setSelectedMember] = useState(null);

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
    level = 1,
    referralCode = "",
    stats = {},
    progress = {},
    commission = {},
    income = {},
    referralBonus = {},
  } = team;

  // Backend returns A / B / C.
  // Keep frontend display names levelA / levelB / levelC.
  const commissionRates = {
    levelA: Number(
      commission.A ?? commission.levelA ?? 0
    ),
    levelB: Number(
      commission.B ?? commission.levelB ?? 0
    ),
    levelC: Number(
      commission.C ?? commission.levelC ?? 0
    ),
  };

  const safeStats = {
    total: Number(stats.total || 0),
    levelA: Number(stats.levelA || 0),
    levelB: Number(stats.levelB || 0),
    levelC: Number(stats.levelC || 0),
  };

  const safeIncome = {
    today: Number(income.today || 0),
    levelA: Number(income.levelA || 0),
    levelB: Number(income.levelB || 0),
    levelC: Number(income.levelC || 0),
  };

  const safeReferralBonus = {
    rate: Number(referralBonus.rate ?? 5),
    earned: Number(referralBonus.earned || 0),
  };

  const referralLink = referralCode
  ? `${window.location.origin}/signup?ref=${encodeURIComponent(referralCode)}`
  : "";

  const copyReferralLink = async () => {
    if (!referralLink) return;

    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      // Clipboard unavailable
    }
  };

  const shareReferralLink = async () => {
    if (!referralLink) return;

    const shareData = {
      title: "Join CryptoMintX",
      text: `🎁 Join CryptoMintX using my referral link and qualify for a 5% referral bonus on your first qualifying deposit.`,
      url: referralLink,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await copyReferralLink();
    } catch {
      // User cancelled share or sharing unavailable.
    }
  };

  const shareWhatsApp = () => {
    if (!referralLink) return;

    const text = encodeURIComponent(
      `🎁 Join me on CryptoMintX!\n\nQualify for a 5% referral bonus on your first qualifying deposit.\n\n${referralLink}`
    );

    window.open(
      `https://wa.me/?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareTelegram = () => {
    if (!referralLink) return;

    const text = encodeURIComponent(
      `🎁 Join me on CryptoMintX!\n\nQualify for a 5% referral bonus on your first qualifying deposit.`
    );

    const url = encodeURIComponent(referralLink);

    window.open(
      `https://t.me/share/url?url=${url}&text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleLevelChange = async (levelName) => {
    setActiveLevel(levelName);
    await fetchMembers(levelName);
  };

  const totalRequired = Number(
    progress?.requiredTotal || 0
  );

  const totalMembers = safeStats.total;

  const progressPercent =
    totalRequired > 0
      ? Math.min(
        (totalMembers / totalRequired) * 100,
        100
      )
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
                    {safeStats.total}/{progress.requiredTotal}
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
                      {safeStats.levelA} / {progress.requiredA}
                    </p>
                  </div>

                  <div className="rounded-lg bg-[#0B0E12] p-2">
                    <p className="text-gray-500">
                      Level B + C
                    </p>

                    <p className="mt-1 font-medium">
                      {safeStats.levelB + safeStats.levelC} /{" "}
                      {progress.requiredBC}
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
                  {safeStats.total}
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
                value={safeStats.levelA}
              />

              <TeamStat
                label="Level B"
                value={safeStats.levelB}
              />

              <TeamStat
                label="Level C"
                value={safeStats.levelC}
              />
            </div>
          </section>


          {/* Referral / Invite & Earn */}
          <section className="rounded-2xl border border-[#1A1E24] bg-[#101318] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                  Invite & Earn
                </p>

                <h2 className="mt-2 text-lg font-semibold text-white">
                  Share your referral link
                </h2>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Invite friends and let them join through your personal link.
                </p>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#172131]">
                <Gift size={19} className="text-[#4D8DFF]" />
              </div>
            </div>

            {/* Bonus banner */}
            <div className="mt-5 overflow-hidden rounded-2xl border border-[#4D8DFF]/20 bg-gradient-to-br from-[#101C2E] to-[#0B0E12]">
              <div className="flex items-center gap-3 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4D8DFF]/10">
                  <Gift size={21} className="text-[#4D8DFF]" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white">
                      {safeReferralBonus.rate}% Referral Bonus
                    </p>

                    <span className="rounded-full bg-[#08B77A]/10 px-2 py-0.5 text-[9px] font-medium text-[#08B77A]">
                      BONUS
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] leading-5 text-gray-500">
                    Your referral qualifies for the bonus after their first
                    qualifying deposit.
                  </p>
                </div>
              </div>
            </div>

            {/* Referral link */}
            <div className="mt-4">
              <p className="mb-2 text-[11px] font-medium text-gray-500">
                Your referral link
              </p>

              <div className="flex items-center gap-2 rounded-xl border border-[#1A1E24] bg-[#0B0E12] p-2">
                <div className="min-w-0 flex-1 px-2">
                  <p className="truncate font-mono text-xs text-gray-400">
                    {referralLink || "Generating link..."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={copyReferralLink}
                  disabled={!referralLink}
                  className="flex h-10 shrink-0 items-center gap-2 rounded-lg bg-[#285DB5] px-3 text-xs font-medium text-white transition hover:bg-[#326BC7] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {copied ? (
                    <>
                      <Check size={15} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={15} />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Share buttons */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={shareWhatsApp}
                disabled={!referralLink}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#1A1E24] bg-[#0B0E12] px-3 py-3 text-xs font-medium text-gray-300 transition hover:border-[#2A3038] hover:bg-[#14181E] hover:text-white disabled:opacity-40"
              >
                <MessageCircle size={16} />
                WhatsApp
              </button>

              <button
                type="button"
                onClick={shareTelegram}
                disabled={!referralLink}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#1A1E24] bg-[#0B0E12] px-3 py-3 text-xs font-medium text-gray-300 transition hover:border-[#2A3038] hover:bg-[#14181E] hover:text-white disabled:opacity-40"
              >
                <Send size={16} />
                Telegram
              </button>

              <button
                type="button"
                onClick={shareReferralLink}
                disabled={!referralLink}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#1A1E24] bg-[#0B0E12] px-3 py-3 text-xs font-medium text-gray-300 transition hover:border-[#2A3038] hover:bg-[#14181E] hover:text-white disabled:opacity-40"
              >
                <Share2 size={16} />
                Share
              </button>
            </div>

            {/* Referral code */}
            <div className="mt-4 flex items-center justify-between border-t border-[#1A1E24] pt-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-600">
                  Referral code
                </p>

                <p className="mt-1 font-mono text-sm font-medium tracking-wide text-gray-300">
                  {referralCode || "—"}
                </p>
              </div>

              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-600">
                  Earned
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  ${safeReferralBonus.earned.toFixed(2)}
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
                ${safeIncome.today.toFixed(2)}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-500">
                Commission rates
              </p>

              <p className="mt-1 text-sm font-medium">
                A {commissionRates.levelA}% · B{" "}
                {commissionRates.levelB}% · C{" "}
                {commissionRates.levelC}%
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <IncomeItem
              label="Level A"
              value={safeIncome.levelA}
              rate={commissionRates.levelA}
            />

            <IncomeItem
              label="Level B"
              value={safeIncome.levelB}
              rate={commissionRates.levelB}
            />

            <IncomeItem
              label="Level C"
              value={safeIncome.levelC}
              rate={commissionRates.levelC}
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
                  onClick={() =>
                    handleLevelChange(levelName)
                  }
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${activeLevel === levelName
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
                  onClick={() =>
                    setSelectedMember(member)
                  }
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
                {Object.entries(
                  TEAM_COMMISSION_RATES
                ).map(([levelNumber, rates]) => (
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
                ))}
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

      {selectedMember && (
        <MemberDetailSheet
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
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
  const safeValue = Number(value || 0);

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
        ${safeValue.toFixed(2)}
      </p>
    </div>
  );
}

function TeamMember({ member, onClick }) {
  const initial =
    member.name?.charAt(0)?.toUpperCase() || "U";

  const earning =
    Number(member.todayEarning || 0);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center justify-between gap-4 border-b border-[#1A1E24] px-5 py-4 text-left transition last:border-0 hover:bg-[#11161D] active:bg-[#141A22] sm:px-6"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#1A1E24] bg-[#172131] text-sm font-semibold text-[#4D8DFF]">
          {initial}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-gray-200">
            {member.name}
          </p>

          <p className="mt-0.5 truncate text-xs text-gray-600">
            @{member.username?.replace(/^@/, "")}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-300">
            ${earning.toFixed(2)}
          </p>

          <p className="mt-0.5 text-[10px] text-gray-600">
            today
          </p>
        </div>

        <div
          className={`h-1.5 w-1.5 rounded-full ${member.status === "ACTIVE"
              ? "bg-[#08B77A]"
              : "bg-[#C5A55A]"
            }`}
        />

        <ArrowUpRight
          size={15}
          className="text-gray-700 transition group-hover:text-gray-400"
        />
      </div>
    </button>
  );
}

function MemberDetailSheet({ member, onClose }) {
  const earning =
    Number(member.todayEarning || 0);

  const isActive =
    member.status === "ACTIVE";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md overflow-hidden rounded-t-3xl border border-[#1A1E24] bg-[#101318] shadow-2xl sm:rounded-2xl">

        <div className="flex justify-center pt-3 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-[#2A3038]" />
        </div>

        <div className="border-b border-[#1A1E24] px-5 pb-5 pt-4 sm:p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1A1E24] bg-[#172131] text-base font-semibold text-[#4D8DFF]">
                {member.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div>
                <p className="text-base font-semibold text-gray-200">
                  {member.name}
                </p>

                <p className="mt-0.5 text-xs text-gray-600">
                  @{member.username?.replace(/^@/, "")}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition hover:bg-[#1A1E24] hover:text-gray-300"
              aria-label="Close"
            >
              <span className="text-lg leading-none">
                ×
              </span>
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between rounded-xl border border-[#1A1E24] bg-[#0B0E12] p-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-gray-600">
                Relationship
              </p>

              <p className="mt-1 text-sm font-medium text-gray-300">
                Level {member.level}
              </p>
            </div>

            <span
              className={`rounded-md px-2.5 py-1 text-[10px] font-medium ${isActive
                  ? "bg-[#10251E] text-[#08B77A]"
                  : "bg-[#211E16] text-[#C5A55A]"
                }`}
            >
              {member.status}
            </span>
          </div>

          <div className="mt-3 rounded-xl border border-[#1A1E24] bg-[#0B0E12] p-4">
            <p className="text-[10px] uppercase tracking-[0.15em] text-gray-600">
              Today's earning
            </p>

            <p className="mt-2 text-2xl font-semibold tracking-tight">
              ${earning.toFixed(2)}
            </p>
          </div>

          <div className="mt-3 rounded-xl border border-[#1A1E24] bg-[#0B0E12] p-4">
            <p className="text-[10px] uppercase tracking-[0.15em] text-gray-600">
              Team relationship
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              {member.level === "A"
                ? "This member was directly referred by you."
                : member.level === "B"
                  ? "This member was referred by someone in your Level A network."
                  : "This member was referred through your Level B network."}
            </p>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <DetailItem
              label="Team level"
              value={`Level ${member.level}`}
            />

            <DetailItem
              label="Status"
              value={member.status}
            />
          </div>
        </div>

        <div className="border-t border-[#1A1E24] p-5 sm:p-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-[#1A1E24] bg-[#0B0E12] py-3 text-sm font-medium text-gray-300 transition hover:border-[#2A3038] hover:bg-[#14181E]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="rounded-xl border border-[#1A1E24] bg-[#0B0E12] p-3">
      <p className="text-[10px] uppercase tracking-wide text-gray-600">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-medium text-gray-300">
        {value}
      </p>
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