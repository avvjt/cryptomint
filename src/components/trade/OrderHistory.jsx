import {
  CheckCircle2,
  XCircle,
} from "lucide-react";

const history = [

  {
    id:1,
    pair:"BTC/USDT",
    side:"Buy",
    amount:0.15,
    price:116820,
    status:"Completed",
    date:"Today",
  },

  {
    id:2,
    pair:"SOL/USDT",
    side:"Sell",
    amount:3,
    price:186,
    status:"Completed",
    date:"Yesterday",
  },

  {
    id:3,
    pair:"ETH/USDT",
    side:"Buy",
    amount:1,
    price:4180,
    status:"Cancelled",
    date:"Jul 31",
  },

];

export default function OrderHistory(){

  return(

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

      <div className="border-b border-white/5 p-6">

        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">

          Trading

        </p>

        <h2 className="mt-2 text-2xl font-bold">

          Order History

        </h2>

      </div>

      <div className="divide-y divide-white/5">

        {

          history.map((item)=>(

            <div
              key={item.id}
              className="
              flex

              flex-col

              gap-4

              p-6

              lg:flex-row

              lg:items-center

              lg:justify-between
              "
            >

              <div>

                <h3 className="font-semibold">

                  {item.pair}

                </h3>

                <p className="mt-1 text-sm text-zinc-500">

                  {item.side}

                </p>

              </div>

              <div>

                <p className="text-sm text-zinc-500">

                  Amount

                </p>

                <h3 className="font-semibold">

                  {item.amount}

                </h3>

              </div>

              <div>

                <p className="text-sm text-zinc-500">

                  Price

                </p>

                <h3 className="font-semibold">

                  ${item.price.toLocaleString()}

                </h3>

              </div>

              <div>

                {

                  item.status==="Completed"

                  ?(

                    <span
                      className="
                      flex

                      items-center

                      gap-2

                      text-green-400
                      "
                    >

                      <CheckCircle2 size={18}/>

                      Completed

                    </span>

                  )

                  :(

                    <span
                      className="
                      flex

                      items-center

                      gap-2

                      text-red-400
                      "
                    >

                      <XCircle size={18}/>

                      Cancelled

                    </span>

                  )

                }

              </div>

              <div className="text-sm text-zinc-500">

                {item.date}

              </div>

            </div>

          ))

        }

      </div>

    </section>

  );

}