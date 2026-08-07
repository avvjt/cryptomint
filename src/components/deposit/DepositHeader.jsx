import {
  ShieldCheck,
  Coins,
  Clock3,
} from "lucide-react";

export default function DepositHeader() {

  return (

    <section
      className="
      rounded-[32px]

      border
      border-white/5

      bg-gradient-to-br
      from-[#111318]
      to-[#0D1119]

      overflow-hidden

      relative

      p-6

      lg:p-8
      "
    >

      {/* Background Glow */}

      <div
        className="
        absolute

        -right-20
        -top-20

        h-72
        w-72

        rounded-full

        bg-[#1D66FF]/10

        blur-[120px]
        "
      />

      <div className="relative">

        {/* Title */}

        <p
          className="
          uppercase

          tracking-[0.25em]

          text-xs

          text-zinc-500
          "
        >
          Crypto Deposit
        </p>

        <h1
          className="
          mt-3

          text-3xl

          font-bold

          lg:text-5xl
          "
        >
          Deposit USDT
        </h1>

        <p
          className="
          mt-4

          max-w-2xl

          text-zinc-400

          leading-7
          "
        >
          Deposit cryptocurrency into your CryptoMintX
          investment wallet. After confirmation your
          investment will be activated automatically.
        </p>

        {/* Info Cards */}

        <div
          className="
          mt-10

          grid

          gap-4

          sm:grid-cols-3
          "
        >

          <InfoCard
            icon={Coins}
            title="Minimum Deposit"
            value="50 USDT"
            color="#1D66FF"
          />

          <InfoCard
            icon={Clock3}
            title="Confirmation"
            value="10 - 30 Minutes"
            color="#F6C344"
          />

          <InfoCard
            icon={ShieldCheck}
            title="Security"
            value="100% Verified"
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

      bg-[#171B22]/80

      backdrop-blur-xl

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