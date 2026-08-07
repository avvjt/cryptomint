import {
  Search,
  Users,
  CircleDollarSign,
  Crown,
} from "lucide-react";

import { useMemo, useState } from "react";

export default function TeamMembers({

  members = [],

}) {

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  const demo = [

    {
      id: 1,
      username: "john_crypto",
      email: "john@gmail.com",
      team: "A",
      investment: 500,
      today: 7.5,
      level: 2,
      joined: "Today",
    },

    {
      id: 2,
      username: "alex_trader",
      email: "alex@gmail.com",
      team: "A",
      investment: 1200,
      today: 18,
      level: 3,
      joined: "Yesterday",
    },

    {
      id: 3,
      username: "emma",
      email: "emma@gmail.com",
      team: "B",
      investment: 300,
      today: 4.5,
      level: 1,
      joined: "2 Days Ago",
    },

    {
      id: 4,
      username: "james",
      email: "james@gmail.com",
      team: "C",
      investment: 6000,
      today: 198,
      level: 5,
      joined: "Jul 26",
    },

  ];

  const data =
    members.length
      ? members
      : demo;

  const filtered = useMemo(() => {

    return data.filter((user) => {

      const matchSearch =

        user.username
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        user.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchFilter =

        filter === "All"

          ? true

          : user.team === filter;

      return matchSearch && matchFilter;

    });

  }, [search, filter, data]);

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

          tracking-[.25em]

          text-xs

          text-zinc-500
          "
        >

          Referral Members

        </p>

        <h2
          className="
          mt-3

          text-3xl

          font-bold
          "
        >

          Team Members

        </h2>

      </div>

      {/* Search */}

      <div
        className="
        px-6

        lg:px-8

        flex

        flex-col

        gap-4

        lg:flex-row

        lg:items-center

        lg:justify-between
        "
      >

        <div
          className="
          flex

          items-center

          gap-3

          rounded-2xl

          border
          border-white/5

          bg-[#171B22]

          px-4

          h-12

          lg:w-[340px]
          "
        >

          <Search
            size={18}
            className="text-zinc-500"
          />

          <input

            value={search}

            onChange={(e)=>
              setSearch(e.target.value)
            }

            placeholder="Search member..."

            className="
            w-full

            bg-transparent

            outline-none
            "

          />

        </div>

        <select

          value={filter}

          onChange={(e)=>
            setFilter(e.target.value)
          }

          className="
          h-12

          rounded-2xl

          border
          border-white/5

          bg-[#171B22]

          px-5

          outline-none
          "

        >

          <option>All</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>

        </select>

      </div>

      {/* Desktop */}

      <div className="hidden lg:block mt-8">

        <table className="w-full">

          <thead>

            <tr className="border-y border-white/5 bg-[#171B22]">

              <th className="px-8 py-5 text-left">

                Member

              </th>

              <th className="text-center">

                Team

              </th>

              <th className="text-center">

                Investment

              </th>

              <th className="text-center">

                Today

              </th>

              <th className="text-center">

                Level

              </th>

              <th className="text-center">

                Joined

              </th>

            </tr>

          </thead>

          <tbody>

            {

              filtered.map((user)=>(

                <tr

                  key={user.id}

                  className="
                  border-b
                  border-white/5

                  hover:bg-[#171B22]

                  transition
                  "

                >

                  <td className="px-8 py-5">

                    <div className="flex items-center gap-4">

                      <div
                        className="
                        flex

                        h-12
                        w-12

                        items-center
                        justify-center

                        rounded-full

                        bg-[#1D66FF]/10
                        "
                      >

                        <Users
                          size={20}
                          className="text-[#1D66FF]"
                        />

                      </div>

                      <div>

                        <h3 className="font-semibold">

                          {user.username}

                        </h3>

                        <p
                          className="
                          mt-1

                          text-sm

                          text-zinc-500
                          "
                        >

                          {user.email}

                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="text-center">

                    {user.team}

                  </td>

                  <td className="text-center">

                    {user.investment} USDT

                  </td>

                  <td className="text-center text-green-400">

                    +{user.today} USDT

                  </td>

                  <td>

                    <div className="flex justify-center">

                      <span
                        className="
                        rounded-full

                        bg-[#1D66FF]/10

                        px-4
                        py-1

                        text-sm

                        text-[#1D66FF]
                        "
                      >

                        Lv {user.level}

                      </span>

                    </div>

                  </td>

                  <td className="text-center text-zinc-500">

                    {user.joined}

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

      {/* Mobile */}

      <div className="lg:hidden p-5 space-y-4">

        {

          filtered.map((user)=>(

            <div

              key={user.id}

              className="
              rounded-3xl

              border
              border-white/5

              bg-[#171B22]

              p-5
              "

            >

              <div className="flex justify-between">

                <div>

                  <h3 className="font-semibold">

                    {user.username}

                  </h3>

                  <p className="text-sm text-zinc-500">

                    {user.email}

                  </p>

                </div>

                <span
                  className="
                  rounded-full

                  bg-[#1D66FF]/10

                  px-3
                  py-1

                  text-xs

                  text-[#1D66FF]
                  "
                >

                  {user.team}

                </span>

              </div>

              <div
                className="
                mt-5

                grid

                grid-cols-2

                gap-4
                "
              >

                <Info
                  icon={CircleDollarSign}
                  title="Investment"
                  value={`${user.investment} USDT`}
                />

                <Info
                  icon={Crown}
                  title="Level"
                  value={`Lv ${user.level}`}
                />

              </div>

              <div
                className="
                mt-5

                flex

                justify-between

                text-sm
                "
              >

                <span className="text-green-400">

                  +{user.today} USDT

                </span>

                <span className="text-zinc-500">

                  {user.joined}

                </span>

              </div>

            </div>

          ))

        }

      </div>

    </section>

  );

}

function Info({

  icon: Icon,

  title,

  value,

}) {

  return(

    <div>

      <div className="flex items-center gap-2">

        <Icon
          size={16}
          className="text-[#1D66FF]"
        />

        <span
          className="
          text-xs

          text-zinc-500
          "
        >

          {title}

        </span>

      </div>

      <h3
        className="
        mt-2

        font-semibold
        "
      >

        {value}

      </h3>

    </div>

  );

}