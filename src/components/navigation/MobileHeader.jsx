import {
  Search,
  Globe,
  Headphones,
} from "lucide-react";

import logo from "../../assets/logo.png";
import Ticker from "../../components/Ticker";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function MobileHeader() {

  const navigate = useNavigate();
  const {user} = useAuth();
  return (
    <header
      className="
      sticky
      top-0
      z-50

      bg-black/95
      backdrop-blur-xl

      border-b
      border-[#111827]
      "
    >
      <Ticker />
      <div className="px-4 py-3">

        {/* Top Row */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="CryproMintX"
              className="h-7"
            />

            <span className="font-bold text-lg text-white">
              CryproMintX
            </span>
          </div>

          <div className="flex items-center gap-4">

            <button>
              <Headphones
                size={18}
                className="text-zinc-300"
              />
            </button>

            <button>
              <Globe
                size={18}
                className="text-zinc-300"
              />
            </button>


            {user ? (
              <button
                onClick={() => navigate("/profile")}
                className="
                          flex
                          items-center
                          gap-2

                          rounded-full

                          bg-[#111827]

                          px-3
                          py-1.5

                          transition

                          hover:bg-[#1B2432]
                          "
              >
                <div
                  className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center

                            rounded-full

                            bg-[#1D66FF]

                            text-sm
                            font-bold
                            text-white
                            "
                >
                  {user.email.charAt(0).toUpperCase()}
                </div>

                <span className="text-sm text-white">
                  Profile
                </span>
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="
                        rounded-full
                        bg-white
                        px-4
                        py-1.5
                        text-sm
                        font-medium
                        text-black
                        transition
                        hover:bg-gray-200
                        "
              >
                Log In
              </button>
            )}

          </div>

        </div>

        {/* Search */}
        <div
          className="
          mt-4

          flex
          items-center
          gap-2

          rounded-full

          bg-[#111827]

          px-4
          py-3
          "
        >
          <Search
            size={16}
            className="text-zinc-500"
          />

          <input
            placeholder="Search coins"
            className="
            w-full
            bg-transparent
            text-sm
            outline-none
            text-white
            "
          />
        </div>

      </div>
    </header>
  );
}