import { ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  Pagination,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

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

export default function MobileEvents() {
  return (
    <section className="bg-black px-4 py-10">

      {/* Title */}
      <h2
        className="
        text-center
        text-3xl
        font-bold
        text-white
        "
      >
        MEXCmise Your
        <br />
        Connections
      </h2>

      {/* Slider */}
      <div className="mt-8">

        <Swiper
  modules={[Pagination, Autoplay]}
  slidesPerView={1.15}
  centeredSlides
  spaceBetween={16}
  pagination={{ clickable: true }}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  className="pb-12"
>
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <div
                className="
                overflow-hidden
                rounded-[28px]
                "
              >
                <img
  src={event.image}
  alt={`Event ${event.id}`}
  loading="lazy"
  className="h-95 w-full object-cover"
/>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

      {/* More Events */}
      <button
        className="
        mx-auto
        mt-6
        flex
        items-center
        gap-2
        text-zinc-400
        "
      >
        Explore More Events
        <ChevronRight size={18} />
      </button>

      {/* CTA */}
      <div className="mt-8 flex justify-center">

        <button
          className="
          rounded-full
          bg-[#1D66FF]
          px-8
          py-3
          font-medium
          text-white
          transition
          hover:bg-[#3478ff]
          "
        >
          Explore Now
        </button>

      </div>

    </section>
  );
}
