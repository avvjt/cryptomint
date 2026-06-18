import { ChevronRight } from "lucide-react";

const items = [
  {
    title: "$100M Guardian Fund",
    desc: "Full and instant coverage for platform issues",
    image: "/shield.webp",
  },
  {
    title: "Reserves Backed 1:1 and Beyond",
    desc: "Verified in real time and accessible at all times",
    image: "/coin.webp",
  },
  {
    title: "Futures Insurance Fund",
    desc: "Protection against market extremes",
    image: "/lock.webp",
  },
];

export default function MobileSecurity() {
  return (
    <section className="bg-black px-4 py-6">

      <div
        className="
        overflow-hidden
        rounded-[28px]
        border border-[#101B35]
        bg-[#030813]
        "
      >

        <h2
          className="
          px-8
          pt-8
          text-center
          text-3xl
          font-semibold
          text-white
          "
        >
          Three Major Measures to Safeguard
          Asset Security
        </h2>

        {items.map((item, index) => (
          <div key={item.title}>

            <div className="px-8 py-10 text-center">

              <img
                src={item.image}
                alt=""
                className="
                mx-auto
                mb-8
                w-28
                "
              />

              <div
                className="
                flex
                items-center
                justify-center
                gap-2
                "
              >
                <h3 className="text-2xl font-semibold text-white">
                  {item.title}
                </h3>

                <ChevronRight
                  size={20}
                  className="text-zinc-500"
                />
              </div>

              <p className="mt-4 text-zinc-400">
                {item.desc}
              </p>

            </div>

            {index !== items.length - 1 && (
              <div className="mx-8 border-b border-[#162440]" />
            )}

          </div>
        ))}

      </div>
    </section>
  );
}