import Events from "../components/events/Events";
import HomeHero from "../components/HomeHero";
import Security from "../components/Security";
import AssetSecurity from "../components/security/AssetSecurity";
import AppDownload from "../components/app-download/AppDownload";

import FooterDesign from "../components/FooterDesign";
import ZeroFeeSection from "../components/zero-fee/ZeroFeeSection"
import DownloadCard from "../components/DownloadCard";

function Home() {
    return (
        <>
            <AppDownload />
            <Events />
            
            <FooterDesign />
            <ZeroFeeSection />
            <HomeHero />
            <Security />
            <AssetSecurity />
            <DownloadCard/>
        </>
    );
}

export default Home;