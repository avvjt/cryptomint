import {
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";

import {
  Search,
  ChevronDown,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import useMarkets from "../../hooks/useMarkets";
import CoinLogo from "../markets/CoinLogo";

export default function CoinSelector({
  currentSymbol,
}) {
  const navigate = useNavigate();

  const markets = useMarkets();

  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const filteredMarkets = useMemo(() => {
    return markets
      .filter((coin) =>
        coin.symbol
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .slice(0, 30);
  }, [markets, search]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
    >
      {/* Current Coin */}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
        flex
        items-center
        gap-3

        rounded-xl

        bg-zinc-900

        px-4
        py-3

        transition

        hover:bg-zinc-800
        "
      >
        <CoinLogo symbol={currentSymbol} />

        <span className="font-semibold text-lg">
          {currentSymbol.replace(
            "USDT",
            "/USDT"
          )}
        </span>

        <ChevronDown
          size={18}
          className={`
            transition-transform
            duration-200
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* Dropdown */}

      {open && (
        <div
          className="
          absolute
          left-0
          top-full
          mt-3

          z-50

          w-[360px]
          max-h-[500px]

          overflow-y-auto

          rounded-2xl

          border
          border-zinc-800

          bg-[#050A14]

          shadow-2xl
          "
        >
          {/* Search */}

          <div className="sticky top-0 bg-[#050A14] p-4">

            <div
              className="
              flex
              items-center
              gap-2

              rounded-xl

              bg-zinc-900

              px-3
              py-2
              "
            >
              <Search
                size={18}
                className="text-zinc-500"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search Coin..."
                className="
                w-full
                bg-transparent
                outline-none
                text-white
                placeholder:text-zinc-500
                "
              />
            </div>

          </div>

          {/* Coins */}

          {filteredMarkets.map((coin) => {

            const positive =
              Number(
                coin.priceChangePercent
              ) >= 0;

            return (
              <button
                key={coin.symbol}
                onClick={() => {

                  navigate(
                    `/trade?symbol=${coin.symbol}`
                  );

                  setOpen(false);

                  setSearch("");

                }}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between

                  px-4
                  py-3

                  transition

                  ${
                    coin.symbol === currentSymbol
                      ? "bg-blue-500/10"
                      : "hover:bg-zinc-900"
                  }
                `}
              >
                {/* Left */}

                <div className="flex items-center gap-3">

                  <CoinLogo
                    symbol={coin.symbol}
                  />

                  <div className="text-left">

                    <p className="font-medium">

                      {coin.symbol.replace(
                        "USDT",
                        "/USDT"
                      )}

                    </p>

                    <p className="text-xs text-zinc-500">

                      Spot

                    </p>

                  </div>

                </div>

                {/* Right */}

                <div className="text-right">

                  <p className="font-medium">

                    $
                    {Number(
                      coin.lastPrice
                    ).toLocaleString()}

                  </p>

                  <p
                    className={`
                      text-xs
                      ${
                        positive
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    `}
                  >
                    {positive ? "+" : ""}
                    {Number(
                      coin.priceChangePercent
                    ).toFixed(2)}
                    %

                  </p>

                </div>

              </button>
            );

          })}

          {filteredMarkets.length === 0 && (
            <div className="p-8 text-center text-zinc-500">

              No coins found

            </div>
          )}

        </div>
      )}
    </div>
  );
}