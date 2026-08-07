import {
  Camera,
  BadgeCheck,
  Crown,
  Calendar,
  Mail,
  ShieldCheck,
  Pencil,
} from "lucide-react";

export default function ProfileHero({

  avatar = "https://i.pravatar.cc/300",

  username = "Abhijit Biswas",

  email = "abhijit@gmail.com",

  uid = "CMX-482716",

  level = 2,

  joined = "August 2026",

  verified = true,

}) {

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

      lg:p-10
      "
    >

      {/* Glow */}

      <div
        className="
        absolute

        -right-24
        -top-24

        h-96
        w-96

        rounded-full

        bg-[#1D66FF]/10

        blur-[140px]
        "
      />

      <div className="relative">

        <div
          className="
          flex

          flex-col

          gap-8

          lg:flex-row

          lg:items-center

          lg:justify-between
          "
        >

          {/* Left */}

          <div className="flex items-center gap-6">

            {/* Avatar */}

            <div className="relative">

              <img
                src={avatar}
                alt={username}
                className="
                h-28
                w-28

                rounded-full

                border-4
                border-[#1D66FF]/30

                object-cover
                "
              />

              {/* Online */}

              <span
                className="
                absolute

                bottom-2
                right-2

                h-5
                w-5

                rounded-full

                border-4
                border-[#111318]

                bg-green-500
                "
              />

              {/* Camera */}

              <button
                className="
                absolute

                -bottom-2
                left-1/2

                -translate-x-1/2

                rounded-full

                bg-[#1D66FF]

                p-2

                shadow-lg
                "
              >

                <Camera size={16} />

              </button>

            </div>

            {/* User */}

            <div>

              <div className="flex flex-wrap items-center gap-3">

                <h1
                  className="
                  text-3xl

                  font-bold
                  "
                >

                  {username}

                </h1>

                {

                  verified && (

                    <BadgeCheck
                      size={24}
                      className="text-[#1D66FF]"
                    />

                  )

                }

              </div>

              <div
                className="
                mt-4

                flex

                flex-wrap

                gap-3
                "
              >

                <Badge>

                  <Mail size={15}/>

                  {email}

                </Badge>

                <Badge>

                  UID : {uid}

                </Badge>

                <Badge>

                  <Calendar size={15}/>

                  Joined {joined}

                </Badge>

              </div>

            </div>

          </div>

          {/* Right */}

          <div
            className="
            flex

            flex-col

            items-start

            gap-5

            lg:items-end
            "
          >

            <div
              className="
              flex

              items-center

              gap-3

              rounded-full

              bg-[#1D66FF]/10

              px-5

              py-3
              "
            >

              <Crown
                size={18}
                className="text-yellow-400"
              />

              <span
                className="
                font-semibold

                text-[#1D66FF]
                "
              >

                VIP Level {level}

              </span>

            </div>

            <div
              className="
              flex

              items-center

              gap-3

              rounded-full

              bg-green-500/10

              px-5

              py-3
              "
            >

              <ShieldCheck
                size={18}
                className="text-green-400"
              />

              <span className="text-green-400">

                Verified Account

              </span>

            </div>

            <button
              className="
              flex

              items-center

              gap-2

              rounded-full

              bg-[#1D66FF]

              px-6

              py-3

              font-semibold

              transition

              hover:bg-[#3A7BFF]
              "
            >

              <Pencil size={16}/>

              Edit Profile

            </button>

          </div>

        </div>

      </div>

    </section>

  );

}

function Badge({

  children,

}){

  return(

    <div
      className="
      flex

      items-center

      gap-2

      rounded-full

      border
      border-white/5

      bg-[#171B22]

      px-4

      py-2

      text-sm

      text-zinc-300
      "
    >

      {children}

    </div>

  );

}