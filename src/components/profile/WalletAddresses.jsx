import {
  Wallet,
  Copy,
  QrCode,
  ChevronRight,
} from "lucide-react";

const wallets = [

  {
    coin: "USDT",
    network: "TRC20",
    address: "TQ8c...8P4x",
    color: "#00C076",
  },

  {
    coin: "USDT",
    network: "BEP20",
    address: "0x84...AE92",
    color: "#F6C344",
  },

  {
    coin: "BTC",
    network: "Bitcoin",
    address: "bc1q...r2wa",
    color: "#F7931A",
  },

  {
    coin: "ETH",
    network: "Ethereum",
    address: "0x41...1A8F",
    color: "#627EEA",
  },

];

export default function WalletAddresses() {

  const copyAddress = (address) => {

    navigator.clipboard.writeText(address);

  };

  return (

    <section
      className="
      rounded-[32px]

      border
      border-white/5

      bg-gradient-to-br
      from-[#111318]
      to-[#0D1119]

      p-6

      lg:p-8
      "
    >

      <div>

        <p
          className="
          text-xs

          uppercase

          tracking-[0.25em]

          text-zinc-500
          "
        >

          Wallet

        </p>

        <h2
          className="
          mt-2

          text-2xl

          font-bold
          "
        >

          Deposit Addresses

        </h2>

      </div>

      <div className="mt-8 space-y-4">

        {

          wallets.map((wallet)=>(

            <div

              key={`${wallet.coin}-${wallet.network}`}

              className="
              rounded-3xl

              border
              border-white/5

              bg-[#171B22]

              p-5

              transition

              hover:border-[#1D66FF]/30
              "

            >

              <div className="flex justify-between">

                <div className="flex items-center gap-4">

                  <div
                    className="
                    flex

                    h-14
                    w-14

                    items-center
                    justify-center

                    rounded-2xl
                    "
                    style={{
                      background:`${wallet.color}20`,
                    }}
                  >

                    <Wallet
                      size={24}
                      style={{
                        color:wallet.color,
                      }}
                    />

                  </div>

                  <div>

                    <h3 className="font-semibold">

                      {wallet.coin}

                    </h3>

                    <p className="text-zinc-500">

                      {wallet.network}

                    </p>

                  </div>

                </div>

                <ChevronRight
                  className="text-zinc-500"
                />

              </div>

              <div
                className="
                mt-5

                rounded-2xl

                bg-[#0F131A]

                px-4

                py-3
                "
              >

                <p
                  className="
                  break-all

                  text-sm

                  text-zinc-400
                  "
                >

                  {wallet.address}

                </p>

              </div>

              <div className="mt-5 flex gap-3">

                <button

                  onClick={()=>
                    copyAddress(wallet.address)
                  }

                  className="
                  flex-1

                  rounded-2xl

                  bg-[#1D66FF]

                  py-3

                  font-medium

                  transition

                  hover:bg-[#3A7BFF]
                  "

                >

                  <div className="flex justify-center items-center gap-2">

                    <Copy size={18}/>

                    Copy

                  </div>

                </button>

                <button
                  className="
                  flex

                  h-12
                  w-12

                  items-center
                  justify-center

                  rounded-2xl

                  bg-[#171F2D]

                  hover:bg-[#20293A]
                  "
                >

                  <QrCode size={20}/>

                </button>

              </div>

            </div>

          ))

        }

      </div>

    </section>

  );

}