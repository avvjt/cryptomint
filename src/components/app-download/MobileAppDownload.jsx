import { Apple, Monitor, Smartphone } from "lucide-react";

export default function MobileAppDownload() {
  return (
    <section className="bg-black px-4 py-10">
      {/* Title */}
      <h2 className="text-center text-3xl font-bold text-white">
        Trade Anywhere
        <br />
        with the MEXC App
      </h2>

      {/* Main Card */}
      <div className="mt-8 rounded-[28px] border border-[#15233A] bg-[#030813] p-5">
        {/* Phone */}
        <div className="flex justify-center">
          <img
            src="/app/phone.webp"
            alt="Phone"
            className="w-[220px]"
          />
        </div>

        {/* Reward Banner */}
        <div className="mt-6 rounded-xl border border-blue-300 bg-blue-100 px-4 py-3 text-center text-sm text-black shadow-[0_0_15px_rgba(59,130,246,.5)]">
          First login on the App or Lite App to claim 5 USDT
        </div>

        {/* QR Section */}
        <div className="mt-8 flex flex-col items-center text-center">
          <img
            src="/app/qr.webp"
            alt="QR Code"
            className="w-32"
          />

          <h3 className="mt-6 text-2xl font-semibold text-white">
            Scan to download App
          </h3>

          <p className="mt-3 text-zinc-400">
            Install without the App Store — experience MEXC instantly.
          </p>

          <button className="mt-4 text-blue-400">
            Scan to download APK
          </button>
        </div>

        {/* Apple Install */}
        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-zinc-800 p-4">
          <Apple size={24} />
          <span className="text-sm text-white">
            Install without App Store
          </span>
        </div>

        {/* Download Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-[#111827] py-4 text-white">
            <Smartphone size={20} />
            APK
          </button>

          <button className="flex items-center justify-center gap-2 rounded-2xl bg-[#111827] py-4 text-white">
            <Monitor size={20} />
            Windows
          </button>
        </div>

        {/* Installation Guide */}
        <button className="mt-4 w-full rounded-2xl border border-zinc-700 py-4 text-white">
          Installation Guide
        </button>
      </div>
    </section>
  );
}