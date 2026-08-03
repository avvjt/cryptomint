import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import SocialButtons from "../components/auth/SocialButtons";
import AuthDivider from "../components/auth/AuthDivider";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { fetchUser } = useAuth();


    const handleSignin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await res.json();

            if (res.ok) {
               localStorage.setItem("token", data.token);

await fetchUser();

navigate("/dashboard");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        }
    };



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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <AuthInput
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />


                    <form onSubmit={handleSignin}>
                        {/* Inputs */}

                        <button
                            type="submit"
                            className="w-full rounded-full bg-[#1D66FF] py-4 font-medium text-white"
                        >
                            Sign In
                        </button>
                    </form>

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
                        <Link to="/forgot-password"
                            className="text-blue-500 ml-2">
                            Forgot Password?
                        </Link>
                    </div>

                </div>

            </AuthCard>
        </div>
    );
}