import {
  ArrowDownCircle,
  ArrowUpCircle,
  Gift,
  Users,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Deposit",
    amount: "+500 USDT",
    date: "Today 10:35 AM",
    color: "text-green-500",
    icon: ArrowDownCircle,
  },
  {
    id: 2,
    title: "Daily Reward",
    amount: "+7.50 USDT",
    date: "Today 12:00 AM",
    color: "text-blue-500",
    icon: Gift,
  },
  {
    id: 3,
    title: "Referral Bonus",
    amount: "+25 USDT",
    date: "Yesterday",
    color: "text-yellow-500",
    icon: Users,
  },
  {
    id: 4,
    title: "Withdraw",
    amount: "-150 USDT",
    date: "3 days ago",
    color: "text-red-500",
    icon: ArrowUpCircle,
  },
];

export default function RecentActivity() {
  return (
    <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          Recent Activity
        </h2>

        <button className="text-sm text-blue-500 hover:underline">
          View All
        </button>

      </div>

      <div className="mt-6 space-y-4">

        {activities.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.id}
              className="
              flex
              items-center
              justify-between

              rounded-2xl

              bg-black

              p-4
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className={`
                  rounded-xl
                  bg-zinc-800
                  p-3
                  ${item.color}
                  `}
                >
                  <Icon size={20} />
                </div>

                <div>

                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-sm text-zinc-500">
                    {item.date}
                  </p>

                </div>

              </div>

              <h3
                className={`font-bold ${item.color}`}
              >
                {item.amount}
              </h3>

            </div>

          );

        })}

      </div>

    </div>
  );
}