import { useEffect, useState } from "react";
import { TOP_COINS } from "../utils/topCoins";

export default function useMarketData() {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const res = await fetch(
          "https://api.binance.com/api/v3/ticker/24hr"
        );

        const data = await res.json();

        const topMarkets = TOP_COINS
          .map((symbol) =>
            data.find((coin) => coin.symbol === symbol)
          )
          .filter(Boolean);

        setMarkets(topMarkets);

      } catch (err) {
        console.error(err);
      }
    };

    fetchMarkets();

    const interval = setInterval(fetchMarkets, 3000);

    return () => clearInterval(interval);
  }, []);

  return markets;
}