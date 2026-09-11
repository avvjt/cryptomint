const FALLBACK_LOGO =
  "https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/generic.png";

export default function CoinLogo({
  symbol,
  size = "h-9 w-9",
}) {
  const baseSymbol = String(symbol || "")
    .toLowerCase()
    .replace("usdt", "");

  const logoUrl =
    `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/${baseSymbol}.png`;

  return (
    <div
      className={`
        ${size}
        shrink-0
        overflow-hidden
        rounded-full
        bg-[#171B22]
        flex
        items-center
        justify-center
      `}
    >
      <img
        src={logoUrl}
        alt={symbol}
        className="
          h-full
          w-full
          object-cover
        "
        onError={(e) => {
          if (
            e.currentTarget.src !==
            FALLBACK_LOGO
          ) {
            e.currentTarget.src =
              FALLBACK_LOGO;
          }
        }}
      />
    </div>
  );
}