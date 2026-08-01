import { useEffect, useState } from "react";

export default function useTradeSocket(symbol) {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    if (!symbol) return;

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const trade = {
        id: data.t,
        price: Number(data.p),
        quantity: Number(data.q),
        buyerMaker: data.m,
        time: new Date(data.T).toLocaleTimeString(),
      };

      setTrades((prev) => [trade, ...prev].slice(0, 50));
    };

    ws.onerror = (err) => {
      console.log(err);
    };

    return () => ws.close();
  }, [symbol]);

  return trades;
}