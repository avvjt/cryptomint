import { ArrowDownToLine, UserPlus, WalletCards } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Create your account",
      text: "Sign up and set up your CryptoMintX account in a few simple steps.",
    },
    {
      number: "02",
      icon: WalletCards,
      title: "Fund your wallet",
      text: "Deposit supported assets and monitor your balance from your dashboard.",
    },
    {
      number: "03",
      icon: ArrowDownToLine,
      title: "Manage your assets",
      text: "Trade, withdraw and track your activity from one place.",
    },
  ];

  return (
    <section className="bg-[#05070A] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">

      <div className="mx-auto max-w-7xl">

        <div className="text-center">

          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4D8DFF]">
            Getting started
          </span>

          <h2 className="mt-3 text-3xl font-bold text-white sm:text-5xl">
            Start in three steps
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#687384] sm:text-base">
            Everything is designed to keep getting started simple.
          </p>

        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-3">

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-2xl border border-[#17202D] bg-[#090D13] p-6"
              >

                <div className="flex items-center justify-between">

                  <span className="text-xs font-semibold text-[#394454]">
                    {step.number}
                  </span>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#12203A] text-[#4D8DFF]">
                    <Icon size={18} />
                  </div>

                </div>

                <h3 className="mt-8 text-lg font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#687384]">
                  {step.text}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}