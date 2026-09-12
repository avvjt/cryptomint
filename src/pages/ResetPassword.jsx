import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  LoaderCircle,
} from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!password || !confirmPassword) {
      setError(
        "Please fill in both password fields."
      );
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.message ||
            "Unable to reset your password."
        );
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 1800);

    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

      setError(
        "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // Success screen
  if (success) {
    return (
      <div className="
        min-h-screen
        bg-[#090B0E]
        px-5
        text-white
      ">

        <div className="
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-[420px]
          flex-col
          items-center
          justify-center
          text-center
        ">

          <div className="
            mb-6
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border
            border-emerald-500/20
            bg-emerald-500/5
            text-emerald-400
          ">
            <LockKeyhole size={22} />
          </div>

          <h1 className="
            text-[26px]
            font-semibold
          ">
            Password updated
          </h1>

          <p className="
            mt-2
            text-[14px]
            leading-6
            text-[#737985]
          ">
            Your password has been changed
            successfully.
          </p>

          <p className="
            mt-1
            text-[13px]
            text-[#50545D]
          ">
            Redirecting to login...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="
      min-h-screen
      bg-[#090B0E]
      px-5
      text-white
    ">

      <div className="
        mx-auto
        flex
        min-h-screen
        w-full
        max-w-[420px]
        flex-col
        justify-center
      ">

        {/* Back */}
        <Link
          to="/login"
          className="
            mb-8
            inline-flex
            w-fit
            items-center
            gap-2
            text-[13px]
            text-[#737985]
            transition
            hover:text-white
          "
        >
          <ArrowLeft size={16} />
          Back to login
        </Link>

        {/* Header */}
        <div className="mb-8">

          <div className="
            mb-5
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-[12px]
            border
            border-[#1A1E24]
            bg-[#111418]
          ">
            <LockKeyhole
              size={20}
              className="text-[#4D8DFF]"
            />
          </div>

          <h1 className="
            text-[28px]
            font-semibold
            tracking-[-0.03em]
          ">
            Create new password
          </h1>

          <p className="
            mt-2
            text-[14px]
            leading-6
            text-[#737985]
          ">
            Choose a new password for your
            CryptoMintX account.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* New password */}
          <div>

            <label className="
              mb-2
              block
              text-[12px]
              font-medium
              text-[#A4A9B2]
            ">
              New password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter new password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="
                  h-[48px]
                  w-full
                  rounded-[9px]
                  border
                  border-[#2A2D32]
                  bg-[#111214]
                  px-4
                  pr-11
                  text-[14px]
                  text-white
                  outline-none
                  placeholder:text-[#606773]
                  focus:border-[#4A4F59]
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (prev) => !prev
                  )
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-[#737985]
                  hover:text-white
                "
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>

            </div>

          </div>

          {/* Confirm password */}
          <div>

            <label className="
              mb-2
              block
              text-[12px]
              font-medium
              text-[#A4A9B2]
            ">
              Confirm password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                className="
                  h-[48px]
                  w-full
                  rounded-[9px]
                  border
                  border-[#2A2D32]
                  bg-[#111214]
                  px-4
                  pr-11
                  text-[14px]
                  text-white
                  outline-none
                  placeholder:text-[#606773]
                  focus:border-[#4A4F59]
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  )
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-[#737985]
                  hover:text-white
                "
              >
                {showConfirmPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>

            </div>

          </div>

          {/* Password requirement */}
          <div className="
            rounded-[8px]
            border
            border-[#1A1E24]
            bg-[#0E1013]
            px-3
            py-3
            text-[12px]
            leading-5
            text-[#737985]
          ">
            Password must contain at least
            8 characters.
          </div>

          {/* Error */}
          {error && (
            <div className="
              rounded-[8px]
              border
              border-red-500/20
              bg-red-500/5
              px-3
              py-2.5
              text-[12px]
              leading-5
              text-red-400
            ">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`
              flex
              h-[48px]
              w-full
              items-center
              justify-center
              gap-2
              rounded-full
              text-[14px]
              font-medium
              transition
              ${
                loading
                  ? "cursor-not-allowed bg-[#2858A6] text-white/70"
                  : "bg-[#F4F5F7] text-black hover:bg-white active:scale-[.99]"
              }
            `}
          >
            {loading ? (
              <>
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                />
                Updating password...
              </>
            ) : (
              "Update password"
            )}
          </button>

        </form>

      </div>

    </div>
  );
};

export default ResetPassword;