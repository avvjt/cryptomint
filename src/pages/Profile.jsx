import {
  Shield,
  Users,
  Wallet,
  History,
  Settings,
  LogOut,
} from "lucide-react";

import ProfileHeader from "../components/profile/ProfileHeader";
import MenuItem from "../components/profile/MenuItem";

export default function Profile() {
  return (
    <div className="mx-auto max-w-4xl p-6">

      <h1 className="mb-6 text-4xl font-bold">
        Profile
      </h1>

      <ProfileHeader
        name="Abhi"
        email="abhi@gmail.com"
        level={2}
        joined="Jul 2026"
      />

      <div className="mt-8 space-y-4">

        <MenuItem
          icon={Shield}
          title="Security"
          subtitle="Password & account protection"
        />

        <MenuItem
          icon={Wallet}
          title="Wallet"
          subtitle="Deposit & withdrawal addresses"
        />

        <MenuItem
          icon={Users}
          title="Referral"
          subtitle="Referral code & invite friends"
        />

        <MenuItem
          icon={History}
          title="History"
          subtitle="Rewards & transactions"
        />

        <MenuItem
          icon={Settings}
          title="Settings"
          subtitle="Theme & notifications"
        />

        <MenuItem
          icon={LogOut}
          title="Logout"
          subtitle="Sign out of your account"
        />

      </div>

    </div>
  );
}