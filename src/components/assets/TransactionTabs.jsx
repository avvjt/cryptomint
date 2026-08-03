export default function TransactionTabs({
  active,
  setActive,
}) {
  const tabs = [
    "All",
    "Deposits",
    "Withdrawals",
    "Rewards",
    "Investments",
  ];

  return (
    <div className="flex gap-3 overflow-x-auto">

      {tabs.map((tab) => (

        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`
          rounded-full
          px-5
          py-2
          whitespace-nowrap
          transition

          ${
            active === tab
              ? "bg-blue-600"
              : "bg-zinc-900 hover:bg-zinc-800"
          }
          `}
        >
          {tab}
        </button>

      ))}

    </div>
  );
}