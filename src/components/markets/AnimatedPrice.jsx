import { useEffect, useRef, useState } from "react";

export default function AnimatedPrice({
  price,
  className = "",
}) {
  const previous = useRef(Number(price));
  const [flash, setFlash] = useState("");

  useEffect(() => {
    const current = Number(price);

    if (current > previous.current) {
      setFlash("bg-green-500/20 text-green-400");
    } else if (current < previous.current) {
      setFlash("bg-red-500/20 text-red-400");
    }

    previous.current = current;

    const timer = setTimeout(() => {
      setFlash("");
    }, 250);

    return () => clearTimeout(timer);
  }, [price]);

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-md
        px-2
        py-1
        font-semibold
        transition-all
        duration-200
        ${flash}
        ${className}
      `}
    >
      ${Number(price).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
  );
}