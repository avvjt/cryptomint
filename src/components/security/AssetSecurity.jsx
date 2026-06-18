import DesktopSecurity from "./DesktopSecurity";
import MobileSecurity from "./MobileSecurity";

export default function AssetSecurity() {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopSecurity />
      </div>

      <div className="lg:hidden">
        <MobileSecurity />
      </div>
    </>
  );
}