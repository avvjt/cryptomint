import {
  ArrowRight,
  Gift,
} from "lucide-react";

export default function PromotionBanner() {

  return (

    <section
      className="
      relative

      overflow-hidden

      rounded-4xl

      bg-linear-to-r

      from-[#1D66FF]

      via-[#296DFF]

      to-[#4E8EFF]

      p-6

      lg:p-8
      "
    >

      {/* Glow */}

      <div
        className="
        absolute

        -right-20
        -top-20

        h-64
        w-64

        rounded-full

        bg-white/10

        blur-3xl
        "
      />

      <div className="relative">

        <div
          className="
          flex

          items-center

          gap-3
          "
        >

          <Gift
            size={30}
            className="text-white"
          />

          <h2
            className="
            text-2xl

            font-bold
            "
          >

            Invite Friends

          </h2>

        </div>

        <p
          className="
          mt-4

          max-w-lg

          text-blue-100
          "
        >

          Earn 5% referral bonus every time your invited
          friends make their first investment.

        </p>

        <button
          className="
          mt-8

          flex

          items-center

          gap-2

          rounded-full

          bg-white

          px-6
          py-3

          font-semibold

          text-[#1D66FF]

          transition

          hover:scale-105
          "
        >

          Invite Now

          <ArrowRight size={18}/>

        </button>

      </div>

    </section>

  );

}