import {
  Clock3,
  X,
} from "lucide-react";

const orders = [

  {
    id: 1,
    pair: "BTC/USDT",
    type: "Buy",
    amount: 0.125,
    price: 117000,
    status: "Pending",
    time: "19:42",
  },

  {
    id: 2,
    pair: "ETH/USDT",
    type: "Sell",
    amount: 1.5,
    price: 4300,
    status: "Pending",
    time: "19:28",
  },

];

export default function OpenOrders() {

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

      <div className="border-b border-white/5 p-6">

        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">

          Trading

        </p>

        <h2 className="mt-2 text-2xl font-bold">

          Open Orders

        </h2>

      </div>

      {

        orders.length === 0 ? (

          <div className="p-12 text-center">

            <Clock3
              size={42}
              className="mx-auto text-zinc-600"
            />

            <h3 className="mt-5 text-xl font-semibold">

              No Open Orders

            </h3>

            <p className="mt-2 text-zinc-500">

              Your active orders will appear here.

            </p>

          </div>

        ) : (

          <div className="divide-y divide-white/5">

            {

              orders.map((order)=>(

                <div
                  key={order.id}
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

                      {order.pair}

                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">

                      {order.type} • {order.amount}

                    </p>

                  </div>

                  <div className="text-sm">

                    <p className="text-zinc-500">

                      Price

                    </p>

                    <h3 className="font-semibold">

                      ${order.price.toLocaleString()}

                    </h3>

                  </div>

                  <div>

                    <span
                      className="
                      rounded-full

                      bg-yellow-500/10

                      px-4

                      py-2

                      text-sm

                      text-yellow-400
                      "
                    >

                      {order.status}

                    </span>

                  </div>

                  <div className="text-sm text-zinc-500">

                    {order.time}

                  </div>

                  <button
                    className="
                    flex

                    items-center

                    gap-2

                    rounded-full

                    bg-red-500/10

                    px-5

                    py-2

                    text-red-400

                    hover:bg-red-500/20
                    "
                  >

                    <X size={16}/>

                    Cancel

                  </button>

                </div>

              ))

            }

          </div>

        )

      }

    </section>

  );

}