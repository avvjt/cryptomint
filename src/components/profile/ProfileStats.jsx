import { useTradeWalletContext } from "../../context/TradeWalletContext";

export default function ProfileStats({
  deposit = 0,
  withdraw = 0,
  earnings = 0,
  referral = 0,
  team = 0,
}) {
  const { availableBalance, loading } = useTradeWalletContext();

  const walletBalance = Number(availableBalance || 0);

  const formatAmount = (value) =>
    Number(value || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const stats = [
    {
      label: "Wallet Balance",
      value: loading ? "Loading..." : `$${formatAmount(walletBalance)}`,
    },
    {
      label: "Total Deposit",
      value: `$${formatAmount(deposit)}`,
    },
    {
      label: "Total Withdraw",
      value: `$${formatAmount(withdraw)}`,
    },
    {
      label: "Total Earnings",
      value: `$${formatAmount(earnings)}`,
    },
    {
      label: "Referral Income",
      value: `$${formatAmount(referral)}`,
    },
    {
      label: "Team Members",
      value: team,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-white/10 bg-[#111419] p-4"
        >
          <p className="text-xs text-gray-400">{stat.label}</p>

          <p className="mt-2 text-lg font-bold text-white">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}