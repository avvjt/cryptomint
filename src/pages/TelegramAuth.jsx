import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function TelegramAuth() {
  const navigate = useNavigate();
  const { loginWithTelegram } = useAuth();

  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const authenticate = async () => {
      try {
        await loginWithTelegram();

        if (!cancelled) {
          navigate("/dashboard", { replace: true });
        }
      } catch (err) {
        console.error("Telegram authentication error:", err);

        if (!cancelled) {
          setError(
            err.message ||
              "Unable to authenticate with Telegram"
          );
        }
      }
    };

    authenticate();

    return () => {
      cancelled = true;
    };
  }, [loginWithTelegram, navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#05070A] flex items-center justify-center px-6 text-white">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <h1 className="text-xl font-semibold">
            Telegram Login Failed
          </h1>

          <p className="mt-3 text-sm text-white/60">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070A] flex items-center justify-center px-6 text-white">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />

        <p className="mt-5 text-sm text-white/60">
          Connecting to CryptoMintX...
        </p>
      </div>
    </div>
  );
}