import { Outlet } from "react-router-dom";
import MobileBottomNav from "../components/navigation/MobileBottomNav";
import MobileHeader from "../components/navigation/MobileHeader";
import DesktopSidebar from "../components/navigation/DesktopSidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#050A14] text-white">

      {/* Desktop */}

      <div className="hidden lg:flex">

        <DesktopSidebar />

        <main className="flex-1 overflow-auto">

          <Outlet />

        </main>

      </div>

      {/* Mobile */}

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