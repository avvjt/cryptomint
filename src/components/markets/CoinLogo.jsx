import { coinMap } from "../../utils/coinMap";

export default function CoinLogo({ symbol }) {
  const base = symbol.replace("USDT", "");
  const icon = coinMap[base] || base.toLowerCase();

  return (
    <img
      src={`/icons/${icon}.png`}
      alt={base}
      className="w-8 h-8 rounded-full"
      loading="lazy"
      onError={(e) => {
        e.currentTarget.src = "/icons/generic.png";
      }}
    />
  );
}