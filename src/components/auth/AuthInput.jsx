import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AuthInput({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  name,
  autoComplete,
}) {
  const [show, setShow] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="
            mb-2
            block
            text-[13px]
            font-medium
            text-[#8B929D]
          "
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          name={name}
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
          autoComplete={autoComplete}
          className="
            h-[48px]
            w-full

            rounded-[8px]

            border
            border-[#292C31]

            bg-[#111214]

            px-4
            pr-12

            text-[14px]
            text-white

            placeholder:text-[#5F6671]

            outline-none

            transition-all
            duration-150

            hover:border-[#363A42]

            focus:border-[#4A4F59]
            focus:bg-[#131416]

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            aria-label={
              show
                ? "Hide password"
                : "Show password"
            }
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2

              flex
              h-8
              w-8
              items-center
              justify-center

              rounded-md

              text-[#707782]

              transition

              hover:bg-[#1A1C20]
              hover:text-[#B8BEC8]
            "
          >
            {show ? (
              <EyeOff size={17} strokeWidth={1.8} />
            ) : (
              <Eye size={17} strokeWidth={1.8} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}