import {
  ShieldCheck,
  Clock3,
  TriangleAlert,
  Wallet,
} from "lucide-react";

export default function WithdrawGuide() {

  const rules = [

    {
      icon: Wallet,
      color: "#1D66FF",
      bg: "bg-[#1D66FF]/10",
      title: "Minimum Withdrawal",
      description:
        "Minimum withdrawal amount is 50 USDT.",
    },

    {
      icon: Clock3,
      color: "#F6C344",
      bg: "bg-[#F6C344]/10",
      title: "Processing Time",
      description:
        "Withdrawals are processed within 24 hours after approval.",
    },

    {
      icon: ShieldCheck,
      color: "#00C076",
      bg: "bg-[#00C076]/10",
      title: "Security Verification",
      description:
        "Large withdrawals may require email or OTP verification.",
    },

    {
      icon: TriangleAlert,
      color: "#FF4D67",
      bg: "bg-[#FF4D67]/10",
      title: "Important",
      description:
        "Withdraw only to your own wallet. Incorrect addresses cannot be recovered.",
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

        tracking-[0.25em]

        text-xs

        text-zinc-500
        "
      >
        Withdrawal Rules
      </p>

      <h2
        className="
        mt-3

        text-3xl

        font-bold
        "
      >
        Before You Withdraw
      </h2>

      <div
        className="
        mt-8

        grid

        gap-5

        md:grid-cols-2
        "
      >

        {rules.map((rule) => {

          const Icon = rule.icon;

          return (

            <div
              key={rule.title}
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
                ${rule.bg}

                flex

                h-14
                w-14

                items-center
                justify-center

                rounded-2xl

                group-hover:scale-110

                transition-transform
                `}
              >

                <Icon
                  size={24}
                  style={{
                    color: rule.color,
                  }}
                />

              </div>

              <h3
                className="
                mt-5

                text-xl

                font-semibold
                "
              >
                {rule.title}
              </h3>

              <p
                className="
                mt-3

                leading-7

                text-zinc-400
                "
              >
                {rule.description}
              </p>

            </div>

          );

        })}

      </div>

    </section>

  );

}