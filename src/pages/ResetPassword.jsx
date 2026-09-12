import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  LockKeyhole,
  Eye,
  EyeOff,
  LoaderCircle,
  CheckCircle2,
  ShieldCheck,
  XCircle,
} from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const requirements = useMemo(
    () => ({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
    }),
    [password]
  );

  const strengthScore = Object.values(requirements).filter(Boolean).length;

  const passwordsMatch =
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    if (!password) {
      setError("Please enter a new password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else {
        setError(
          data.message || "Unable to reset your password."
        );
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStrengthText = () => {
    if (!password) return "";

    if (strengthScore <= 1) return "Very weak";
    if (strengthScore === 2) return "Weak";
    if (strengthScore === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="min-h-screen bg-[#090B0E] text-white flex items-center justify-center px-4 py-8">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#1D66FF]/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-200px] left-[-100px] w-[400px] h-[400px] bg-[#08B77A]/5 blur-[130px] rounded-full" />
      </div>

      <div className="relative w-full max-w-[440px]">
        {/* Logo */}
        <div className="flex justify-center mb-7">
          <Link
            to="/login"
            className="flex items-center gap-2.5"
          >
            <div className="w-9 h-9 rounded-xl bg-[#1D66FF] flex items-center justify-center shadow-[0_0_25px_rgba(29,102,255,0.25)]">
              <span className="text-white font-bold text-lg">
                C
              </span>
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
                <LockKeyhole
                  size={25}
                  strokeWidth={1.8}
                  className="text-[#4D8DFF]"
                />
              </div>

              {/* Heading */}
              <div className="mb-7">
                <h1 className="text-[28px] sm:text-[30px] font-semibold tracking-[-0.5px]">
                  Create new password
                </h1>

                <p className="text-[#8B929D] text-sm leading-6 mt-2.5">
                  Choose a strong password to keep your CryptoMintX
                  account secure.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-5 flex gap-3 rounded-xl border border-[#F6465D]/20 bg-[#F6465D]/8 px-4 py-3">
                  <XCircle
                    size={18}
                    className="text-[#F6465D] shrink-0 mt-0.5"
                  />

                  <p className="text-sm text-[#F6465D] leading-5">
                    {error}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* New password */}
                <label className="block text-sm font-medium text-[#D6D9DE] mb-2">
                  New password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666D78]"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    disabled={loading}
                    className="w-full h-[52px] rounded-xl bg-[#090B0E] border border-[#242932] pl-11 pr-12 text-sm text-white placeholder:text-[#555C66] outline-none transition-all focus:border-[#4D8DFF] focus:ring-2 focus:ring-[#1D66FF]/10 disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-[#666D78] hover:text-white transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {/* Strength */}
                {password && (
                  <div className="mt-3">
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4].map((bar) => (
                        <div
                          key={bar}
                          className={`h-1 flex-1 rounded-full transition-all ${
                            strengthScore >= bar
                              ? "bg-[#08B77A]"
                              : "bg-[#242932]"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex justify-between mt-2">
                      <span className="text-[11px] text-[#666D78]">
                        Password strength
                      </span>

                      <span className="text-[11px] text-[#08B77A]">
                        {getStrengthText()}
                      </span>
                    </div>
                  </div>
                )}

                {/* Requirements */}
                <div className="mt-5 rounded-xl bg-[#090B0E] border border-[#1A1E24] p-4">
                  <p className="text-xs font-medium text-[#B9BEC6] mb-3">
                    Password requirements
                  </p>

                  <div className="grid grid-cols-2 gap-y-2.5 gap-x-3">
                    <Requirement
                      valid={requirements.length}
                      text="8+ characters"
                    />

                    <Requirement
                      valid={requirements.uppercase}
                      text="Uppercase letter"
                    />

                    <Requirement
                      valid={requirements.lowercase}
                      text="Lowercase letter"
                    />

                    <Requirement
                      valid={requirements.number}
                      text="Number"
                    />
                  </div>
                </div>

                {/* Confirm password */}
                <label className="block text-sm font-medium text-[#D6D9DE] mb-2 mt-6">
                  Confirm password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666D78]"
                  />

                  <input
                    type={
                      showConfirmPassword ? "text" : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                    disabled={loading}
                    className={`w-full h-[52px] rounded-xl bg-[#090B0E] border pl-11 pr-12 text-sm text-white placeholder:text-[#555C66] outline-none transition-all focus:ring-2 disabled:opacity-60 ${
                      confirmPassword &&
                      !passwordsMatch
                        ? "border-[#F6465D]/50 focus:border-[#F6465D] focus:ring-[#F6465D]/10"
                        : confirmPassword &&
                          passwordsMatch
                        ? "border-[#08B77A]/50 focus:border-[#08B77A] focus:ring-[#08B77A]/10"
                        : "border-[#242932] focus:border-[#4D8DFF] focus:ring-[#1D66FF]/10"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-[#666D78] hover:text-white transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {confirmPassword && (
                  <p
                    className={`text-xs mt-2 ${
                      passwordsMatch
                        ? "text-[#08B77A]"
                        : "text-[#F6465D]"
                    }`}
                  >
                    {passwordsMatch
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={
                    loading ||
                    !password ||
                    !confirmPassword ||
                    !requirements.length
                  }
                  className="w-full h-[52px] mt-6 rounded-xl bg-[#1D66FF] hover:bg-[#2A70FF] active:scale-[0.99] transition-all font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_25px_rgba(29,102,255,0.15)]"
                >
                  {loading ? (
                    <>
                      <LoaderCircle
                        size={18}
                        className="animate-spin"
                      />
                      Updating password...
                    </>
                  ) : (
                    "Reset password"
                  )}
                </button>
              </form>

              {/* Security */}
              <div className="mt-7 pt-6 border-t border-[#1A1E24]">
                <div className="flex gap-3">
                  <ShieldCheck
                    size={18}
                    className="text-[#08B77A] shrink-0 mt-0.5"
                  />

                  <p className="text-xs text-[#717985] leading-5">
                    Your password is securely encrypted before being
                    stored. Never share your password or reset link.
                  </p>
                </div>
              </div>
            </>
          ) : (
            /* SUCCESS STATE */
            <div className="text-center py-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#08B77A]/10 border border-[#08B77A]/20 flex items-center justify-center mb-6">
                <CheckCircle2
                  size={31}
                  className="text-[#08B77A]"
                  strokeWidth={1.8}
                />
              </div>

              <h1 className="text-[28px] font-semibold tracking-[-0.5px]">
                Password updated
              </h1>

              <p className="text-[#8B929D] text-sm leading-6 mt-3">
                Your password has been successfully changed. You
                can now sign in using your new password.
              </p>

              <div className="mt-6 rounded-xl bg-[#08B77A]/5 border border-[#08B77A]/15 p-4 text-left">
                <div className="flex gap-3">
                  <ShieldCheck
                    size={18}
                    className="text-[#08B77A] shrink-0"
                  />

                  <p className="text-xs text-[#8B929D] leading-5">
                    For your security, your old password can no
                    longer be used to access your account.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full h-[52px] mt-7 rounded-xl bg-[#1D66FF] hover:bg-[#2A70FF] transition-all font-medium text-sm flex items-center justify-center gap-2"
              >
                Continue to login
                <ArrowLeft
                  size={17}
                  className="rotate-180"
                />
              </button>
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

const Requirement = ({ valid, text }) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-4 h-4 rounded-full flex items-center justify-center ${
          valid
            ? "bg-[#08B77A]/15"
            : "bg-[#1A1E24]"
        }`}
      >
        {valid ? (
          <CheckCircle2
            size={11}
            className="text-[#08B77A]"
          />
        ) : (
          <div className="w-1.5 h-1.5 rounded-full bg-[#555C66]" />
        )}
      </div>

      <span
        className={`text-[11px] ${
          valid ? "text-[#AEB5BE]" : "text-[#666D78]"
        }`}
      >
        {text}
      </span>
    </div>
  );
};

export default ResetPassword;