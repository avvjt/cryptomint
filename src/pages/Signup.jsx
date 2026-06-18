import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import AuthDivider from "../components/auth/AuthDivider";
import SocialButtons from "../components/auth/SocialButtons";
import { Link } from "react-router-dom";

export default function Signup() {
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
                    />

                    <AuthInput
                        label="Password"
                        type="password"
                        placeholder="Create password"
                    />

                    <AuthInput
                        label="Referral Code"
                        placeholder="Optional"
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