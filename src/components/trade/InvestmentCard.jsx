import { useMemo, useState } from "react";

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

export default function InvestmentCard() {

  const [amount, setAmount] = useState("");

  const selectedPackage = useMemo(() => {

    const value = Number(amount);

    return packages.find(
      p => value >= p.min && value <= p.max
    );

  }, [amount]);

  const dailyIncome = useMemo(() => {

    if (!selectedPackage) return 0;

    return (
      Number(amount) *
      selectedPackage.daily /
      100
    );

  }, [amount, selectedPackage]);

  return (

    <div className="rounded-3xl bg-zinc-900 p-6">

      <h2 className="text-2xl font-semibold">

        Investment

      </h2>

      <div className="mt-6">

        <label className="text-zinc-400">

          Amount (USDT)

        </label>

        <input
          type="number"
          value={amount}
          onChange={(e)=>
            setAmount(e.target.value)
          }
          placeholder="Minimum 50 USDT"
          className="
          mt-2
          w-full
          rounded-xl
          border
          border-zinc-800
          bg-black
          p-4
          outline-none
          "
        />

      </div>

      {selectedPackage && (

        <div className="mt-6 rounded-xl bg-zinc-800 p-5">

          <h3 className="text-xl font-semibold">

            {selectedPackage.name}

          </h3>

          <p className="mt-2 text-zinc-400">

            Daily Return

            {" "}

            {selectedPackage.daily}%

          </p>

          <p className="mt-3 text-3xl font-bold text-green-500">

            {dailyIncome.toFixed(2)} USDT

          </p>

        </div>

      )}

      <button
        className="
        mt-8
        w-full
        rounded-xl
        bg-blue-600
        py-4
        font-semibold
        hover:bg-blue-500
        "
      >
        Invest
      </button>

    </div>

  );

}