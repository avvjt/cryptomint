import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BadgeCheck,
  Pencil,
} from "lucide-react";

export default function AccountInformation({

  username = "Abhijit Biswas",

  email = "abhijit@gmail.com",

  phone = "+91 9876543210",

  country = "India",

  joined = "August 2026",

  verified = true,

}) {

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

            Personal Information

          </p>

          <h2
            className="
            mt-2

            text-2xl

            font-bold
            "
          >

            Account Details

          </h2>

        </div>

        <button
          className="
          flex

          items-center

          gap-2

          rounded-full

          bg-[#1D66FF]

          px-5

          py-2.5

          font-medium

          transition

          hover:bg-[#3A7BFF]
          "
        >

          <Pencil size={16}/>

          Edit

        </button>

      </div>

      {/* Details */}

      <div className="mt-8 space-y-5">

        <Item
          icon={User}
          title="Username"
          value={username}
          color="#1D66FF"
        />

        <Item
          icon={Mail}
          title="Email"
          value={email}
          color="#00C076"
        />

        <Item
          icon={Phone}
          title="Phone Number"
          value={phone}
          color="#F6C344"
        />

        <Item
          icon={MapPin}
          title="Country"
          value={country}
          color="#EF4444"
        />

        <Item
          icon={Calendar}
          title="Member Since"
          value={joined}
          color="#8B5CF6"
        />

      </div>

      {/* Verification */}

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

        <div className="flex items-center gap-4">

          <BadgeCheck
            size={24}
            className="text-green-400"
          />

          <div>

            <h3 className="font-semibold">

              {

                verified

                ? "Account Verified"

                : "Verification Required"

              }

            </h3>

            <p
              className="
              mt-1

              text-sm

              text-zinc-400
              "
            >

              {

                verified

                ? "Your email has been verified."

                : "Verify your email to increase security."

              }

            </p>

          </div>

        </div>

      </div>

    </section>

  );

}

function Item({

  icon: Icon,

  title,

  value,

  color,

}){

  return(

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

          rounded-2xl
          "
          style={{
            background:`${color}20`,
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

          <p
            className="
            text-sm

            text-zinc-500
            "
          >

            {title}

          </p>

          <h3 className="mt-1 font-semibold">

            {value}

          </h3>

        </div>

      </div>

    </div>

  );

}