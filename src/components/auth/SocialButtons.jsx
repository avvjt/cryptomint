import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
// import { SiTelegram, SiMetamask } from "react-icons/si";

export default function SocialButtons() {
  return (
    <div className="space-y-3">

      <button
        className="
        w-full
        rounded-2xl
        border
        border-zinc-800
        bg-[#111827]
        py-4

        flex
        items-center
        justify-center
        gap-3

        hover:border-blue-500
        transition
        "
      >
        <FcGoogle size={22} />
        Continue with Google
      </button>

      <div className="grid grid-cols-3 gap-3">

        <button
          className="
          rounded-2xl
          bg-[#111827]
          border
          border-zinc-800
          py-4
          flex
          justify-center
          "
        >
          <FaApple size={20} />
        </button>

        <button
          className="
          rounded-2xl
          bg-[#111827]
          border
          border-zinc-800
          py-4
          flex
          justify-center
          "
        >
          {/* <SiTelegram size={20} /> */}
        </button>

        <button
          className="
          rounded-2xl
          bg-[#111827]
          border
          border-zinc-800
          py-4
          flex
          justify-center
          "
        >
          {/* <SiMetamask size={20} /> */}
        </button>

      </div>

    </div>
  );
}