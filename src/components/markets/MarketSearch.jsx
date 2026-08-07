import {
  Search,
  X,
  ArrowUpDown,
  Flame,
  TrendingUp,
} from "lucide-react";

import { useState } from "react";

export default function MarketSearch() {

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  return (

    <section
      className="
      flex

      flex-col

      gap-4

      lg:flex-row

      lg:items-center

      lg:justify-between
      "
    >

      {/* Search */}

      <div
        className="
        flex

        h-14

        flex-1

        items-center

        gap-3

        rounded-2xl

        border
        border-white/5

        bg-[#171B22]

        px-5

        focus-within:border-[#1D66FF]
        "
      >

        <Search
          size={20}
          className="text-zinc-500"
        />

        <input

          value={search}

          onChange={(e)=>
            setSearch(e.target.value)
          }

          placeholder="Search BTC, ETH, SOL..."

          className="
          w-full

          bg-transparent

          outline-none

          placeholder:text-zinc-500
          "

        />

        {

          search && (

            <button
              onClick={()=>
                setSearch("")
              }
            >

              <X
                size={18}
                className="text-zinc-500"
              />

            </button>

          )

        }

      </div>

      {/* Filters */}

      <div
        className="
        flex

        gap-3

        overflow-x-auto

        scrollbar-hide
        "
      >

        <FilterButton

          active={filter==="All"}

          onClick={()=>
            setFilter("All")
          }

          icon={ArrowUpDown}

        >

          All

        </FilterButton>

        <FilterButton

          active={filter==="Gainers"}

          onClick={()=>
            setFilter("Gainers")
          }

          icon={TrendingUp}

        >

          Top Gainers

        </FilterButton>

        <FilterButton

          active={filter==="Trending"}

          onClick={()=>
            setFilter("Trending")
          }

          icon={Flame}

        >

          Trending

        </FilterButton>

      </div>

    </section>

  );

}

function FilterButton({

  children,

  active,

  icon: Icon,

  onClick,

}){

  return(

    <button

      onClick={onClick}

      className={`
      flex

      items-center

      gap-2

      whitespace-nowrap

      rounded-full

      px-5

      py-3

      text-sm

      transition-all

      duration-300

      ${
        active

        ? "bg-[#1D66FF] text-white shadow-[0_10px_25px_rgba(29,102,255,.35)]"

        : "bg-[#171B22] text-zinc-400 hover:text-white hover:bg-[#202633]"
      }
      `}

    >

      <Icon size={16}/>

      {children}

    </button>

  );

}