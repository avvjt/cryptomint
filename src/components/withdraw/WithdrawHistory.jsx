import {
  ArrowUpFromLine,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

export default function WithdrawHistory({

  history = [],

}) {

  return (

    <section
      className="
      overflow-hidden

      rounded-[32px]

      border
      border-white/5

      bg-gradient-to-br
      from-[#111318]
      to-[#0D1119]
      "
    >

      <div
        className="
        border-b
        border-white/5

        p-6
        "
      >

        <p
          className="
          uppercase

          tracking-[0.25em]

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

          Withdrawal History

        </h2>

      </div>

      {

        history.length === 0 ? (

          <div className="p-12 text-center">

            <ArrowUpFromLine
              size={50}
              className="
              mx-auto

              text-zinc-600
              "
            />

            <h3
              className="
              mt-6

              text-xl

              font-semibold
              "
            >

              No Withdrawals Yet

            </h3>

            <p
              className="
              mt-2

              text-zinc-500
              "
            >

              Your withdrawal history will appear here.

            </p>

          </div>

        ) : (

          history.map((item) => {

            const Icon =

              item.status === "Completed"

                ? CheckCircle2

                : item.status === "Pending"

                ? Clock3

                : XCircle;

            const color =

              item.status === "Completed"

                ? "text-green-400"

                : item.status === "Pending"

                ? "text-yellow-400"

                : "text-red-400";

            return (

              <div
                key={item.id}
                className="
                flex

                items-center

                justify-between

                border-b
                border-white/5

                p-6

                last:border-none

                hover:bg-[#171B22]
                "
              >

                <div>

                  <h3 className="font-semibold">

                    {item.amount} USDT

                  </h3>

                  <p
                    className="
                    mt-2

                    text-sm

                    text-zinc-500
                    "
                  >

                    {item.network}

                  </p>

                  <p
                    className="
                    mt-1

                    text-xs

                    text-zinc-600
                    "
                  >

                    {item.address}

                  </p>

                </div>

                <div className="text-right">

                  <div
                    className="
                    flex

                    items-center

                    justify-end

                    gap-2
                    "
                  >

                    <Icon
                      size={18}
                      className={color}
                    />

                    <span className={color}>

                      {item.status}

                    </span>

                  </div>

                  <p
                    className="
                    mt-2

                    text-sm

                    text-zinc-500
                    "
                  >

                    {item.date}

                  </p>

                </div>

              </div>

            );

          })

        )

      }

    </section>

  );

}