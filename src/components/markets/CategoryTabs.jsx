import { useState } from "react";

const tabs = [
  "Favorites",
  "Crypto",
  "AI",
  "Meme",
  "Gaming",
  "DeFi",
];

export default function CategoryTabs() {

  const [active, setActive] = useState("Crypto");

  return (

    <div
      className="
      flex
      items-center
      gap-8

      overflow-x-auto

      whitespace-nowrap
      scrollbar-hide
      "
    >

      {tabs.map((tab) => (

        <button
          key={tab}
          onClick={() => setActive(tab)}
          className="
          relative
          pb-3
          text-xl
          font-semibold
          transition-all
          duration-200
          "
        >

          <span
            className={
              active === tab
                ? "text-white"
                : "text-zinc-500 hover:text-white"
            }
          >
            {tab}
          </span>

          {active === tab && (

            <div
              className="
              absolute
              bottom-0
              left-0
              h-[3px]
              w-full
              rounded-full
              bg-white
              "
            />

          )}

        </button>

      ))}

    </div>

  );

}