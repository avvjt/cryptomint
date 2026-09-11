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

const DEMO_DEPOSIT = 1520.5;

const STORAGE_KEY = "cryptomintx_auto_trade";

function getPackage(amount) {
  return (
    PACKAGES.find(
      (item) =>
        amount >= item.min &&
        amount <= item.max
    ) || null
  );
}

function getTodayKey() {
  const date = new Date();

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function getStoredState() {
  try {
    const saved = localStorage.getItem(
      STORAGE_KEY
    );

    if (!saved) {
      return {
        deposit: DEMO_DEPOSIT,
        balance: DEMO_DEPOSIT,
        lastRun: null,
        lockedUntil: null,
        earned: 0,
      };
    }

    return JSON.parse(saved);
  } catch {
    return {
      deposit: DEMO_DEPOSIT,
      balance: DEMO_DEPOSIT,
      lastRun: null,
      lockedUntil: null,
      earned: 0,
    };
  }
}

function saveState(state) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state)
  );
}

export default function FloatingTradeActions() {
  const [wallet, setWallet] =
    useState(getStoredState);

  const [modal, setModal] =
    useState(null);

  const [initSeconds, setInitSeconds] =
    useState(5);

  const [remainingSeconds, setRemainingSeconds] =
    useState(0);

  const [processing, setProcessing] =
    useState(false);

  const [completed, setCompleted] =
    useState(false);

  const packageInfo = useMemo(
    () => getPackage(wallet.deposit),
    [wallet.deposit]
  );

  const dailyReturn = useMemo(() => {
    if (!packageInfo) return 0;

    return (
      wallet.deposit *
      (packageInfo.roi / 100)
    );
  }, [wallet.deposit, packageInfo]);

  /*
   * Check locked state on mount and every second.
   */

  useEffect(() => {
    const checkLock = () => {
      const current =
        getStoredState();

      if (
        current.lockedUntil &&
        Date.now() >=
          Number(current.lockedUntil)
      ) {
        const pkg = getPackage(
          current.deposit
        );

        const interest = pkg
          ? current.deposit *
            (pkg.roi / 100)
          : 0;

        const updated = {
          ...current,

          balance:
            current.deposit + interest,

          lockedUntil: null,

          earned: interest,
        };

        saveState(updated);

        setWallet(updated);

        return;
      }

      setWallet(current);

      if (current.lockedUntil) {
        const seconds = Math.max(
          0,
          Math.ceil(
            (Number(current.lockedUntil) -
              Date.now()) /
              1000
          )
        );

        setRemainingSeconds(seconds);
      } else {
        setRemainingSeconds(0);
      }
    };

    checkLock();

    const interval =
      setInterval(
        checkLock,
        1000
      );

    return () =>
      clearInterval(interval);
  }, []);

  /*
   * Auto trade initialization:
   * 5 seconds.
   */

  useEffect(() => {
    if (!processing) return;

    if (initSeconds <= 0) {
      finishInitialization();
      return;
    }

    const timer =
      setTimeout(() => {
        setInitSeconds(
          (value) => value - 1
        );
      }, 1000);

    return () =>
      clearTimeout(timer);
  }, [
    processing,
    initSeconds,
  ]);

  function finishInitialization() {
    const current =
      getStoredState();

    const lockedUntil =
      Date.now() +
      5 * 60 * 1000;

    const updated = {
      ...current,

      balance: 0,

      lockedUntil,

      earned: 0,
    };

    saveState(updated);

    setWallet(updated);

    setRemainingSeconds(
      5 * 60
    );

    setProcessing(false);

    setCompleted(true);

    setTimeout(() => {
      setCompleted(false);
      setModal(null);
    }, 1800);
  }

  function handleAutoTrade() {
    const current =
      getStoredState();

    /*
     * Still locked.
     */

    if (
      current.lockedUntil &&
      Date.now() <
        Number(current.lockedUntil)
    ) {
      setModal("locked");
      return;
    }

    /*
     * Once per day.
     */

    if (
      current.lastRun ===
      getTodayKey()
    ) {
      setModal("already-run");
      return;
    }

    /*
     * Mark today's run.
     */

    const updated = {
      ...current,

      lastRun:
        getTodayKey(),
    };

    saveState(updated);

    setWallet(updated);

    /*
     * Open initialization modal.
     */

    setInitSeconds(5);

    setProcessing(true);

    setCompleted(false);

    setModal("initializing");
  }

  function handleTrade() {
    setModal("coming-soon");
  }

  function formatMoney(value) {
    return Number(value).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  }

  function formatRemaining(seconds) {
    const minutes =
      Math.floor(seconds / 60);

    const secs =
      seconds % 60;

    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(
      2,
      "0"
    )}`;
  }

  const isLocked =
    wallet.lockedUntil &&
    Date.now() <
      Number(wallet.lockedUntil);

  const alreadyRun =
    wallet.lastRun ===
    getTodayKey();

  return (
    <>
      {/* =================================================
          FLOATING DESKTOP / MOBILE ACTION BAR
      ================================================= */}

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
                  {formatMoney(
                    wallet.balance
                  )}{" "}
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
            {/* Small grid-like action */}

            <button
              type="button"
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
              "
            >
              Trade
            </button>

            {/* Auto Trade */}

            <button
              type="button"
              onClick={handleAutoTrade}
              disabled={
                processing ||
                isLocked ||
                alreadyRun
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

                {isLocked
                  ? formatRemaining(
                      remainingSeconds
                    )
                  : alreadyRun
                  ? "Done Today"
                  : "Auto Trade"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* =================================================
          MODALS
      ================================================= */}

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
          {/* COMING SOON */}

          {modal ===
            "coming-soon" && (
            <ModalShell
              onClose={() =>
                setModal(null)
              }
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

                  bg-[#08B77A]/10

                  text-[#08B77A]
                "
              >
                <Zap size={26} />
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
                Trading is coming
                soon
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
                Live trading functionality
                will be available soon.
              </p>

              <button
                onClick={() =>
                  setModal(null)
                }
                className="
                  mt-6
                  h-11
                  w-full

                  rounded-full

                  bg-[#08B77A]

                  text-sm
                  font-semibold
                  text-white
                "
              >
                Okay
              </button>
            </ModalShell>
          )}

          {/* INITIALIZATION */}

          {modal ===
            "initializing" && (
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
                    "
                  >
                    Initializing Auto
                    Trade
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
                    <CheckCircle2
                      size={32}
                    />
                  </div>

                  <h2
                    className="
                      mt-5
                      text-center
                      text-xl
                      font-bold
                    "
                  >
                    Auto Trade Started
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
                    Your balance is temporarily
                    locked while the trade is
                    being processed.
                  </p>

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
                      +
                      {formatMoney(
                        dailyReturn
                      )}{" "}
                      USDT
                    </p>
                  </div>
                </>
              )}
            </ModalShell>
          )}

          {/* LOCKED */}

          {modal ===
            "locked" && (
            <ModalShell
              onClose={() =>
                setModal(null)
              }
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
                Your balance is currently
                locked.
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
                  Remaining Time
                </p>

                <p
                  className="
                    mt-1
                    text-2xl
                    font-bold
                    text-white
                  "
                >
                  {formatRemaining(
                    remainingSeconds
                  )}
                </p>
              </div>

              <button
                onClick={() =>
                  setModal(null)
                }
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

          {/* ALREADY RUN */}

          {modal ===
            "already-run" && (
            <ModalShell
              onClose={() =>
                setModal(null)
              }
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
                onClick={() =>
                  setModal(null)
                }
                className="
                  mt-6
                  h-11
                  w-full

                  rounded-full

                  bg-[#2157FF]

                  text-sm
                  font-semibold
                "
              >
                Okay
              </button>
            </ModalShell>
          )}
        </div>
      )}
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