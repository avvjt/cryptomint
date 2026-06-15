import {
  QrCode,
  ChevronRight,
  Smartphone
} from "lucide-react";

export default function DownloadCard() {
  return (
    <div
      className="
      backdrop-blur-xl
      bg-[#07162F]/90
      border border-white/10
      rounded-3xl
      overflow-hidden
      flex
      flex-col
      md:flex-row
      "
    >
      <div className="p-5 flex items-center gap-4">
        <QrCode size={85} className="text-white" />

        <div>
          <h3 className="text-white text-lg">
            Scan to download App
          </h3>
        </div>
      </div>

      <div className="w-px bg-white/10 hidden md:block" />

      <button className="p-6 flex items-center gap-3 text-white hover:bg-white/5 transition">
        <Smartphone size={20} />
        Download APK
      </button>

      <div className="w-px bg-white/10 hidden md:block" />

      <button className="p-6 flex items-center gap-2 text-zinc-400 hover:text-white transition">
        More
        <ChevronRight size={18} />
      </button>
    </div>
  );
}