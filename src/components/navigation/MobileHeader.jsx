import {
  Globe,
  Headphones,
  Search,
} from "lucide-react";

import logo from "../../assets/logo.png";
import Ticker from "../../components/Ticker";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  useState,
} from "react";

export default function MobileHeader() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [
    search,
    setSearch,
  ] = useState("");


  /* =====================================================
     SEARCH
  ===================================================== */

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      navigate("/markets");
      return;
    }

    navigate(
      `/markets?search=${encodeURIComponent(query)}`
    );
  };


  return (
    <header
      className="
        sticky
        top-0
        z-50

        border-b
        border-[#171C22]

        bg-[#05080C]/95

        backdrop-blur-xl
      "
    >

      <Ticker />

      <div className="px-4 py-3">

        {/* =================================================
            TOP ROW
        ================================================= */}

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          {/* Logo */}

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard")
            }
            className="
              flex
              items-center
              gap-2
            "
          >
            <img
              src={logo}
              alt="CryptoMintX"
              className="
                h-7
                w-auto
              "
            />

            <span
              className="
                text-lg
                font-bold
                tracking-tight
                text-white
              "
            >
              CryptoMintX
            </span>
          </button>


          {/* Actions */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            {/* Support */}

            <button
              type="button"
              aria-label="Support"
              className="
                flex
                h-9
                w-9

                items-center
                justify-center

                rounded-full

                text-[#A1A8B3]

                transition

                hover:bg-[#141920]
                hover:text-white
              "
            >
              <Headphones size={18} />
            </button>


            {/* Language */}

            <button
              type="button"
              aria-label="Language"
              className="
                flex
                h-9
                w-9

                items-center
                justify-center

                rounded-full

                text-[#A1A8B3]

                transition

                hover:bg-[#141920]
                hover:text-white
              "
            >
              <Globe size={18} />
            </button>


            {/* User */}

            {user ? (
              <button
                type="button"
                onClick={() =>
                  navigate("/profile")
                }
                className="
                  flex
                  items-center
                  gap-2

                  rounded-full

                  border
                  border-[#1D232B]

                  bg-[#0F1318]

                  px-2
                  py-1

                  transition

                  hover:border-[#272E37]
                  hover:bg-[#141920]
                "
              >

                <div
                  className="
                    flex
                    h-8
                    w-8

                    shrink-0

                    items-center
                    justify-center

                    rounded-full

                    bg-[#1D66FF]

                    text-sm
                    font-bold
                    text-white
                  "
                >
                  {user?.email
                    ?.charAt(0)
                    ?.toUpperCase() || "A"}
                </div>

                <span
                  className="
                    pr-1

                    text-sm
                    font-medium
                    text-white
                  "
                >
                  Profile
                </span>

              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  navigate("/login")
                }
                className="
                  rounded-full

                  bg-white

                  px-4
                  py-2

                  text-sm
                  font-medium

                  text-black

                  transition

                  hover:bg-[#E5E7EB]

                  active:scale-[0.98]
                "
              >
                Log In
              </button>
            )}

          </div>

        </div>


        {/* =================================================
            GLOBAL MARKET SEARCH
        ================================================= */}

        {/* <form
          onSubmit={handleSearch}
          className="mt-3"
        >
          <div
            className="
              group

              flex
              h-[46px]
              w-full

              items-center

              rounded-xl

              border
              border-[#1D232B]

              bg-[#0F1318]

              px-3.5

              transition-all
              duration-200

              focus-within:border-[#315FAE]

              focus-within:bg-[#10161D]

              focus-within:shadow-[0_0_0_3px_rgba(29,102,255,.06)]
            "
          >

            <Search
              size={18}
              strokeWidth={1.8}
              className="
                shrink-0

                text-[#626A75]

                transition-colors

                group-focus-within:text-[#78A7FF]
              "
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search coins"
              autoComplete="off"
              spellCheck="false"
              className="
                ml-3

                min-w-0
                flex-1

                bg-transparent

                text-[14px]
                text-[#F5F7FA]

                outline-none

                placeholder:text-[#626A75]

                [&::-webkit-search-cancel-button]:hidden
              "
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
                className="
                  mr-1

                  flex
                  h-7
                  w-7

                  items-center
                  justify-center

                  rounded-lg

                  text-[#626A75]

                  transition

                  hover:bg-[#191F27]
                  hover:text-white
                "
              >
                ×
              </button>
            )}

          </div>
        </form> */}

      </div>

    </header>
  );
}