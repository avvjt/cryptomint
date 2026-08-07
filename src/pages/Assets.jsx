import assets from "../data/assets";

import AssetsHeader from "../components/assets/AssetsHeader";
import BalanceCard from "../components/assets/BalanceCard";
import WalletOverview from "../components/assets/WalletOverview";
import QuickActions from "../components/assets/QuickActions";
import IncomeSummary from "../components/assets/IncomeSummary";
import TransactionHistory from "../components/assets/TransactionHistory";

export default function Assets() {

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

      <AssetsHeader />

      {/* Hero Balance */}

      <BalanceCard

        availableBalance={assets.availableBalance}

        todayIncome={assets.todayIncome}

      />

      {/* Quick Actions */}

      <QuickActions />

      {/* Wallet Grid */}

      <div
        className="
        grid

        gap-6

        xl:grid-cols-2
        "
      >

        <WalletOverview

          investment={assets.investmentBalance}

          profit={assets.profitBalance}

          withdrawable={assets.withdrawableBalance}

          pending={assets.pendingWithdrawal}

        />

        <IncomeSummary

          today={assets.todayIncome}

          total={assets.totalIncome}

          referral={assets.referralIncome}

          team={assets.teamIncome}

        />

      </div>

      {/* Transactions */}

      <TransactionHistory

        transactions={assets.transactions}

      />

    </div>

  );

}