import {
  Gift,
  Copy,
  Share2,
  QrCode,
  Users,
  DollarSign,
} from "lucide-react";

export default function ReferralCard({

  code = "CMX8JH29",

  link = "https://cryptomintx.com/signup?ref=CMX8JH29",

  totalReferrals = 18,

  referralIncome = 285.50,

}) {

  const copy = (text) => {

    navigator.clipboard.writeText(text);

  };

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
      via-[#121826]
      to-[#0D1119]

      p-6

      lg:p-8
      "
    >

      {/* Background Glow */}

      <div
        className="
        absolute

        -right-16
        -top-16

        h-64
        w-64

        rounded-full

        bg-[#1D66FF]/10

        blur-[120px]
        "
      />

      <div className="relative">

        {/* Header */}

        <div className="flex items-center gap-4">

          <div
            className="
            flex

            h-16
            w-16

            items-center
            justify-center

            rounded-2xl

            bg-[#1D66FF]/10
            "
          >

            <Gift
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

              Referral Program

            </p>

            <h2
              className="
              mt-2

              text-3xl

              font-bold
              "
            >

              Invite & Earn

            </h2>

          </div>

        </div>

        {/* Stats */}

        <div
          className="
          mt-8

          grid

          gap-4

          sm:grid-cols-2
          "
        >

          <Stat

            icon={Users}

            title="Total Referrals"

            value={totalReferrals}

            color="#1D66FF"

          />

          <Stat

            icon={DollarSign}

            title="Referral Income"

            value={`$${referralIncome.toFixed(2)}`}

            color="#00C076"

          />

        </div>

        {/* Referral Code */}

        <div className="mt-8">

          <p className="text-sm text-zinc-500">

            Referral Code

          </p>

          <div
            className="
            mt-3

            flex

            items-center

            justify-between

            rounded-2xl

            bg-[#171B22]

            px-5

            py-4
            "
          >

            <h3
              className="
              text-xl

              font-bold

              tracking-widest
              "
            >

              {code}

            </h3>

            <button

              onClick={() => copy(code)}

              className="
              rounded-xl

              bg-[#1D66FF]

              p-3

              transition

              hover:bg-[#3A7BFF]
              "

            >

              <Copy size={18}/>

            </button>

          </div>

        </div>

        {/* Referral Link */}

        <div className="mt-6">

          <p className="text-sm text-zinc-500">

            Referral Link

          </p>

          <div
            className="
            mt-3

            rounded-2xl

            bg-[#171B22]

            p-4
            "
          >

            <p
              className="
              break-all

              text-sm

              text-zinc-400
              "
            >

              {link}

            </p>

          </div>

        </div>

        {/* Buttons */}

        <div
          className="
          mt-8

          grid

          grid-cols-3

          gap-3
          "
        >

          <button

            onClick={() => copy(link)}

            className="
            flex

            items-center

            justify-center

            gap-2

            rounded-2xl

            bg-[#1D66FF]

            py-3

            font-medium

            transition

            hover:bg-[#3A7BFF]
            "

          >

            <Copy size={18}/>

            Copy

          </button>

          <button
            className="
            flex

            items-center

            justify-center

            gap-2

            rounded-2xl

            bg-[#171B22]

            py-3

            transition

            hover:bg-[#202633]
            "
          >

            <Share2 size={18}/>

            Share

          </button>

          <button
            className="
            flex

            items-center

            justify-center

            gap-2

            rounded-2xl

            bg-[#171B22]

            py-3

            transition

            hover:bg-[#202633]
            "
          >

            <QrCode size={18}/>

            QR

          </button>

        </div>

      </div>

    </section>

  );

}

function Stat({

  icon: Icon,

  title,

  value,

  color,

}) {

  return (

    <div
      className="
      rounded-2xl

      border
      border-white/5

      bg-[#171B22]

      p-5
      "
    >

      <div
        className="
        flex

        h-12
        w-12

        items-center
        justify-center

        rounded-xl
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
        mt-4

        text-sm

        text-zinc-500
        "
      >

        {title}

      </p>

      <h3
        className="
        mt-2

        text-2xl

        font-bold
        "
      >

        {value}

      </h3>

    </div>

  );

}