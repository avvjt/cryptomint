import {
  ArrowDownToLine,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

export default function DepositHistory({

  history = [],

}) {

  const demo = [

    {
      id: 1,
      amount: "500 USDT",
      network: "TRC20",
      hash: "TF82...9KQX",
      status: "Completed",
      date: "Today • 10:45 AM",
    },

    {
      id: 2,
      amount: "1000 USDT",
      network: "BEP20",
      hash: "0x8a2...fd21",
      status: "Pending",
      date: "Yesterday",
    },

    {
      id: 3,
      amount: "250 USDT",
      network: "TRC20",
      hash: "TR98...QW12",
      status: "Rejected",
      date: "Aug 03",
    },

  ];

  const deposits =
    history.length ? history : demo;

  return (

    <section
      className="
      rounded-[32px]

      border
      border-white/5

      bg-gradient-to-br

      from-[#111318]

      to-[#0D1119]

      overflow-hidden
      "
    >

      {/* Header */}

      <div
        className="
        flex

        items-center

        justify-between

        border-b
        border-white/5

        p-6
        "
      >

        <div>

          <p
            className="
            uppercase

            tracking-[.25em]

            text-xs

            text-zinc-500
            "
          >

            History

          </p>

          <h2
            className="
            mt-2

            text-2xl

            font-bold
            "
          >

            Recent Deposits

          </h2>

        </div>

        <button
          className="
          rounded-full

          bg-[#171B22]

          px-5
          py-2

          text-sm

          hover:bg-[#202633]
          "
        >

          View All

        </button>

      </div>

      {/* Desktop */}

      <div className="hidden lg:block">

        {deposits.map((item) => (

          <Row
            key={item.id}
            item={item}
          />

        ))}

      </div>

      {/* Mobile */}

      <div className="lg:hidden">

        {deposits.map((item) => (

          <MobileRow
            key={item.id}
            item={item}
          />

        ))}

      </div>

    </section>

  );

}

function Row({

  item,

}) {

  const StatusIcon =
    item.status === "Completed"

      ? CheckCircle2

      : item.status === "Pending"

      ? Clock3

      : XCircle;

  const statusColor =

    item.status === "Completed"

      ? "text-[#00C076]"

      : item.status === "Pending"

      ? "text-[#F6C344]"

      : "text-[#FF4D67]";

  return (

    <div
      className="
      grid

      grid-cols-[80px_1.2fr_1fr_180px_120px]

      items-center

      border-b
      border-white/5

      px-6
      py-5

      transition

      hover:bg-[#171B22]

      last:border-none
      "
    >

      <div
        className="
        flex

        h-12
        w-12

        items-center
        justify-center

        rounded-2xl

        bg-[#1D66FF]/10
        "
      >

        <ArrowDownToLine
          size={20}
          className="text-[#1D66FF]"
        />

      </div>

      <div>

        <h3 className="font-semibold">

          {item.amount}

        </h3>

        <p className="mt-1 text-sm text-zinc-500">

          {item.network}

        </p>

      </div>

      <div>

        <p
          className="
          font-mono

          text-sm

          text-zinc-400
          "
        >

          {item.hash}

        </p>

      </div>

      <div>

        <p className="text-sm text-zinc-500">

          {item.date}

        </p>

      </div>

      <div className="flex items-center gap-2">

        <StatusIcon
          size={18}
          className={statusColor}
        />

        <span
          className={`
          text-sm

          font-medium

          ${statusColor}
          `}
        >

          {item.status}

        </span>

      </div>

    </div>

  );

}

function MobileRow({

  item,

}) {

  const StatusIcon =
    item.status === "Completed"

      ? CheckCircle2

      : item.status === "Pending"

      ? Clock3

      : XCircle;

  const statusColor =

    item.status === "Completed"

      ? "text-[#00C076]"

      : item.status === "Pending"

      ? "text-[#F6C344]"

      : "text-[#FF4D67]";

  return (

    <div
      className="
      border-b
      border-white/5

      p-5

      last:border-none
      "
    >

      <div className="flex justify-between">

        <div>

          <h3 className="font-semibold">

            {item.amount}

          </h3>

          <p className="mt-1 text-sm text-zinc-500">

            {item.network}

          </p>

        </div>

        <div
          className="
          flex

          items-center

          gap-2
          "
        >

          <StatusIcon
            size={18}
            className={statusColor}
          />

          <span
            className={`
            text-sm

            ${statusColor}
            `}
          >

            {item.status}

          </span>

        </div>

      </div>

      <p
        className="
        mt-4

        break-all

        font-mono

        text-xs

        text-zinc-500
        "
      >

        {item.hash}

      </p>

      <p
        className="
        mt-3

        text-xs

        text-zinc-600
        "
      >

        {item.date}

      </p>

    </div>

  );

}