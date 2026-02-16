import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

const COINS = [
  { s: "BTCUSDT", name: "BTC", icon: "btc" },
  { s: "ETHUSDT", name: "ETH", icon: "eth" },
  { s: "BNBUSDT", name: "BNB", icon: "bnb" },
  { s: "SOLUSDT", name: "SOL", icon: "sol" },
  { s: "XRPUSDT", name: "XRP", icon: "xrp" },
  { s: "ADAUSDT", name: "ADA", icon: "ada" },
  { s: "DOGEUSDT", name: "DOGE", icon: "doge" },
  { s: "AVAXUSDT", name: "AVAX", icon: "avax" },
  { s: "DOTUSDT", name: "DOT", icon: "dot" },
  { s: "MATICUSDT", name: "MATIC", icon: "matic" },
  { s: "LTCUSDT", name: "LTC", icon: "ltc" },
  { s: "TRXUSDT", name: "TRX", icon: "trx" },
  { s: "LINKUSDT", name: "LINK", icon: "link" },
  { s: "ATOMUSDT", name: "ATOM", icon: "atom" },
];

export default function Ticker() {
  const [prices, setPrices] = useState({});
  const [changes, setChanges] = useState({});
  const [glow, setGlow] = useState({});

  const openPrice = useRef({});

  useEffect(() => {
    const streams = COINS.map(
      (c) => `${c.s.toLowerCase()}@trade`
    ).join("/");

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${streams}`
    );

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data).data;
      const symbol = data.s;
      const price = parseFloat(data.p);

      if (!openPrice.current[symbol]) {
        openPrice.current[symbol] = price;
      }

      const open = openPrice.current[symbol];
      const pctChange = ((price - open) / open) * 100;

      setPrices((p) => ({ ...p, [symbol]: price }));
      setChanges((c) => ({ ...c, [symbol]: pctChange }));

      setGlow((g) => ({
        ...g,
        [symbol]: price >= open ? "glow-up" : "glow-down",
      }));

      setTimeout(() => {
        setGlow((g) => ({ ...g, [symbol]: "" }));
      }, 500);
    };

    return () => ws.close();
  }, []);

  return (
    <div className="w-full overflow-hidden bg-black py-2">
      <div className="animate-marquee gap-8">
        {[...COINS, ...COINS, ...COINS].map((coin, i) => {
          const price = prices[coin.s];
          const change = changes[coin.s] ?? 0;
          const isUp = change >= 0;

          return (
            <div
              key={i}
              className={`flex items-center gap-2 text-sm whitespace-nowrap ${glow[coin.s]}`}
            >
              <img
                src={`/coins/${coin.icon}.png`}
                alt={coin.name}
                className="w-4 h-4"
                onError={(e) => (e.currentTarget.src = "/coins/default.png")}
              />

              <span className="text-white font-semibold">
                {coin.name}
              </span>

              {price && (
                <>
                  {isUp ? (
                    <ArrowUp size={12} className="price-up" />
                  ) : (
                    <ArrowDown size={12} className="price-down" />
                  )}

                  <span className={isUp ? "price-up" : "price-down"}>
                    ${price.toFixed(2)}
                  </span>

                  <span className={`text-xs ${isUp ? "price-up" : "price-down"}`}>
                    ({change.toFixed(2)}%)
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="bg-black text-white text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2">
          
          {/* Left */}
          <div>
            <span className="opacity-80 cursor-pointer hover:opacity-100">
              Personal
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6">
            <a href="#" className="hover:underline">Academy</a>
            <a href="#" className="hover:underline">Help</a>
            <button className="bg-white text-black px-4 py-1 rounded-full font-medium hover:bg-gray-200 transition">
              Log in
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
