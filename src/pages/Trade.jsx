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
    executeTrade,
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

  // Account must be active before trading
  if (!isActive) {
    setShowActivationModal(true);
    return;
  }

  if (Number(balance) <= 0) {

    alert(
      "Your wallet balance is currently unavailable."
    );

    return;
  }

  const result =
    executeTrade({
      symbol,
      amount: Number(balance),
    });

  if (!result?.success) {

    alert(
      result?.message ||
      "Unable to place trade."
    );

    return;
  }

  setModal("trade");

  window.setTimeout(() => {

    setModal(null);

  }, 3000);

};



  const handleAutoTrade = () => {
    // Account must be active before Auto Trade
  if (!isActive) {
    setShowActivationModal(true);
    return;
  }

    if (!canAutoTrade) {

      alert(
        "Auto Trade has already been used today."
      );

      return;
    }

    if (
      lockedUntil &&
      Number(lockedUntil) > Date.now()
    ) {

      alert(
        "Your wallet is currently being processed."
      );

      return;
    }


    /* No balance */

    if (Number(balance) <= 0) {

      alert(
        "Your wallet balance is unavailable."
      );

      return;
    }


    /* Find user's package */

    const selectedPackage =
      getTradePackage(
        Number(balance)
      );


    if (!selectedPackage) {

      alert(
        "Your balance does not match an available package."
      );

      return;
    }


    /*
     * Show initialization modal
     */

    setModal("auto");

    setProcessing(true);


    /*
     * Simulate 5 second
     * auto-trade initialization
     */

    window.setTimeout(() => {

      const result =
        startAutoTrade({

          symbol,

          amount:
            Number(balance),

          packageName:
            selectedPackage.name,

          dailyReturn:
            selectedPackage.dailyRate,

        });


      setProcessing(false);


      if (!result?.success) {

        setModal(null);

        alert(
          result?.message ||
          "Unable to start Auto Trade."
        );

        return;
      }


      /*
       * Keep success state
       * visible briefly.
       */

      window.setTimeout(() => {

        setModal(null);

      }, 1500);

    }, 5000);

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

                canAutoTrade={
                  canAutoTrade
                }

                lockedUntil={
                  lockedUntil
                }

                processing={
                  processing
                }

                onTrade={
                  handleTrade
                }

                onAutoTrade={
                  handleAutoTrade
                }
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

              canAutoTrade={
                canAutoTrade
              }

              lockedUntil={
                lockedUntil
              }

              processing={
                processing
              }

              onTrade={
                handleTrade
              }

              onAutoTrade={
                handleAutoTrade
              }
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