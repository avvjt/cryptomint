import {
  Search,
  Star,
  ChevronDown,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import useMarketData from "../../hooks/useMarketData";

export default function TradingPair() {
  const markets = useMarketData();

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    active,
    setActive,
  ] = useState("BTCUSDT");


  const pairs = useMemo(() => {
    const list = markets.length
      ? markets
      : [
          {
            symbol: "BTCUSDT",
            lastPrice: 117250.4,
            priceChangePercent: 4.71,
          },
          {
            symbol: "ETHUSDT",
            lastPrice: 4285.62,
            priceChangePercent: -1.42,
          },
          {
            symbol: "SOLUSDT",
            lastPrice: 189.62,
            priceChangePercent: 8.72,
          },
          {
            symbol: "BNBUSDT",
            lastPrice: 815.11,
            priceChangePercent: 1.81,
          },
          {
            symbol: "XRPUSDT",
            lastPrice: 3.08,
            priceChangePercent: -3.11,
          },
        ];

    return list
      .filter((coin) =>
        coin.symbol
          .toLowerCase()
          .includes(
            search
              .toLowerCase()
              .replace("/", "")
          )
      )
      .slice(0, 12);

  }, [markets, search]);


  return (
    <section
      className="
        border-b
        border-[#1A1E24]

        bg-[#0B0E11]
      "
    >

      {/* Desktop selector */}

      <div
        className="
          hidden
          lg:flex

          items-center

          gap-2

          overflow-x-auto
          scrollbar-hide

          px-4
          py-2
        "
      >

        <div
          className="
            flex
            h-8

            w-[190px]

            shrink-0

            items-center

            rounded-md

            border
            border-[#20252C]

            bg-[#11151A]

            px-2
          "
        >

          <Search
            size={14}
            className="text-[#626B77]"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search pair..."
            className="
              ml-2

              min-w-0
              flex-1

              bg-transparent

              text-[11px]
              text-white

              outline-none

              placeholder:text-[#59626D]
            "
          />

        </div>


        {pairs.map((coin) => {
          const isActive =
            active === coin.symbol;

          const positive =
            Number(
              coin.priceChangePercent
            ) >= 0;

          const base =
            coin.symbol.replace(
              "USDT",
              ""
            );

          return (
            <button
              key={coin.symbol}
              type="button"
              onClick={() =>
                setActive(
                  coin.symbol
                )
              }
              className={`
                flex
                h-8

                shrink-0

                items-center
                gap-2

                rounded-md

                px-3

                text-[11px]

                transition

                ${
                  isActive
                    ? "bg-[#171C22] text-white"
                    : "text-[#69727E] hover:bg-[#13171C] hover:text-[#DCE1E7]"
                }
              `}
            >

              <span>
                {base}/USDT
              </span>

              <span
                className={
                  positive
                    ? "text-[#00C076]"
                    : "text-[#F6465D]"
                }
              >
                {positive
                  ? "+"
                  : ""}
                {Number(
                  coin.priceChangePercent ||
                    0
                ).toFixed(2)}
                %
              </span>

            </button>
          );
        })}

      </div>


      {/* Mobile compact pair */}

      <div
        className="
          flex
          items-center
          justify-between

          px-4
          py-3

          lg:hidden
        "
      >

        <button
          type="button"
          className="
            flex
            items-center
            gap-2
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

              bg-[#F7931A]

              text-xs
              font-bold
            "
          >
            ₿
          </div>

          <div className="text-left">

            <div
              className="
                flex
                items-center
                gap-1

                text-[15px]
                font-semibold
              "
            >
              BTC/USDT

              <ChevronDown
                size={13}
                className="text-[#69727E]"
              />
            </div>

            <p
              className="
                text-[10px]
                text-[#68717D]
              "
            >
              Bitcoin
            </p>

          </div>

        </button>


        <button
          type="button"
          className="
            text-[#626B77]
          "
        >
          <Star size={17} />
        </button>

      </div>

    </section>
  );
}