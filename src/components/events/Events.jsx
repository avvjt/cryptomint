import DesktopEvents from "./DesktopEvents";
import MobileEvents from "./MobileEvents";

export default function Events() {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopEvents />
      </div>

      <div className="lg:hidden">
        <MobileEvents />
      </div>
    </>
  );
}