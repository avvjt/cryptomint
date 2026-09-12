import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  LoaderCircle,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: normalizedEmail,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.message || "Unable to process your request.");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090B0E] text-white flex items-center justify-center px-4 py-8">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#1D66FF]/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-200px] right-[-100px] w-[400px] h-[400px] bg-[#08B77A]/5 blur-[130px] rounded-full" />
      </div>

      <div className="relative w-full max-w-[440px]">
        {/* Logo */}
        <div className="flex justify-center mb-7">
          <Link
            to="/login"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#1D66FF] flex items-center justify-center shadow-[0_0_25px_rgba(29,102,255,0.25)]">
              <span className="text-white font-bold text-lg">C</span>
            </div>

            <span className="text-xl font-semibold tracking-tight">
              Crypto<span className="text-[#4D8DFF]">MintX</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[#0E1116] border border-[#1A1E24] rounded-[20px] p-6 sm:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
          {!success ? (
            <>
              {/* Back */}
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-[#8B929D] hover:text-white transition-colors mb-8"
              >
                <ArrowLeft size={16} />
                Back to login
              </Link>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-[#1D66FF]/10 border border-[#1D66FF]/20 flex items-center justify-center mb-5">
                <Mail
                  size={25}
                  strokeWidth={1.8}
                  className="text-[#4D8DFF]"
                />
              </div>

              {/* Heading */}
              <div className="mb-7">
                <h1 className="text-[27px] sm:text-[30px] font-semibold tracking-[-0.5px]">
                  Forgot your password?
                </h1>

                <p className="text-[#8B929D] text-sm leading-6 mt-2.5">
                  Enter the email associated with your account and we'll
                  send you a secure password reset link.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-5 rounded-xl border border-[#F6465D]/20 bg-[#F6465D]/8 px-4 py-3">
                  <p className="text-sm text-[#F6465D] leading-5">
                    {error}
                  </p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <label className="block text-sm font-medium text-[#D6D9DE] mb-2">
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666D78]"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your email"
                    autoComplete="email"
                    disabled={loading}
                    className="w-full h-[52px] rounded-xl bg-[#090B0E] border border-[#242932] pl-11 pr-4 text-sm text-white placeholder:text-[#555C66] outline-none transition-all focus:border-[#4D8DFF] focus:ring-2 focus:ring-[#1D66FF]/10 disabled:opacity-60"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[52px] mt-5 rounded-xl bg-[#1D66FF] hover:bg-[#2A70FF] active:scale-[0.99] transition-all font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_8px_25px_rgba(29,102,255,0.15)]"
                >
                  {loading ? (
                    <>
                      <LoaderCircle
                        size={18}
                        className="animate-spin"
                      />
                      Sending reset link...
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </button>
              </form>

              {/* Security info */}
              <div className="mt-7 pt-6 border-t border-[#1A1E24]">
                <div className="flex gap-3">
                  <ShieldCheck
                    size={18}
                    className="text-[#08B77A] shrink-0 mt-0.5"
                  />

                  <p className="text-xs text-[#717985] leading-5">
                    For your security, reset links expire after 15
                    minutes. Never share your reset link with anyone.
                  </p>
                </div>
              </div>
            </>
          ) : (
            /* SUCCESS STATE */
            <div className="text-center py-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#08B77A]/10 border border-[#08B77A]/20 flex items-center justify-center mb-6">
                <CheckCircle2
                  size={30}
                  className="text-[#08B77A]"
                  strokeWidth={1.8}
                />
              </div>

              <h1 className="text-[28px] font-semibold tracking-[-0.5px]">
                Check your inbox
              </h1>

              <p className="text-[#8B929D] text-sm leading-6 mt-3">
                If an account exists with this email, we've sent a
                password reset link.
              </p>

              <div className="mt-5 px-4 py-3 rounded-xl bg-[#090B0E] border border-[#1A1E24]">
                <p className="text-sm text-[#D6D9DE] break-all">
                  {email}
                </p>
              </div>

              <p className="text-xs text-[#666D78] leading-5 mt-5">
                The link will expire in 15 minutes. Check your spam or
                junk folder if you don't see the email.
              </p>

              <Link
                to="/login"
                className="mt-7 w-full h-[52px] rounded-xl bg-[#1D66FF] hover:bg-[#2A70FF] transition-all font-medium text-sm flex items-center justify-center gap-2"
              >
                <ArrowLeft size={17} />
                Back to login
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#555C66] mt-6">
          © {new Date().getFullYear()} CryptoMintX. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;