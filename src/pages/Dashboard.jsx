import DashboardHeader from "../components/dashboard/DashboardHeader";
import DepositVerificationCard from "../components/account/DepositVerificationCard";
import PortfolioCard from "../components/dashboard/PortfolioCard";
import QuickActions from "../components/dashboard/QuickActions";
import EarningsOverview from "../components/dashboard/EarningsOverview";
import RecentActivity from "../components/dashboard/RecentActivity";
import MarketSnapshot from "../components/dashboard/MarketSnapshot";
import WalletBreakdown from "../components/dashboard/WalletBreakdown";
import AutoTradeStatus from "../components/dashboard/AutoTradeStatus";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#090B0E] px-4 pb-28 pt-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1700px]">
        <DashboardHeader />

        {/* <DepositVerificationCard /> */}

        <PortfolioCard />

        <QuickActions />

        <EarningsOverview />

        <RecentActivity />

        <MarketSnapshot />

        <WalletBreakdown />

        <AutoTradeStatus />
      </div>
    </main>
  );
}