import { Copy, Share2 } from "lucide-react";

export default function TeamOverview() {

  const code = "ABHI2026";

  return (

    <div className="rounded-3xl bg-zinc-900 p-6">

      <h2 className="text-2xl font-bold">

        Referral Center

      </h2>

      <p className="mt-2 text-zinc-500">

        Invite friends and earn commission.

      </p>

      <div className="mt-6 flex gap-3">

        <input
          value={code}
          readOnly
          className="
          flex-1
          rounded-xl
          bg-black
          p-4
          outline-none
          "
        />

        <button
          className="
          rounded-xl
          bg-blue-600
          px-5
          "
        >
          <Copy size={18}/>
        </button>

        <button
          className="
          rounded-xl
          bg-zinc-800
          px-5
          "
        >
          <Share2 size={18}/>
        </button>

      </div>

    </div>

  );

}