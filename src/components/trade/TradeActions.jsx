import React, { useEffect, useState } from "react";

export default function TradeActions({
  balance = 0,
  canAutoTrade = false,
  lockedUntil = null,
  cooldownUntil = null,
  processing = false,

  onTrade,
  onAutoTrade,

  packageName,
  dailyReturn,
}) {
  const [now, setNow] = useState(Date.now());

  // --------------------------------------------------
  // Live countdown
  // --------------------------------------------------
  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  // --------------------------------------------------
  // Processing state
  // --------------------------------------------------
  const processingTime = lockedUntil
    ? new Date(lockedUntil).getTime() - now
    : 0;

  const isProcessing = processingTime > 0;

  // --------------------------------------------------
  // 24h cooldown
  // --------------------------------------------------
  const cooldownTime = cooldownUntil
    ? new Date(cooldownUntil).getTime() - now
    : 0;

  const isCooldown = cooldownTime > 0;

  // --------------------------------------------------
  // Format countdown
  // --------------------------------------------------
  const formatTime = (milliseconds) => {
    if (!milliseconds || milliseconds <= 0) {
      return "00:00:00";
    }

    const totalSeconds = Math.ceil(
      milliseconds / 1000
    );

    const hours = Math.floor(
      totalSeconds / 3600
    );

    const minutes = Math.floor(
      (totalSeconds % 3600) / 60
    );

    const seconds =
      totalSeconds % 60;

    return [
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0"),
    ].join(":");
  };

  const processingLabel =
    formatTime(processingTime);

  const cooldownLabel =
    formatTime(cooldownTime);

  // --------------------------------------------------
  // Balance
  // --------------------------------------------------
  const numericBalance =
    Number(balance || 0);

  // --------------------------------------------------
  // Auto Trade button state
  // --------------------------------------------------
  const autoTradeDisabled =
    processing ||
    isProcessing ||
    isCooldown ||
    !canAutoTrade ||
    numericBalance <= 0;

  let autoTradeLabel = "Auto Trade";

  if (processing) {
    autoTradeLabel = "Initializing...";
  } else if (isProcessing) {
    autoTradeLabel =
      `Processing ${processingLabel}`;
  } else if (isCooldown) {
    autoTradeLabel =
      `Used · ${cooldownLabel}`;
  } else if (numericBalance <= 0) {
    autoTradeLabel = "No Balance";
  } else if (!canAutoTrade) {
    autoTradeLabel = "Used Today";
  }

  // --------------------------------------------------
  // Trade button
  //
  // IMPORTANT:
  // It stays clickable so we can explain why it
  // is locked. It is NOT disabled.
  // --------------------------------------------------
  const handleLockedTrade = () => {
    if (typeof onTrade === "function") {
      onTrade();
    }
  };

  return (
    <div className="w-full">

      {/* =================================================
          WALLET
      ================================================= */}
      <div
        className="
          mb-3
          rounded-xl
          border
          border-[#1A1E24]
          bg-[#0F1216]
          p-4
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-3
          "
        >
          <div>
            <p
              className="
                text-[11px]
                uppercase
                tracking-[0.12em]
                text-[#68717D]
              "
            >
              Available Balance
            </p>

            <div
              className="
                mt-1
                flex
                items-baseline
                gap-1.5
              "
            >
              <span
                className="
                  text-2xl
                  font-semibold
                  tracking-tight
                  text-white
                "
              >
                {numericBalance.toFixed(2)}
              </span>

              <span
                className="
                  text-sm
                  text-[#68717D]
                "
              >
                USDT
              </span>
            </div>
          </div>

          {/* Processing indicator */}
          {isProcessing && (
            <div
              className="
                rounded-lg
                border
                border-[#2A3038]
                bg-[#14181D]
                px-3
                py-2
                text-right
              "
            >
              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-wider
                  text-[#68717D]
                "
              >
                Processing
              </p>

              <p
                className="
                  mt-0.5
                  text-sm
                  font-medium
                  tabular-nums
                  text-white
                "
              >
                {processingLabel}
              </p>
            </div>
          )}

          {/* Cooldown indicator */}
          {!isProcessing &&
            isCooldown && (
              <div
                className="
                  rounded-lg
                  border
                  border-[#2A3038]
                  bg-[#14181D]
                  px-3
                  py-2
                  text-right
                "
              >
                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-wider
                    text-[#68717D]
                  "
                >
                  Next Auto Trade
                </p>

                <p
                  className="
                    mt-0.5
                    text-sm
                    font-medium
                    tabular-nums
                    text-white
                  "
                >
                  {cooldownLabel}
                </p>
              </div>
            )}
        </div>
      </div>

      {/* =================================================
          ACTIONS
      ================================================= */}
      <div
        className="
          grid
          grid-cols-2
          gap-2
        "
      >

        {/* =================================================
            TRADE — ALWAYS LOCKED
        ================================================= */}
        <button
          type="button"
          onClick={handleLockedTrade}
          className="
            relative
            flex
            min-h-[52px]
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-[#292E35]
            bg-[#111419]
            px-4
            text-sm
            font-semibold
            text-[#777F89]
            transition-all
            duration-200
            hover:border-[#353C45]
            hover:bg-[#15191E]
            hover:text-[#A0A7B0]
            active:scale-[0.98]
          "
        >
          {/* Lock icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect
              x="3"
              y="11"
              width="18"
              height="10"
              rx="2"
            />

            <path
              d="M7 11V7a5 5 0 0 1 10 0v4"
            />
          </svg>

          <span>
            Trade
          </span>
        </button>

        {/* =================================================
            AUTO TRADE
        ================================================= */}
        <button
          type="button"
          disabled={autoTradeDisabled}
          onClick={onAutoTrade}
          className={`
            relative
            flex
            min-h-[52px]
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            px-4
            text-sm
            font-semibold
            transition-all
            duration-200

            ${
              autoTradeDisabled
                ? `
                  cursor-not-allowed
                  border-[#252A31]
                  bg-[#111419]
                  text-[#656D77]
                `
                : `
                  border-white
                  bg-white
                  text-black
                  hover:bg-[#E7E9EB]
                  active:scale-[0.98]
                `
            }
          `}
        >
          {/* Auto Trade icon */}
          {isProcessing ? (
            <span
              className="
                h-4
                w-4
                animate-spin
                rounded-full
                border-2
                border-[#555D67]
                border-t-white
              "
            />
          ) : isCooldown ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
              />

              <path d="M12 7v5l3 2" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 0 1 15.5-6.2" />
              <path d="M21 12a9 9 0 0 1-15.5 6.2" />
              <path d="M18 3v4h-4" />
              <path d="M6 21v-4h4" />
            </svg>
          )}

          <span>
            {autoTradeLabel}
          </span>
        </button>

      </div>

      {/* =================================================
          AUTO TRADE INFORMATION
      ================================================= */}
      <div
        className="
          mt-3
          text-center
        "
      >
        {isProcessing ? (
          <p
            className="
              text-[11px]
              leading-5
              text-[#68717D]
            "
          >
            Your wallet is temporarily locked.
            <br />
            Auto Trade will finish automatically.
          </p>
        ) : isCooldown ? (
          <p
            className="
              text-[11px]
              leading-5
              text-[#68717D]
            "
          >
            Auto Trade has been used for today.
            <br />
            You can use it again when the timer ends.
          </p>
        ) : (
          <p
            className="
              text-[11px]
              leading-5
              text-[#68717D]
            "
          >
            Use Auto Trade once every 24 hours
            <br />
            to receive your daily earning.
          </p>
        )}
      </div>

    </div>
  );
}