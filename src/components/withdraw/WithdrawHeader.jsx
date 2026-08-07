import {
  ArrowUpFromLine,
  ShieldCheck,
  Clock3,
  CircleDollarSign,
} from "lucide-react";

export default function WithdrawHeader() {

  return (

    <section
      className="
      relative

      overflow-hidden

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

      {/* Glow */}

      <div
        className="
        absolute

        -right-24
        -top-24

        h-80
        w-80

        rounded-full

        bg-[#1D66FF]/10

        blur-[120px]
        "
      />

      <div className="relative">

        <div className="flex items-center gap-4">

          <div
            className="
            flex

            h-16
            w-16

            items-center
            justify-center

            rounded-3xl

            bg-[#1D66FF]/10
            "
          >

            <ArrowUpFromLine
              size={30}
              className="text-[#1D66FF]"
            />

          </div>

          <div>

            <p
              className="
              uppercase

              tracking-[0.25em]

              text-xs

              text-zinc-500
              "
            >

              Crypto Withdrawal

            </p>

            <h1
              className="
              mt-2

              text-3xl

              font-bold

              lg:text-5xl
              "
            >

              Withdraw USDT

            </h1>

          </div>

        </div>

        <p
          className="
          mt-6

          max-w-3xl

          leading-7

          text-zinc-400
          "
        >

          Withdraw your earnings safely to your
          external wallet. Requests are processed
          automatically after security verification.

        </p>

        {/* Info */}

        <div
          className="
          mt-10

          grid

          gap-4

          md:grid-cols-3
          "
        >

          <InfoCard

            icon={CircleDollarSign}

            title="Minimum Withdrawal"

            value="50 USDT"

            color="#1D66FF"

          />

          <InfoCard

            icon={Clock3}

            title="Processing Time"

            value="Within 24 Hours"

            color="#F6C344"

          />

          <InfoCard

            icon={ShieldCheck}

            title="Security"

            value="Manual Verification"

            color="#00C076"

          />

        </div>

      </div>

    </section>

  );

}

function InfoCard({

  icon: Icon,

  title,

  value,

  color,

}) {

  return (

    <div
      className="
      rounded-3xl

      border
      border-white/5

      bg-[#171B22]

      p-5

      transition-all

      duration-300

      hover:-translate-y-1

      hover:border-[#1D66FF]/30
      "
    >

      <div
        className="
        flex

        h-12
        w-12

        items-center
        justify-center

        rounded-2xl
        "
        style={{
          background: `${color}20`,
        }}
      >

        <Icon
          size={22}
          style={{
            color,
          }}
        />

      </div>

      <p
        className="
        mt-5

        text-sm

        text-zinc-500
        "
      >

        {title}

      </p>

      <h3
        className="
        mt-2

        text-xl

        font-semibold
        "
      >

        {value}

      </h3>

    </div>

  );

}