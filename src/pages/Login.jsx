import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import SocialButtons from "../components/auth/SocialButtons";
import AuthDivider from "../components/auth/AuthDivider";
import { Link } from "react-router-dom";

export default function Login() {
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
                    Welcome Back
                </h1>

                <p className="mt-2 text-zinc-500">
                    Sign in to continue trading
                </p>

                <div className="mt-8 space-y-5">

                    <AuthInput
                        label="Email"
                        placeholder="Enter email"
                    />

                    <AuthInput
                        label="Password"
                        type="password"
                        placeholder="Enter password"
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
                        Sign In
                    </button>

                    <AuthDivider />

                    <SocialButtons />

                    <div className="text-center">
                        <span className="text-zinc-500">
                            Don't have an account?
                        </span>

                        <Link
                            to="/signup"
                            className="text-blue-500 ml-2"
                        >
                            Sign Up
                        </Link>
                    </div>

                </div>

            </AuthCard>
        </div>
    );
}