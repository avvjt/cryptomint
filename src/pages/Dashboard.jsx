import DashboardHeader from "../components/dashboard/DashboardHeader";
import DepositVerificationCard from "../components/account/DepositVerificationCard";
import PortfolioCard from "../components/dashboard/PortfolioCard";
import QuickActions from "../components/dashboard/QuickActions";
import EarningsOverview from "../components/dashboard/EarningsOverview";
import RecentActivity from "../components/dashboard/RecentActivity";
import MarketSnapshot from "../components/dashboard/MarketSnapshot";
import WalletBreakdown from "../components/dashboard/WalletBreakdown";
import AutoTradeStatus from "../components/dashboard/AutoTradeStatus";
import useDashboard from "../hooks/useDashboard";

export default function Dashboard() {
  const {
    dashboard,
    loading,
    error,
    refreshDashboard,
  } = useDashboard();

  return (
    <main className="min-h-screen bg-[#090B0E] px-4 pb-28 pt-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1700px]">

        <DashboardHeader />

        {/* Optional error */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <PortfolioCard
          dashboard={dashboard}
          loading={loading}
        />

        <QuickActions />

        <EarningsOverview
          dashboard={dashboard}
          loading={loading}
        />

        <RecentActivity
          dashboard={dashboard}
          loading={loading}
        />

        <MarketSnapshot />

        <WalletBreakdown
          dashboard={dashboard}
          loading={loading}
        />

        <AutoTradeStatus
          dashboard={dashboard}
          loading={loading}
        />
      </div>
    </main>
  );
}