import { useMemo, useState } from "react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Wallet,
  Coins,
} from "lucide-react";

const packages = [
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

export default function BuySellPanel() {

  const [tab, setTab] = useState("Deposit");

  const [amount, setAmount] = useState("");

  const selected = useMemo(() => {

    const value = Number(amount);

    return packages.find(
      (p) => value >= p.min && value <= p.max
    );

  }, [amount]);

  const dailyIncome = useMemo(() => {

    if (!selected) return 0;

    return (
      Number(amount) *
      (selected.roi / 100)
    );

  }, [amount, selected]);

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
      "
    >

      {/* Tabs */}

      <div className="grid grid-cols-2 gap-3">

        <button
          onClick={() => setTab("Deposit")}
          className={`
          rounded-2xl

          py-3

          font-semibold

          transition

          ${
            tab === "Deposit"

              ? "bg-[#1D66FF]"

              : "bg-[#171B22]"
          }
          `}
        >

          Deposit

        </button>

        <button
          onClick={() => setTab("Withdraw")}
          className={`
          rounded-2xl

          py-3

          font-semibold

          transition

          ${
            tab === "Withdraw"

              ? "bg-red-500"

              : "bg-[#171B22]"
          }
          `}
        >

          Withdraw

        </button>

      </div>

      {/* Amount */}

      <div className="mt-8">

        <label className="text-sm text-zinc-500">

          Amount

        </label>

        <div
          className="
          mt-3

          flex

          items-center

          rounded-2xl

          bg-[#171B22]

          px-5

          h-14
          "
        >

          <Coins
            size={18}
            className="text-zinc-500"
          />

          <input

            type="number"

            value={amount}

            onChange={(e)=>
              setAmount(e.target.value)
            }

            placeholder="50"

            className="
            flex-1

            bg-transparent

            px-4

            outline-none
            "

          />

          <button
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

      {/* Package */}

      <div
        className="
        mt-8

        rounded-3xl

        bg-[#171B22]

        p-5
        "
      >

        <div className="flex justify-between">

          <span className="text-zinc-500">

            Package

          </span>

          <span className="font-semibold">

            {selected?.name ?? "--"}

          </span>

        </div>

        <div className="mt-5 flex justify-between">

          <span className="text-zinc-500">

            Daily ROI

          </span>

          <span className="text-green-400">

            {selected?.roi ?? 0}%

          </span>

        </div>

        <div className="mt-5 flex justify-between">

          <span className="text-zinc-500">

            Daily Income

          </span>

          <span className="text-[#1D66FF] font-semibold">

            {dailyIncome.toFixed(2)} USDT

          </span>

        </div>

      </div>

      {/* Balance */}

      <div
        className="
        mt-8

        rounded-3xl

        border

        border-white/5

        p-5
        "
      >

        <div className="flex items-center gap-3">

          <Wallet
            className="text-[#1D66FF]"
            size={22}
          />

          <div>

            <p className="text-sm text-zinc-500">

              Wallet Balance

            </p>

            <h3 className="text-xl font-bold">

              1520.50 USDT

            </h3>

          </div>

        </div>

      </div>

      {/* Button */}

      <button
        className={`
        mt-8

        flex

        w-full

        items-center

        justify-center

        gap-3

        rounded-full

        py-4

        font-semibold

        transition

        ${
          tab === "Deposit"

            ? "bg-[#1D66FF] hover:bg-[#3A7BFF]"

            : "bg-red-500 hover:bg-red-600"
        }
        `}
      >

        {

          tab === "Deposit"

          ? <ArrowDownCircle size={18}/>

          : <ArrowUpCircle size={18}/>

        }

        {tab} Now

      </button>

    </section>

  );

}