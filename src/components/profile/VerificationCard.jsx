import {
  BadgeCheck,
  Mail,
  Phone,
  Shield,
  Landmark,
  ChevronRight,
} from "lucide-react";

export default function VerificationCard({

  emailVerified = true,

  phoneVerified = false,

  kycStatus = "Pending",

  bankVerified = false,

  completion = 65,

}) {

  return (

    <section
      className="
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

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <p
            className="
            text-xs

            uppercase

            tracking-[0.25em]

            text-zinc-500
            "
          >
            Verification
          </p>

          <h2
            className="
            mt-2

            text-2xl

            font-bold
            "
          >
            Account Status
          </h2>

        </div>

        <div className="text-right">

          <h3
            className="
            text-4xl

            font-bold

            text-[#1D66FF]
            "
          >

            {completion}%

          </h3>

          <p className="text-sm text-zinc-500">

            Complete

          </p>

        </div>

      </div>

      {/* Progress */}

      <div
        className="
        mt-6

        h-3

        rounded-full

        bg-[#202633]
        "
      >

        <div
          className="
          h-full

          rounded-full

          bg-gradient-to-r

          from-[#1D66FF]

          to-[#00C076]
          "
          style={{
            width: `${completion}%`,
          }}
        />

      </div>

      {/* Status */}

      <div className="mt-8 space-y-4">

        <StatusRow
          icon={Mail}
          title="Email Verification"
          verified={emailVerified}
        />

        <StatusRow
          icon={Phone}
          title="Phone Verification"
          verified={phoneVerified}
        />

        <StatusRow
          icon={Shield}
          title="KYC Verification"
          value={kycStatus}
        />

        <StatusRow
          icon={Landmark}
          title="Bank Account"
          verified={bankVerified}
        />

      </div>

      {/* CTA */}

      <button
        className="
        mt-8

        flex

        w-full

        items-center

        justify-center

        gap-3

        rounded-full

        bg-[#1D66FF]

        py-4

        font-semibold

        transition

        hover:bg-[#3A7BFF]
        "
      >

        Complete Verification

        <ChevronRight size={18}/>

      </button>

    </section>

  );

}

function StatusRow({

  icon: Icon,

  title,

  verified,

  value,

}) {

  const status =

    value ??

    (verified ? "Verified" : "Not Verified");

  const success =

    status === "Verified";

  return (

    <div
      className="
      flex

      items-center

      justify-between

      rounded-2xl

      border
      border-white/5

      bg-[#171B22]

      p-4
      "
    >

      <div className="flex items-center gap-4">

        <div
          className={`
          flex

          h-12
          w-12

          items-center
          justify-center

          rounded-xl

          ${
            success

              ? "bg-green-500/10"

              : "bg-yellow-500/10"
          }
          `}
        >

          <Icon
            size={22}
            className={
              success

                ? "text-green-400"

                : "text-yellow-400"
            }
          />

        </div>

        <h3 className="font-semibold">

          {title}

        </h3>

      </div>

      <div className="flex items-center gap-2">

        {

          success && (

            <BadgeCheck
              size={18}
              className="text-green-400"
            />

          )

        }

        <span
          className={
            success

              ? "text-green-400"

              : "text-yellow-400"
          }
        >

          {status}

        </span>

      </div>

    </div>

  );

}