import {
  Moon,
  Globe,
  DollarSign,
  Bell,
  ChevronRight,
} from "lucide-react";

export default function PreferencesCard() {

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

      <div>

        <p
          className="
          text-xs

          uppercase

          tracking-[0.25em]

          text-zinc-500
          "
        >

          Preferences

        </p>

        <h2
          className="
          mt-2

          text-2xl

          font-bold
          "
        >

          App Settings

        </h2>

      </div>

      <div className="mt-8 space-y-4">

        <SettingRow
          icon={Moon}
          title="Theme"
          value="Dark"
          color="#6366F1"
        />

        <SettingRow
          icon={Globe}
          title="Language"
          value="English"
          color="#00C076"
        />

        <SettingRow
          icon={DollarSign}
          title="Currency"
          value="USD"
          color="#F6C344"
        />

        <ToggleRow
          icon={Bell}
          title="Push Notifications"
          enabled={true}
          color="#1D66FF"
        />

      </div>

    </section>

  );

}

function SettingRow({

  icon: Icon,

  title,

  value,

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

      transition

      hover:border-[#1D66FF]/30
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

        <div className="text-left">

          <h3 className="font-semibold">

            {title}

          </h3>

          <p className="text-sm text-zinc-500">

            {value}

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

function ToggleRow({

  icon: Icon,

  title,

  enabled,

  color,

}) {

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

        <div>

          <h3 className="font-semibold">

            {title}

          </h3>

          <p className="text-sm text-zinc-500">

            Receive important alerts

          </p>

        </div>

      </div>

      <button
        className={`
        relative

        h-7
        w-14

        rounded-full

        transition

        ${
          enabled

          ? "bg-[#1D66FF]"

          : "bg-zinc-600"
        }
        `}
      >

        <span
          className={`
          absolute

          top-1

          h-5
          w-5

          rounded-full

          bg-white

          transition-all

          ${
            enabled

            ? "left-8"

            : "left-1"
          }
          `}
        />

      </button>

    </div>

  );

}