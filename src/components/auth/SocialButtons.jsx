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
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-3">

      <GoogleLogin
        onSuccess={handleGoogleSignup}
        onError={() => console.log("Login Failed")}
      />

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
        </button>

      </div>

    </div>
  );
}