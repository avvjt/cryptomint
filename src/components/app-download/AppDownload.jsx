import DesktopAppDownload from "./DesktopAppDownload";
import MobileAppDownload from "./MobileAppDownload";

export default function AppDownload() {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopAppDownload />
      </div>

      <div className="lg:hidden">
        <MobileAppDownload />
      </div>
    </>
  );
}