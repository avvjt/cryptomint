import {
  ShieldCheck,
  Lock,
  KeyRound,
  Smartphone,
  Monitor,
  Mail,
  ChevronRight,
} from "lucide-react";

export default function SecurityCenter() {

  const score = 85;

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

            Security

          </p>

          <h2
            className="
            mt-2

            text-2xl

            font-bold
            "
          >

            Security Center

          </h2>

        </div>

        {/* Score */}

        <div className="text-center">

          <div
            className="
            flex

            h-20
            w-20

            items-center
            justify-center

            rounded-full

            border-4

            border-green-500
            "
          >

            <span
              className="
              text-2xl

              font-bold

              text-green-400
              "
            >

              {score}

            </span>

          </div>

          <p
            className="
            mt-2

            text-xs

            text-zinc-500
            "
          >

            Security Score

          </p>

        </div>

      </div>

      {/* Status */}

      <div
        className="
        mt-8

        rounded-3xl

        border

        border-green-500/20

        bg-green-500/10

        p-5
        "
      >

        <div className="flex items-center gap-3">

          <ShieldCheck
            size={24}
            className="text-green-400"
          />

          <div>

            <h3 className="font-semibold">

              Your account is secure

            </h3>

            <p
              className="
              mt-1

              text-sm

              text-zinc-400
              "
            >

              Enable Google Authenticator to
              increase your security score.

            </p>

          </div>

        </div>

      </div>

      {/* Actions */}

      <div className="mt-8 space-y-4">

        <Action
          icon={Lock}
          title="Change Password"
          description="Last changed 18 days ago"
          color="#1D66FF"
        />

        <Action
          icon={KeyRound}
          title="Google Authenticator"
          description="Not Enabled"
          color="#F6C344"
        />

        <Action
          icon={Mail}
          title="Email Verification"
          description="Verified"
          color="#00C076"
        />

        <Action
          icon={Smartphone}
          title="Phone Verification"
          description="Not Verified"
          color="#EF4444"
        />

        <Action
          icon={Monitor}
          title="Login Devices"
          description="3 Active Devices"
          color="#8B5CF6"
        />

      </div>

    </section>

  );

}

function Action({

  icon: Icon,

  title,

  description,

  color,

}) {

  return (

    <button
      className="
      flex

      w-full

      items-center

      justify-between

      rounded-2xl

      border
      border-white/5

      bg-[#171B22]

      p-4

      transition-all

      hover:border-[#1D66FF]/30

      hover:bg-[#1A1F28]
      "
    >

      <div className="flex items-center gap-4">

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

        <div className="text-left">

          <h3 className="font-semibold">

            {title}

          </h3>

          <p
            className="
            mt-1

            text-sm

            text-zinc-500
            "
          >

            {description}

          </p>

        </div>

      </div>

      <ChevronRight
        size={20}
        className="text-zinc-500"
      />

    </button>

  );

}