import { useEffect, useMemo, useState } from "react";
import {
  Bot,
  CheckCircle2,
  Clock3,
  Sparkles,
  TrendingUp,
  Wallet,
  X,
  Zap,
} from "lucide-react";

import { useTradeWalletContext } from "../../context/TradeWalletContext";

const PACKAGES = [
  {
    name: "Starter",
    min: 50,
    max: 200,
    roi: 1,
  },
  {
    name: "Pro",
    min: 201,
    max: 1000,
    roi: 1.5,
  },
  {
    name: "Master",
    min: 1001,
    max: 2000,
    roi: 2.5,
  },
  {
    name: "Elite",
    min: 2001,
    max: 4500,
    roi: 3,
  },
  {
    name: "Empire",
    min: 4501,
    max: 10000,
    roi: 3.3,
  },
];

function getPackage(amount) {
  return (
    PACKAGES.find(
      (item) =>
        amount >= item.min &&
        amount <= item.max
    ) || null
  );
}

export default function FloatingTradeActions() {
  /*
   * ============================================================
   * BACKEND WALLET
   * ============================================================
   *
   * No localStorage balance.
   * No DEMO_DEPOSIT.
   * No fake wallet state.
   *
   * Backend is the source of truth.
   */
  const {
    balance,
    availableBalance,
    lockedBalance,
    canAutoTrade,
    processing,
    startAutoTrade,
    executeTrade,
    refresh,
  } = useTradeWalletContext();

  const walletBalance = Number(
    availableBalance ?? balance ?? 0
  );

  const walletLockedBalance = Number(
    lockedBalance || 0
  );

  const [modal, setModal] = useState(null);
  const [initSeconds, setInitSeconds] = useState(5);
  const [completed, setCompleted] = useState(false);
  const [localProcessing, setLocalProcessing] = useState(false);

  /*
   * Package is calculated from REAL backend balance.
   */
  const packageInfo = useMemo(
    () => getPackage(walletBalance),
    [walletBalance]
  );

  /*
   * Expected daily return based on backend balance.
   */
  const dailyReturn = useMemo(() => {
    if (!packageInfo) return 0;

    return (
      walletBalance *
      (packageInfo.roi / 100)
    );
  }, [walletBalance, packageInfo]);

  /*
   * Backend may expose processing through the hook.
   */
  const isProcessing =
    processing || localProcessing;

  /*
   * If backend reports locked balance,
   * don't allow another auto trade.
   */
  const isLocked =
    walletLockedBalance > 0;

  /*
   * ============================================================
   * 5 SECOND INITIALIZATION
   * ============================================================
   *
   * This is only UI loading.
   * Money/trade processing happens on the backend.
   */
  useEffect(() => {
    if (
      modal !== "initializing" ||
      !isProcessing
    ) {
      return;
    }

    if (initSeconds <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setInitSeconds((value) =>
        Math.max(value - 1, 0)
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    modal,
    isProcessing,
    initSeconds,
  ]);

  /*
   * Once the 5-second UI finishes,
   * send the REAL auto-trade request.
   */
  useEffect(() => {
    if (
      modal !== "initializing" ||
      initSeconds > 0 ||
      !localProcessing
    ) {
      return;
    }

    let cancelled = false;

    const runAutoTrade = async () => {
      try {
        const result = await startAutoTrade({
          amount: walletBalance,
          packageName:
            packageInfo?.name || null,
          dailyReturn,
        });

        if (cancelled) return;

        console.log(
          "Auto Trade backend response:",
          result
        );

        setLocalProcessing(false);
        setCompleted(true);

        /*
         * Refresh wallet/trade history from backend.
         */
        await refresh();

        setTimeout(() => {
          if (cancelled) return;

          setCompleted(false);
          setModal(null);
        }, 1800);
      } catch (error) {
        if (cancelled) return;

        console.error(
          "Auto Trade failed:",
          error
        );

        setLocalProcessing(false);
        setModal("error");
      }
    };

    runAutoTrade();

    return () => {
      cancelled = true;
    };
  }, [
    modal,
    initSeconds,
    localProcessing,
    walletBalance,
    packageInfo,
    dailyReturn,
    startAutoTrade,
    refresh,
  ]);

  /*
   * ============================================================
   * AUTO TRADE
   * ============================================================
   */
  function handleAutoTrade() {
    /*
     * No sufficient balance.
     */
    if (walletBalance < 50) {
      setModal("insufficient");
      return;
    }

    /*
     * Backend says today's trade already happened.
     */
    if (!canAutoTrade) {
      setModal("already-run");
      return;
    }

    /*
     * Locked balance exists.
     */
    if (isLocked) {
      setModal("locked");
      return;
    }

    /*
     * Already processing.
     */
    if (isProcessing) {
      return;
    }

    /*
     * Start UI initialization.
     */
    setInitSeconds(5);
    setCompleted(false);
    setLocalProcessing(true);
    setModal("initializing");
  }

  /*
   * ============================================================
   * MANUAL TRADE
   * ============================================================
   *
   * Your current backend supports manual trade.
   */
  async function handleTrade() {
    if (walletBalance < 50) {
      setModal("insufficient");
      return;
    }

    try {
      setLocalProcessing(true);
      setModal("manual-processing");

      await executeTrade({
        amount: walletBalance,
      });

      await refresh();

      setLocalProcessing(false);
      setCompleted(true);
      setModal("manual-success");

      setTimeout(() => {
        setCompleted(false);
        setModal(null);
      }, 1800);
    } catch (error) {
      console.error(
        "Manual trade failed:",
        error
      );

      setLocalProcessing(false);
      setModal("error");
    }
  }

  function formatMoney(value) {
    return Number(value || 0).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  }

  /*
   * ============================================================
   * UI
   * ============================================================
   */

  return (
    <>
      {/* =====================================================
          FLOATING DESKTOP / MOBILE ACTION BAR
      ===================================================== */}

      <div
        className="
          fixed
          bottom-3
          left-0
          right-0
          z-[80]
          pointer-events-none
          px-3
          sm:bottom-5
          sm:px-5
          xl:left-1/2
          xl:right-auto
          xl:w-[560px]
          xl:-translate-x-1/2
        "
      >
        <div
          className="
            pointer-events-auto
            rounded-[22px]
            border
            border-[#252B34]
            bg-[#090B0E]/95
            p-2
            shadow-[0_15px_50px_rgba(0,0,0,0.65)]
            backdrop-blur-2xl
          "
        >
          {/* Balance */}

          <div
            className="
              flex
              items-center
              justify-between
              px-3
              pb-2
              pt-1
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <div
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-[#1D66FF]/10
                  text-[#4D8DFF]
                "
              >
                <Wallet size={14} />
              </div>

              <div>
                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.12em]
                    text-[#68717D]
                  "
                >
                  Wallet Balance
                </p>

                <p
                  className="
                    text-[13px]
                    font-semibold
                    text-white
                  "
                >
                  {formatMoney(walletBalance)}{" "}
                  <span className="text-[#69727E]">
                    USDT
                  </span>
                </p>
              </div>
            </div>

            {/* Package */}

            <div className="text-right">
              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.12em]
                  text-[#68717D]
                "
              >
                {packageInfo?.name ||
                  "No Package"}
              </p>

              <p
                className="
                  flex
                  items-center
                  justify-end
                  gap-1
                  text-[11px]
                  font-medium
                  text-[#00C076]
                "
              >
                <TrendingUp size={11} />

                +{packageInfo?.roi || 0}%
                daily
              </p>
            </div>
          </div>

          {/* Buttons */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            {/* Small Trade Icon */}

            <button
              type="button"
              onClick={handleTrade}
              disabled={isProcessing}
              className="
                hidden
                h-[48px]
                w-[46px]
                shrink-0
                flex-col
                items-center
                justify-center
                gap-1
                rounded-full
                text-[#68717D]
                transition
                hover:bg-[#15191F]
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-40
                sm:flex
              "
            >
              <Sparkles size={16} />

              <span className="text-[8px]">
                Trade
              </span>
            </button>

            {/* Trade */}

            <button
              type="button"
              onClick={handleTrade}
              disabled={
                isProcessing ||
                walletBalance < 50
              }
              className="
                h-[48px]
                flex-1
                rounded-full
                bg-[#08B77A]
                text-[14px]
                font-semibold
                text-white
                shadow-[0_5px_20px_rgba(8,183,122,0.18)]
                transition-all
                hover:bg-[#09C985]
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-45
              "
            >
              {isProcessing
                ? "Processing..."
                : "Trade"}
            </button>

            {/* Auto Trade */}

            <button
              type="button"
              onClick={handleAutoTrade}
              disabled={
                isProcessing ||
                isLocked ||
                !canAutoTrade ||
                walletBalance < 50
              }
              className="
                relative
                h-[48px]
                flex-1
                overflow-hidden
                rounded-full
                bg-[#2157FF]
                text-[14px]
                font-semibold
                text-white
                shadow-[0_5px_20px_rgba(33,87,255,0.22)]
                transition-all
                hover:bg-[#326AFF]
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-45
              "
            >
              <span
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                <Bot size={16} />

                {isProcessing
                  ? "Processing..."
                  : isLocked
                  ? "Locked"
                  : !canAutoTrade
                  ? "Done Today"
                  : "Auto Trade"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          MODALS
      ===================================================== */}

      {modal && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/75
            px-5
            backdrop-blur-md
          "
        >
          {/* =================================================
              INITIALIZING
          ================================================= */}

          {modal === "initializing" && (
            <ModalShell>
              {!completed ? (
                <>
                  <div
                    className="
                      mx-auto
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#2157FF]/30
                      bg-[#2157FF]/10
                      text-[#4D8DFF]
                      animate-pulse
                    "
                  >
                    <Bot size={28} />
                  </div>

                  <h2
                    className="
                      mt-5
                      text-center
                      text-xl
                      font-bold
                      text-white
                    "
                  >
                    Initializing Auto Trade
                  </h2>

                  <p
                    className="
                      mt-2
                      text-center
                      text-sm
                      leading-6
                      text-[#68717D]
                    "
                  >
                    Your automated trade is
                    being initialized.
                  </p>

                  <div
                    className="
                      mt-6
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <div
                      className="
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#2157FF]
                        text-lg
                        font-bold
                        text-[#4D8DFF]
                      "
                    >
                      {initSeconds}
                    </div>
                  </div>

                  <p
                    className="
                      mt-4
                      text-center
                      text-[11px]
                      text-[#515B68]
                    "
                  >
                    Please wait...
                  </p>
                </>
              ) : (
                <>
                  <SuccessContent
                    title="Auto Trade Started"
                    description="Your auto trade has been successfully processed."
                  />

                  <div
                    className="
                      mt-5
                      rounded-2xl
                      bg-[#11151B]
                      p-4
                      text-center
                    "
                  >
                    <p className="text-xs text-[#68717D]">
                      Expected Daily Return
                    </p>

                    <p
                      className="
                        mt-1
                        text-xl
                        font-bold
                        text-[#00C076]
                      "
                    >
                      +{formatMoney(dailyReturn)} USDT
                    </p>
                  </div>
                </>
              )}
            </ModalShell>
          )}

          {/* =================================================
              MANUAL PROCESSING
          ================================================= */}

          {modal === "manual-processing" && (
            <ModalShell>
              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#08B77A]/30
                  bg-[#08B77A]/10
                  text-[#08B77A]
                  animate-pulse
                "
              >
                <Zap size={28} />
              </div>

              <h2
                className="
                  mt-5
                  text-center
                  text-xl
                  font-bold
                  text-white
                "
              >
                Processing Trade
              </h2>

              <p
                className="
                  mt-2
                  text-center
                  text-sm
                  leading-6
                  text-[#68717D]
                "
              >
                Your trade request is being
                processed by the server.
              </p>
            </ModalShell>
          )}

          {/* =================================================
              MANUAL SUCCESS
          ================================================= */}

          {modal === "manual-success" && (
            <ModalShell>
              <SuccessContent
                title="Trade Completed"
                description="Your trade was successfully processed."
              />
            </ModalShell>
          )}

          {/* =================================================
              LOCKED
          ================================================= */}

          {modal === "locked" && (
            <ModalShell
              onClose={() => setModal(null)}
            >
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#F6C344]/10
                  text-[#F6C344]
                "
              >
                <Clock3 size={26} />
              </div>

              <h2
                className="
                  mt-5
                  text-center
                  text-xl
                  font-bold
                  text-white
                "
              >
                Auto Trade in Progress
              </h2>

              <p
                className="
                  mt-2
                  text-center
                  text-sm
                  leading-6
                  text-[#68717D]
                "
              >
                Your balance currently has
                funds locked for processing.
              </p>

              <div
                className="
                  mt-5
                  rounded-2xl
                  bg-[#11151B]
                  p-5
                  text-center
                "
              >
                <p className="text-xs text-[#68717D]">
                  Locked Balance
                </p>

                <p
                  className="
                    mt-1
                    text-2xl
                    font-bold
                    text-white
                  "
                >
                  {formatMoney(
                    walletLockedBalance
                  )}{" "}
                  USDT
                </p>
              </div>

              <button
                onClick={() => setModal(null)}
                className="
                  mt-5
                  h-11
                  w-full
                  rounded-full
                  bg-[#171B22]
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Close
              </button>
            </ModalShell>
          )}

          {/* =================================================
              ALREADY RUN
          ================================================= */}

          {modal === "already-run" && (
            <ModalShell
              onClose={() => setModal(null)}
            >
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#2157FF]/10
                  text-[#4D8DFF]
                "
              >
                <CheckCircle2 size={26} />
              </div>

              <h2
                className="
                  mt-5
                  text-center
                  text-xl
                  font-bold
                  text-white
                "
              >
                Already Completed
              </h2>

              <p
                className="
                  mt-2
                  text-center
                  text-sm
                  leading-6
                  text-[#68717D]
                "
              >
                Auto Trade can only be
                initiated once per day.
              </p>

              <button
                onClick={() => setModal(null)}
                className="
                  mt-6
                  h-11
                  w-full
                  rounded-full
                  bg-[#2157FF]
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Okay
              </button>
            </ModalShell>
          )}

          {/* =================================================
              INSUFFICIENT BALANCE
          ================================================= */}

          {modal === "insufficient" && (
            <ModalShell
              onClose={() => setModal(null)}
            >
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#F6C344]/10
                  text-[#F6C344]
                "
              >
                <Wallet size={26} />
              </div>

              <h2
                className="
                  mt-5
                  text-center
                  text-xl
                  font-bold
                  text-white
                "
              >
                Insufficient Balance
              </h2>

              <p
                className="
                  mt-2
                  text-center
                  text-sm
                  leading-6
                  text-[#68717D]
                "
              >
                You need at least 50 USDT
                available to start a trade.
              </p>

              <p
                className="
                  mt-4
                  text-center
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Available:{" "}
                {formatMoney(walletBalance)} USDT
              </p>

              <button
                onClick={() => setModal(null)}
                className="
                  mt-6
                  h-11
                  w-full
                  rounded-full
                  bg-[#2157FF]
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Okay
              </button>
            </ModalShell>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {modal === "error" && (
            <ModalShell
              onClose={() => setModal(null)}
            >
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-red-500/10
                  text-red-400
                "
              >
                <X size={26} />
              </div>

              <h2
                className="
                  mt-5
                  text-center
                  text-xl
                  font-bold
                  text-white
                "
              >
                Trade Failed
              </h2>

              <p
                className="
                  mt-2
                  text-center
                  text-sm
                  leading-6
                  text-[#68717D]
                "
              >
                The server could not process
                your trade request.
              </p>

              <button
                onClick={() => setModal(null)}
                className="
                  mt-6
                  h-11
                  w-full
                  rounded-full
                  bg-[#171B22]
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Close
              </button>
            </ModalShell>
          )}
        </div>
      )}
    </>
  );
}

/* =====================================================
   SUCCESS CONTENT
===================================================== */

function SuccessContent({
  title,
  description,
}) {
  return (
    <>
      <div
        className="
          mx-auto
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-[#00C076]/10
          text-[#00C076]
        "
      >
        <CheckCircle2 size={32} />
      </div>

      <h2
        className="
          mt-5
          text-center
          text-xl
          font-bold
          text-white
        "
      >
        {title}
      </h2>

      <p
        className="
          mt-2
          text-center
          text-sm
          leading-6
          text-[#68717D]
        "
      >
        {description}
      </p>
    </>
  );
}

/* =====================================================
   MODAL SHELL
===================================================== */

function ModalShell({
  children,
  onClose,
}) {
  return (
    <div
      className="
        relative
        w-full
        max-w-[380px]
        rounded-[28px]
        border
        border-[#252B34]
        bg-[#0B0E11]
        p-6
        shadow-[0_25px_100px_rgba(0,0,0,0.7)]
      "
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            right-4
            top-4
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            text-[#68717D]
            transition
            hover:bg-[#171B22]
            hover:text-white
          "
        >
          <X size={16} />
        </button>
      )}

      {children}
    </div>
  );
}