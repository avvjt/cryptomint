import { useMemo, useState } from "react";

import {
  Wallet,
  Send,
  Coins,
  ChevronDown,
} from "lucide-react";

export default function WithdrawForm() {

  const [network, setNetwork] =
    useState("TRC20");

  const [wallet, setWallet] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const fee = useMemo(() => {

    switch (network) {

      case "BEP20":
        return 0.3;

      case "ERC20":
        return 8;

      default:
        return 1;

    }

  }, [network]);

  const receive = useMemo(() => {

    const value = Number(amount);

    if (!value) return 0;

    return Math.max(value - fee, 0);

  }, [amount, fee]);

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

      <p
        className="
        uppercase

        tracking-[0.25em]

        text-xs

        text-zinc-500
        "
      >

        Withdrawal Form

      </p>

      <h2
        className="
        mt-3

        text-3xl

        font-bold
        "
      >

        Withdraw Funds

      </h2>

      {/* Network */}

      <div className="mt-8">

        <label className="mb-3 block text-sm text-zinc-400">

          Network

        </label>

        <div className="relative">

          <select

            value={network}

            onChange={(e) =>
              setNetwork(e.target.value)
            }

            className="
            h-14

            w-full

            appearance-none

            rounded-2xl

            border
            border-white/5

            bg-[#171B22]

            px-5

            outline-none

            focus:border-[#1D66FF]
            "

          >

            <option>TRC20</option>

            <option>BEP20</option>

            <option>ERC20</option>

          </select>

          <ChevronDown
            size={20}
            className="
            pointer-events-none

            absolute

            right-5
            top-1/2

            -translate-y-1/2

            text-zinc-500
            "
          />

        </div>

      </div>

      {/* Wallet */}

      <div className="mt-6">

        <label className="mb-3 block text-sm text-zinc-400">

          Wallet Address

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

          h-14

          focus-within:border-[#1D66FF]
          "
        >

          <Wallet
            size={20}
            className="text-zinc-500"
          />

          <input

            value={wallet}

            onChange={(e) =>
              setWallet(e.target.value)
            }

            placeholder="Enter wallet address"

            className="
            w-full

            bg-transparent

            outline-none
            "

          />

        </div>

      </div>

      {/* Amount */}

      <div className="mt-6">

        <label className="mb-3 block text-sm text-zinc-400">

          Amount

        </label>

        <div
          className="
          flex

          items-center

          rounded-2xl

          border
          border-white/5

          bg-[#171B22]

          px-5

          h-14

          focus-within:border-[#1D66FF]
          "
        >

          <Coins
            size={20}
            className="text-zinc-500"
          />

          <input

            type="number"

            value={amount}

            onChange={(e) =>
              setAmount(e.target.value)
            }

            placeholder="0.00"

            className="
            flex-1

            bg-transparent

            px-4

            outline-none
            "

          />

          <button
            type="button"
            onClick={() => setAmount("1520.50")}
            className="
            rounded-full

            bg-[#1D66FF]/10

            px-4
            py-1

            text-sm

            text-[#1D66FF]
            "
          >

            MAX

          </button>

        </div>

      </div>

      {/* Summary */}

      <div
        className="
        mt-8

        rounded-3xl

        bg-[#171B22]

        p-6
        "
      >

        <SummaryRow

          title="Network Fee"

          value={`${fee} USDT`}

        />

        <SummaryRow

          title="You'll Receive"

          value={`${receive.toFixed(2)} USDT`}

        />

      </div>

      {/* Submit */}

      <button
        className="
        mt-8

        flex

        h-14

        w-full

        items-center

        justify-center

        gap-3

        rounded-full

        bg-[#1D66FF]

        font-semibold

        transition-all

        hover:bg-[#357BFF]

        hover:shadow-[0_15px_40px_rgba(29,102,255,.35)]
        "
      >

        <Send size={18} />

        Withdraw Now

      </button>

    </section>

  );

}

function SummaryRow({

  title,

  value,

}) {

  return (

    <div
      className="
      flex

      items-center

      justify-between

      py-3

      last:border-none
      "
    >

      <span className="text-zinc-500">

        {title}

      </span>

      <span className="font-semibold">

        {value}

      </span>

    </div>

  );

}