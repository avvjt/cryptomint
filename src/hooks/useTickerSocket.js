import { useEffect, useState } from "react";

export default function useTickerSocket() {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@ticker"
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const usdtPairs = data.filter((coin) =>
        coin.s.endsWith("USDT")
      );

      setMarkets(usdtPairs);
    };

    ws.onerror = (err) => {
      console.log(err);
    };

    return () => ws.close();
  }, []);

  return markets;
}
