import { useState } from "react";

import useMarketData from "./useMarketData";
import MarketGrid from "./MarketGrid";

export default function ZeroFeeSection() {
  const [activeTab, setActiveTab] =
    useState("futures");

   const coins = useMarketData();


  return (
    <section className="bg-black py-24">

      <div className="max-w-7xl mx-auto px-6">

        <h2
          className="
          text-center
          text-6xl
          font-bold
          text-white
          drop-shadow-[0_0_20px_rgba(255,255,255,.8)]
          "
        >
          500+ Pairs with 0 Fees
        </h2>

        <div
          className="
          mt-16
          grid
          lg:grid-cols-[280px_1fr]
          gap-10
          "
        >

          {/* LEFT */}

          <div className="space-y-20">

            <div>
              <p className="text-zinc-400">
                Fees Saved by Users
              </p>

              <h3
                className="
                text-5xl
                text-white
                mt-3
                "
              >
                3.8M+ USDT
              </h3>
            </div>

            <div>
              <p className="text-zinc-400">
                Est. Savings
              </p>

              <h3
                className="
                text-5xl
                text-white
                mt-3
                "
              >
                100 USDT
              </h3>
            </div>

            <div>
              <p className="text-zinc-400">
                Pairs with 0 Fees
              </p>

              <h3
                className="
                text-5xl
                text-white
                mt-3
                "
              >
                90+
              </h3>
            </div>

          </div>

          {/* RIGHT */}

          <div
            className="
            rounded-[32px]
            border
            border-[#12203a]
            bg-[#030813]
            overflow-hidden
            "
          >
            <div
              className="
              flex
              items-center
              justify-between
              px-8
              py-6
              border-b
              border-[#12203a]
              "
            >
              <div className="flex gap-6">

                <button
                  onClick={() =>
                    setActiveTab(
                      "futures"
                    )
                  }
                  className={`${
                    activeTab ===
                    "futures"
                      ? "text-white"
                      : "text-zinc-500"
                  }`}
                >
                  Futures
                </button>

                <button
                  onClick={() =>
                    setActiveTab(
                      "spot"
                    )
                  }
                  className={`${
                    activeTab ===
                    "spot"
                      ? "text-white"
                      : "text-zinc-500"
                  }`}
                >
                  Spot
                </button>

              </div>

              <button className="text-zinc-500">
                More →
              </button>
            </div>

            <MarketGrid coins={coins} />
          </div>

        </div>

        <div className="mt-12 flex justify-center">

          <button
            className="
            rounded-full
            bg-[#1D66FF]
            px-10
            py-4
            text-white
            "
          >
            Trade with 0 Fees
          </button>

        </div>

      </div>

    </section>
  );
}