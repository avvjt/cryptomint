import {
  Hash,
  Send,
  CircleAlert,
} from "lucide-react";

import { useState } from "react";

export default function UploadHash() {

  const [txHash, setTxHash] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const submitHash = async () => {

    if (!txHash.trim()) return;

    setLoading(true);

    // Later API Call

    setTimeout(() => {

      setLoading(false);

      alert("Transaction submitted successfully.");

      setTxHash("");

    }, 1500);

  };

  return (

    <section
      className="
      rounded-[32px]

      border
      border-white/5

      bg-gradient-to-br

      from-[#111318]

      to-[#0D1119]

      p-6

      lg:p-8
      "
    >

      {/* Header */}

      <p
        className="
        uppercase

        tracking-[.25em]

        text-xs

        text-zinc-500
        "
      >

        Verify Deposit

      </p>

      <h2
        className="
        mt-3

        text-3xl

        font-bold
        "
      >

        Submit Transaction Hash

      </h2>

      <p
        className="
        mt-4

        max-w-2xl

        leading-7

        text-zinc-400
        "
      >

        After sending your USDT, paste your blockchain
        transaction hash below. Our system will verify
        your payment and activate your investment.

      </p>

      {/* Input */}

      <div className="mt-8">

        <label
          className="
          mb-3

          block

          text-sm

          text-zinc-400
          "
        >

          Transaction Hash

        </label>

        <div
          className="
          flex

          items-center

          gap-4

          rounded-2xl

          border

          border-white/5

          bg-[#171B22]

          px-5

          py-4

          focus-within:border-[#1D66FF]
          "
        >

          <Hash
            size={20}
            className="text-zinc-500"
          />

          <input

            value={txHash}

            onChange={(e) =>
              setTxHash(e.target.value)
            }

            placeholder="Paste blockchain transaction hash..."

            className="
            w-full

            bg-transparent

            outline-none

            placeholder:text-zinc-600
            "

          />

        </div>

      </div>

      {/* Warning */}

      <div
        className="
        mt-6

        flex

        items-start

        gap-3

        rounded-2xl

        border

        border-yellow-500/20

        bg-yellow-500/10

        p-4
        "
      >

        <CircleAlert
          size={20}
          className="mt-0.5 text-yellow-400"
        />

        <div>

          <h4 className="font-semibold text-yellow-300">

            Before submitting

          </h4>

          <p
            className="
            mt-2

            text-sm

            leading-6

            text-yellow-100/80
            "
          >

            Ensure your transaction is already broadcast
            to the blockchain. Invalid or incomplete
            hashes cannot be verified.

          </p>

        </div>

      </div>

      {/* Button */}

      <button

        disabled={!txHash || loading}

        onClick={submitHash}

        className="
        mt-8

        flex

        items-center

        justify-center

        gap-3

        rounded-full

        bg-[#1D66FF]

        px-8

        py-4

        font-semibold

        transition-all

        hover:bg-blue-600

        disabled:cursor-not-allowed

        disabled:opacity-40
        "

      >

        <Send size={18} />

        {

          loading

            ? "Verifying..."

            : "Submit Transaction"

        }

      </button>

    </section>

  );

}