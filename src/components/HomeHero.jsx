import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomeHero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#05070A]">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#246BFF]/10 blur-[120px]" />

      <div className="mx-auto w-full max-w-[1400px] px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8 lg:pb-24 lg:pt-20">

        {/* ================================================== */}
        {/* HERO COPY */}
        {/* ================================================== */}

        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#1A2432] bg-[#0A0E14] px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#08B77A]" />

            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#7C8796]">
              CryptoMintX
            </span>
          </div>

          <h1 className="text-[42px] font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
            Trade crypto.
            <br />
            <span className="text-[#6D9DFF]">
              Your way.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-[480px] text-sm leading-6 text-[#747E8D] sm:text-base">
            A simple interface for trading, managing and
            moving your digital assets.
          </p>

          {/* CTA */}

          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:justify-center">

            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="
                flex
                h-12
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-white
                px-6
                text-sm
                font-semibold
                text-black
                transition
                hover:bg-[#E8ECF2]
                active:scale-[0.98]
              "
            >
              Get started
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              onClick={() => navigate("/markets")}
              className="
                flex
                h-12
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#1C232D]
                bg-[#0B0F14]
                px-6
                text-sm
                font-medium
                text-white
                transition
                hover:border-[#303945]
                active:scale-[0.98]
              "
            >
              Explore markets
            </button>

          </div>
        </div>

        {/* ================================================== */}
        {/* TRADEFLOW VIDEO */}
        {/* ================================================== */}

        <div className="relative mx-auto mt-10 max-w-[1100px] sm:mt-14">

          {/* glow */}
          <div className="pointer-events-none absolute inset-x-[15%] bottom-[-15%] h-[40%] rounded-full bg-[#246BFF]/10 blur-[80px]" />

          <div
            className="
              relative
              overflow-hidden
              rounded-[20px]
              border
              border-[#1B222C]
              bg-[#080B10]
              shadow-[0_30px_100px_rgba(0,0,0,0.45)]
              sm:rounded-[28px]
            "
          >

            {/* Video */}
            <video
              className="
                block
                h-auto
                w-full
                object-cover
              "
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source
                src="/tradeflow.webm"
                type="video/webm"
              />
            </video>

            {/* subtle overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070A]/20 via-transparent to-transparent" />

          </div>
        </div>

        {/* ================================================== */}
        {/* TRUST POINTS */}
        {/* ================================================== */}

        <div className="mx-auto mt-6 flex max-w-[700px] flex-wrap items-center justify-center gap-x-6 gap-y-3">

          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#6D9DFF]" />
            <span className="text-[10px] text-[#68717D]">
              Security focused
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Zap size={14} className="text-[#6D9DFF]" />
            <span className="text-[10px] text-[#68717D]">
              Fast interface
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#08B77A]" />
            <span className="text-[10px] text-[#68717D]">
              USDT supported
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}