import team from "../data/team";

import TeamHeader from "../components/team/TeamHeader";
import TeamStats from "../components/team/TeamStats";
import ReferralLink from "../components/team/ReferralLink";
import ReferralTree from "../components/team/ReferralTree";
import LevelProgress from "../components/team/LevelProgress";
import TeamIncome from "../components/team/TeamIncome";
import CommissionTable from "../components/team/CommissionTable";
import TeamMembers from "../components/team/TeamMembers";

export default function Team() {

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

      <TeamHeader

        level={team.level}

        totalMembers={team.totalMembers}

      />

      <TeamStats

        levelA={team.levelA}

        levelB={team.levelB}

        levelC={team.levelC}

        todayIncome={team.todayIncome}

        totalIncome={team.totalIncome}

      />

      <ReferralLink

        code={team.referralCode}

        link={team.referralLink}

      />

      <ReferralTree

        levelA={team.levelA}

        levelB={team.levelB}

        levelC={team.levelC}

      />

      <LevelProgress />

      <TeamIncome />

      <CommissionTable />

      <TeamMembers

        members={team.members}

      />

    </div>

  );

}