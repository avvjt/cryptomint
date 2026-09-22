import {
  Bell,
  Settings2,
} from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between my-1">
      <div>
        <p
          className="
            text-[10px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-[#606975]
          "
        >
          Account
        </p>

        <h1
          className="
            mt-1
            text-[22px]
            font-semibold
            tracking-tight
            text-white
          "
        >
          Dashboard
        </h1>
      </div>

     
    </header>
  );
}