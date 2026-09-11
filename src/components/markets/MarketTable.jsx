import {
  useEffect,
  useMemo,
  useState,
} from "react";

import MarketRow from "./MarketRow";
import MobileMarketRow from "./MobileMarketRow";

import useMarketData from "../../hooks/useMarketData";


/* =========================================================
   CATEGORY DATA

   These are candidate symbols.

   Your live Binance data decides which ones actually appear.
   If Binance doesn't return a symbol, it is automatically
   ignored.
========================================================= */

const CATEGORY_MAP = {
  AI: new Set([
    "FETUSDT",
    "TAOUSDT",
    "RENDERUSDT",
    "NEARUSDT",
    "WLDUSDT",
    "ARUSDT",
    "GRTUSDT",
    "ICPUSDT",
    "VIRTUALUSDT",
    "ARKMUSDT",
    "AKTUSDT",
    "AIOUSDT",
    "GRASSUSDT",
    "IOUSDT",
    "PHBUSDT",
    "NMRUSDT",
    "RLCUSDT",
    "CTXCUSDT",
    "GLMUSDT",
    "LPTUSDT",
    "THETAUSDT",
    "FILUSDT",
    "INJUSDT",
    "LINKUSDT",
    "STXUSDT",
    "OCEANUSDT",
    "AGIXUSDT",
    "KAITOUSDT",
    "COOKIEUSDT",
    "VANAUSDT",
    "AIXBTUSDT",
    "GRIFFAINUSDT",
    "FLOCKUSDT",
    "ORAIUSDT",
    "ALTUSDT",
    "IOSTUSDT",
    "ROSEUSDT",
    "HNTUSDT",
    "IOTXUSDT",
    "LPTUSDT",
  ]),

  Meme: new Set([
    "DOGEUSDT",
    "SHIBUSDT",
    "PEPEUSDT",
    "FLOKIUSDT",
    "BONKUSDT",
    "WIFUSDT",
    "MEMEUSDT",
    "BOMEUSDT",
    "BRETTUSDT",
    "MOGUSDT",
    "TURBOUSDT",
    "NEIROUSDT",
    "1000SATSUSDT",
    "DOGSUSDT",
    "PNUTUSDT",
    "ACTUSDT",
    "POPCATUSDT",
    "MEWUSDT",
    "1000BONKUSDT",
    "1000PEPEUSDT",
    "1000FLOKIUSDT",
    "1000SHIBUSDT",
    "PEOPLEUSDT",
    "SLERFUSDT",
    "MYROUSDT",
    "PONKEUSDT",
    "GOATUSDT",
    "MOODENGUSDT",
    "SPXUSDT",
    "TRUMPUSDT",
    "MELANIAUSDT",
    "TOSHIUSDT",
    "FWOGUSDT",
    "DEGENUSDT",
    "NEIROETHUSDT",
    "MICHIUSDT",
    "SUNDOGUSDT",
    "DOGUSDT",
    "CATIUSDT",
    "ACTUSDT",
    "MOGUSDT",
  ]),

  DeFi: new Set([
    "UNIUSDT",
    "AAVEUSDT",
    "MKRUSDT",
    "CRVUSDT",
    "LDOUSDT",
    "COMPUSDT",
    "SNXUSDT",
    "SUSHIUSDT",
    "DYDXUSDT",
    "1INCHUSDT",
    "CAKEUSDT",
    "JUPUSDT",
    "RUNEUSDT",
    "PENDLEUSDT",
    "ENAUSDT",
    "JTOUSDT",
    "INJUSDT",
    "RAYUSDT",
    "GMXUSDT",
    "LQTYUSDT",
    "BALUSDT",
    "YFIUSDT",
    "KAVAUSDT",
    "OSMOUSDT",
    "ETHFIUSDT",
    "EIGENUSDT",
    "SAFEUSDT",
    "ZRXUSDT",
    "GNOUSDT",
    "SSVUSDT",
    "FXSUSDT",
    "ANKRUSDT",
    "SKLUSDT",
    "API3USDT",
    "UMAUSDT",
    "ORCAUSDT",
    "WOOUSDT",
    "ACXUSDT",
    "AEVOUSDT",
    "METISUSDT",
    "DYDXUSDT",
    "MANTAUSDT",
    "MORPHOUSDT",
    "STGUSDT",
  ]),

  Gaming: new Set([
    "AXSUSDT",
    "SANDUSDT",
    "MANAUSDT",
    "GALAUSDT",
    "IMXUSDT",
    "RONINUSDT",
    "ENJUSDT",
    "MAGICUSDT",
    "PIXELUSDT",
    "PORTALUSDT",
    "YGGUSDT",
    "BEAMXUSDT",
    "ILVUSDT",
    "SUPERUSDT",
    "GMTUSDT",
    "APEUSDT",
    "FLOWUSDT",
    "ALICEUSDT",
    "TLMUSDT",
    "SLPUSDT",
    "VOXELUSDT",
    "HIGHUSDT",
    "DARUSDT",
    "GODSUSDT",
    "PYRUSDT",
    "ACEUSDT",
    "NAKAUSDT",
    "BIGTIMEUSDT",
    "XAIUSDT",
    "PRIMEUSDT",
    "WAXPUSDT",
    "CHZUSDT",
    "SAGAUSDT",
    "CATIUSDT",
    "HMSTRUSDT",
    "ALPINEUSDT",
    "REZUSDT",
    "TNSRUSDT",
    "PORTALUSDT",
    "RONUSDT",
    "GMTUSDT",
    "PIXELUSDT",
    "GALAUSDT",
    "IMXUSDT",
  ]),

  "Layer 1": new Set([
    "BTCUSDT",
    "ETHUSDT",
    "BNBUSDT",
    "SOLUSDT",
    "XRPUSDT",
    "ADAUSDT",
    "AVAXUSDT",
    "DOTUSDT",
    "TRXUSDT",
    "TONUSDT",
    "SUIUSDT",
    "APTUSDT",
    "NEARUSDT",
    "ATOMUSDT",
    "ALGOUSDT",
    "HBARUSDT",
    "ICPUSDT",
    "SEIUSDT",
    "KASUSDT",
    "INJUSDT",
    "TIAUSDT",
    "EGLDUSDT",
    "FILUSDT",
    "ETCUSDT",
    "XLMUSDT",
    "VETUSDT",
    "EOSUSDT",
    "XTZUSDT",
    "NEOUSDT",
    "ONEUSDT",
    "FLOWUSDT",
    "KAVAUSDT",
    "THETAUSDT",
    "IOTAUSDT",
    "MINAUSDT",
    "CELOUSDT",
    "ROSEUSDT",
    "ZILUSDT",
    "QTUMUSDT",
    "ICXUSDT",
    "KSMUSDT",
    "SCRTUSDT",
    "WAVESUSDT",
    "ZKUSDT",
  ]),

  Infrastructure: new Set([
    "LINKUSDT",
    "FILUSDT",
    "ARUSDT",
    "THETAUSDT",
    "GRTUSDT",
    "RENDERUSDT",
    "ICPUSDT",
    "LPTUSDT",
    "AKTUSDT",
    "ARPAUSDT",
    "ANKRUSDT",
    "STORJUSDT",
    "HOTUSDT",
    "FLUXUSDT",
    "CTSIUSDT",
    "SKLUSDT",
    "API3USDT",
    "BANDUSDT",
    "DIAUSDT",
    "PYTHUSDT",
    "RLCUSDT",
    "GLMUSDT",
    "NMRUSDT",
    "POWRUSDT",
    "IOTXUSDT",
    "HNTUSDT",
    "STXUSDT",
    "QNTUSDT",
    "VTHOUSDT",
    "ONTUSDT",
    "COTIUSDT",
    "CKBUSDT",
    "RVNUSDT",
    "DUSKUSDT",
    "SYSUSDT",
    "CELRUSDT",
    "CHRUSDT",
    "LTOUSDT",
    "SSVUSDT",
    "OCEANUSDT",
    "GNOUSDT",
    "WOOUSDT",
    "IOTAUSDT",
    "BANDUSDT",
  ]),
};


/* =========================================================
   FAVORITES
========================================================= */

function getFavorites() {
  try {
    const saved = localStorage.getItem(
      "cryptomintx_favorites"
    );

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
}


/* =========================================================
   MARKET TABLE
========================================================= */

export default function MarketTable({
  category = "All",
  search = "",
}) {
  const markets = useMarketData();

  const [favorites, setFavorites] =
    useState(getFavorites);


  /* -------------------------------------------------------
     Listen for favorite changes
  ------------------------------------------------------- */

  useEffect(() => {
    const handleFavoritesChanged = () => {
      setFavorites(getFavorites());
    };

    window.addEventListener(
      "favoritesChanged",
      handleFavoritesChanged
    );

    return () => {
      window.removeEventListener(
        "favoritesChanged",
        handleFavoritesChanged
      );
    };
  }, []);


  /* -------------------------------------------------------
     FILTER + SEARCH + SORT
  ------------------------------------------------------- */

  const filteredMarkets = useMemo(() => {
    if (!markets.length) {
      return [];
    }

    const query = search
      .trim()
      .toLowerCase();


    let result = [];


    /* =====================================================
       CATEGORY
    ===================================================== */

    if (category === "All") {
      result = [...markets];
    }

    else if (category === "Trending") {
      result = [...markets].sort(
        (a, b) =>
          Math.abs(
            Number(
              b.priceChangePercent || 0
            )
          ) -
          Math.abs(
            Number(
              a.priceChangePercent || 0
            )
          )
      );
    }

    else {
      const categorySet =
        CATEGORY_MAP[category];

      if (!categorySet) {
        result = [...markets];
      } else {
        result = markets.filter(
          (coin) =>
            categorySet.has(
              coin.symbol
            )
        );
      }
    }


    /* =====================================================
       FAVORITES
    ===================================================== */

    if (category === "Favorites") {
      const favoriteSet =
        new Set(favorites);

      result = result.filter(
        (coin) =>
          favoriteSet.has(
            coin.symbol
          )
      );
    }


    /* =====================================================
       SEARCH

       Searches the entire filtered category.
       Supports:

       BTC
       btc
       BTCUSDT
       btc/usdt
    ===================================================== */

    if (query) {
      const normalizedQuery =
        query.replace(
          /[/\s-]/g,
          ""
        );

      result = result.filter(
        (coin) => {
          const symbol =
            String(
              coin.symbol || ""
            ).toLowerCase();

          const normalizedSymbol =
            symbol.replace(
              /[/\s-]/g,
              ""
            );

          const baseAsset =
            normalizedSymbol.endsWith(
              "usdt"
            )
              ? normalizedSymbol.slice(
                  0,
                  -4
                )
              : normalizedSymbol;

          return (
            normalizedSymbol.includes(
              normalizedQuery
            ) ||
            baseAsset.includes(
              normalizedQuery
            )
          );
        }
      );
    }


    /* =====================================================
       SORT

       Trending already has its own sort.

       Other categories are sorted by 24h quote volume,
       which makes the list feel like a real exchange.
    ===================================================== */

    if (
      category !== "Trending" &&
      !query
    ) {
      result.sort(
        (a, b) =>
          Number(
            b.quoteVolume || 0
          ) -
          Number(
            a.quoteVolume || 0
          )
      );
    }


    return result;

  }, [
    markets,
    category,
    search,
    favorites,
  ]);


  /* =====================================================
     LOADING
  ===================================================== */

  if (!markets.length) {
    return (
      <div
        className="
          mt-5

          flex
          min-h-[220px]

          items-center
          justify-center

          rounded-2xl

          border
          border-[#171C22]

          bg-[#0F1318]
        "
      >
        <div className="text-center">

          <div
            className="
              mx-auto
              mb-3

              h-7
              w-7

              animate-spin

              rounded-full

              border-2
              border-[#252D36]
              border-t-[#4D8DFF]
            "
          />

          <p
            className="
              text-sm
              text-[#737C88]
            "
          >
            Loading markets...
          </p>

        </div>
      </div>
    );
  }


  /* =====================================================
     EMPTY
  ===================================================== */

  if (!filteredMarkets.length) {
    return (
      <EmptyState
        category={category}
        search={search}
      />
    );
  }


  /* =====================================================
     DESKTOP
  ===================================================== */

  return (
    <>
      <div
        className="
          mt-10
          hidden
          lg:block
        "
      >

        {/* Header */}

        <div
          className="
            grid

            grid-cols-[3.8fr_1.2fr_1fr_1fr_1fr_120px]

            border-b
            border-[#171C22]

            px-6
            pb-4

            text-[12px]
            font-medium

            uppercase
            tracking-[0.08em]

            text-[#555E69]
          "
        >
          <div>
            Trading Pair
          </div>

          <div>
            Price
          </div>

          <div>
            Change
          </div>

          <div>
            24h High
          </div>

          <div>
            24h Low
          </div>

          <div className="text-right">
            Action
          </div>
        </div>


        {/* Rows */}

        <div>
          {filteredMarkets
            .slice(0, 50)
            .map((coin) => (
              <MarketRow
                key={coin.symbol}
                coin={coin}
              />
            ))}
        </div>

      </div>


      {/* =================================================
          MOBILE
      ================================================= */}

      <div
        className="
          mt-5
          lg:hidden
        "
      >
        <div className="space-y-1">

          {filteredMarkets
            .slice(0, 50)
            .map((coin) => (
              <MobileMarketRow
                key={coin.symbol}
                coin={coin}
              />
            ))}

        </div>
      </div>
    </>
  );
}


/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  category,
  search,
}) {
  return (
    <div
      className="
        mt-5

        flex
        min-h-[220px]

        flex-col

        items-center
        justify-center

        rounded-2xl

        border
        border-[#171C22]

        bg-[#0F1318]

        px-6

        text-center
      "
    >
      <div
        className="
          mb-4

          flex
          h-12
          w-12

          items-center
          justify-center

          rounded-full

          border
          border-[#252D36]

          bg-[#141920]
        "
      >
        <span
          className="
            text-xl
            text-[#596370]
          "
        >
          ∅
        </span>
      </div>

      <h3
        className="
          text-[15px]
          font-medium
          text-[#DDE2E8]
        "
      >
        No coins found
      </h3>

      <p
        className="
          mt-1.5

          max-w-[320px]

          text-[12px]

          leading-5

          text-[#626A75]
        "
      >
        {search
          ? `No results for "${search}". Try another coin or symbol.`
          : `There are currently no available coins in ${category}.`}
      </p>
    </div>
  );
}