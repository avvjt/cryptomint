import {
  ChevronRight,
  LockKeyhole,
  Wallet,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function formatMoney(value) {
  return `$${Number(value || 0).toLocaleString(
    "en-US",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )}`;
}

export default function WalletBreakdown({
  dashboard,
  loading,
}) {
  const navigate = useNavigate();

  const wallet = dashboard?.wallet || {};

  const available = Number(
    wallet.availableBalance ?? 0
  );

  const locked = Number(
    wallet.lockedBalance ?? 0
  );

  const total =
    wallet.totalBalance !== undefined
      ? Number(wallet.totalBalance)
      : available + locked;

  const availablePercent =
    total > 0
      ? (available / total) * 100
      : 0;

  const lockedPercent =
    total > 0
      ? (locked / total) * 100
      : 0;

  if (loading) {
    return (
      <section className="mt-7">
        <div className="mb-3">
          <h2 className="text-[15px] font-semibold text-white">
            Wallet
          </h2>

          <p className="mt-1 text-[11px] text-[#68717D]">
            Current balance allocation
          </p>
        </div>

        <div className="h-64 animate-pulse rounded-2xl border border-[#1A1E24] bg-[#0D1014]" />
      </section>
    );
  }

  return (
    <section className="mt-7">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-white">
            Wallet
          </h2>

          <p className="mt-1 text-[11px] text-[#68717D]">
            Current balance allocation
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/wallet")}
          className="
            flex
            items-center
            gap-1
            text-[11px]
            font-medium
            text-[#7C8796]
            transition
            hover:text-white
          "
        >
          Open wallet
          <ChevronRight size={13} />
        </button>
      </div>

      <div className="rounded-2xl border border-[#1A1E24] bg-[#0D1014] p-4">

        {/* Total */}

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1A1E24] bg-[#11151A]">
            <Wallet
              size={17}
              className="text-[#4D8DFF]"
            />
          </div>

          <div>
            <p className="text-[10px] text-[#68717D]">
              Total wallet balance
            </p>

            <p className="mt-1 text-[18px] font-semibold text-white">
              {formatMoney(total)}
            </p>
          </div>
        </div>

        {/* Progress */}

        <div className="mt-5">
          <div className="flex h-2 overflow-hidden rounded-full bg-[#171C22]">
            {availablePercent > 0 && (
              <div
                className="h-full bg-[#08B77A] transition-all duration-500"
                style={{
                  width: `${availablePercent}%`,
                }}
              />
            )}

            {lockedPercent > 0 && (
              <div
                className="h-full bg-[#F6465D] transition-all duration-500"
                style={{
                  width: `${lockedPercent}%`,
                }}
              />
            )}
          </div>
        </div>

        {/* Stats */}

        <div className="mt-5 grid grid-cols-2 gap-3">

          {/* Available */}

          <div className="rounded-xl border border-[#1A1E24] bg-[#101419] p-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#08B77A]" />

              <span className="text-[10px] text-[#68717D]">
                Available
              </span>
            </div>

            <p className="mt-2 text-[14px] font-semibold text-white">
              {formatMoney(available)}
            </p>

            <p className="mt-1 text-[9px] text-[#59616D]">
              {availablePercent.toFixed(0)}%
              {" "}of wallet
            </p>
          </div>

          {/* Locked */}

          <div className="rounded-xl border border-[#1A1E24] bg-[#101419] p-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#F6465D]" />

              <span className="text-[10px] text-[#68717D]">
                Locked
              </span>
            </div>

            <p className="mt-2 text-[14px] font-semibold text-white">
              {formatMoney(locked)}
            </p>

            <div className="mt-1 flex items-center gap-1 text-[9px] text-[#59616D]">
              {locked > 0 && (
                <LockKeyhole size={9} />
              )}

              <span>
                {locked > 0
                  ? "Funds locked"
                  : "No funds locked"}
              </span>
            </div>
          </div>
        </div>

        {/* Locked notice */}

        {locked > 0 && (
          <div className="mt-3 rounded-xl border border-[#F6465D]/15 bg-[#F6465D]/5 px-3 py-2.5">
            <div className="flex items-start gap-2">
              <LockKeyhole
                size={13}
                className="mt-0.5 shrink-0 text-[#F6465D]"
              />

              <p className="text-[10px] leading-4 text-[#8B929C]">
                Part of your wallet balance is
                currently locked.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}