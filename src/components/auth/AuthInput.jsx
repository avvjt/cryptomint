import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AuthInput({
  label,
  placeholder,
  type = "text",
  value,
  onChange
}) {
  const [show, setShow] = useState(false);

  const isPassword =
    type === "password";

  return (
    <div>
      <label
        className="
        block
        mb-2
        text-sm
        text-zinc-400
        "
      >
        {label}
      </label>

      <div className="relative">

        <input
          type={
            isPassword
              ? show
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="
          w-full

          rounded-2xl

          bg-[#111827]

          border
          border-zinc-800

          px-5
          py-4

          text-white

          outline-none

          focus:border-blue-500
          "
        />

        {isPassword && (
          <button
            type="button"
            onClick={() =>
              setShow(!show)
            }
            className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            "
          >
            {show ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}

      </div>
    </div>
  );
}