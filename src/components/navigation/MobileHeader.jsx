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


export default function MobileHeader() {
  const navigate = useNavigate();

  const { user } = useAuth();





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

      </div>

    </header>
  );
}