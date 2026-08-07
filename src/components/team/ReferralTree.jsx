import {
  UserRound,
  Users,
  Crown,
  ChevronRight,
} from "lucide-react";

export default function ReferralTree({

  levelA = 0,

  levelB = 0,

  levelC = 0,

}) {

  const levels = [

    {
      title: "Level A",

      subtitle: "Direct Referrals",

      members: levelA,

      commission: "12%",

      color: "#1D66FF",

      icon: UserRound,

    },

    {
      title: "Level B",

      subtitle: "Second Generation",

      members: levelB,

      commission: "5%",

      color: "#00C076",

      icon: Users,

    },

    {
      title: "Level C",

      subtitle: "Third Generation",

      members: levelC,

      commission: "2%",

      color: "#F6C344",

      icon: Crown,

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
        text-xs
        uppercase
        tracking-[0.25em]
        text-zinc-500
        "
      >

        Team Hierarchy

      </p>

      <h2
        className="
        mt-3
        text-3xl
        font-bold
        "
      >

        Referral Network

      </h2>

      <div
        className="
        mt-10

        flex

        flex-col

        gap-5
        "
      >

        {levels.map((item,index)=>{

          const Icon = item.icon;

          return(

            <div
              key={item.title}
              className="
              group

              flex

              items-center

              justify-between

              rounded-3xl

              border
              border-white/5

              bg-[#171B22]

              p-5

              transition-all
              duration-300

              hover:-translate-y-1

              hover:border-[#1D66FF]/30

              hover:shadow-[0_20px_40px_rgba(29,102,255,.12)]
              "
            >

              <div className="flex items-center gap-5">

                <div
                  className="
                  flex

                  h-14
                  w-14

                  items-center
                  justify-center

                  rounded-2xl
                  "
                  style={{
                    background:`${item.color}20`
                  }}
                >

                  <Icon
                    size={26}
                    style={{
                      color:item.color
                    }}
                  />

                </div>

                <div>

                  <h3
                    className="
                    text-xl

                    font-semibold
                    "
                  >

                    {item.title}

                  </h3>

                  <p
                    className="
                    mt-1

                    text-sm

                    text-zinc-500
                    "
                  >

                    {item.subtitle}

                  </p>

                </div>

              </div>

              <div
                className="
                hidden

                md:flex

                items-center

                gap-8
                "
              >

                <div className="text-center">

                  <p className="text-xs text-zinc-500">

                    Members

                  </p>

                  <h3
                    className="
                    mt-2

                    text-2xl

                    font-bold
                    "
                  >

                    {item.members}

                  </h3>

                </div>

                <ChevronRight
                  className="text-zinc-700"
                />

                <div className="text-center">

                  <p className="text-xs text-zinc-500">

                    Commission

                  </p>

                  <h3
                    className="
                    mt-2

                    text-2xl

                    font-bold
                    "
                    style={{
                      color:item.color
                    }}
                  >

                    {item.commission}

                  </h3>

                </div>

              </div>

              {/* Mobile */}

              <div className="md:hidden text-right">

                <h3
                  className="text-2xl font-bold"
                >

                  {item.members}

                </h3>

                <p
                  className="text-sm text-zinc-500"
                >

                  {item.commission}

                </p>

              </div>

            </div>

          );

        })}

      </div>

    </section>

  );

}