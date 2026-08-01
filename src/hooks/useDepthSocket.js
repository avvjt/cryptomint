import { useEffect, useState } from "react";

export default function useDepthSocket(symbol) {
  const [depth, setDepth] = useState({
    bids: [],
    asks: [],
  });

  useEffect(() => {
    if (!symbol) return;

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`
    );

    ws.onopen = () => {
      console.log("Depth Connected:", symbol);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setDepth({
        bids: data.b || [],
        asks: data.a || [],
      });
    };

    ws.onerror = (err) => {
      console.error("Depth Error", err);
    };

    ws.onclose = (e) => {
      console.log("Depth Closed:", e.code);
    };

    return () => {
      ws.close();
    };
  }, [symbol]);

  return depth;
}