import HomeHero from "../components/HomeHero";
import ZeroFeeSection from "../components/zero-fee/ZeroFeeSection";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Faq from "../components/Faq";
import HomeCTA from "../components/HomeCTA";
import FooterDesign from "../components/FooterDesign";
import Events from "../components/events/Events";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#05070A] text-white">

      <HomeHero />
      <ZeroFeeSection />
      <Features />
      <Events />
      <HowItWorks />
      <Faq />
      <HomeCTA />
      <FooterDesign />

    </main>
  );
}