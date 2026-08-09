import { GoogleLogin } from "@react-oauth/google";
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SocialButtons() {
  const navigate = useNavigate();

  const handleGoogleSignup = async (credentialResponse) => {
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
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert(data.message || "Google authentication failed");
      }
    } catch (error) {
      console.error("Google signup error:", error);
    }
  };

  return (
    <div className="space-y-3">

      {/* Google */}

      <div
        className="
          relative
          h-[46px]
          w-full
          overflow-hidden
          rounded-full
        "
      >
        <GoogleLogin
          onSuccess={handleGoogleSignup}
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

      {/* Apple */}

      <button
        type="button"
        className="
          flex
          h-[46px]
          w-full
          items-center
          justify-center
          gap-3

          rounded-full

          bg-[#191B1E]

          text-[14px]
          font-medium
          text-[#F1F3F5]

          transition

          hover:bg-[#22252A]

          active:scale-[0.99]
        "
      >
        <FaApple
          size={18}
          className="text-white"
        />

        <span>
          Continue with Apple
        </span>
      </button>

      {/* More Options */}

      <button
        type="button"
        className="
          flex
          h-[46px]
          w-full
          items-center
          justify-center

          rounded-full

          bg-[#191B1E]

          text-[14px]
          font-medium
          text-[#F1F3F5]

          transition

          hover:bg-[#22252A]

          active:scale-[0.99]
        "
      >
        More Options
      </button>

    </div>
  );
}