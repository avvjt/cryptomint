import { useAuth } from "../context/AuthContext";
import StatCard from "../components/dashboard/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import InvestmentProgress from "../components/dashboard/InvestmentProgress";
import ReferralProgress from "../components/dashboard/ReferralProgress";
import RecentActivity from "../components/dashboard/RecentActivity";

export default function Dashboard() {
  // const { user, loading } = useAuth();

  // if (loading) {
  //   return (
  //     <div className="flex h-screen items-center justify-center text-white">
  //       Loading...
  //     </div>
  //   );
  // }

  return (
    <div className="mx-auto max-w-7xl p-6">

      <h1 className="text-4xl font-bold">
        Welcome back 👋
      </h1>

      <p className="mt-2 text-zinc-400">
        {/* {user.email} */}
      </p>

      {/* Stats */}

      <div className="mt-8 grid gap-6 lg:grid-cols-4">

        <StatCard
          title="Wallet Balance"
          value="$0.00"
        />

        <StatCard
          title="Today's Income"
          value="$0.00"
          color="text-green-500"
        />

        <StatCard
          title="Team Income"
          value="$0.00"
          color="text-blue-500"
        />

        <StatCard
          title="Current Package"
          value="Starter"
        />

      </div>
      <QuickActions />
      <InvestmentProgress />
      <ReferralProgress />
      <RecentActivity />

    </div>
  );
}