import {
  Bot,
  CheckCircle2,
  Loader2,
  X,
  Zap,
} from "lucide-react";

export default function TradeModal({
  mode,
  symbol,
  onClose,
}) {
  if (!mode) {
    return null;
  }

  const isAuto =
    mode === "auto";

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]

        flex
        items-center
        justify-center

        bg-black/70

        px-4

        backdrop-blur-md
      "
    >

      <div
        className="
          relative
          w-full
          max-w-[420px]

          overflow-hidden

          rounded-[28px]

          border
          border-[#252B35]

          bg-[#101318]

          shadow-2xl
        "
      >

        {/* Close */}

        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            right-4
            top-4
            z-10

            flex
            h-8
            w-8

            items-center
            justify-center

            rounded-full

            bg-[#181D24]

            text-[#69727E]

            transition

            hover:text-white
          "
        >
          <X size={16} />
        </button>


        {/* Content */}

        <div className="px-6 pb-7 pt-8">

          {/* Icon */}

          <div
            className={`
              mx-auto
              flex
              h-16
              w-16

              items-center
              justify-center

              rounded-2xl

              ${
                isAuto
                  ? "bg-[#1D66FF]/10"
                  : "bg-[#08B77A]/10"
              }
            `}
          >

            {isAuto ? (
              <Bot
                size={29}
                className="text-[#4D8DFF]"
              />
            ) : (
              <Zap
                size={29}
                className="text-[#08B77A]"
              />
            )}

          </div>


          <div className="mt-6 text-center">

            <h2
              className="
                text-xl
                font-semibold
                text-white
              "
            >
              {isAuto
                ? "Initializing Auto Trade"
                : "Trade Request"}
            </h2>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-[#68717D]
              "
            >
              {isAuto
                ? `Preparing automated trade for ${symbol}.`
                : `Preparing your ${symbol} trade.`}
            </p>

          </div>


          {/* Loader */}

          <div
            className="
              mt-7

              rounded-2xl

              border
              border-[#1D66FF]/10

              bg-[#0B0E11]

              p-5
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <Loader2
                size={20}
                className="
                  animate-spin
                  text-[#4D8DFF]
                "
              />

              <div>

                <p
                  className="
                    text-sm
                    font-medium
                    text-white
                  "
                >
                  Trade is initializing...
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-[#68717D]
                  "
                >
                  Please wait while we process
                  the request.
                </p>

              </div>

            </div>

          </div>


          {isAuto && (
            <div
              className="
                mt-4

                flex
                gap-3

                rounded-2xl

                bg-[#161B22]

                p-4
              "
            >

              <CheckCircle2
                size={18}
                className="
                  mt-0.5
                  shrink-0
                  text-[#08B77A]
                "
              />

              <p
                className="
                  text-xs
                  leading-5
                  text-[#8A939F]
                "
              >
                Auto Trade can be activated
                once per day. Your configured
                package return is calculated
                from the original base amount,
                without compounding.
              </p>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}