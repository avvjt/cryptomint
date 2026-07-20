import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import AuthDivider from "../components/auth/AuthDivider";
import SocialButtons from "../components/auth/SocialButtons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [referralCode, setReferralCode] = useState("");


    const handleSingup = async (e) => {
        e.preventDefault();

        try {
            // Your signup logic here
            const res = await fetch("http://localhost:3000/api/auth/register", {
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
                        className="
            w-full
            rounded-full
            bg-[#1D66FF]
            py-4
            font-medium
            text-white
            "
                        onClick={handleSingup}
                    >
                        Sign Up
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