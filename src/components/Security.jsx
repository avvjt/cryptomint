import { Check, Copy, ShieldCheck, Wallet, Zap } from "lucide-react";
import { useState } from "react";

const guardianAddress =
  "0x469AFE803C54A36674C55231489Cf4b61da8c1bC";

export default function Security() {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(guardianAddress);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <section className="bg-[#07090D] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">

      <div className="mx-auto max-w-7xl">

        <div className="max-w-2xl">

          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4D8DFF]">
            Security
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Security comes first.
          </h2>

          <p className="mt-4 text-sm leading-6 text-[#687384] sm:text-base">
            Designed with multiple layers of protection around your
            account and digital assets.
          </p>

        </div>

        <div className="mt-10 grid gap-3 lg:grid-cols-3">

          {/* Guardian */}
          <SecurityCard
            icon={ShieldCheck}
            title="Guardian protection"
            description="A dedicated security layer designed to protect platform assets."
          >
            <button
              type="button"
              onClick={copyAddress}
              className="mt-5 w-full rounded-xl border border-[#17202D] bg-[#070A0E] p-3 text-left transition hover:border-[#263B5C]"
            >
              <div className="flex items-center justify-between gap-3">

                <span className="text-[10px] uppercase tracking-wider text-[#566171]">
                  Guardian wallet
                </span>

                {copied ? (
                  <Check size={14} className="text-[#08B77A]" />
                ) : (
                  <Copy size={14} className="text-[#566171]" />
                )}

              </div>

              <p className="mt-2 break-all font-mono text-[10px] text-[#7D8796]">
                {guardianAddress}
              </p>
            </button>
          </SecurityCard>

          {/* Assets */}
          <SecurityCard
            icon={Wallet}
            title="Asset visibility"
            description="Keep track of balances, deposits and withdrawals from your account."
          />

          {/* Infrastructure */}
          <SecurityCard
            icon={Zap}
            title="Transaction monitoring"
            description="Blockchain activity can be monitored through transaction records."
          />

        </div>

      </div>

    </section>
  );
}

function SecurityCard({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <div className="rounded-2xl border border-[#17202D] bg-[#090D13] p-5 sm:p-6">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#12203A] text-[#4D8DFF]">
        <Icon size={20} />
      </div>

      <h3 className="mt-6 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#687384]">
        {description}
      </p>

      {children}

    </div>
  );
}