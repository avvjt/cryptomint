import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  useTradeWalletContext,
} from "../context/TradeWalletContext";

import {
  useAccountStatusContext,
} from "../context/AccountStatusContext";

import DepositVerificationCard from "../components/account/DepositVerificationCard";

import AccountActivationModal from "../components/account/AccountActivationModal";

import { WALLET_CONFIG } from "../config/walletConfig";


export default function Wallet() {
  const navigate = useNavigate();

  const {
    balance,
    lockedBalance,
    tradeHistory,
  } = useTradeWalletContext();

  const {
    isActive,
    status,
  } = useAccountStatusContext();


  const [searchParams, setSearchParams] =
    useSearchParams();

  const activeTab =
    searchParams.get("tab") === "withdraw"
      ? "Withdraw"
      : "Deposit";


  const [
    showActivationModal,
    setShowActivationModal,
  ] = useState(false);


  const availableBalance =
    Number(balance || 0);

  const locked =
    Number(lockedBalance || 0);

  const totalBalance =
    availableBalance + locked;




  return (
    <main
      className="
        min-h-screen
        bg-[#090B0E]
        px-4
        pb-28
        pt-5
        text-white
        sm:px-6
        lg:px-8
      "
    >

      <div
        className="
          mx-auto
          max-w-[1100px]
        "
      >

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="mb-5">

          <h1 className="text-xl font-semibold">
            Wallet
          </h1>

          <p className="mt-1 text-sm text-[#737B89]">
            Manage your USDT balance and withdrawals
          </p>

        </header>


        {/* =====================================================
            BALANCE CARD
        ===================================================== */}

        <section
          className="
            rounded-2xl
            border
            border-[#1A1E24]
            bg-[#0D1014]
            p-5
          "
        >

          <div className="flex items-start justify-between gap-4">

            <div>

              <p
                className="
                  text-xs
                  uppercase
                  tracking-wider
                  text-[#737B89]
                "
              >
                Total Balance
              </p>

              <div className="mt-2 flex items-end gap-2">

                <span
                  className="
                    text-3xl
                    font-semibold
                    tracking-tight
                  "
                >
                  {totalBalance.toFixed(2)}
                </span>

                <span
                  className="
                    pb-1
                    text-sm
                    text-[#737B89]
                  "
                >
                  USDT
                </span>

              </div>

            </div>


            {/* Account status */}

            <div
              className={`
                rounded-full
                border
                px-3
                py-1
                text-[11px]
                font-medium

                ${isActive
                  ? "border-[#08B77A]/30 bg-[#08B77A]/10 text-[#08B77A]"
                  : "border-[#F6465D]/30 bg-[#F6465D]/10 text-[#F6465D]"
                }
              `}
            >
              {isActive ? "Active" : "Pending"}
            </div>

          </div>


          {/* Balance split */}

          <div className="mt-5 grid grid-cols-2 gap-3">

            <BalanceBox
              label="Available"
              value={availableBalance}
            />

            <BalanceBox
              label="Locked"
              value={locked}
            />

          </div>

        </section>


        {/* =====================================================
            ACCOUNT STATUS
        ===================================================== */}

        {!isActive && (
          <section
            className="
              mt-4
              rounded-2xl
              border
              border-[#1A1E24]
              bg-[#0D1014]
              p-5
            "
          >

            <div className="flex gap-3">

              <div
                className="
                  mt-0.5
                  h-2
                  w-2
                  shrink-0
                  rounded-full
                  bg-[#F6465D]
                "
              />

              <div>

                <p className="text-sm font-semibold">
                  Account verification pending
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    leading-6
                    text-[#737B89]
                  "
                >
                  Deposit at least{" "}
                  <span className="font-medium text-white">
                    {WALLET_CONFIG.minimumDeposit} USDT
                  </span>{" "}
                  using the BEP20 network. Your deposit will
                  be automatically verified by the backend
                  and your account will be activated after
                  confirmation.
                </p>

              </div>

            </div>

          </section>
        )}


        {/* =====================================================
            TABS
        ===================================================== */}

        <div
          className="
            mt-5
            grid
            grid-cols-2
            rounded-xl
            border
            border-[#1A1E24]
            bg-[#0D1014]
            p-1
          "
        >

          <TabButton
            active={activeTab === "Deposit"}
            onClick={() =>
              setSearchParams({ tab: "deposit" })
            }
          >
            Deposit
          </TabButton>

          <TabButton
            active={activeTab === "Withdraw"}
            onClick={() =>
              setSearchParams({ tab: "withdraw" })
            }
          >
            Withdraw
          </TabButton>

        </div>


        {/* =====================================================
            DEPOSIT
        ===================================================== */}

        {activeTab === "Deposit" && (
          <section className="mt-5">

            <DepositVerificationCard />

          </section>
        )}


        {/* =====================================================
            WITHDRAW
        ===================================================== */}

        {activeTab === "Withdraw" && (
          <section className="mt-5">

            <WithdrawPanel
              isActive={isActive}
              availableBalance={availableBalance}
              onActivate={() =>
                setShowActivationModal(true)
              }
            />

          </section>
        )}


        {/* =====================================================
            RECENT TRANSACTIONS
        ===================================================== */}

        <section
          className="
            mt-5
            rounded-2xl
            border
            border-[#1A1E24]
            bg-[#0D1014]
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-[#1A1E24]
              p-5
            "
          >

            <div>

              <p className="text-sm font-semibold">
                Recent activity
              </p>

              <p className="mt-1 text-xs text-[#737B89]">
                Your recent wallet activity
              </p>

            </div>

          </div>


          <WalletActivity
            tradeHistory={tradeHistory}
          />

        </section>


        {/* =====================================================
            ACTIVATION MODAL
        ===================================================== */}

        <AccountActivationModal
          open={showActivationModal}
          onClose={() =>
            setShowActivationModal(false)
          }
        />

      </div>

    </main>
  );
}


/* =============================================================
   BALANCE BOX
============================================================= */

function BalanceBox({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-xl
        bg-[#090B0E]
        p-4
      "
    >

      <p className="text-xs text-[#737B89]">
        {label}
      </p>

      <p className="mt-1 text-lg font-medium">
        {Number(value).toFixed(2)}

        <span
          className="
            ml-1
            text-xs
            text-[#737B89]
          "
        >
          USDT
        </span>

      </p>

    </div>
  );
}


/* =============================================================
   TAB BUTTON
============================================================= */

function TabButton({
  active,
  onClick,
  children,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        rounded-lg
        py-2.5
        text-sm
        font-medium
        transition

        ${active
          ? "bg-[#1A1E24] text-white"
          : "text-[#737B89] hover:text-white"
        }
      `}
    >
      {children}
    </button>
  );
}


/* =============================================================
   WITHDRAW PANEL
============================================================= */

function WithdrawPanel({
  isActive,
  availableBalance,
  onActivate,
}) {

  const [
    amount,
    setAmount,
  ] = useState("");


  const [
    address,
    setAddress,
  ] = useState("");


  const [
    error,
    setError,
  ] = useState("");


  const [
    submitted,
    setSubmitted,
  ] = useState(false);


  const [
    submitting,
    setSubmitting,
  ] = useState(false);


  /* =========================================================
     NOT ACTIVE
  ========================================================= */

  if (!isActive) {

    return (
      <div
        className="
          rounded-2xl
          border
          border-[#1A1E24]
          bg-[#0D1014]
          p-5
        "
      >

        <p className="text-sm font-semibold">
          Account activation required
        </p>

        <p
          className="
            mt-2
            text-sm
            leading-6
            text-[#737B89]
          "
        >
          Your account must be verified before you can
          withdraw funds.
        </p>

        <button
          type="button"
          onClick={onActivate}
          className="
            mt-5
            w-full
            rounded-xl
            bg-[#4D8DFF]
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[#3D7EF0]
          "
        >
          Activate account
        </button>

      </div>
    );
  }


  /* =========================================================
     SUBMITTED
  ========================================================= */

  if (submitted) {

    return (
      <div
        className="
          rounded-2xl
          border
          border-[#1A1E24]
          bg-[#0D1014]
          p-5
        "
      >

        <div
          className="
            rounded-xl
            border
            border-[#1A1E24]
            bg-[#090B0E]
            p-5
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-[#F59E0B]/10
                text-[#F59E0B]
              "
            >
              •
            </div>

            <div>

              <p className="text-sm font-semibold">
                Withdrawal submitted
              </p>

              <p className="mt-1 text-xs text-[#737B89]">
                Status: Pending
              </p>

            </div>

          </div>


          <div
            className="
              mt-5
              space-y-3
              border-t
              border-[#1A1E24]
              pt-4
            "
          >

            <SummaryRow
              label="Amount"
              value={`${Number(amount).toFixed(2)} USDT`}
            />

            <SummaryRow
              label="Network"
              value="BEP20"
            />

            <SummaryRow
              label="Processing"
              value="Up to 24 hours"
            />

          </div>


          <div
            className="
              mt-5
              rounded-xl
              border
              border-[#1A1E24]
              bg-[#0D1014]
              p-3
            "
          >

            <p className="text-xs leading-5 text-[#737B89]">
              Your request has been recorded locally for
              frontend testing. The backend will later create
              and process the actual withdrawal.
            </p>

          </div>

        </div>


        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setAmount("");
            setAddress("");
            setError("");
          }}
          className="
            mt-4
            w-full
            rounded-xl
            border
            border-[#1A1E24]
            py-3
            text-sm
            font-medium
            text-[#AAB1BD]
            transition
            hover:bg-[#14181E]
            hover:text-white
          "
        >
          New withdrawal
        </button>

      </div>
    );
  }


  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");


    if (!isActive) {

      onActivate();

      return;
    }


    const withdrawalAmount =
      Number(amount);


    if (!amount || !Number.isFinite(withdrawalAmount)) {

      setError(
        "Enter a valid withdrawal amount."
      );

      return;
    }


    if (
      withdrawalAmount <
      WALLET_CONFIG.minimumWithdrawal
    ) {

      setError(
        `Minimum withdrawal is ${WALLET_CONFIG.minimumWithdrawal} USDT.`
      );

      return;
    }


    if (
      withdrawalAmount >
      availableBalance
    ) {

      setError(
        "Withdrawal amount exceeds your available balance."
      );

      return;
    }


    const normalizedAddress =
      address.trim();


    if (
      !/^0x[a-fA-F0-9]{40}$/.test(
        normalizedAddress
      )
    ) {

      setError(
        "Enter a valid BEP20 wallet address."
      );

      return;
    }


    /*
      ========================================================
      BACKEND READY

      Later this block becomes:

      POST /api/withdrawals

      {
        amount,
        address,
        network: "BEP20",
        asset: "USDT"
      }

      The backend should create:

      PENDING → PROCESSING → COMPLETED / FAILED
      ========================================================
    */


    try {

      setSubmitting(true);


      /*
        Demo frontend only.

        We deliberately do NOT change the wallet balance
        here because the backend will become the source of
        truth later.
      */

      await new Promise((resolve) =>
        window.setTimeout(resolve, 500)
      );


      setSubmitted(true);

    } catch (err) {

      setError(
        "Unable to submit withdrawal request."
      );

    } finally {

      setSubmitting(false);

    }
  };


  /* =========================================================
     MAX
  ========================================================= */

  const handleMax = () => {

    if (availableBalance <= 0) {

      setAmount("");

      return;
    }

    setAmount(
      availableBalance.toFixed(2)
    );

    setError("");
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="
        rounded-2xl
        border
        border-[#1A1E24]
        bg-[#0D1014]
        p-5
      "
    >

      {/* Header */}

      <div>

        <p className="text-sm font-semibold">
          Withdraw USDT
        </p>

        <p className="mt-1 text-sm text-[#737B89]">
          Send USDT using the BEP20 network.
        </p>

      </div>


      {/* Available */}

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
        "
      >

        <span className="text-xs text-[#737B89]">
          Available balance
        </span>

        <span className="text-sm font-medium">
          {availableBalance.toFixed(2)} USDT
        </span>

      </div>


      {/* Amount */}

      <label
        className="
          mt-5
          block
          text-xs
          text-[#737B89]
        "
      >
        Withdrawal amount
      </label>

      <div
        className="
          mt-2
          flex
          items-center
          rounded-xl
          border
          border-[#1A1E24]
          bg-[#090B0E]
          px-4
        "
      >

        <input
          type="number"
          inputMode="decimal"
          min={WALLET_CONFIG.minimumWithdrawal}
          max={availableBalance}
          step="0.01"
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value);
            setError("");
          }}
          placeholder="0.00"
          className="
            min-w-0
            flex-1
            bg-transparent
            py-3
            text-sm
            text-white
            outline-none
            placeholder:text-[#454C57]
          "
        />


        <button
          type="button"
          onClick={handleMax}
          className="
            mr-3
            text-xs
            font-semibold
            text-[#4D8DFF]
          "
        >
          MAX
        </button>


        <span className="text-sm text-[#737B89]">
          USDT
        </span>

      </div>


      <p className="mt-2 text-xs text-[#737B89]">
        Minimum withdrawal:{" "}
        {WALLET_CONFIG.minimumWithdrawal} USDT
      </p>


      {/* Address */}

      <label
        className="
          mt-5
          block
          text-xs
          text-[#737B89]
        "
      >
        BEP20 withdrawal address
      </label>

      <input
        type="text"
        value={address}
        onChange={(event) => {
          setAddress(event.target.value);
          setError("");
        }}
        placeholder="0x..."
        autoComplete="off"
        spellCheck="false"
        className="
          mt-2
          w-full
          rounded-xl
          border
          border-[#1A1E24]
          bg-[#090B0E]
          px-4
          py-3
          text-sm
          text-white
          outline-none
          placeholder:text-[#454C57]
          focus:border-[#4D8DFF]
        "
      />


      <p
        className="
          mt-2
          text-xs
          leading-5
          text-[#737B89]
        "
      >
        Only use a BEP20-compatible address.
        Sending funds to the wrong network may result
        in permanent loss.
      </p>


      {/* Processing notice */}

      <div
        className="
          mt-5
          rounded-xl
          border
          border-[#1A1E24]
          bg-[#090B0E]
          p-4
        "
      >

        <p className="text-sm font-medium">
          Withdrawal processing
        </p>

        <p
          className="
            mt-1
            text-xs
            leading-5
            text-[#737B89]
          "
        >
          Withdrawals may take{" "}
          {WALLET_CONFIG.withdrawalProcessingTime}{" "}
          to process.
        </p>

        <div
          className="
            mt-3
            flex
            items-center
            justify-between
            text-xs
          "
        >

          <span className="text-[#737B89]">
            Network
          </span>

          <span className="text-white">
            {WALLET_CONFIG.network}
          </span>

        </div>

      </div>


      {/* Error */}

      {error && (
        <div
          className="
            mt-4
            rounded-xl
            border
            border-[#F6465D]/30
            bg-[#F6465D]/5
            p-3
          "
        >

          <p className="text-xs text-[#F6465D]">
            {error}
          </p>

        </div>
      )}


      {/* Submit */}

      <button
        type="submit"
        disabled={submitting}
        className="
          mt-5
          w-full
          rounded-xl
          bg-[#4D8DFF]
          py-3
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-[#3D7EF0]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {submitting
          ? "Submitting..."
          : "Confirm withdrawal"}
      </button>

    </form>
  );
}


/* =============================================================
   SUMMARY ROW
============================================================= */

function SummaryRow({
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
      "
    >

      <span className="text-xs text-[#737B89]">
        {label}
      </span>

      <span className="text-sm text-white">
        {value}
      </span>

    </div>
  );
}


/* =============================================================
   WALLET ACTIVITY
============================================================= */

function WalletActivity({
  tradeHistory = [],
}) {

  if (!tradeHistory.length) {

    return (
      <div className="p-5">

        <p className="text-sm text-[#737B89]">
          No wallet activity yet.
        </p>

      </div>
    );
  }


  const recent =
    [...tradeHistory]
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 5);


  return (
    <div className="divide-y divide-[#1A1E24]">

      {recent.map((item) => (

        <div
          key={item.id}
          className="
            flex
            items-center
            justify-between
            gap-4
            p-5
          "
        >

          <div className="min-w-0">

            <p className="truncate text-sm font-medium">
              {item.packageName
                ? `Auto Trade · ${item.packageName}`
                : `Trade · ${item.symbol}`}
            </p>

            <p className="mt-1 text-xs text-[#737B89]">
              {formatWalletDate(item.createdAt)}
            </p>

          </div>


          <div className="shrink-0 text-right">

            <p className="text-sm font-medium">
              {Number(item.amount || 0).toFixed(2)}
              {" "}
              USDT
            </p>

            <p className="mt-1 text-xs text-[#08B77A]">
              {item.status || "Completed"}
            </p>

          </div>

        </div>

      ))}

    </div>
  );
}


/* =============================================================
   DATE FORMAT
============================================================= */

function formatWalletDate(date) {

  if (!date) {
    return "—";
  }

  const parsed =
    new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return parsed.toLocaleString(
    undefined,
    {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}