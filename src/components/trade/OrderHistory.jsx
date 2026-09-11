import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Clock3,
} from "lucide-react";

import {
  useTradeWalletContext,
} from "../../context/TradeWalletContext";

export default function OrderHistory() {
  const {
  tradeHistory,
} = useTradeWalletContext();

  return (
    <section
      className="
        bg-[#0B0E11]
      "
    >

      <div
        className="
          border-b
          border-[#1A1E24]

          px-5
          py-4

          lg:px-6
        "
      >

        <p
          className="
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-[#606975]
          "
        >
          Account Activity
        </p>

        <div
          className="
            mt-1
            flex
            items-center
            justify-between
          "
        >

          <h2
            className="
              text-[16px]
              font-semibold
              text-white
            "
          >
            Trade History
          </h2>

          <span
            className="
              rounded-full

              bg-[#171C22]

              px-2.5
              py-1

              text-[10px]
              text-[#68717D]
            "
          >
            {tradeHistory.length} trades
          </span>

        </div>

      </div>


      {tradeHistory.length === 0 ? (
        <div
          className="
            flex
            min-h-[150px]

            flex-col
            items-center
            justify-center

            px-6
            text-center
          "
        >

          <Clock3
            size={24}
            className="text-[#3E4651]"
          />

          <p
            className="
              mt-3
              text-sm
              text-[#68717D]
            "
          >
            No trades yet
          </p>

          <p
            className="
              mt-1
              text-xs
              text-[#4F5762]
            "
          >
            Your completed trades will appear
            here.
          </p>

        </div>
      ) : (

        <div>

          {tradeHistory.map((trade) => {

            const auto =
              trade.type === "Auto Trade";

            return (
              <div
                key={trade.id}
                className="
                  flex
                  items-center
                  justify-between

                  border-b
                  border-[#14181D]

                  px-5
                  py-4

                  transition

                  hover:bg-[#101318]

                  lg:px-6
                "
              >

                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-3
                  "
                >

                  <div
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0

                      items-center
                      justify-center

                      rounded-xl

                      ${
                        auto
                          ? "bg-[#1D66FF]/10"
                          : "bg-[#08B77A]/10"
                      }
                    `}
                  >

                    {auto ? (
                      <Bot
                        size={17}
                        className="text-[#4D8DFF]"
                      />
                    ) : (
                      <ArrowUpRight
                        size={17}
                        className="text-[#08B77A]"
                      />
                    )}

                  </div>

                  <div className="min-w-0">

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <p
                        className="
                          truncate
                          text-sm
                          font-medium
                          text-white
                        "
                      >
                        {trade.type}
                      </p>

                      <span
                        className="
                          rounded
                          bg-[#171C22]
                          px-1.5
                          py-0.5
                          text-[9px]
                          text-[#68717D]
                        "
                      >
                        {trade.symbol}
                      </span>

                    </div>

                    <p
                      className="
                        mt-1
                        text-[11px]
                        text-[#606975]
                      "
                    >
                      {new Date(
                        trade.createdAt
                      ).toLocaleString()}
                    </p>

                  </div>

                </div>


                <div
                  className="
                    ml-4
                    text-right
                  "
                >

                  <p
                    className="
                      text-sm
                      font-medium
                      text-white
                    "
                  >
                    {Number(
                      trade.amount
                    ).toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}{" "}
                    USDT
                  </p>

                  {trade.returnAmount > 0 && (
                    <p
                      className="
                        mt-1
                        text-[11px]
                        text-[#08B77A]
                      "
                    >
                      +{" "}
                      {Number(
                        trade.returnAmount
                      ).toFixed(2)}{" "}
                      return
                    </p>
                  )}

                </div>

              </div>
            );
          })}

        </div>
      )}

    </section>
  );
}