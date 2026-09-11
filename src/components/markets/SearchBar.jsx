import {
  Search,
  X,
} from "lucide-react";

export default function SearchBar({
  value = "",
  onChange,
}) {
  const handleChange = (event) => {
    onChange?.(event.target.value);
  };

  const clearSearch = () => {
    onChange?.("");
  };

  return (
    <div
      className="
        w-full
        lg:max-w-7xl
        mx-auto
      "
    >
      <div
        className="
          group

          flex
          h-[46px]
          w-full

          items-center

          rounded-xl

          border
          border-[#1D232B]

          bg-[#0F1318]

          px-3.5

          transition-all
          duration-200

          focus-within:border-[#315FAE]

          focus-within:bg-[#10161D]

          focus-within:shadow-[0_0_0_3px_rgba(29,102,255,.06)]
        "
      >
        <Search
          size={18}
          strokeWidth={1.8}
          className="
            shrink-0

            text-[#626A75]

            transition-colors
            duration-200

            group-focus-within:text-[#78A7FF]
          "
        />

        <input
          type="search"
          value={value}
          onChange={handleChange}
          placeholder="Search coins"
          autoComplete="off"
          spellCheck="false"
          className="
            ml-3

            min-w-0
            flex-1

            bg-transparent

            text-[14px]
            text-[#F5F7FA]

            outline-none

            placeholder:text-[#626A75]

            [&::-webkit-search-cancel-button]:hidden
          "
        />

        {value ? (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className="
              flex
              h-7
              w-7

              shrink-0

              items-center
              justify-center

              rounded-lg

              text-[#626A75]

              transition

              hover:bg-[#191F27]
              hover:text-white
            "
          >
            <X size={15} />
          </button>
        ) : (
          <span
            className="
              hidden
              rounded-md

              border
              border-[#202630]

              bg-[#141920]

              px-2
              py-1

              text-[10px]

              text-[#555E6A]

              sm:block
            "
          >
            Search
          </span>
        )}
      </div>
    </div>
  );
}