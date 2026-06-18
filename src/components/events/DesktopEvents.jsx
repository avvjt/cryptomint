import { ChevronRight } from "lucide-react";

const events = [
  {
    id: 1,
    image: "/events/event-1.webp",
  },
  {
    id: 2,
    image: "/events/event-2.webp",
  },
  {
    id: 3,
    image: "/events/event-3.webp",
  },
];

export default function DesktopEvents() {
  return (
    <section className="relative overflow-hidden bg-black py-24">

      {/* World Map Background */}
      <div
        className="
        absolute
        inset-0
        bg-[url('/world-map.png')]
        bg-center
        bg-no-repeat
        opacity-10
        "
      />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}
        <h2
          className="
          text-center
          text-6xl
          font-bold
          text-white
          drop-shadow-[0_0_25px_rgba(255,255,255,0.9)]
          "
        >
          MEXCmise Your Connections
        </h2>

        {/* Top Link */}
        <div className="mt-10 flex justify-end">
          <button
            className="
            flex
            items-center
            gap-2
            text-zinc-400
            hover:text-white
            transition
            "
          >
            Explore More Events
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Cards */}
        <div className="mt-4 grid grid-cols-3 gap-4">

          {events.map((event) => (
            <div
              key={event.id}
              className="
              overflow-hidden
              rounded-[24px]
              "
            >
              <img
                src={event.image}
                alt=""
                className="
                h-[420px]
                w-full
                object-cover
                transition
                duration-500
                hover:scale-105
                "
              />
            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">

          <button
            className="
            rounded-full
            bg-[#1D66FF]
            px-10
            py-4
            text-lg
            font-medium
            text-white
            transition
            hover:bg-blue-700
            "
          >
            Explore Now
          </button>

        </div>

      </div>

    </section>
  );
}