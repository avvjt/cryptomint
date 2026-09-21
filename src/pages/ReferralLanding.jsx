import { Gift, ArrowRight, ShieldCheck } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function ReferralLanding() {
  const { referralCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (referralCode) {
      localStorage.setItem("referralCode", referralCode);
    }
  }, [referralCode]);

  const handleJoin = () => {
    navigate(`/register?ref=${encodeURIComponent(referralCode)}`);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090B0E] px-4 text-white">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-[#1A1E24] bg-[#101318] p-6 shadow-2xl">
          
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4D8DFF]/10">
              <Gift size={30} className="text-[#4D8DFF]" />
            </div>

            <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-[#737B89]">
              You're invited
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Welcome to CryptoMintX
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#737B89]">
              You've been invited through a CryptoMintX referral link.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-[#4D8DFF]/20 bg-[#0D1624] p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#4D8DFF]/10">
                <Gift size={22} className="text-[#4D8DFF]" />
              </div>

              <div>
                <p className="text-lg font-semibold">
                  5% Referral Bonus
                </p>

                <p className="mt-1 text-xs leading-5 text-[#8A93A3]">
                  Qualify for the referral bonus after your first
                  qualifying deposit.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-[#1A1E24] bg-[#0B0E12] p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck
                size={18}
                className="shrink-0 text-[#08B77A]"
              />

              <p className="text-xs leading-5 text-[#737B89]">
                Your referral will be automatically attached when
                you create your account.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleJoin}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#285DB5] py-3.5 text-sm font-semibold text-white transition hover:bg-[#326BC7]"
          >
            Create Account
            <ArrowRight size={17} />
          </button>

          <p className="mt-4 text-center text-[10px] text-[#555D68]">
            Referral code: {referralCode}
          </p>
        </div>
      </div>
    </main>
  );
}