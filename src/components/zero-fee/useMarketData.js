import { useEffect, useState } from "react";
import axios from "axios";

export default function useMarketData() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.binance.com/api/v3/ticker/24hr"
        );

        const ALLOWED_COINS = [
  "BTCUSDT",
  "ETHUSDT",
  "BNBUSDT",
  "SOLUSDT",
  "XRPUSDT",
  "DOGEUSDT",
  "ADAUSDT",
  "TRXUSDT",
  "LINKUSDT",
  "AVAXUSDT",
  "LTCUSDT",
];

const filtered = res.data.filter(
  (item) =>
    ALLOWED_COINS.includes(
      item.symbol
    )
)
          .sort(
          (a, b) =>
            Math.abs(
              Number(b.priceChangePercent)
            ) -
            Math.abs(
              Number(a.priceChangePercent)
            )
        )
      .slice(0, 60);

    setCoins(filtered);
  } catch (err) {
    console.log(err);
  }
};

fetchData();

const interval = setInterval(
  fetchData,
  10000
);

return () => clearInterval(interval);
  }, []);

return coins;
}