import {
  LayoutDashboard,
  CandlestickChart,
  ArrowUpDown,
  Wallet,
  Users,
  User,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";

export default function DashboardSidebar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const items = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Markets",
      path: "/markets",
      icon: CandlestickChart,
    },
    {
      name: "Trade",
      path: "/trade",
      icon: ArrowUpDown,
    },
    {
      name: "Team",
      path: "/team",
      icon: Users,
    },
    {
      name: "Wallet",
      path: "/wallet",
      icon: User,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const displayName =
    user?.fullName ||
    user?.name ||
    user?.username ||
    "User";

  const username = user?.username
    ? `@${user.username}`
    : "Verified User";

  const avatar = user?.avatarUrl || "";

  const initial = displayName
    .trim()
    .charAt(0)
    .toUpperCase() || "U";

  return (
    <aside
      className="
        fixed
        inset-y-0
        left-0
        z-50

        hidden
        w-[270px]

        flex-col

        border-r
        border-[#1A1E24]

        bg-[#090C10]

        lg:flex
      "
    >
      {/* =====================================================
          BRAND
      ====================================================== */}

      <div
        className="
          flex
          h-[82px]
          shrink-0
          items-center

          border-b
          border-[#171B20]

          px-6
        "
      >
        <NavLink
          to="/dashboard"
          className="
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
            "
          >
            {/* subtle glow */}

            <div
              className="
                absolute
                inset-0

                rounded-xl

                bg-[#1D66FF]/10

                blur-md
              "
            />

            <img
              src={logo}
              alt="CryptoMintX"
              className="
                relative
                h-9
                w-9
                object-contain
              "
            />
          </div>

          <div className="min-w-0">
            <h1
              className="
                truncate

                text-[17px]
                font-semibold
                tracking-[-0.02em]

                text-white
              "
            >
              CryptoMintX
            </h1>

            <p
              className="
                mt-0.5

                text-[10px]
                font-medium

                uppercase
                tracking-[0.16em]

                text-[#626A76]
              "
            >
              Trade Smarter
            </p>
          </div>
        </NavLink>
      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <div
        className="
          flex
          min-h-0
          flex-1
          flex-col
        "
      >
        <nav
          className="
            min-h-0
            flex-1

            overflow-y-auto

            px-3
            py-6

            scrollbar-none
          "
        >
          <p
            className="
              mb-3

              px-3

              text-[10px]
              font-semibold

              uppercase
              tracking-[0.18em]

              text-[#555D68]
            "
          >
            Main Menu
          </p>

          <div className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="group block"
                >
                  {({ isActive }) => (
                    <div
                      className={`
                        relative

                        flex
                        h-[48px]

                        items-center
                        justify-between

                        rounded-xl

                        px-3

                        transition-all
                        duration-200

                        ${isActive
                          ? `
                              bg-[#151B25]
                              text-white

                              shadow-[inset_0_0_0_1px_rgba(255,255,255,.035)]
                            `
                          : `
                              text-[#7C8490]

                              hover:bg-[#11151B]
                              hover:text-[#DDE2E9]
                            `
                        }
                      `}
                    >
                      {/* Active indicator */}

                      {isActive && (
                        <>
                          <span
                            className="
                              absolute
                              left-0

                              h-6
                              w-[3px]

                              rounded-r-full

                              bg-[#3B7CFF]

                              shadow-[0_0_12px_rgba(59,124,255,.7)]
                            "
                          />

                          <span
                            className="
                              pointer-events-none
                              absolute
                              inset-0

                              rounded-xl

                              bg-gradient-to-r
                              from-[#1D66FF]/5
                              to-transparent
                            "
                          />
                        </>
                      )}

                      <div
                        className="
                          relative
                          z-10

                          flex
                          min-w-0
                          items-center
                          gap-3
                        "
                      >
                        <div
                          className={`
                            flex
                            h-8
                            w-8
                            shrink-0

                            items-center
                            justify-center

                            rounded-lg

                            transition

                            ${isActive
                              ? "bg-[#1D66FF]/12 text-[#6D9EFF]"
                              : "text-[#68717D] group-hover:text-[#AAB2BD]"
                            }
                          `}
                        >
                          <Icon
                            size={18}
                            strokeWidth={1.8}
                          />
                        </div>

                        <span
                          className="
                            truncate

                            text-[13px]
                            font-medium
                          "
                        >
                          {item.name}
                        </span>
                      </div>

                      <ChevronRight
                        size={15}
                        strokeWidth={1.8}
                        className={`
                          relative
                          z-10

                          shrink-0

                          transition-all
                          duration-200

                          ${isActive
                            ? "translate-x-0 text-[#7588A7]"
                            : "-translate-x-1 text-transparent group-hover:translate-x-0 group-hover:text-[#4D5560]"
                          }
                        `}
                      />
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* ===================================================
            BOTTOM SECTION — ALWAYS PINNED
        ==================================================== */}

        <div
          className="
            shrink-0

            border-t
            border-[#070708]

            bg-[#090C10]

            p-4
          "
        >
          
          {/* User */}

          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="
    mb-3
    flex
    w-full
    items-center
    gap-3
    rounded-xl
    border
    border-[#1D2229]
    bg-[#0F1318]
    px-3
    py-3
    text-left
    transition
    hover:border-[#272E38]
    hover:bg-[#12171D]
    group
  "
          >
            {/* Avatar */}
            <div
              className="
      relative
      flex
      h-10
      w-10
      shrink-0
      items-center
      justify-center
      overflow-hidden
      rounded-full
      bg-gradient-to-br
      from-[#2C75FF]
      to-[#1745A8]
      text-sm
      font-semibold
      text-white
      shadow-[0_0_18px_rgba(29,102,255,.18)]
    "
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt={displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                initial
              )}

              {/* Online */}
              <span
                className="
        absolute
        bottom-0
        right-0
        h-2.5
        w-2.5
        rounded-full
        border-2
        border-[#0F1318]
        bg-[#20C77A]
      "
              />
            </div>

            {/* User info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p
                  className="
          truncate
          text-[13px]
          font-semibold
          text-[#E9EDF2]
        "
                >
                  {displayName}
                </p>

                {user?.isVerified && (
                  <ShieldCheck
                    size={13}
                    className="shrink-0 text-[#4E8AFF]"
                  />
                )}
              </div>

              <p
                className="
        mt-0.5
        truncate
        text-[10px]
        text-[#626A75]
      "
              >
                {username}
              </p>
            </div>

            {/* Profile shortcut */}
            <ChevronRight
              size={15}
              strokeWidth={1.8}
              className="
      shrink-0
      text-[#626A75]
      transition-transform
      group-hover:translate-x-0.5
      group-hover:text-white
    "
            />
          </button>

          {/* Logout */}

          <button
            type="button"
            onClick={handleLogout}
            className="
              group

              flex
              h-10
              w-full

              items-center
              justify-center
              gap-2.5

              rounded-xl

              border
              border-[#242A32]

              bg-[#11151A]

              text-[12px]
              font-medium

              text-[#9AA2AC]

              transition-all
              duration-200

              hover:border-red-500/20
              hover:bg-red-500/[0.06]
              hover:text-red-400

              active:scale-[0.99]
            "
          >
            <LogOut
              size={16}
              strokeWidth={1.8}
              className="
                transition
                group-hover:-translate-x-0.5
              "
            />

            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}