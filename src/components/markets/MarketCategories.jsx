import { useState } from "react";

const categories = [

  "Favorites",

  "Spot",

  "Futures",

  "AI",

  "Meme",

  "DeFi",

  "Layer 1",

  "Layer 2",

  "RWA",

  "Gaming",

  "New",

];

export default function MarketCategories() {

  const [active, setActive] =
    useState("Spot");

  return (

    <section>

      <div
        className="
        flex

        gap-3

        overflow-x-auto

        pb-2

        scrollbar-hide
        "
      >

        {

          categories.map((item)=>(

            <button

              key={item}

              onClick={()=>
                setActive(item)
              }

              className={`
              whitespace-nowrap

              rounded-full

              border

              px-5

              py-2.5

              text-sm

              font-medium

              transition-all

              duration-300

              ${
                active===item

                ? "border-[#1D66FF] bg-[#1D66FF] text-white shadow-[0_10px_30px_rgba(29,102,255,.35)]"

                : "border-white/5 bg-[#171B22] text-zinc-400 hover:border-[#1D66FF]/30 hover:text-white"
              }
              `}

            >

              {item}

            </button>

          ))

        }

      </div>

    </section>

  );

}