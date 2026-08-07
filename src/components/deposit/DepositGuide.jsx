import {
  ShieldCheck,
  Clock3,
  TriangleAlert,
  CircleCheckBig,
} from "lucide-react";

export default function DepositGuide({

  minimum = 50,

  confirmations = 20,

}) {

  const items = [

    {
      icon: CircleCheckBig,
      color: "text-[#00C076]",
      bg: "bg-[#00C076]/10",
      title: "Minimum Deposit",
      description: `Minimum deposit amount is ${minimum} USDT.`,
    },

    {
      icon: Clock3,
      color: "text-[#F6C344]",
      bg: "bg-[#F6C344]/10",
      title: "Confirmation Time",
      description: `Deposits are credited after ${confirmations} blockchain confirmations.`,
    },

    {
      icon: ShieldCheck,
      color: "text-[#1D66FF]",
      bg: "bg-[#1D66FF]/10",
      title: "Correct Network",
      description:
        "Always send USDT using the selected network only.",
    },

    {
      icon: TriangleAlert,
      color: "text-[#FF4D67]",
      bg: "bg-[#FF4D67]/10",
      title: "Warning",
      description:
        "Sending unsupported assets may permanently lose your funds.",
    },

  ];

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

        tracking-[.25em]

        text-xs

        text-zinc-500
        "
      >

        Deposit Rules

      </p>

      <h2
        className="
        mt-3

        text-3xl

        font-bold
        "
      >

        Before You Deposit

      </h2>

      <div
        className="
        mt-8

        grid

        gap-5

        md:grid-cols-2
        "
      >

        {items.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.title}
              className="
              group

              rounded-3xl

              border
              border-white/5

              bg-[#171B22]

              p-6

              transition-all

              duration-300

              hover:-translate-y-1

              hover:border-[#1D66FF]/30
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

                transition-transform

                duration-300

                group-hover:scale-110
                `}
              >

                <Icon
                  size={24}
                  className={item.color}
                />

              </div>

              <h3
                className="
                mt-5

                text-xl

                font-semibold
                "
              >

                {item.title}

              </h3>

              <p
                className="
                mt-3

                leading-7

                text-zinc-400
                "
              >

                {item.description}

              </p>

            </div>

          );

        })}

      </div>

    </section>

  );

}