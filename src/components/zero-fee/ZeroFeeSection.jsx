import { useState } from "react";
import useMarketData from "./useMarketData";
import MarketGrid from "./MarketGrid";

export default function ZeroFeeSection() {
  const [activeTab, setActiveTab] = useState("futures");
  const coins = useMarketData();

  return (
    <section className="bg-[#05070A] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="max-w-2xl">

          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4D8DFF]">
            Markets
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Trade more.
            <br />
            <span className="text-[#657080]">
              Pay less.
            </span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-[#717B8A] sm:text-base">
            Explore available markets and monitor live prices from one
            simple interface.
          </p>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-[#1A2029] bg-[#0A0E13]">

  <Stat
    value="3.8M+"
    label="Fees saved"
    suffix="USDT"
  />

  <Stat
    value="100"
    label="Est. savings"
    suffix="USDT"
  />

  <Stat
    value="500+"
    label="Available"
  />

</div>

        {/* Market table */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#17202D] bg-[#090D13]">

          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-[#17202D] px-4 py-3 sm:px-5">

            <div className="flex gap-1 rounded-lg bg-[#0D1219] p-1">

              {["futures", "spot"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-md px-4 py-2 text-xs font-medium capitalize transition ${
                    activeTab === tab
                      ? "bg-[#1A2535] text-white"
                      : "text-[#606B7A] hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}

            </div>

            <button className="hidden text-xs text-[#657080] transition hover:text-white sm:block">
              View all →
            </button>

          </div>

          {/* Existing market component */}
          <div className="overflow-x-auto">
            <MarketGrid coins={coins} />
          </div>

        </div>

        {/* CTA */}
        <div className="mt-7 flex justify-center">

          <a
            href="/trade"
            className="flex h-12 items-center justify-center rounded-xl bg-[#1D66FF] px-7 text-sm font-semibold text-white transition hover:bg-[#326BC7]"
          >
            Start trading
          </a>

        </div>

      </div>

    </section>
  );
}

function Stat({ value, label, suffix }) {
  return (
    <div className="min-w-0 px-3 py-4 sm:px-5 sm:py-5">
      <p className="truncate text-[17px] font-semibold tracking-[-0.03em] text-white sm:text-xl">
        {value}
        {suffix && (
          <span className="ml-1 text-[8px] font-medium tracking-normal text-[#59616D] sm:text-[9px]">
            {suffix}
          </span>
        )}
      </p>

      <p className="mt-1 truncate text-[8px] uppercase tracking-[0.1em] text-[#59616D] sm:text-[9px]">
        {label}
      </p>
    </div>
  );
}