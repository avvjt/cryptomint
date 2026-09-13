import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Globe,
  Headphones,
  ChevronDown,
  Eye,
  EyeOff,
  LoaderCircle,
} from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { FaApple } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const { fetchUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [googleLoading, setGoogleLoading] =
    useState(false);

  const [error, setError] = useState("");

  /* =========================================================
     NORMAL LOGIN
  ========================================================= */

  const handleSignin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem(
          "token",
          data.token
        );

        await fetchUser();

        navigate("/dashboard");
      } else {
        setError(
          data.message ||
          "Invalid email or password."
        );
      }
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     GOOGLE LOGIN
  ========================================================= */

  const handleGoogleLogin = async (
    credentialResponse
  ) => {
    if (!credentialResponse?.credential) {
      return;
    }

    setError("");
    setGoogleLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            token: credentialResponse.credential,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem(
          "token",
          data.token
        );

        await fetchUser();

        navigate("/dashboard");
      } else {
        setError(
          data.message ||
          "Google login failed."
        );
      }
    } catch (error) {
      console.error(
        "Google login error:",
        error
      );

      setError(
        "Google login failed. Please try again."
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">

      {/* =====================================================
          DESKTOP
      ====================================================== */}

      <div
        className="
        mx-auto
        hidden
        min-h-[calc(100vh-64px)]
        max-w-[1320px]
        grid-cols-[minmax(0,1fr)_414px]
        items-center
        gap-16
        px-8
        pb-10
        lg:grid
        "
      >

        {/* PROMOTIONAL SIDE */}

        <PromoSection />

        {/* LOGIN */}

        <LoginPanel
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          loading={loading}
          googleLoading={googleLoading}
          error={error}
          handleSignin={handleSignin}
          handleGoogleLogin={handleGoogleLogin}
        />

      </div>

      {/* =====================================================
          MOBILE
      ====================================================== */}

      <div
        className="
        block
        min-h-[calc(100vh-64px)]
        px-6
        pb-10
        lg:hidden
        "
      >

        <div
          className="
          mx-auto
          flex
          min-h-[calc(100vh-74px)]
          max-w-[430px]
          flex-col
          "
        >

          {/* Mobile promotional text */}

          <div className="pt-[68px]">

            <h1
              className="
              max-w-[320px]
              text-[29px]
              font-semibold
              leading-[1.15]
              tracking-[-0.035em]
              "
            >
              Welcome Back to
              <br />
              CryptoMintX
            </h1>

            <p
              className="
              mt-5
              text-[16px]
              leading-6
              text-[#8EB8FF]
              "
            >
              Sign in to continue
              trading
            </p>

          </div>

          {/* Spacer */}

          <div className="min-h-[80px] flex-1" />

          {/* Login form */}

          <MobileLoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            loading={loading}
            error={error}
            handleSignin={handleSignin}
            handleGoogleLogin={
              handleGoogleLogin
            }
            googleLoading={
              googleLoading
            }
          />

          {/* Signup */}

          <div
            className="
            mt-9
            text-center
            "
          >

            <span
              className="
              text-[14px]
              text-[#707782]
              "
            >
              Don't have an account?
            </span>

            <Link
              to="/signup"
              className="
              ml-1.5
              text-[14px]
              font-medium
              text-[#73A7FF]
              hover:text-[#9BC0FF]
              "
            >
              Sign up now!
            </Link>

          </div>

          <Terms />

        </div>

      </div>

      {/* Support */}

      <button
        type="button"
        className="
        fixed
        bottom-5
        right-5
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        border-[#41464F]
        bg-[#191D24]
        text-[#E2E6EC]
        shadow-[0_6px_25px_rgba(0,0,0,.45)]
        transition
        hover:bg-[#222730]
        lg:hidden
        "
      >
        <Headphones size={19} />
      </button>

    </main>
  );
}

/* ============================================================
   DESKTOP PROMO
============================================================ */

function PromoSection() {
  return (
    <section
      className="
      flex
      flex-col
      items-center
      justify-center
      text-center
      "
    >

      <div
        className="
        relative
        flex
        h-[300px]
        w-full
        max-w-[620px]
        items-end
        justify-center
        overflow-hidden
        "
      >

        {/* Glow */}

        <div
          className="
          absolute
          bottom-4
          left-1/2
          h-[120px]
          w-[500px]
          -translate-x-1/2
          rounded-[50%]
          bg-[#79BFFF]/20
          blur-[55px]
          "
        />

        {/* Horizon */}

        <div
          className="
          absolute
          bottom-[36px]
          left-1/2
          h-[60px]
          w-[500px]
          -translate-x-1/2
          rounded-[50%]
          border-t
          border-[#B8D9FF]/50
          bg-gradient-to-b
          from-[#29394D]/80
          to-transparent
          "
        />

        {/* Zero */}

        <div
          className="
          relative
          z-10
          mb-[35px]
          select-none
          text-[250px]
          font-black
          leading-none
          tracking-[-0.15em]
          text-white
          drop-shadow-[0_0_22px_rgba(135,194,255,.9)]
          "
        >
          0
        </div>

        {/* Person */}

        <div
          className="
          absolute
          bottom-[34px]
          left-1/2
          z-20
          h-[52px]
          w-[15px]
          -translate-x-1/2
          rounded-t-full
          bg-black
          "
        />

      </div>

      <h2
        className="
        mt-2
        text-[30px]
        font-semibold
        tracking-[-0.035em]
        "
      >
        0 Fees, Infinite Opportunities
      </h2>

      {/* Carousel */}

      <div
        className="
        mt-5
        flex
        items-center
        justify-center
        gap-1
        "
      >
        {[0, 1, 2, 3, 4].map(
          (item) => (
            <span
              key={item}
              className="
              h-8
              w-8
              rounded-full
              border
              border-[#60656D]
              bg-[#272D37]
              "
            />
          )
        )}
      </div>

      {/* Assets */}

      <div
        className="
        mt-14
        flex
        w-full
        max-w-[470px]
        items-center
        gap-3
        text-[12px]
        text-[#68717E]
        "
      >

        <div className="h-px flex-1 bg-[#20242A]" />

        <span>
          All Assets, One Platform
        </span>

        <div className="h-px flex-1 bg-[#20242A]" />

      </div>

      <div
        className="
        mt-4
        flex
        items-center
        justify-center
        gap-8
        text-[13px]
        text-[#9BA2AC]
        "
      >
        <span>₿ Crypto</span>
        <span>▣ Stocks</span>
        <span>▰ Metals</span>
        <span>▣ Forex</span>
      </div>

    </section>
  );
}

/* ============================================================
   DESKTOP LOGIN PANEL
============================================================ */

function LoginPanel({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  loading,
  googleLoading,
  error,
  handleSignin,
  handleGoogleLogin,
}) {
  return (
    <section
      className="
      w-full
      rounded-[16px]
      border
      border-[#1D1D1F]

      bg-[#121212]

      p-8

      shadow-[0_12px_50px_rgba(0,0,0,.35)]
      "
    >

      <h1
        className="
        text-[23px]

        font-semibold

        tracking-[-0.025em]
        "
      >
        Welcome back
      </h1>

      <p
        className="
        mt-2

        text-[13px]

        text-[#737985]
        "
      >
        Sign in to continue trading
      </p>

      {/* Social */}

      <div className="mt-7 space-y-3">

        {/* Google */}

        <div
  className="
    google-login-mobile
    relative

    flex
    h-[46px]
    w-full

    items-center

    overflow-hidden

    rounded-full
  "
>
  <div className="w-full">
    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={() =>
        console.log("Google Login Failed")
      }
      theme="filled_black"
      size="large"
      shape="pill"
      text="continue_with"
      width="100%"
    />
  </div>

  {googleLoading && (
    <div
      className="
        absolute
        inset-0
        z-10

        flex
        items-center
        justify-center

        rounded-full

        bg-black/60
      "
    >
      <LoaderCircle
        size={18}
        className="animate-spin"
      />
    </div>
  )}
</div>

      </div>

      {/* Divider */}

      <div className="my-5">
        <Divider />
      </div>

      {/* Login */}

      <form
        onSubmit={handleSignin}
        className="space-y-4"
      >

        <input
          type="email"
          placeholder="Enter your email/phone number"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
          h-[46px]

          w-full

          rounded-[8px]

          border
          border-[#2A2D32]

          bg-[#111214]

          px-4

          text-[14px]

          text-white

          outline-none

          placeholder:text-[#606773]

          focus:border-[#4A4F59]
          "
        />

        {/* Password */}

        <div className="relative">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
            h-[46px]

            w-full

            rounded-[8px]

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

        {/* Forgot */}

        <div className="flex justify-end">

          <Link
            to="/forgot-password"
            className="
            text-[12px]

            text-[#7285A2]

            transition

            hover:text-[#9BBEFF]
            "
          >
            Forgot password?
          </Link>

        </div>

        {/* Error */}

        {error && (
          <div
            className="
            rounded-[8px]

            border
            border-red-500/20

            bg-red-500/5

            px-3
            py-2.5

            text-[12px]

            leading-5

            text-red-400
            "
          >
            {error}
          </div>
        )}

        {/* Continue */}

        <button
          type="submit"
          disabled={loading}
          className={`
          flex

          h-[46px]

          w-full

          items-center

          justify-center

          gap-2

          rounded-full

          text-[14px]

          font-medium

          transition

          ${loading
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

              Signing in...
            </>
          ) : (
            "Continue"
          )}

        </button>

      </form>

      {/* Signup */}

      <div
        className="
        mt-8

        text-center
        "
      >

        <span
          className="
          text-[13px]

          text-[#707782]
          "
        >
          Don't have an account?
        </span>

        <Link
          to="/signup"
          className="
          ml-1

          text-[13px]

          text-[#77A8FF]

          hover:text-[#A0C4FF]
          "
        >
          Sign up now!
        </Link>

      </div>

      <Terms />

    </section>
  );
}

/* ============================================================
   MOBILE LOGIN FORM
============================================================ */

function MobileLoginForm({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  loading,
  error,
  handleSignin,
  handleGoogleLogin,
  googleLoading,
}) {
  return (
    <div>

      {/* Google */}

      <div
        className="
          google-login-mobile
          relative
          flex
          h-12.25
          w-full
          overflow-hidden
          rounded-full
        "
      >
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() =>
            console.log("Google Login Failed")
          }
          theme="filled_black"
          size="large"
          shape="pill"
          text="continue_with"
          width="100%"
        />

        {googleLoading && (
          <div
            className="
        absolute
        inset-0
        z-10
        flex
        items-center
        justify-center
        bg-black/50
      "
          >
            <LoaderCircle
              size={18}
              className="animate-spin"
            />
          </div>
        )}
      </div>

      <div
        className="
        my-4

        flex

        items-center

        gap-3
        "
      >

        <div className="h-px flex-1 bg-[#202328]" />

        <span
          className="
          text-[12px]

          text-[#727984]
          "
        >
          or
        </span>

        <div className="h-px flex-1 bg-[#202328]" />

      </div>

      {/* Form */}

      <form
        onSubmit={handleSignin}
        className="space-y-4"
      >

        <input
          type="email"
          placeholder="Enter your email/phone number"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
          h-12.25

          w-full

          rounded-lg

          border
          border-[#292C31]

          bg-[#111214]

          px-4

          text-[14px]

          text-white

          outline-none

          placeholder:text-[#5F6671]

          focus:border-[#4A4F59]
          "
        />

        <div className="relative">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
            h-12.25

            w-full

            rounded-lg

            border
            border-[#292C31]

            bg-[#111214]

            px-4
            pr-11

            text-[14px]

            text-white

            outline-none

            placeholder:text-[#5F6671]

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
            "
          >
            {showPassword ? (
              <EyeOff size={17} />
            ) : (
              <Eye size={17} />
            )}
          </button>

        </div>

        {/* Forgot */}

        <div className="flex justify-end">

          <Link
            to="/forgot-password"
            className="
            text-[13px]

            text-[#7285A2]
            "
          >
            Forgot password?
          </Link>

        </div>

        {error && (
          <div
            className="
            rounded-lg

            border
            border-red-500/20

            bg-red-500/5

            p-3

            text-[12px]

            leading-5

            text-red-400
            "
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`
          flex

          h-12.25

          w-full

          items-center

          justify-center

          gap-2

          rounded-full

          text-[15px]

          font-medium

          transition

          ${loading
              ? "bg-[#2858A6] text-white/70"
              : "bg-[#F4F5F7] text-black hover:bg-white"
            }
          `}
        >

          {loading ? (
            <>
              <LoaderCircle
                size={18}
                className="animate-spin"
              />

              Signing in...
            </>
          ) : (
            "Continue"
          )}

        </button>

      </form>

    </div>
  );
}

/* ============================================================
   DIVIDER
============================================================ */

function Divider() {
  return (
    <div className="flex items-center gap-3">

      <div className="h-px flex-1 bg-[#292B30]" />

      <span
        className="
        text-[12px]

        text-[#737985]
        "
      >
        or
      </span>

      <div className="h-px flex-1 bg-[#292B30]" />

    </div>
  );
}

/* ============================================================
   TERMS
============================================================ */

function Terms() {
  return (
    <p
      className="
      mt-5

      text-center

      text-[11px]

      leading-4.25

      text-[#707782]
      "
    >
      By continuing, you agree to our{" "}
      <Link
        to="/terms"
        className="
        text-[#9AA2AE]

        underline

        underline-offset-2
        "
      >
        User Agreement
      </Link>{" "}
      and{" "}
      <Link
        to="/privacy"
        className="
        text-[#9AA2AE]

        underline

        underline-offset-2
        "
      >
        Privacy Policy
      </Link>
    </p>
  );
}

/* ============================================================
   LOGO
============================================================ */

function Logo() {
  return (
    <div
      className="
      flex

      items-center

      gap-[2px]
      "
    >

      <span
        className="
        block
        h-4
        w-1.75
        skew-x-[-25deg]
        rounded-xs
        bg-[#4D8DFF]
        "
      />

      <span
        className="
        block
        h-4
        w-1.75
        skew-x-[-25deg]
        rounded-xs
        bg-[#72A9FF]
        "
      />

    </div>
  );
}