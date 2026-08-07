import {
  BadgeCheck,
  ChevronRight,
} from "lucide-react";

import { useState } from "react";

export default function NetworkSelector() {

  const [selected, setSelected] =
    useState("TRC20");

  const networks = [

    {
      id: "TRC20",
      name: "TRON",
      fee: "~1 USDT",
      speed: "Fast",
      color: "#FF4D67",
    },

    {
      id: "BEP20",
      name: "BNB Smart Chain",
      fee: "~0.3 USDT",
      speed: "Very Fast",
      color: "#F3BA2F",
    },

    {
      id: "ERC20",
      name: "Ethereum",
      fee: "~8 USDT",
      speed: "Medium",
      color: "#627EEA",
    },

  ];

  return (

    <section
      className="
      rounded-[32px]

      border
      border-white/5

      bg-gradient-to-br
      from-[#111318]
      to-[#0D1119]

      p-6
      "
    >

      <p
        className="
        uppercase

        tracking-[.25em]

        text-xs

        text-zinc-500
        "
      >

        Select Network

      </p>

      <h2
        className="
        mt-2

        text-2xl

        font-bold
        "
      >

        Choose Deposit Network

      </h2>

      <div
        className="
        mt-8

        grid

        gap-5

        lg:grid-cols-3
        "
      >

        {networks.map((network) => {

          const active =
            selected === network.id;

          return (

            <button

              key={network.id}

              onClick={() =>
                setSelected(network.id)
              }

              className={`
              relative

              overflow-hidden

              rounded-3xl

              border

              p-6

              text-left

              transition-all
              duration-300

              ${
                active
                  ? "border-[#1D66FF] bg-[#171B22]"
                  : "border-white/5 bg-[#13161D]"
              }

              hover:-translate-y-1

              hover:border-[#1D66FF]/40
              hover:shadow-[0_20px_50px_rgba(29,102,255,.15)]
              `}
            >

              {active && (

                <div
                  className="
                  absolute

                  right-4
                  top-4
                  "
                >

                  <BadgeCheck
                    size={22}
                    className="text-[#1D66FF]"
                  />

                </div>

              )}

              <div
                className="h-3 w-3 rounded-full"
                style={{
                  background: network.color,
                }}
              />

              <h3
                className="
                mt-6

                text-2xl

                font-bold
                "
              >

                {network.id}

              </h3>

              <p
                className="
                mt-2

                text-zinc-500
                "
              >

                {network.name}

              </p>

              <div
                className="
                mt-8

                flex

                items-center

                justify-between
                "
              >

                <div>

                  <p className="text-xs text-zinc-500">

                    Fee

                  </p>

                  <p className="mt-1 font-medium">

                    {network.fee}

                  </p>

                </div>

                <div>

                  <p className="text-xs text-zinc-500">

                    Speed

                  </p>

                  <p className="mt-1 font-medium">

                    {network.speed}

                  </p>

                </div>

                <ChevronRight
                  size={20}
                  className="text-zinc-500"
                />

              </div>

            </button>

          );

        })}

      </div>

    </section>

  );

}