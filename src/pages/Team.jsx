import { useState } from "react";

import TeamOverview from "../components/team/TeamOverview";
import LevelProgress from "../components/team/LevelProgress";
import TeamStats from "../components/team/TeamStats";
import TeamTabs from "../components/team/TeamTabs";
import TeamMemberList from "../components/team/TeamMemberList";

export default function Team() {

  const [tab, setTab] = useState("A");

  return (
    <div className="mx-auto max-w-7xl p-6">

      <h1 className="mb-8 text-4xl font-bold">
        Team
      </h1>

      <TeamOverview />

      <div className="mt-6">
        <LevelProgress />
      </div>

      <div className="mt-6">
        <TeamStats />
      </div>

      <div className="mt-8">
        <TeamTabs
          active={tab}
          setActive={setTab}
        />
      </div>

      <div className="mt-6">
        <TeamMemberList />
      </div>

    </div>
  );
}