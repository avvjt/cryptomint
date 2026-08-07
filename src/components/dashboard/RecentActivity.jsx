import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Gift,
  Users,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const activities = [
  {
    id: 1,
    type: "Deposit",
    amount: "+500 USDT",
    icon: ArrowDownToLine,
    color: "text-[#00C076]",
    bg: "bg-[#00C076]/10",
    status: "Completed",
    time: "Today • 10:25 AM",
  },
  {
    id: 2,
    type: "Daily Reward",
    amount: "+7.50 USDT",
    icon: Gift,
    color: "text-[#F6C344]",
    bg: "bg-[#F6C344]/10",
    status: "Completed",
    time: "Today • 08:00 AM",
  },
  {
    id: 3,
    type: "Team Commission",
    amount: "+12.80 USDT",
    icon: Users,
    color: "text-[#1D66FF]",
    bg: "bg-[#1D66FF]/10",
    status: "Completed",
    time: "Yesterday",
  },
  {
    id: 4,
    type: "Withdrawal",
    amount: "-100 USDT",
    icon: ArrowUpFromLine,
    color: "text-[#FF4D67]",
    bg: "bg-[#FF4D67]/10",
    status: "Pending",
    time: "Yesterday",
  },
];

export default function RecentActivity() {
  return (
    <section
      className="
      rounded-[32px]
      border
      border-white/5
      bg-[#111318]
      "
    >
      {/* Header */}

      <div
        className="
        flex
        items-center
        justify-between
        border-b
        border-white/5
        p-6
        "
      >
        <div>
          <p className="text-sm text-zinc-500">
            Recent Activity
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Transaction History
          </h2>
        </div>

        <button
          className="
          rounded-full
          bg-[#171B22]
          px-5
          py-2
          text-sm
          hover:bg-[#202633]
          "
        >
          View All
        </button>
      </div>

      {/* Activity */}

      <div>

        {activities.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.id}
              className="
              flex
              items-center
              justify-between
              border-b
              border-white/5
              p-5
              transition
              hover:bg-[#171B22]
              last:border-none
              "
            >

              {/* Left */}

              <div className="flex items-center gap-4">

                <div
                  className={`
                  ${item.bg}

                  flex

                  h-12
                  w-12

                  items-center
                  justify-center

                  rounded-2xl
                  `}
                >

                  <Icon
                    size={22}
                    className={item.color}
                  />

                </div>

                <div>

                  <h3 className="font-semibold">

                    {item.type}

                  </h3>

                  <p
                    className="
                    mt-1

                    text-sm

                    text-zinc-500
                    "
                  >

                    {item.time}

                  </p>

                </div>

              </div>

              {/* Right */}

              <div className="text-right">

                <h3
                  className={`
                  text-lg

                  font-semibold

                  ${item.color}
                  `}
                >

                  {item.amount}

                </h3>

                <div
                  className="
                  mt-2

                  flex

                  items-center

                  justify-end

                  gap-1

                  text-xs

                  text-zinc-400
                  "
                >

                  {item.status === "Completed" ? (

                    <CheckCircle2
                      size={14}
                      className="text-[#00C076]"
                    />

                  ) : (

                    <Clock3
                      size={14}
                      className="text-yellow-400"
                    />

                  )}

                  {item.status}

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </section>
  );
}