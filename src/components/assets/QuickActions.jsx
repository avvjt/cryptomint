import {
  ArrowDownToLine,
  ArrowUpFromLine,
  History,
  Repeat,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function QuickActions() {

  const navigate = useNavigate();

  const actions = [

    {
      title: "Deposit",
      subtitle: "Add Funds",
      icon: ArrowDownToLine,
      color: "text-[#00C076]",
      bg: "bg-[#00C076]/10",
      onClick: () => navigate("/deposit"),
    },

    {
      title: "Withdraw",
      subtitle: "Cash Out",
      icon: ArrowUpFromLine,
      color: "text-[#FF4D67]",
      bg: "bg-[#FF4D67]/10",
      onClick: () => navigate("/withdraw"),
    },

    {
      title: "Transfer",
      subtitle: "Move Assets",
      icon: Repeat,
      color: "text-[#1D66FF]",
      bg: "bg-[#1D66FF]/10",
      onClick: () => console.log("Transfer"),
    },

    {
      title: "History",
      subtitle: "Transactions",
      icon: History,
      color: "text-[#F6C344]",
      bg: "bg-[#F6C344]/10",
      onClick: () => console.log("History"),
    },

  ];

  return (

    <section
      className="
      grid

      grid-cols-2

      gap-4

      lg:grid-cols-4
      "
    >

      {actions.map((item) => {

        const Icon = item.icon;

        return (

          <button

            key={item.title}

            onClick={item.onClick}

            className="
            group

            rounded-[28px]

            border
            border-white/5

            bg-gradient-to-br
            from-[#111318]
            to-[#0D1119]

            p-5

            text-left

            transition-all
            duration-300

            hover:-translate-y-1

            hover:border-[#1D66FF]/30

            hover:shadow-[0_20px_40px_rgba(29,102,255,.15)]
            "

          >

            <div
              className={`
              ${item.bg}

              flex

              h-14
              w-14

              items-center
              justify-center

              rounded-2xl

              transition

              group-hover:scale-110
              `}
            >

              <Icon
                size={26}
                className={item.color}
              />

            </div>

            <h3
              className="
              mt-5

              text-lg

              font-semibold
              "
            >

              {item.title}

            </h3>

            <p
              className="
              mt-1

              text-sm

              text-zinc-500
              "
            >

              {item.subtitle}

            </p>

          </button>

        );

      })}

    </section>

  );

}