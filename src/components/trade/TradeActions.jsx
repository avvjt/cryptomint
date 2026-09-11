import {
  ArrowUpRight,
  Bot,
  Wallet,
  Clock3,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function TradeActions({
  balance = 0,
  canAutoTrade = true,
  lockedUntil = null,
  processing = false,
  onTrade,
  onAutoTrade,
  packageName = null,
  dailyReturn = null,
}) {
  const isLocked =
    lockedUntil &&
    Number(lockedUntil) > Date.now();

  const availableBalance = isLocked
    ? 0
    : Number(balance || 0);

  const formattedBalance =
    availableBalance.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const autoTradeDisabled =
    !canAutoTrade ||
    processing ||
    isLocked ||
    availableBalance <= 0;

  return (
    <section
      className="
        w-full

        rounded-[18px]

        border
        border-[#20262E]

        bg-[#0D1117]

        p-2.5

        shadow-[0_12px_40px_rgba(0,0,0,0.35)]
      "
    >

      {/* =====================================================
          WALLET
      ===================================================== */}

      <div
        className="
          relative
          overflow-hidden

          rounded-[15px]

          border
          border-[#20262E]

          bg-gradient-to-br
          from-[#171C23]
          via-[#141920]
          to-[#10151B]

          px-3.5
          py-3
        "
      >

        {/* subtle glow */}

        <div
          className="
            pointer-events-none

            absolute
            -right-8
            -top-10

            h-24
            w-24

            rounded-full

            bg-[#1D66FF]/10

            blur-2xl
          "
        />

        <div
          className="
            relative

            flex
            items-center
            justify-between

            gap-3
          "
        >

          {/* Left */}

          <div
            className="
              flex
              min-w-0
              items-center
              gap-2.5
            "
          >

            <div
              className="
                flex
                h-9
                w-9
                shrink-0

                items-center
                justify-center

                rounded-xl

                border
                border-[#315EA8]/30

                bg-[#1D66FF]/10
              "
            >
              <Wallet
                size={17}
                className="text-[#6EA2FF]"
              />
            </div>

            <div className="min-w-0">

              <div className="flex items-center gap-2">

                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.13em]
                    text-[#69727E]
                  "
                >
                  Wallet Balance
                </p>

                <ShieldCheck
                  size={11}
                  className="text-[#00C076]"
                />

              </div>

              <p
                className="
                  mt-0.5
                  truncate

                  text-[15px]
                  font-semibold
                  tracking-tight
                  text-white
                "
              >
                {formattedBalance}

                <span
                  className="
                    ml-1

                    text-[10px]
                    font-medium
                    text-[#69727E]
                  "
                >
                  USDT
                </span>
              </p>

            </div>

          </div>


          {/* Right status */}

          {isLocked ? (

            <div
              className="
                flex
                shrink-0
                items-center
                gap-1.5

                rounded-full

                border
                border-[#F6465D]/20

                bg-[#F6465D]/10

                px-2.5
                py-1.5

                text-[9px]
                font-semibold
                text-[#FF7182]
              "
            >
              <Clock3 size={11} />

              Processing
            </div>

          ) : packageName ? (

            <div className="text-right">

              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-wider
                  text-[#68717D]
                "
              >
                {packageName}
              </p>

              {dailyReturn !== null && (
                <p
                  className="
                    mt-0.5

                    text-[11px]
                    font-semibold
                    text-[#00C076]
                  "
                >
                  {(Number(dailyReturn) * 100).toFixed(2)}%
                  <span className="ml-1 text-[#68717D]">
                    daily
                  </span>
                </p>
              )}

            </div>

          ) : (

            <div
              className="
                flex
                items-center
                gap-1

                text-[9px]
                text-[#68717D]
              "
            >
              <Sparkles size={11} />

              Ready
            </div>

          )}

        </div>

      </div>


      {/* =====================================================
          ACTION BUTTONS
      ===================================================== */}

      <div
        className="
          mt-2.5

          grid
          grid-cols-2

          gap-2
        "
      >

        {/* ===================================================
            TRADE
        =================================================== */}

        <button
          type="button"
          onClick={onTrade}
          disabled={availableBalance <= 0 || processing}
          className="
            group
            relative
            overflow-hidden

            flex
            h-[52px]

            items-center
            justify-center
            gap-2

            rounded-[15px]

            bg-gradient-to-b
            from-[#18CD91]
            to-[#00AD76]

            text-[14px]
            font-semibold
            text-white

            shadow-[0_6px_20px_rgba(0,192,118,0.18)]

            transition-all
            duration-200

            hover:-translate-y-[1px]
            hover:shadow-[0_10px_28px_rgba(0,192,118,0.28)]

            active:scale-[0.985]

            disabled:cursor-not-allowed
            disabled:opacity-35
            disabled:hover:translate-y-0
          "
        >

          {/* shine */}

          <span
            className="
              pointer-events-none

              absolute
              inset-x-0
              top-0

              h-1/2

              bg-gradient-to-b
              from-white/[0.12]
              to-transparent
            "
          />

          <span
            className="
              relative

              flex
              h-7
              w-7

              items-center
              justify-center

              rounded-lg

              bg-white/10
            "
          >
            <ArrowUpRight
              size={17}
              strokeWidth={2.4}
              className="
                transition-transform
                duration-200

                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </span>

          <span className="relative">
            Trade
          </span>

        </button>


        {/* ===================================================
            AUTO TRADE
        =================================================== */}

        <button
          type="button"
          onClick={onAutoTrade}
          disabled={autoTradeDisabled}
          className="
            group
            relative
            overflow-hidden

            flex
            h-[52px]

            items-center
            justify-center
            gap-2

            rounded-[15px]

            bg-gradient-to-b
            from-[#FF6075]
            to-[#E63E56]

            text-[14px]
            font-semibold
            text-white

            shadow-[0_6px_20px_rgba(246,70,93,0.18)]

            transition-all
            duration-200

            hover:-translate-y-[1px]
            hover:shadow-[0_10px_28px_rgba(246,70,93,0.28)]

            active:scale-[0.985]

            disabled:cursor-not-allowed
            disabled:opacity-35
            disabled:hover:translate-y-0
          "
        >

          {/* shine */}

          <span
            className="
              pointer-events-none

              absolute
              inset-x-0
              top-0

              h-1/2

              bg-gradient-to-b
              from-white/[0.12]
              to-transparent
            "
          />

          <span
            className="
              relative

              flex
              h-7
              w-7

              items-center
              justify-center

              rounded-lg

              bg-white/10
            "
          >

            <Bot
              size={17}
              strokeWidth={2.2}
              className="
                transition-transform
                duration-200

                group-hover:scale-110
              "
            />

          </span>

          <span className="relative">

            {processing
              ? "Initializing..."
              : canAutoTrade
                ? "Auto Trade"
                : "Used Today"}

          </span>

        </button>

      </div>

    </section>
  );
}