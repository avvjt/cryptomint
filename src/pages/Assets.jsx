import { useState } from "react";

import WalletOverview from "../components/assets/WalletOverview";
import BalanceCard from "../components/assets/BalanceCard";
import QuickActions from "../components/assets/QuickActions";
import TransactionTabs from "../components/assets/TransactionTabs";
import TransactionTable from "../components/assets/TransactionTable";

export default function Assets() {

  const [activeTab, setActiveTab] =
    useState("All");

  const transactions = [
    {
      id: 1,
      type: "Deposit",
      amount: "500 USDT",
      status: "Completed",
      date: "Today",
    },
    {
      id: 2,
      type: "Reward",
      amount: "5 USDT",
      status: "Completed",
      date: "Yesterday",
    },
    {
      id: 3,
      type: "Withdrawal",
      amount: "100 USDT",
      status: "Pending",
      date: "12 Jul",
    },
  ];

  const filtered =
    activeTab === "All"
      ? transactions
      : transactions.filter(
          (tx) =>
            tx.type.toLowerCase() ===
            activeTab.slice(0, -1).toLowerCase()
        );

  return (
    <div className="mx-auto max-w-7xl p-6">

      <h1 className="mb-8 text-4xl font-bold">
        Assets
      </h1>

      <WalletOverview />

      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

        <BalanceCard
          title="Available Balance"
          value="250 USDT"
        />

        <BalanceCard
          title="Locked Investment"
          value="1000 USDT"
        />

        <BalanceCard
          title="Today's Income"
          value="15 USDT"
        />

        <BalanceCard
          title="Total Income"
          value="380 USDT"
        />

      </div>

      <div className="mt-6">

        <QuickActions />

      </div>

      <div className="mt-10">

        <TransactionTabs
          active={activeTab}
          setActive={setActiveTab}
        />

      </div>

      <div className="mt-6">

        <TransactionTable
          transactions={filtered}
        />

      </div>

    </div>
  );
}