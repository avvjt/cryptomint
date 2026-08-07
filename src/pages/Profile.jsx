import { useAuth } from "../context/AuthContext";

import ProfileHero from "../components/profile/ProfileHero";
import ProfileStats from "../components/profile/ProfileStats";
import AccountInformation from "../components/profile/AccountInformation";
import SecurityCenter from "../components/profile/SecurityCenter";
import WalletAddresses from "../components/profile/WalletAddresses";
import ReferralCard from "../components/profile/ReferralCard";
import VerificationCard from "../components/profile/VerificationCard";
import PreferencesCard from "../components/profile/PreferencesCard";
import LoginDevices from "../components/profile/LoginDevices";

export default function Profile() {

  const { user, loading } = useAuth();

  if (loading) {

    return (

      <div className="flex h-screen items-center justify-center">

        <div
          className="
          h-12
          w-12

          animate-spin

          rounded-full

          border-4

          border-[#1D66FF]

          border-t-transparent
          "
        />

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

      {/* Hero */}

      <ProfileHero

        avatar={user?.avatar}

        username={user?.username || "User"}

        email={user?.email}

        uid={user?._id?.slice(-8).toUpperCase()}

        level={user?.level || 1}

        joined="August 2026"

        verified={true}

      />

      {/* Stats */}

      <ProfileStats

        wallet={1520.5}

        deposit={5000}

        withdraw={1800}

        earnings={920}

        referral={285}

        team={18}

      />

      {/* Two Column */}

      <div
        className="
        grid

        gap-6

        xl:grid-cols-2
        "
      >

        <AccountInformation

          username={user?.username || "User"}

          email={user?.email}

          phone="+91 9876543210"

          country="India"

          joined="August 2026"

          verified

        />

        <SecurityCenter />

      </div>

      {/* Two Column */}

      <div
        className="
        grid

        gap-6

        xl:grid-cols-2
        "
      >

        <WalletAddresses />

        <VerificationCard />

      </div>

      {/* Referral */}

      <ReferralCard

        code="CMX82JKP"

        link={`https://cryptomintx.com/signup?ref=${user?._id}`}

        totalReferrals={18}

        referralIncome={285.5}

      />

      {/* Preferences */}

      <PreferencesCard />

      {/* Devices */}

      <LoginDevices />

    </div>

  );

}