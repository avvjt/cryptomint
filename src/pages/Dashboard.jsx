import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import dashboard from "../data/dashboard";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import PortfolioCard from "../components/dashboard/PortfolioCard";
import PackageCard from "../components/dashboard/PackageCard";
import TeamOverview from "../components/dashboard/TeamOverview";
import EarningsCard from "../components/dashboard/EarningsCard";
import ReferralTree from "../components/dashboard/ReferralTree";
import RecentActivity from "../components/dashboard/RecentActivity";
import PromotionBanner from "../components/dashboard/PromotionBanner";

export default function Dashboard() {

  const navigate = useNavigate();

  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <div
        className="
        flex
        min-h-screen
        items-center
        justify-center
        text-zinc-400
        "
      >
        Loading...
      </div>
    );
  }

  return (

    <div
      className="
      mx-auto

      max-w-7xl

      space-y-6

      px-4
      py-6

      lg:px-8
      "
    >

      {/* Header */}

      <DashboardHeader

        name={
          user?.username ||
          user?.email?.split("@")[0] ||
          "Investor"
        }

        email={user?.email}

        level={dashboard.team.level}

      />

      {/* Portfolio */}

      <PortfolioCard

        balance={dashboard.balance}

        todayIncome={dashboard.todayIncome}

        dailyRate={dashboard.dailyRate}

        packageName={dashboard.package}

        onDeposit={() => navigate("/assets")}

        onWithdraw={() => navigate("/assets")}

        onTeam={() => navigate("/team")}

        onHistory={() => navigate("/assets")}

      />

      {/* Dashboard Grid */}

      <div
        className="
        grid

        gap-6

        lg:grid-cols-2
        "
      >

        <PackageCard

          packageName={dashboard.package}

          investment={dashboard.balance}

          dailyRate={dashboard.dailyRate}

          dailyIncome={dashboard.todayIncome}

          nextReward={dashboard.nextReward}

          onUpgrade={() =>
            console.log("Upgrade")
          }

        />

        <TeamOverview

          userLevel={dashboard.team.level}

          levelA={dashboard.team.a}

          levelB={dashboard.team.b}

          levelC={dashboard.team.c}

          commissionToday={dashboard.team.commissionToday}

          totalTeam={
            dashboard.team.a +
            dashboard.team.b +
            dashboard.team.c
          }

          nextLevelA={dashboard.team.nextLevelA}

          nextLevelBC={dashboard.team.nextLevelBC}

          onViewTeam={() =>
            navigate("/team")
          }

        />

        <EarningsCard

          investmentIncome={
            dashboard.earnings.investment
          }

          referralIncome={
            dashboard.earnings.referral
          }

          teamIncome={
            dashboard.earnings.team
          }

        />

        <ReferralTree

          level={dashboard.team.level}

          levelA={dashboard.team.a}

          levelB={dashboard.team.b}

          levelC={dashboard.team.c}

          onViewTeam={() =>
            navigate("/team")
          }

        />

      </div>

      {/* Recent Activity */}

      <RecentActivity
        activities={dashboard.activities}
      />

      {/* Promotion */}

      <PromotionBanner />

    </div>

  );

}