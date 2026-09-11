import { useNavigate } from "react-router-dom";
import { useAccountStatusContext } from "../../context/AccountStatusContext";

export default function AccountActivationGate({
  children,
  action = "continue",
}) {
  const navigate = useNavigate();

  const {
    isActive,
    loading,
  } = useAccountStatusContext();

  if (loading) {
    return (
      <div className="rounded-xl border border-[#1A1E24] bg-[#0D1014] p-4">
        <div className="h-5 w-40 animate-pulse rounded bg-[#1A1E24]" />
        <div className="mt-3 h-4 w-64 animate-pulse rounded bg-[#1A1E24]" />
      </div>
    );
  }

  if (isActive) {
    return children;
  }

  return (
    <div className="rounded-2xl border border-[#1A1E24] bg-[#0D1014] p-5">
      <div className="mb-4">
        <p className="text-sm font-semibold text-white">
          Account activation required
        </p>

        <p className="mt-1 text-sm leading-6 text-[#8B93A1]">
          Your account is not active yet. Complete the USDT
          deposit verification to {action}.
        </p>
      </div>

      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="w-full rounded-xl bg-[#4D8DFF] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3D7EF0] active:scale-[0.99]"
      >
        Activate account
      </button>
    </div>
  );
}