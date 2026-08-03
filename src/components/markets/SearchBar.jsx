import { Search } from "lucide-react";

export default function SearchBar() {

  return (

    <div
      className="
      w-full

      lg:w-[320px]
      "
    >

      <div
        className="
        flex
        items-center

        rounded-2xl

        border
        border-[#1F2937]

        bg-[#111318]

        px-4
        py-3

        transition-all

        focus-within:border-blue-500
        "
      >

        <Search
          size={18}
          className="text-zinc-500"
        />

        <input

          placeholder="Search Crypto / Futures"

          className="
          ml-3

          w-full

          bg-transparent

          text-white

          placeholder:text-zinc-500

          outline-none
          "

        />

      </div>

    </div>

  );

}