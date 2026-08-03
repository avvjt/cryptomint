import { Copy, Share2 } from "lucide-react";

export default function ReferralCard() {

  const code = "ABHI2026";

  const link =
    `https://cryptomintx.com/signup?ref=${code}`;

  function copy(text) {

    navigator.clipboard.writeText(text);

    alert("Copied!");

  }

  return (

    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="text-2xl font-bold">

        Referral Center

      </h2>

      {/* Code */}

      <div className="mt-6">

        <p className="text-zinc-500">

          Referral Code

        </p>

        <div className="mt-2 flex">

          <input
            readOnly
            value={code}
            className="flex-1 rounded-l-xl bg-black p-4 outline-none"
          />

          <button
            onClick={() => copy(code)}
            className="rounded-r-xl bg-blue-600 px-5"
          >
            <Copy size={18}/>
          </button>

        </div>

      </div>

      {/* Link */}

      <div className="mt-6">

        <p className="text-zinc-500">

          Referral Link

        </p>

        <div className="mt-2 flex">

          <input
            readOnly
            value={link}
            className="flex-1 rounded-l-xl bg-black p-4 text-sm outline-none"
          />

          <button
            onClick={() => copy(link)}
            className="rounded-r-xl bg-blue-600 px-5"
          >
            <Copy size={18}/>
          </button>

        </div>

      </div>

      {/* Stats */}

      <div className="mt-8 grid grid-cols-3 gap-4">

        <Stat
          title="Level A"
          value="3"
        />

        <Stat
          title="Level B"
          value="12"
        />

        <Stat
          title="Level C"
          value="6"
        />

      </div>

      {/* Earnings */}

      <div className="mt-8 rounded-2xl bg-black p-5">

        <p className="text-zinc-500">

          Total Referral Earnings

        </p>

        <h2 className="mt-2 text-3xl font-bold text-green-500">

          1250 USDT

        </h2>

      </div>

      <button
        className="
        mt-6

        flex
        w-full
        items-center
        justify-center
        gap-2

        rounded-xl

        bg-blue-600

        py-4

        font-semibold
        "
      >

        <Share2 size={20}/>

        Share Referral

      </button>

    </div>

  );

}

function Stat({ title, value }) {

  return (

    <div className="rounded-xl bg-black p-4 text-center">

      <p className="text-zinc-500">

        {title}

      </p>

      <h2 className="mt-2 text-2xl font-bold">

        {value}

      </h2>

    </div>

  );

}