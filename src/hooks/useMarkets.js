import { useEffect, useState } from "react";
import { getMarkets } from "../services/marketApi";

export default function useMarkets() {
  const [markets, setMarkets] = useState([]);

  async function fetchMarkets() {
    try {
      const data = await getMarkets();

      const usdt = data.filter((coin) =>
        coin.symbol.endsWith("USDT")
      );

      setMarkets(usdt);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchMarkets();

    const interval = setInterval(() => {
      fetchMarkets();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return markets;
}