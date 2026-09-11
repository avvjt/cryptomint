import { useEffect, useMemo, useRef, useState } from "react";

import {
  Star,
  ChevronDown,
  Search,
  MoreHorizontal,
  X,
} from "lucide-react";

import { useSearchParams } from "react-router-dom";


/* =========================================================
   POPULAR COINS
========================================================= */

const COINS = [
  {
    symbol: "BTCUSDT",
    short: "BTC",
    name: "Bitcoin",
  },
  {
    symbol: "ETHUSDT",
    short: "ETH",
    name: "Ethereum",
  },
  {
    symbol: "BNBUSDT",
    short: "BNB",
    name: "BNB",
  },
  {
    symbol: "SOLUSDT",
    short: "SOL",
    name: "Solana",
  },
  {
    symbol: "XRPUSDT",
    short: "XRP",
    name: "XRP",
  },
  {
    symbol: "ADAUSDT",
    short: "ADA",
    name: "Cardano",
  },
  {
    symbol: "DOGEUSDT",
    short: "DOGE",
    name: "Dogecoin",
  },
  {
    symbol: "TRXUSDT",
    short: "TRX",
    name: "TRON",
  },
  {
    symbol: "AVAXUSDT",
    short: "AVAX",
    name: "Avalanche",
  },
  {
    symbol: "LINKUSDT",
    short: "LINK",
    name: "Chainlink",
  },
  {
    symbol: "DOTUSDT",
    short: "DOT",
    name: "Polkadot",
  },
  {
    symbol: "LTCUSDT",
    short: "LTC",
    name: "Litecoin",
  },
  {
    symbol: "ATOMUSDT",
    short: "ATOM",
    name: "Cosmos",
  },
  {
    symbol: "NEARUSDT",
    short: "NEAR",
    name: "NEAR Protocol",
  },
  {
    symbol: "APTUSDT",
    short: "APT",
    name: "Aptos",
  },
  {
    symbol: "ARBUSDT",
    short: "ARB",
    name: "Arbitrum",
  },
  {
    symbol: "OPUSDT",
    short: "OP",
    name: "Optimism",
  },
  {
    symbol: "SUIUSDT",
    short: "SUI",
    name: "Sui",
  },
  {
    symbol: "PEPEUSDT",
    short: "PEPE",
    name: "Pepe",
  },
  {
    symbol: "SHIBUSDT",
    short: "SHIB",
    name: "Shiba Inu",
  },
];


/* =========================================================
   ICON
========================================================= */

function getLogo(symbol) {
  const base = symbol
    .replace("USDT", "")
    .toLowerCase();

  return `https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/${base}.png`;
}


function CoinIcon({
  coin,
  className = "h-9 w-9",
}) {
  const [failed, setFailed] =
    useState(false);

  if (failed) {
    return (
      <div
        className={`
          ${className}

          flex
          shrink-0
          items-center
          justify-center

          rounded-full

          bg-[#1A1E24]

          text-[10px]
          font-bold
          text-white
        `}
      >
        {coin.short.slice(0, 2)}
      </div>
    );
  }

  return (
    <img
      src={getLogo(coin.symbol)}
      alt={coin.name}
      className={`
        ${className}

        shrink-0

        rounded-full
      `}
      onError={() => setFailed(true)}
    />
  );
}


/* =========================================================
   HEADER
========================================================= */

export default function TradeHeader() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const currentSymbol =
    searchParams.get("symbol")?.toUpperCase() ||
    "BTCUSDT";

  const selectedCoin =
    COINS.find(
      (coin) =>
        coin.symbol === currentSymbol
    ) || COINS[0];

  const [open, setOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const dropdownRef =
    useRef(null);


  /* =====================================================
     CLOSE ON OUTSIDE CLICK
  ===================================================== */

  useEffect(() => {
    function handleOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutside
      );
    };
  }, []);


  /* =====================================================
     FILTER
  ===================================================== */

  const filteredCoins =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      if (!query) {
        return COINS;
      }

      return COINS.filter(
        (coin) =>
          coin.short
            .toLowerCase()
            .includes(query) ||
          coin.name
            .toLowerCase()
            .includes(query) ||
          coin.symbol
            .toLowerCase()
            .includes(query)
      );
    }, [search]);


  /* =====================================================
     SELECT COIN
  ===================================================== */

  function selectCoin(coin) {
    setSearchParams(
      {
        symbol: coin.symbol,
      },
      {
        replace: true,
      }
    );

    setOpen(false);
    setSearch("");
  }


  /* =====================================================
     DEMO DATA
  ===================================================== */

  const prices = {
    BTCUSDT: {
      price: 117250.4,
      change: 4.71,
      high: 120500,
      low: 114358,
      volume: "14.98K",
      amount: "1.03B",
    },

    ETHUSDT: {
      price: 4285.62,
      change: -1.42,
      high: 4388,
      low: 4172,
      volume: "8.32K",
      amount: "35.7M",
    },

    SOLUSDT: {
      price: 189.62,
      change: 8.72,
      high: 195.44,
      low: 173.12,
      volume: "26.21K",
      amount: "49.7M",
    },

    BNBUSDT: {
      price: 815.11,
      change: 1.81,
      high: 829,
      low: 794,
      volume: "4.82K",
      amount: "12.4M",
    },

    XRPUSDT: {
      price: 3.08,
      change: -3.11,
      high: 3.21,
      low: 2.91,
      volume: "42.1K",
      amount: "129M",
    },
  };

  const data =
    prices[selectedCoin.symbol] || {
      price: 0,
      change: 0,
      high: 0,
      low: 0,
      volume: "--",
      amount: "--",
    };

  const positive =
    data.change >= 0;


  return (
    <header
      className="
        relative
        z-50

        border-b
        border-[#1A1E24]

        bg-[#0B0E11]
      "
    >

      {/* =================================================
          MAIN ROW
      ================================================= */}

      <div
        className="
          flex
          min-h-[64px]
          items-center

          gap-2
          sm:gap-4

          px-3
          sm:px-5
        "
      >

        {/* Favorite */}

        <button
          type="button"
          className="
            hidden
            shrink-0

            text-[#68717D]

            hover:text-yellow-400

            sm:block
          "
        >
          <Star size={17} />
        </button>


        {/* =================================================
            COIN SELECTOR
        ================================================= */}

        <div
          ref={dropdownRef}
          className="
            relative
            shrink-0
          "
        >

          <button
            type="button"
            onClick={() =>
              setOpen((value) => !value)
            }
            className="
              flex

              h-12
              sm:h-14

              items-center

              gap-2

              rounded-xl

              px-1
              sm:px-2

              transition

              hover:bg-[#11151A]
            "
          >

            <CoinIcon
              coin={selectedCoin}
              className="
                h-8
                w-8

                sm:h-10
                sm:w-10
              "
            />

            <div className="text-left">

              <div
                className="
                  flex
                  items-center
                  gap-1
                "
              >

                <span
                  className="
                    whitespace-nowrap

                    text-[13px]
                    sm:text-[15px]

                    font-semibold

                    text-white
                  "
                >
                  {selectedCoin.short}/USDT
                </span>

                <ChevronDown
                  size={14}
                  className={`
                    text-[#707986]

                    transition-transform

                    ${
                      open
                        ? "rotate-180"
                        : ""
                    }
                  `}
                />

              </div>

              <p
                className="
                  hidden
                  text-[10px]
                  text-[#69727E]

                  sm:block
                "
              >
                {selectedCoin.name}
              </p>

            </div>

          </button>


          {/* =================================================
              DROPDOWN
          ================================================= */}

          {open && (
            <div
              className="
                absolute

                left-0

                top-[calc(100%+8px)]

                z-[100]

                w-[calc(100vw-24px)]

                max-w-[360px]

                overflow-hidden

                rounded-2xl

                border
                border-[#252B33]

                bg-[#0E1115]

                shadow-2xl
                shadow-black/60

                sm:w-[380px]
              "
            >

              {/* Search */}

              <div
                className="
                  border-b
                  border-[#1A1E24]

                  p-3
                  sm:p-4
                "
              >

                <div
                  className="
                    flex

                    h-11

                    items-center

                    gap-2

                    rounded-xl

                    border
                    border-[#252B33]

                    bg-[#11151A]

                    px-3

                    transition

                    focus-within:border-[#3D7EFF]
                  "
                >

                  <Search
                    size={17}
                    className="
                      shrink-0
                      text-[#68717D]
                    "
                  />

                  <input
                    autoFocus

                    value={search}

                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }

                    placeholder="
                      Search coin, name or pair
                    "

                    className="
                      min-w-0
                      flex-1

                      bg-transparent

                      text-[13px]

                      text-white

                      outline-none

                      placeholder:text-[#58616D]
                    "
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() =>
                        setSearch("")
                      }
                      className="
                        text-[#68717D]
                        hover:text-white
                      "
                    >
                      <X size={15} />
                    </button>
                  )}

                </div>

              </div>


              {/* Label */}

              <div
                className="
                  px-4
                  pb-2
                  pt-3
                "
              >
                <span
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.12em]
                    text-[#58616D]
                  "
                >
                  Trading Pairs
                </span>
              </div>


              {/* List */}

              <div
                className="
                  max-h-[55vh]

                  overflow-y-auto

                  p-2

                  scrollbar-hide
                "
              >

                {filteredCoins.length > 0 ? (

                  filteredCoins.map(
                    (coin) => {

                      const active =
                        coin.symbol ===
                        selectedCoin.symbol;

                      return (
                        <button
                          key={coin.symbol}
                          type="button"
                          onClick={() =>
                            selectCoin(
                              coin
                            )
                          }
                          className={`
                            flex
                            w-full

                            items-center

                            gap-3

                            rounded-xl

                            px-3
                            py-3

                            text-left

                            transition

                            ${
                              active
                                ? "bg-[#1D66FF]/10"
                                : "hover:bg-[#15191F]"
                            }
                          `}
                        >

                          <CoinIcon
                            coin={coin}
                            className="
                              h-8
                              w-8
                            "
                          />

                          <div
                            className="
                              min-w-0
                              flex-1
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                              "
                            >

                              <span
                                className="
                                  text-[13px]
                                  font-semibold
                                  text-white
                                "
                              >
                                {coin.short}
                              </span>

                              <span
                                className="
                                  rounded

                                  bg-[#1D66FF]/15

                                  px-1.5
                                  py-0.5

                                  text-[9px]

                                  text-[#5D91FF]
                                "
                              >
                                USDT
                              </span>

                            </div>

                            <p
                              className="
                                mt-0.5

                                truncate

                                text-[10px]

                                text-[#68717D]
                              "
                            >
                              {coin.name}
                            </p>

                          </div>

                          {active && (
                            <span
                              className="
                                h-1.5
                                w-1.5

                                rounded-full

                                bg-[#4D8DFF]
                              "
                            />
                          )}

                        </button>
                      );
                    }
                  )

                ) : (

                  <div
                    className="
                      px-4
                      py-10

                      text-center
                    "
                  >
                    <p
                      className="
                        text-sm
                        text-[#68717D]
                      "
                    >
                      No coins found
                    </p>
                  </div>

                )}

              </div>

            </div>
          )}

        </div>


        {/* =================================================
            PRICE
        ================================================= */}

        <div className="shrink-0">

          <div
            className="
              text-[16px]
              sm:text-[20px]

              font-semibold

              tracking-tight

              text-white
            "
          >

            {data.price.toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}

          </div>

          <span
            className={`
              text-[11px]
              sm:text-[12px]

              font-medium

              ${
                positive
                  ? "text-[#00C076]"
                  : "text-[#F6465D]"
              }
            `}
          >

            {positive ? "+" : ""}

            {data.change.toFixed(2)}%

          </span>

        </div>


        {/* =================================================
            DESKTOP STATS
        ================================================= */}

        <div
          className="
            hidden

            flex-1

            items-center
            justify-end

            gap-6

            lg:flex
            xl:gap-10
          "
        >

          <Stat
            label="24h High"
            value={data.high.toLocaleString()}
          />

          <Stat
            label="24h Low"
            value={data.low.toLocaleString()}
          />

          <Stat
            label="24h Volume (BTC)"
            value={data.volume}
          />

          <Stat
            label="24h Amount (USDT)"
            value={data.amount}
          />

        </div>


        {/* More */}

        <button
          type="button"
          className="
            ml-auto

            shrink-0

            rounded-lg

            p-2

            text-[#6A7380]

            hover:bg-[#15191F]

            hover:text-white
          "
        >
          <MoreHorizontal size={18} />
        </button>

      </div>


      {/* =================================================
          MOBILE STATS
      ================================================= */}

      <div
        className="
          flex

          gap-6

          overflow-x-auto

          border-t
          border-[#15191F]

          px-4
          py-2.5

          scrollbar-hide

          lg:hidden
        "
      >

        <MobileStat
          label="24h High"
          value={data.high.toLocaleString()}
        />

        <MobileStat
          label="24h Low"
          value={data.low.toLocaleString()}
        />

        <MobileStat
          label="Volume"
          value={data.volume}
        />

        <MobileStat
          label="Amount"
          value={data.amount}
        />

      </div>

    </header>
  );
}


/* =========================================================
   DESKTOP STAT
========================================================= */

function Stat({
  label,
  value,
}) {
  return (
    <div className="shrink-0">

      <p
        className="
          text-[10px]
          text-[#606975]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1

          text-[12px]
          font-medium

          text-[#D8DDE4]
        "
      >
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   MOBILE STAT
========================================================= */

function MobileStat({
  label,
  value,
}) {
  return (
    <div className="shrink-0">

      <p
        className="
          text-[9px]
          text-[#59616B]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-0.5

          text-[11px]
          font-medium

          text-[#D8DDE4]
        "
      >
        {value}
      </p>

    </div>
  );
}