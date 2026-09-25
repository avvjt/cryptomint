import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function TelegramAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const { loginWithTelegram } = useAuth();

  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const authenticate = async () => {
      try {
        // Authenticate through Telegram
        await loginWithTelegram();

        if (cancelled) return;

        // Read requested page from Telegram button
        const params = new URLSearchParams(location.search);
        const redirectTo = params.get("redirect") || "/dashboard";

        // Only allow valid internal CryptoMintX routes
        const allowedRoutes = [
          "/dashboard",
          "/markets",
          "/trade",
          "/team",
          "/assets",
          "/profile",
          "/wallet",
          "/history",
        ];

        const destination = allowedRoutes.includes(redirectTo)
          ? redirectTo
          : "/dashboard";

        navigate(destination, {
          replace: true,
        });
      } catch (err) {
        console.error(
          "Telegram authentication error:",
          err
        );

        if (!cancelled) {
          setError(
            err?.message ||
              "Telegram authentication failed. Please try again."
          );
        }
      }
    };

    authenticate();

    return () => {
      cancelled = true;
    };
  }, [loginWithTelegram, navigate, location.search]);

  // ==========================================================
  // ERROR
  // ==========================================================

  if (error) {
    return (
      <div className="min-h-screen bg-[#05070A] text-white flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">

          <div className="text-4xl mb-4">
            ⚠️
          </div>

          <h1 className="text-xl font-semibold mb-2">
            Telegram Authentication Failed
          </h1>

          <p className="text-gray-400 text-sm mb-6">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="px-5 py-3 rounded-xl bg-white text-black font-medium"
          >
            Try Again
          </button>

        </div>
      </div>
    );
  }

  // ==========================================================
  // LOADING
  // ==========================================================

  return (
    <div className="min-h-screen bg-[#05070A] text-white flex items-center justify-center">
      <div className="text-center">

        <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4" />

        <p className="text-gray-400">
          Connecting to CryptoMintX...
        </p>

      </div>
    </div>
  );
}