import { Outlet } from "react-router-dom";
import MobileBottomNav from "../components/navigation/MobileBottomNav";
import MobileHeader from "../components/navigation/MobileHeader";
import DesktopSidebar from "../components/navigation/DesktopSidebar";
import Ticker from "../components/Ticker";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#05080C] text-white">

      {/* =====================================================
          DESKTOP
      ====================================================== */}

      <div className="hidden lg:block">
        <Ticker />
        <DesktopSidebar />

        <main
          className="
            min-h-screen
            pl-[270px]
            bg-[#05080C]
          "
        >

          <div className="min-h-screen">
            <Outlet />
          </div>
        </main>

      </div>

      {/* =====================================================
          MOBILE
      ====================================================== */}

      <div className="lg:hidden">

        <MobileHeader />

        <main className="pb-24">
          <Outlet />
        </main>

        <MobileBottomNav />

      </div>

    </div>
  );
}