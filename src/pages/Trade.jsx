import {
  useState,
} from "react";
import {
  useSearchParams,
} from "react-router-dom";
import TradeHeader from "../components/trade/TradeHeader";
import TradingChart from "../components/trade/TradingChart";
import OrderBook from "../components/trade/OrderBook";
import OrderHistory from "../components/trade/OrderHistory";
import TradeActions from "../components/trade/TradeActions";
import TradeModal from "../components/trade/TradeModal";
import { useAccountStatusContext } from "../context/AccountStatusContext";
import AccountActivationModal from "../components/account/AccountActivationModal";
import {
  useTradeWalletContext,
} from "../context/TradeWalletContext";
import {
  getTradePackage,
} from "../utils/tradePackages";


/* =====================================================
   MOBILE TABS
===================================================== */

const mobileTabs = [
  "Chart",
  "Order Book",
  "Info",
];


/* =====================================================
   TRADE CONTENT
===================================================== */

function TradeContent() {

  const [
    mobileTab,
    setMobileTab,
  ] = useState("Chart");


  const [
    searchParams,
  ] = useSearchParams();


  const [
    modal,
    setModal,
  ] = useState(null);


  const [
    processing,
    setProcessing,
  ] = useState(false);


  const { isActive } = useAccountStatusContext();

  const [showActivationModal, setShowActivationModal] =
    useState(false);

  const {
  balance,
  canAutoTrade,
  lockedUntil,
  cooldownUntil,
  isLocked,
  isCooldown,
  startAutoTrade,
} = useTradeWalletContext();


  const symbol =
    searchParams.get("symbol") ||
    "BTCUSDT";


  const pairName =
    symbol.endsWith("USDT")
      ? `${symbol.slice(0, -4)}/USDT`
      : symbol;



const handleTrade = () => {
  if (!isActive) {
    setShowActivationModal(true);
    return;
  }

  alert(
    "🔒 Trade option is locked.\n\nPlease use Auto Trade once every 24 hours to receive your daily earning."
  );
};


 const handleAutoTrade = async () => {
  if (!isActive) {
    setShowActivationModal(true);
    return;
  }

  // Currently processing
  if (isLocked) {
    alert(
      "Your wallet is currently being processed. Please wait until the timer ends."
    );
    return;
  }

  // 24-hour cooldown
  if (isCooldown) {
    alert(
      "Auto Trade has already been used. Please wait until the 24-hour timer ends."
    );
    return;
  }

  // Backend says Auto Trade isn't available
  if (!canAutoTrade) {
    if (Number(balance) <= 0) {
      alert(
        "Your wallet does not have an available balance."
      );
    } else {
      alert(
        "Auto Trade is currently unavailable. Please try again later."
      );
    }

    return;
  }

  if (Number(balance) <= 0) {
    alert(
      "Your wallet does not have an available balance."
    );
    return;
  }

  /*
   * Show the existing 5-second initialization UI.
   */
  setModal("auto");
  setProcessing(true);

  try {
    /*
     * Keep the existing visual loading experience.
     */
    await new Promise((resolve) => {
      window.setTimeout(resolve, 5000);
    });

    /*
     * Start REAL backend Auto Trade.
     *
     * Backend will:
     * - lock the available wallet balance
     * - create PROCESSING trade
     * - set 5-minute processingUntil
     */
    const result = await startAutoTrade({
      symbol,
    });

    if (!result?.success) {
      setModal(null);

      alert(
        result?.message ||
          "Unable to start Auto Trade."
      );

      return;
    }

    /*
     * Show success briefly.
     */
    window.setTimeout(() => {
      setModal(null);
    }, 1500);
  } catch (error) {
    setModal(null);

    alert(
      error?.response?.data?.message ||
        error?.message ||
        "Unable to start Auto Trade."
    );
  } finally {
    setProcessing(false);
  }
};


  return (
    <div
      className="
        min-h-screen

        bg-[#090B0E]

        text-white

        pb-0
      "
    >

      <TradeHeader
        symbol={symbol}
      />


      {/* =================================================
          DESKTOP
      ================================================= */}

      <div
        className="
          hidden

          xl:block
        "
      >

        <div
          className="
            grid

            grid-cols-[minmax(0,1fr)_360px]

            border-t

            border-[#1A1E24]
          "
        >

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <main
            className="
              min-w-0

              border-r

              border-[#1A1E24]
            "
          >

            {/* Chart */}

            <TradingChart
              symbol={symbol}
            />





            {/* Order History */}

            <div
              className="
                border-t

                border-[#1A1E24]
              "
            >

              <OrderHistory />

            </div>

          </main>


          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <aside
            className="
              min-w-0

              bg-[#0B0E11]
            "
          >

            {/* =============================================
                TRADE ACTIONS
            ============================================= */}

            <div
              className="
                border-b

                border-[#1A1E24]

                p-3
              "
            >

              <TradeActions
  balance={balance}
  canAutoTrade={canAutoTrade}
  lockedUntil={lockedUntil}
  cooldownUntil={cooldownUntil}
  processing={processing}
  onTrade={handleTrade}
  onAutoTrade={handleAutoTrade}
/>

            </div>


            {/* =============================================
                ORDER BOOK
            ============================================= */}

            <OrderBook symbol={symbol} />





          </aside>

        </div>

      </div>


      {/* =================================================
          MOBILE
      ================================================= */}

      <div
        className="
          xl:hidden
          pb-40
        "
      >

        {/* =================================================
            MOBILE TABS
        ================================================= */}

        <div
          className="
            sticky
            top-0
            z-30
            border-y
            border-[#1A1E24]
            bg-[#090B0E]/95
            backdrop-blur-xl
          "
        >

          <div
            className="
              flex
              overflow-x-auto
              scrollbar-hide
            "
          >

            {mobileTabs.map(
              (tab) => {

                const active =
                  mobileTab === tab;


                return (
                  <button
                    key={tab}

                    type="button"

                    onClick={() =>
                      setMobileTab(tab)
                    }

                    className={`
                      relative
                      h-11
                      shrink-0
                      px-5
                      text-[13px]
                      font-medium
                      transition-colors

                      ${active
                        ? "text-white"
                        : "text-[#68717D]"
                      }
                    `}
                  >

                    {tab}


                    {active && (
                      <span
                        className="
                          absolute
                          bottom-0
                          left-4
                          right-4
                          h-[2px]
                          rounded-full
                          bg-[#4D8DFF]
                        "
                      />
                    )}

                  </button>
                );

              }
            )}

          </div>

        </div>


        {/* =================================================
            CHART
        ================================================= */}

        {mobileTab === "Chart" && (
          <>

            <TradingChart
              symbol={symbol}
            />





            <div
              className="
                border-t
                border-[#1A1E24]
              "
            >

              <OrderHistory />

            </div>

          </>
        )}


        {/* =================================================
            ORDER BOOK
        ================================================= */}

        {mobileTab === "Order Book" && (

          <OrderBook symbol={symbol} />

        )}





        {/* =================================================
            INFO
        ================================================= */}

        {mobileTab === "Info" && (
          <>



            <div
              className="
                border-t
                border-[#1A1E24]
              "
            >

              <OrderHistory />

            </div>

          </>
        )}


        {/* =================================================
            MOBILE FLOATING TRADE ACTIONS
        ================================================= */}

        <div
          className="
    fixed
    bottom-[76px]
    left-0
    right-0
    z-[80]

    px-3
  "
        >

          <div
            className="
              mx-auto

              w-full

              max-w-[520px]
            "
          >

            <TradeActions
  balance={balance}
  canAutoTrade={canAutoTrade}
  lockedUntil={lockedUntil}
  cooldownUntil={cooldownUntil}
  processing={processing}
  onTrade={handleTrade}
  onAutoTrade={handleAutoTrade}
/>

          </div>

        </div>


        {/* =================================================
            SPACE FOR FLOATING ACTIONS + NAV
        ================================================= */}

        <div
          className="
            h-36
          "
        />

      </div>


      {/* =================================================
          TRADE / AUTO TRADE MODAL
      ================================================= */}

      <TradeModal
        mode={modal}
        symbol={pairName}
        onClose={() => {

          if (!processing) {
            setModal(null);
          }

        }}
      />

      <AccountActivationModal
  open={showActivationModal}
  onClose={() => setShowActivationModal(false)}
/>

    </div>
  );
}


/* =====================================================
   PROVIDER
===================================================== */

export default function Trade() {

  return <TradeContent />;

}