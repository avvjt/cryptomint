import { useNavigate } from "react-router-dom";

export default function AccountActivationModal({
  open,
  onClose,
}) {
  const navigate = useNavigate();

  if (!open) return null;

  const handleActivate = () => {
    onClose();
    navigate("/dashboard");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4">
      <div className="w-full max-w-md rounded-t-3xl border border-[#1A1E24] bg-[#0D1014] p-5 shadow-2xl sm:rounded-2xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-lg font-semibold text-white">
              Activate your account
            </p>

            <p className="mt-1 text-sm text-[#8B93A1]">
              Your account needs to be verified before you
              can trade.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[#737B89] transition hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-[#1A1E24] bg-[#090B0E] p-4">
            <p className="text-xs uppercase tracking-wide text-[#737B89]">
              Required
            </p>

            <p className="mt-1 text-sm font-medium text-white">
              USDT deposit via BEP20
            </p>

            <p className="mt-1 text-xs text-[#737B89]">
              BNB Smart Chain
            </p>
          </div>

          <button
            type="button"
            onClick={handleActivate}
            className="w-full rounded-xl bg-[#4D8DFF] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3D7EF0]"
          >
            View deposit details
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-[#1A1E24] px-4 py-3 text-sm font-medium text-[#AAB1BD] transition hover:bg-[#14181E] hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}