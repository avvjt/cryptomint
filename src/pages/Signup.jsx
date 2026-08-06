import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import AuthDivider from "../components/auth/AuthDivider";
import SocialButtons from "../components/auth/SocialButtons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

export default function Signup() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [referralCode, setReferralCode] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSingup = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Your signup logic here
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, referralCode }),
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem(
                    "token",
                    data.token
                );

                navigate("/dashboard");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error during signup:", error);
        }
    }



    return (
        <div
            className="
      flex
      min-h-screen
      items-center
      justify-center
      px-4
      "
        >
            <AuthCard>

                <h1
                    className="
          text-4xl
          font-bold
          text-white
          "
                >
                    Create Account
                </h1>

                <p className="mt-2 text-zinc-500">
                    Start your crypto journey
                </p>

                <div className="mt-8 space-y-5">

                    <AuthInput
                        label="Email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <AuthInput
                        label="Password"
                        type="password"
                        placeholder="Create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <AuthInput
                        label="Referral Code"
                        placeholder="Optional"
                        value={referralCode}
                        onChange={(e) => setReferralCode(e.target.value)}
                    />

                    <button
                        type="submit"
                        onClick={handleSingup}
                        disabled={loading}
                        className={`
    flex
    w-full
    items-center
    justify-center
    gap-2

    rounded-full

    py-4

    font-medium
    text-white

    transition-all
    duration-200

    ${loading
                                ? "cursor-not-allowed bg-blue-400"
                                : "bg-[#1D66FF] hover:bg-[#3478ff] active:scale-[0.98]"
                            }
  `}
                    >
                        {loading ? (
                            <>
                                <LoaderCircle
                                    size={20}
                                    className="animate-spin"
                                />
                                Creating Account...
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </button>

                    <AuthDivider />

                    <SocialButtons />

                    <div className="text-center">
                        <span className="text-zinc-500">
                            Already have an account?
                        </span>

                        <Link
                            to="/login"
                            className="text-blue-500 ml-2"
                        >
                            Sign In
                        </Link>
                    </div>

                </div>

            </AuthCard>
        </div>
    );
}