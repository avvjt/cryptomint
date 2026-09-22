import {
  Globe,
  Headphones,
  Search,
} from "lucide-react";

import logo from "../../assets/logo.png";
import Ticker from "../../components/Ticker";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function MobileHeader() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const displayName =
    user?.fullName ||
    user?.username ||
    "User";

  const avatar =
    user?.avatar ||
    user?.profileImage ||
    user?.profilePicture ||
    null;

  const initial =
    displayName.trim().charAt(0).toUpperCase() || "U";

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
        <div className="flex items-center justify-between">

          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2"
          >
            <img
              src={logo}
              alt="CryptoMintX"
              className="h-7 w-auto"
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
          <div className="flex items-center gap-3">

            {/* User */}
            {user ? (
              <button
                type="button"
                onClick={() => navigate("/profile")}
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
                  active:scale-[0.98]
                "
              >

                {/* Profile image / initial */}
                <div
                  className="
                    relative
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    bg-gradient-to-br
                    from-[#2C75FF]
                    to-[#1745A8]
                    text-sm
                    font-bold
                    text-white
                  "
                >
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={displayName}
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />
                  ) : (
                    initial
                  )}

              
                </div>

                {/* Username */}
                <div className="min-w-0 max-w-[110px] text-left mr-0.5">
                  <p
                    className="
                      truncate
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    {displayName}
                  </p>

                  {user?.username && (
                    <p
                      className="
                        truncate
                        text-[10px]
                        text-[#69727E]
                      "
                    >
                      @{user.username}
                    </p>
                  )}
                </div>

              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate("/login")}
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