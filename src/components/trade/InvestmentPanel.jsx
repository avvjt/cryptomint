import { useMemo, useState } from "react";
import {
  Wallet,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

const packages = [
  {
    name: "Starter",
    min: 50,
    max: 200,
    daily: 1,
  },
  {
    name: "Pro",
    min: 201,
    max: 1000,
    daily: 1.5,
  },
  {
    name: "Master",
    min: 1001,
    max: 2000,
    daily: 2.5,
  },
  {
    name: "Elite",
    min: 2001,
    max: 4500,
    daily: 3,
  },
  {
    name: "Empire",
    min: 4501,
    max: 10000,
    daily: 3.3,
  },
];

const quickAmounts = [50, 100, 500, 1000, 5000];

export default function InvestmentPanel() {
  const [amount, setAmount] = useState("");

  const investment = Number(amount);

  const selectedPackage = useMemo(() => {
    return packages.find(
      (item) =>
        investment >= item.min &&
        investment <= item.max
    );
  }, [investment]);

  const dailyIncome = useMemo(() => {
    if (!selectedPackage) return 0;

    return (
      investment *
      selectedPackage.daily /
      100
    );
  }, [investment, selectedPackage]);

  const monthlyIncome = dailyIncome * 30;
  const yearlyIncome = dailyIncome * 365;

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="rounded-2xl bg-blue-500/20 p-3">

          <Wallet
            size={22}
            className="text-blue-500"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold">
            Invest
          </h2>

          <p className="text-sm text-zinc-500">
            Start earning daily rewards
          </p>

        </div>

      </div>

      {/* Amount */}

      <div className="mt-8">

        <label className="text-sm text-zinc-400">

          Investment Amount (USDT)

        </label>

        <input
          type="number"
          value={amount}
          min={50}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          placeholder="Minimum 50 USDT"
          className="
          mt-2
          w-full
          rounded-xl
          border
          border-zinc-700
          bg-black
          px-4
          py-4
          text-lg
          outline-none
          transition
          focus:border-blue-500
          "
        />

      </div>

      {/* Quick Buttons */}

      <div className="mt-4 flex flex-wrap gap-2">

        {quickAmounts.map((value) => (

          <button
            key={value}
            onClick={() => setAmount(value)}
            className="
            rounded-full
            border
            border-zinc-700
            px-4
            py-2
            text-sm
            transition
            hover:border-blue-500
            hover:bg-blue-500/10
            "
          >
            {value}
          </button>

        ))}

      </div>

      {/* Package */}

      {selectedPackage ? (

        <div className="mt-8 rounded-2xl bg-black p-5 space-y-5">

          <InfoRow
            title="Package"
            value={selectedPackage.name}
          />

          <InfoRow
            title="Investment Range"
            value={`${selectedPackage.min} - ${selectedPackage.max} USDT`}
          />

          <InfoRow
            title="Daily Return"
            value={`${selectedPackage.daily}%`}
            green
          />

          <div className="border-t border-zinc-800"></div>

          <IncomeRow
            icon={TrendingUp}
            title="Daily Income"
            value={`${dailyIncome.toFixed(2)} USDT`}
          />

          <IncomeRow
            icon={CalendarDays}
            title="Monthly Income"
            value={`${monthlyIncome.toFixed(2)} USDT`}
          />

          <IncomeRow
            icon={CalendarDays}
            title="Yearly Income"
            value={`${yearlyIncome.toFixed(2)} USDT`}
          />

        </div>

      ) : (

        <div
          className="
          mt-8
          rounded-2xl
          border
          border-dashed
          border-zinc-700
          p-8
          text-center
          text-zinc-500
          "
        >
          Enter an amount between
          <br />
          <span className="font-semibold text-white">
            50 - 10000 USDT
          </span>
        </div>

      )}

      {/* Button */}

      <button
        disabled={!selectedPackage}
        className="
        mt-8
        w-full
        rounded-xl
        bg-blue-600
        py-4
        text-lg
        font-semibold
        transition
        hover:bg-blue-500
        disabled:cursor-not-allowed
        disabled:bg-zinc-700
        "
      >
        Invest Now
      </button>

    </div>
  );
}

function InfoRow({
  title,
  value,
  green,
}) {
  return (
    <div className="flex justify-between">

      <span className="text-zinc-500">

        {title}

      </span>

      <span
        className={
          green
            ? "font-semibold text-green-500"
            : "font-semibold"
        }
      >
        {value}
      </span>

    </div>
  );
}

function IncomeRow({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        <Icon
          size={18}
          className="text-blue-500"
        />

        <span>{title}</span>

      </div>

      <span className="font-bold text-green-500">

        {value}

      </span>

    </div>
  );
}