import {
  Crown,
  CheckCircle2,
} from "lucide-react";

export default function CommissionTable() {

  const currentLevel = 2;

  const data = [

    {
      level: 1,
      a: "-",
      b: "-",
      c: "-",
    },

    {
      level: 2,
      a: "12%",
      b: "5%",
      c: "2%",
    },

    {
      level: 3,
      a: "13%",
      b: "6%",
      c: "3%",
    },

    {
      level: 4,
      a: "15%",
      b: "7%",
      c: "5%",
    },

    {
      level: 5,
      a: "16%",
      b: "8%",
      c: "7%",
    },

    {
      level: 6,
      a: "18%",
      b: "9%",
      c: "8%",
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
      overflow-hidden
      "
    >

      {/* Header */}

      <div className="p-6 lg:p-8">

        <p
          className="
          uppercase
          tracking-[0.25em]
          text-xs
          text-zinc-500
          "
        >

          Commission Plan

        </p>

        <h2
          className="
          mt-3
          text-3xl
          font-bold
          "
        >

          Team Income Commission

        </h2>

        <p
          className="
          mt-3
          text-zinc-400
          max-w-3xl
          "
        >

          Your commission increases as your referral
          level grows.

        </p>

      </div>

      {/* Desktop */}

      <div className="hidden lg:block overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-y border-white/5 bg-[#171B22]">

              <th className="px-8 py-5 text-left">

                Level

              </th>

              <th className="px-8 py-5 text-center">

                Level A

              </th>

              <th className="px-8 py-5 text-center">

                Level B

              </th>

              <th className="px-8 py-5 text-center">

                Level C

              </th>

            </tr>

          </thead>

          <tbody>

            {

              data.map((row)=>(

                <tr

                  key={row.level}

                  className={`
                  border-b
                  border-white/5

                  transition-all

                  hover:bg-[#171B22]

                  ${
                    currentLevel === row.level
                    ? "bg-[#1D66FF]/10"
                    : ""
                  }
                  `}
                >

                  <td className="px-8 py-6">

                    <div className="flex items-center gap-3">

                      {

                        currentLevel === row.level && (

                          <Crown
                            size={18}
                            className="text-yellow-400"
                          />

                        )

                      }

                      <span className="font-semibold">

                        Level {row.level}

                      </span>

                    </div>

                  </td>

                  <td className="text-center font-semibold text-[#1D66FF]">

                    {row.a}

                  </td>

                  <td className="text-center font-semibold text-[#00C076]">

                    {row.b}

                  </td>

                  <td className="text-center font-semibold text-[#F6C344]">

                    {row.c}

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

      {/* Mobile */}

      <div className="lg:hidden space-y-4 p-5">

        {

          data.map((row)=>(

            <div

              key={row.level}

              className={`
              rounded-3xl

              border

              p-5

              ${
                currentLevel===row.level

                ? "border-[#1D66FF] bg-[#1D66FF]/10"

                : "border-white/5 bg-[#171B22]"
              }
              `}
            >

              <div
                className="
                flex

                items-center

                justify-between
                "
              >

                <div className="flex items-center gap-2">

                  {

                    currentLevel===row.level && (

                      <CheckCircle2
                        size={18}
                        className="text-[#1D66FF]"
                      />

                    )

                  }

                  <h3 className="font-semibold">

                    Level {row.level}

                  </h3>

                </div>

              </div>

              <div
                className="
                mt-5

                grid

                grid-cols-3

                gap-3

                text-center
                "
              >

                <Item
                  title="A"
                  value={row.a}
                  color="text-[#1D66FF]"
                />

                <Item
                  title="B"
                  value={row.b}
                  color="text-[#00C076]"
                />

                <Item
                  title="C"
                  value={row.c}
                  color="text-[#F6C344]"
                />

              </div>

            </div>

          ))

        }

      </div>

    </section>

  );

}

function Item({

  title,

  value,

  color,

}){

  return(

    <div>

      <p
        className="
        text-xs
        text-zinc-500
        "
      >

        Level {title}

      </p>

      <h3
        className={`
        mt-2

        text-xl

        font-bold

        ${color}
        `}
      >

        {value}

      </h3>

    </div>

  );

}