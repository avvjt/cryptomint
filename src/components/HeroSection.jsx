import { motion } from "framer-motion";
import PhoneMockup from "./PhoneMockup";
import DownloadCard from "./DownloadCard";
import SignupBar from "./SignupBar";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black min-h-screen flex items-center justify-center px-4">

      {/* Blue Glow Arc */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1400px] h-[700px] rounded-full border border-blue-500/20 blur-sm" />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full border border-blue-600/40" />

      <div className="max-w-7xl mx-auto text-center relative z-10">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="
          text-white
          font-semibold
          leading-tight
          text-4xl
          md:text-6xl
          lg:text-7xl
          "
        >
          Your 0-Fee Gateway to
          <br />
          Infinite Opportunities
        </motion.h1>

        <p className="mt-4 text-zinc-300 text-lg md:text-2xl">
          Futures: Maker 0.01%, Taker 0.04%
        </p>

        <div className="mt-10 relative flex justify-center">
          <PhoneMockup />

          <div className="absolute bottom-12">
            <DownloadCard />
          </div>
        </div>

        <div className="mt-10">
          <SignupBar />
        </div>

      </div>
    </section>
  );
}