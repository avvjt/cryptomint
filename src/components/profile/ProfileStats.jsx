import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Coins,
  Users,
  Gift,
} from "lucide-react";

export default function ProfileStats({

  wallet = 1520.50,

  deposit = 5000,

  withdraw = 1800,

  earnings = 920,

  referral = 285,

  team = 18,

}) {

  return (

    <section>

      <div
        className="
        grid

        gap-5

        sm:grid-cols-2

        xl:grid-cols-3
        "
      >

        <Card
          icon={Wallet}
          title="Wallet Balance"
          value={`$${wallet.toLocaleString()}`}
          color="#1D66FF"
        />

        <Card
          icon={ArrowDownCircle}
          title="Total Deposit"
          value={`$${deposit.toLocaleString()}`}
          color="#00C076"
        />

        <Card
          icon={ArrowUpCircle}
          title="Total Withdraw"
          value={`$${withdraw.toLocaleString()}`}
          color="#FF4D67"
        />

        <Card
          icon={Coins}
          title="Total Earnings"
          value={`$${earnings.toLocaleString()}`}
          color="#F6C344"
        />

        <Card
          icon={Gift}
          title="Referral Income"
          value={`$${referral.toLocaleString()}`}
          color="#A855F7"
        />

        <Card
          icon={Users}
          title="Team Members"
          value={team}
          color="#06B6D4"
        />

      </div>

    </section>

  );

}

function Card({

  icon: Icon,

  title,

  value,

  color,

}) {

  return (

    <div
      className="
      group

      rounded-[28px]

      border
      border-white/5

      bg-gradient-to-br
      from-[#111318]
      to-[#0D1119]

      p-6

      transition-all

      duration-300

      hover:-translate-y-1

      hover:border-[#1D66FF]/30

      hover:shadow-[0_20px_45px_rgba(29,102,255,.12)]
      "
    >

      <div
        className="
        flex

        h-14
        w-14

        items-center
        justify-center

        rounded-2xl

        transition-transform

        duration-300

        group-hover:scale-110
        "
        style={{
          background: `${color}20`,
        }}
      >

        <Icon
          size={24}
          style={{
            color,
          }}
        />

      </div>

      <p
        className="
        mt-6

        text-sm

        text-zinc-500
        "
      >

        {title}

      </p>

      <h2
        className="
        mt-2

        text-3xl

        font-bold
        "
      >

        {value}

      </h2>

    </div>

  );

}