import { Outlet } from "react-router-dom";
import DesktopNavbar from "../components/navigation/DesktopNavbar";
import MobileBottomNav from "../components/navigation/MobileBottomNav";
import MobileHeader from "../components/navigation/MobileHeader";

export default function MainLayout() {
  return    (
    <div className="min-h-screen bg-black text-white">

      {/* Desktop */}
      <div className="hidden lg:block">
        <DesktopNavbar />
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <MobileHeader />
      </div>

      <main>
        <Outlet />
      </main>

      

    </div>
  );

 
}