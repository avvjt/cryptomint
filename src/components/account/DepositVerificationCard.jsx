import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useAccountStatusContext } from "../../context/AccountStatusContext";
import { WALLET_CONFIG } from "../../config/walletConfig";

export default function DepositVerificationCard() {
  const {
    status,
    isActive,
    isPending,
    depositAddress,
    depositAmount,
    confirmations,
    requiredConfirmations,
    verificationProgress,
    loading,
    error,
    refreshStatus,
  } = useAccountStatusContext();

  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (!depositAddress) return;

    try {
      await navigator.clipboard.writeText(
        depositAddress
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Unable to copy address:",
        error
      );
    }
  };


  return (
    <section
      className="
        overflow-hidden
        rounded-2xl
        border
        border-[#1A1E24]
        bg-[#0D1014]
      "
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          border-b
          border-[#1A1E24]
          p-5
        "
      >

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >

          <div>

            <p className="text-sm font-semibold">
              {isActive ? "Deposit USDT" : "Activate your account"}
            </p>

            <p className="mt-1 text-xs leading-5 text-[#737B89]">
              {isActive ? (
                "Send USDT to your deposit address below."
              ) : (
                <>
                  Deposit at least{" "}
                  <span className="text-white">
                    {WALLET_CONFIG.minimumDeposit} USDT
                  </span>{" "}
                  to activate your account.
                </>
              )}
            </p>

          </div>

          <StatusBadge status={status} />

        </div>

      </div>


      {/* =====================================================
          DEPOSIT DETAILS
      ===================================================== */}

      <div className="p-5">

        <div
          className="
            grid
            gap-5
            md:grid-cols-[1fr_auto]
            md:items-center
          "
        >

          {/* Address */}

          <div>

            <div className="grid grid-cols-2 gap-3">

              <InfoBox
                label="Asset"
                value={WALLET_CONFIG.asset}
              />

              <InfoBox
                label="Network"
                value={WALLET_CONFIG.network}
              />

            </div>


            <div className="mt-4">

              <p className="text-xs text-[#737B89]">
                Deposit address
              </p>

              <div
                className="
                  mt-2
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-[#1A1E24]
                  bg-[#090B0E]
                  p-3
                "
              >

                <code
                  className="
                    min-w-0
                    flex-1
                    break-all
                    text-xs
                    leading-5
                    text-[#AAB1BD]
                  "
                >
                  {depositAddress ||
                    "Loading deposit address..."}
                </code>

                <button
                  type="button"
                  onClick={copyAddress}
                  disabled={!depositAddress}
                  className="
                    shrink-0
                    rounded-lg
                    border
                    border-[#1A1E24]
                    px-3
                    py-2
                    text-xs
                    font-medium
                    text-white
                    hover:bg-[#14181E]
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  {copied ? "Copied" : "Copy"}
                </button>

              </div>

            </div>


            <div
              className="
                mt-4
                rounded-xl
                border
                border-[#F59E0B]/20
                bg-[#F59E0B]/5
                p-3
              "
            >

              <p className="text-xs font-medium text-[#F59E0B]">
                Send only {WALLET_CONFIG.asset} on{" "}
                {WALLET_CONFIG.network}.
              </p>

              <p className="mt-1 text-[11px] leading-5 text-[#737B89]">
                Deposits using another network or unsupported
                asset may not be credited.
              </p>

            </div>

          </div>


          {/* QR */}

          <div
            className="
              flex
              justify-center
              md:justify-end
            "
          >

            <div
              className="
                rounded-2xl
                bg-white
                p-3
              "
            >

              {depositAddress ? (
                <QRCodeSVG
                  value={depositAddress}
                  size={150}
                  bgColor="#ffffff"
                  fgColor="#090B0E"
                  level="M"
                />
              ) : (
                <div
                  className="
                    flex
                    h-[150px]
                    w-[150px]
                    items-center
                    justify-center
                    text-xs
                    text-[#737B89]
                  "
                >
                  Loading
                </div>
              )}

            </div>

          </div>

        </div>


        {/* =====================================================
            VERIFICATION PROGRESS
        ===================================================== */}

        <VerificationStatus
          status={status}
          depositAmount={depositAmount}
          confirmations={confirmations}
          requiredConfirmations={
            requiredConfirmations
          }
          verificationProgress={
            verificationProgress
          }
        />


        {/* =====================================================
            REFRESH
        ===================================================== */}

        <div className="mt-5 flex items-center justify-between">

          <p className="text-[11px] text-[#555D68]">
            Verification happens automatically.
          </p>

          <button
            type="button"
            onClick={refreshStatus}
            disabled={loading}
            className="
              rounded-lg
              border
              border-[#1A1E24]
              px-3
              py-2
              text-xs
              font-medium
              text-[#AAB1BD]
              hover:bg-[#14181E]
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>

        </div>


        {error && (
          <p className="mt-3 text-xs text-[#F6465D]">
            {error}
          </p>
        )}

      </div>

    </section>
  );
}


/* =============================================================
   STATUS BADGE
============================================================= */

function StatusBadge({
  status,
}) {
  const config = {
    PENDING: {
      label: "Waiting",
      className:
        "border-[#F59E0B]/20 bg-[#F59E0B]/10 text-[#F59E0B]",
    },

    DETECTED: {
      label: "Detected",
      className:
        "border-[#4D8DFF]/20 bg-[#4D8DFF]/10 text-[#4D8DFF]",
    },

    CONFIRMING: {
      label: "Confirming",
      className:
        "border-[#4D8DFF]/20 bg-[#4D8DFF]/10 text-[#4D8DFF]",
    },

    ACTIVE: {
      label: "Active",
      className:
        "border-[#08B77A]/20 bg-[#08B77A]/10 text-[#08B77A]",
    },

    BELOW_MINIMUM: {
      label: "Below minimum",
      className:
        "border-[#F6465D]/20 bg-[#F6465D]/10 text-[#F6465D]",
    },
  };

  const current =
    config[status] || config.PENDING;

  return (
    <span
      className={`
        shrink-0
        rounded-full
        border
        px-3
        py-1
        text-[10px]
        font-medium
        ${current.className}
      `}
    >
      {current.label}
    </span>
  );
}


/* =============================================================
   INFO BOX
============================================================= */

function InfoBox({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-[#1A1E24]
        bg-[#090B0E]
        p-3
      "
    >

      <p className="text-[10px] text-[#555D68]">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium">
        {value}
      </p>

    </div>
  );
}


/* =============================================================
   VERIFICATION STATUS
============================================================= */

function VerificationStatus({
  status,
  depositAmount,
  confirmations,
  requiredConfirmations,
  verificationProgress,
}) {
  if (status === "PENDING") {
    return (
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

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs font-medium">
              Waiting for deposit
            </p>

            <p className="mt-1 text-[11px] text-[#737B89]">
              Once your deposit is detected, verification
              will begin automatically.
            </p>

          </div>

          <div
            className="
              h-2
              w-2
              animate-pulse
              rounded-full
              bg-[#F59E0B]
            "
          />

        </div>

      </div>
    );
  }


  if (
    status === "DETECTED" ||
    status === "CONFIRMING"
  ) {
    return (
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

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >

          <div>

            <p className="text-xs font-medium">
              Deposit detected
            </p>

            <p className="mt-1 text-[11px] text-[#737B89]">
              {depositAmount || 0} USDT detected.
              Waiting for blockchain confirmations.
            </p>

          </div>

          <span className="text-xs font-medium text-[#4D8DFF]">
            {confirmations}/{requiredConfirmations}
          </span>

        </div>


        <div
          className="
            mt-4
            h-1.5
            overflow-hidden
            rounded-full
            bg-[#1A1E24]
          "
        >

          <div
            className="
              h-full
              rounded-full
              bg-[#4D8DFF]
              transition-all
              duration-500
            "
            style={{
              width: `${Math.min(
                100,
                Math.max(
                  0,
                  verificationProgress || 0
                )
              )}%`,
            }}
          />

        </div>

      </div>
    );
  }


  if (status === "BELOW_MINIMUM") {
    return (
      <div
        className="
          mt-5
          rounded-xl
          border
          border-[#F6465D]/20
          bg-[#F6465D]/5
          p-4
        "
      >

        <p className="text-xs font-medium text-[#F6465D]">
          Deposit below minimum
        </p>

        <p className="mt-1 text-[11px] leading-5 text-[#737B89]">
          Your deposit of {depositAmount || 0} USDT
          is below the minimum required amount of{" "}
          {WALLET_CONFIG.minimumDeposit} USDT.
          The deposit will not be automatically credited
          as an account activation deposit.

        </p>

      </div>
    );
  }


  return null;
}