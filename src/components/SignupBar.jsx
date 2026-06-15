import { Apple } from "lucide-react";

export default function SignupBar() {
  return (
    <div className="flex flex-col items-center gap-5">

      <p className="text-amber-300 text-xl font-medium">
        🎁 Sign Up & Get 10,000 USDT
      </p>

      <div className="flex flex-col lg:flex-row items-center gap-3">

        <div
          className="
          bg-white
          rounded-full
          overflow-hidden
          flex
          w-full
          lg:w-[560px]
          "
        >
          <input
            type="text"
            placeholder="Email/Mobile Number"
            className="
            flex-1
            px-6
            py-4
            outline-none
            text-black
            "
          />

          <button
            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-8
            font-medium
            "
          >
            Sign Up
          </button>
        </div>

        <button className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-700 text-white">
          G
        </button>

        <button className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-700 text-white flex items-center justify-center">
          <Apple />
        </button>

      </div>
    </div>
  );
}