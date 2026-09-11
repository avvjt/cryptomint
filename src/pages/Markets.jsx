import {
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import MarketCards from "../components/markets/MarketCards";
import CategoryTabs from "../components/markets/CategoryTabs";
import SearchBar from "../components/markets/SearchBar";
import MarketTable from "../components/markets/MarketTable";
import MarketsHeader from "../components/markets/MarketsHeader";


export default function Markets() {

  /* 
  =====================================================
     CATEGORY
  ===================================================== */

  const [
    activeCategory,
    setActiveCategory,
  ] = useState("All");


  /* 
  =====================================================
     URL SEARCH
  ===================================================== */

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();


  const search =
    searchParams.get("search") || "";


  /* 
  =====================================================
     SEARCH HANDLER
  ===================================================== */

  const handleSearch = (value) => {

    const trimmed =
      value.trim();

    if (!trimmed) {

      searchParams.delete(
        "search"
      );

      setSearchParams(
        searchParams
      );

      return;
    }


    setSearchParams({
      search: trimmed,
    });

  };


  return (
    <div
      className="
        min-h-screen

        bg-[#05080C]

        text-white
      "
    >

      <div
        className="
          mx-auto

          max-w-[1700px]

          px-4
          py-6

          sm:px-5
          sm:py-8
        "
      >

        {/* =================================================
            DESKTOP
        ================================================= */}

        <div className="hidden lg:block">
          <div className="my-6">
 <SearchBar
              value={search}
              onChange={handleSearch}
            />
          </div>
         

          <MarketsHeader />



          {/* Highlights */}

          <MarketCards />


          {/* Categories + Search */}

          <div
            className="
              mt-12

              flex

              flex-col

              gap-5

              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >

            <div
              className="
                min-w-0
                flex-1
              "
            >

              <CategoryTabs
                active={
                  activeCategory
                }
                onChange={
                  setActiveCategory
                }
              />

            </div>


            

          </div>


          {/* Market Table */}

          <MarketTable
            category={
              activeCategory
            }
            search={search}
          />

        </div>


        {/* =================================================
            MOBILE
        ================================================= */}

        <div className="lg:hidden">

          <CategoryTabs
            active={
              activeCategory
            }
            onChange={
              setActiveCategory
            }
          />


          <SearchBar
            value={search}
            onChange={handleSearch}
          />


          <MarketTable
            category={
              activeCategory
            }
            search={search}
          />

        </div>

      </div>

    </div>
  );
}