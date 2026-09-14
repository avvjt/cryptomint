import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  useAccountStatusContext,
} from "../context/AccountStatusContext";

import DepositVerificationCard from "../components/account/DepositVerificationCard";

import AccountActivationModal from "../components/account/AccountActivationModal";

import { WALLET_CONFIG } from "../config/walletConfig";


export default function Wallet() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] =
    useSearchParams();

  const {
    isActive,
    status,
  } = useAccountStatusContext();

  const activeTab =
    searchParams.get("tab") === "withdraw"
      ? "Withdraw"
      : "Deposit";

  const [
    showActivationModal,
    setShowActivationModal,
  ] = useState(false);

  const [walletData, setWalletData] = useState(null);
  const [depositHistory, setDepositHistory] = useState([]);
  const [walletTransactions, setWalletTransactions] = useState([]);
  const [walletLoading, setWalletLoading] = useState(true);
  const [walletError, setWalletError] = useState("");

  const availableBalance = Number(
    walletData?.availableBalance || 0
  );

  const locked = Number(
    walletData?.lockedBalance || 0
  );

  const totalBalance = Number(
    walletData?.totalBalance ?? availableBalance + locked
  );

  const fetchWalletData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setWalletLoading(true);
      setWalletError("");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [walletRes, depositsRes, transactionsRes] =
        await Promise.all([
          fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/wallet`,
            { headers }
          ),
          fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/wallet/deposits`,
            { headers }
          ),
          fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/wallet/transactions`,
            { headers }
          ),
        ]);

      if ([walletRes, depositsRes, transactionsRes].some((res) => res.status === 401)) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const walletJson = await walletRes.json();
      const depositsJson = await depositsRes.json();
      const transactionsJson = await transactionsRes.json();

      if (!walletRes.ok) {
        throw new Error(walletJson.message || "Failed to load wallet");
      }

      if (!depositsRes.ok) {
        throw new Error(depositsJson.message || "Failed to load deposits");
      }

      if (!transactionsRes.ok) {
        throw new Error(
          transactionsJson.message ||
            "Failed to load transactions"
        );
      }

      setWalletData(walletJson.wallet || null);
      setDepositHistory(depositsJson.deposits || []);
      setWalletTransactions(transactionsJson.transactions || []);
    } catch (error) {
      console.error("Wallet loading error:", error);
      setWalletError(
        error.message || "Unable to load wallet"
      );
    } finally {
      setWalletLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  const handleTabChange = (tab) => {
    setSearchParams({
      tab:
        tab === "Withdraw"
          ? "withdraw"
          : "deposit",
    });
  };

  if (walletLoading) {
    return (
      <main className="min-h-screen bg-[#090B0E] px-4 pb-28 pt-5 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1100px]">
          <div className="rounded-2xl border border-[#1A1E24] bg-[#0D1014] p-6">
            <p className="text-sm text-[#737B89]">
              Loading wallet...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (walletError) {
    return (
      <main className="min-h-screen bg-[#090B0E] px-4 pb-28 pt-5 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1100px]">
          <div className="rounded-2xl border border-[#1A1E24] bg-[#0D1014] p-6">
            <p className="text-sm font-medium">
              Unable to load wallet
            </p>
            <p className="mt-2 text-sm text-[#737B89]">
              {walletError}
            </p>
            <button
              type="button"
              onClick={fetchWalletData}
              className="mt-4 rounded-xl bg-[#4D8DFF] px-4 py-2 text-sm font-semibold text-white"
            >
              Try again
            </button>
          </div>
        </div>
      </main>
    );
  }

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

          <div
            className="
              flex
              items-end
              justify-between
              gap-4
            "
          >

            <div>

              <h1
                className="
                  text-xl
                  font-semibold
                  tracking-tight
                "
              >
                Wallet
              </h1>

              <p
                className="
                  mt-1
                  text-sm
                  text-[#737B89]
                "
              >
                Manage your USDT balance
              </p>

            </div>

            <button
              type="button"
              onClick={() => navigate("/history")}
              className="
                rounded-xl
                border
                border-[#1A1E24]
                bg-[#0D1014]
                px-3
                py-2
                text-xs
                font-medium
                text-[#AAB1BD]
                transition
                hover:bg-[#14181E]
                hover:text-white
              "
            >
              History
            </button>

          </div>

        </header>


        {/* =====================================================
            BALANCE CARD
        ===================================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-[#1A1E24]
            bg-[#0D1014]
            p-5
          "
        >

          {/* subtle background detail */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-48
              w-48
              rounded-full
              bg-[#4D8DFF]/5
              blur-3xl
            "
          />

          <div className="relative">

            <div
              className="
                flex
                items-start
                justify-between
                gap-4
              "
            >

              <div>

                <p
                  className="
                    text-[11px]
                    font-medium
                    uppercase
                    tracking-[0.12em]
                    text-[#737B89]
                  "
                >
                  Total balance
                </p>

                <div
                  className="
                    mt-2
                    flex
                    items-baseline
                    gap-2
                  "
                >

                  <span
                    className="
                      text-3xl
                      font-semibold
                      tracking-tight
                      sm:text-4xl
                    "
                  >
                    {totalBalance.toFixed(2)}
                  </span>

                  <span
                    className="
                      text-sm
                      font-medium
                      text-[#737B89]
                    "
                  >
                    USDT
                  </span>

                </div>

              </div>

            </div>


            {/* Balance split */}

            <div
              className="
                mt-6
                grid
                grid-cols-2
                gap-3
              "
            >

              <div
                className="
                  rounded-xl
                  border
                  border-[#1A1E24]
                  bg-[#090B0E]
                  p-4
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[#08B77A]
                    "
                  />

                  <p
                    className="
                      text-[11px]
                      text-[#737B89]
                    "
                  >
                    Available
                  </p>

                </div>

                <p
                  className="
                    mt-2
                    text-lg
                    font-medium
                  "
                >
                  {availableBalance.toFixed(2)}

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


              <div
                className="
                  rounded-xl
                  border
                  border-[#1A1E24]
                  bg-[#090B0E]
                  p-4
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[#F59E0B]
                    "
                  />

                  <p
                    className="
                      text-[11px]
                      text-[#737B89]
                    "
                  >
                    Locked
                  </p>

                </div>

                <p
                  className="
                    mt-2
                    text-lg
                    font-medium
                  "
                >
                  {locked.toFixed(2)}

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

            </div>

          </div>

        </section>


        {/* =====================================================
            ACCOUNT VERIFICATION
            ONLY VISIBLE WHILE NOT ACTIVE
        ===================================================== */}

        {!isActive && (
          <section
            className="
              mt-4
              overflow-hidden
              rounded-2xl
              border
              border-[#1A1E24]
              bg-[#0D1014]
            "
          >

            <div className="p-4">

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >

                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-3
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
                      bg-[#F59E0B]/10
                    "
                  >

                    <span
                      className="
                        h-2
                        w-2
                        animate-pulse
                        rounded-full
                        bg-[#F59E0B]
                      "
                    />

                  </div>

                  <div className="min-w-0">

                    <p
                      className="
                        text-sm
                        font-medium
                      "
                    >
                      Account verification
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-xs
                        text-[#737B89]
                      "
                    >
                      Deposit {WALLET_CONFIG.minimumDeposit} USDT
                      to activate
                    </p>

                  </div>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    handleTabChange("Deposit")
                  }
                  className="
                    shrink-0
                    rounded-lg
                    bg-[#4D8DFF]
                    px-3
                    py-2
                    text-[11px]
                    font-semibold
                    text-white
                    transition
                    hover:bg-[#3D7EF0]
                  "
                >
                  Deposit
                </button>

              </div>

            </div>

          </section>
        )}


        {/* =====================================================
            DEPOSIT / WITHDRAW TABS
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
              handleTabChange("Deposit")
            }
          >
            Deposit
          </TabButton>

          <TabButton
            active={activeTab === "Withdraw"}
            onClick={() =>
              handleTabChange("Withdraw")
            }
          >
            Withdraw
          </TabButton>

        </div>


        {/* =====================================================
            DEPOSIT
            ALWAYS AVAILABLE
        ===================================================== */}

        {activeTab === "Deposit" && (
          <section className="mt-4">

            <DepositVerificationCard />

          </section>
        )}


        {/* =====================================================
            WITHDRAW
        ===================================================== */}

        {activeTab === "Withdraw" && (
          <section className="mt-4">

            <WithdrawPanel
              isActive={isActive}
              availableBalance={availableBalance}
              onActivate={() => {
                handleTabChange("Deposit");
              }}
              onWithdrawalSubmitted={fetchWalletData}
            />

          </section>
        )}


        {/* =====================================================
            RECENT ACTIVITY
        ===================================================== */}

        <section
          className="
            mt-5
            overflow-hidden
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

              <p
                className="
                  mt-1
                  text-xs
                  text-[#737B89]
                "
              >
                Your recent wallet activity
              </p>

            </div>

            <button
              type="button"
              onClick={() => navigate("/history")}
              className="
                text-xs
                font-medium
                text-[#4D8DFF]
                hover:text-[#6CA1FF]
              "
            >
              View all
            </button>

          </div>

          <WalletActivity
            tradeHistory={walletTransactions}
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
  onWithdrawalSubmitted,
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

  const [
    withdrawalResult,
    setWithdrawalResult,
  ] = useState(null);


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
          border
          border-[#3B73D9]
          bg-[#285DB5]
          py-3
          text-sm
          font-semibold
          text-white
          shadow-[0_6px_20px_rgba(40,93,181,0.18)]
          transition
          duration-200
          hover:border-[#4D8DFF]
          hover:bg-[#326BC7]
          active:scale-[0.99]
        "
        >
          Deposit to activate
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
                Status: {withdrawalResult?.status || "PENDING"}
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
              label="Address"
              value={withdrawalResult?.destinationAddress || address}
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
            setWithdrawalResult(null);
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

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/withdrawals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: withdrawalAmount,
            destinationAddress: normalizedAddress,
          }),
        }
      );

      const data = await res.json();

      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!res.ok) {
        setError(
          data.message ||
            "Unable to submit withdrawal request."
        );
        return;
      }

      setWithdrawalResult(data.withdrawal || null);
      setSubmitted(true);

      if (onWithdrawalSubmitted) {
        await onWithdrawalSubmitted();
      }
    } catch (err) {
      console.error("Withdrawal error:", err);
      setError(
        "Unable to connect to the server. Please try again."
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

  const recent = [...tradeHistory]
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 5);

  return (
    <div className="divide-y divide-[#1A1E24]">
      {recent.map((item) => {
        const id = item._id || item.id;
        const type = String(item.type || "TRANSACTION").toUpperCase();
        const isDeposit = type === "DEPOSIT";
        const isWithdrawal = type === "WITHDRAWAL";

        const title = isDeposit
          ? "USDT Deposit"
          : isWithdrawal
            ? "USDT Withdrawal"
            : type === "TRADE"
              ? "Trade"
              : "Wallet Transaction";

        const amountPrefix = isDeposit ? "+" : isWithdrawal ? "-" : "";
        const status = String(item.status || "PENDING");

        return (
          <div
            key={id}
            className="flex items-center justify-between gap-4 p-5"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {title}
              </p>

              <p className="mt-1 text-xs text-[#737B89]">
                {formatWalletDate(item.createdAt)}
              </p>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-sm font-medium">
                {amountPrefix}
                {Number(item.amount || 0).toFixed(2)} USDT
              </p>

              <p
                className={`mt-1 text-xs ${
                  status === "FAILED"
                    ? "text-[#F6465D]"
                    : status === "COMPLETED"
                      ? "text-[#08B77A]"
                      : "text-[#F59E0B]"
                }`}
              >
                {status}
              </p>
            </div>
          </div>
        );
      })}
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