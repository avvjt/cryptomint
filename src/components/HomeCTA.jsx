import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomeCTA() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#05070A] px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28">

      {/* Huge background word */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          whitespace-nowrap
          text-[30vw]
          font-black
          leading-none
          tracking-[-0.09em]
          text-white/[0.018]
          select-none
        "
      >
        TRADE
      </div>

      {/* glow */}
      <div className="pointer-events-none absolute left-1/2 top-[30%] h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[#246BFF]/[0.06] blur-[120px]" />

      <div className="relative mx-auto max-w-[850px] text-center">

        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#596473]">
          CRYPTOMINTX
        </p>

        <h2 className="mt-5 text-[42px] font-semibold leading-[0.95] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
          Ready when
          <br />
          <span className="text-[#596473]">
            you are.
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-[430px] text-sm leading-6 text-[#68717D]">
          Create your account and explore the CryptoMintX
          platform.
        </p>

        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="
            group
            mx-auto
            mt-8
            flex
            h-12
            items-center
            gap-3
            rounded-full
            bg-white
            px-6
            text-sm
            font-semibold
            text-black
            transition-all
            duration-300
            hover:gap-4
            hover:bg-[#E9EDF3]
            active:scale-[0.98]
          "
        >
          Get started

          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
            <ArrowRight size={14} />
          </span>
        </button>

      </div>

    </section>
  );
}