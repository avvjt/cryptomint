import {
  Globe,
  FileText,
  Send,
  Twitter,
  ShieldCheck,
  Layers3,
  ExternalLink,
} from "lucide-react";

const links = [

  {
    title: "Official Website",
    value: "bitcoin.org",
    icon: Globe,
    color: "#1D66FF",
  },

  {
    title: "Whitepaper",
    value: "View Document",
    icon: FileText,
    color: "#F6C344",
  },

  {
    title: "Twitter",
    value: "@Bitcoin",
    icon: Twitter,
    color: "#00C076",
  },

  {
    title: "Telegram",
    value: "Community",
    icon: Send,
    color: "#3B82F6",
  },

];

const tags = [

  "Layer 1",

  "Store of Value",

  "PoW",

  "Payments",

  "Large Cap",

];

export default function CoinInformation() {

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

      {/* Header */}

      <div className="border-b border-white/5 p-6">

        <p
          className="
          text-xs

          uppercase

          tracking-[0.25em]

          text-zinc-500
          "
        >

          Project

        </p>

        <h2
          className="
          mt-2

          text-2xl

          font-bold
          "
        >

          Bitcoin

        </h2>

      </div>

      {/* About */}

      <div className="p-6">

        <h3
          className="
          font-semibold

          text-lg
          "
        >

          About

        </h3>

        <p
          className="
          mt-4

          leading-7

          text-zinc-400
          "
        >

          Bitcoin is the world's first decentralized
          cryptocurrency. It enables peer-to-peer
          digital payments without relying on banks
          or central authorities.

        </p>

      </div>

      {/* Links */}

      <div className="px-6">

        <h3
          className="
          text-lg

          font-semibold
          "
        >

          Official Links

        </h3>

        <div className="mt-5 space-y-3">

          {

            links.map((item)=>{

              const Icon = item.icon;

              return(

                <button

                  key={item.title}

                  className="
                  flex

                  w-full

                  items-center

                  justify-between

                  rounded-2xl

                  border
                  border-white/5

                  bg-[#171B22]

                  p-4

                  transition

                  hover:border-[#1D66FF]/30
                  "

                >

                  <div className="flex items-center gap-4">

                    <div
                      className="
                      flex

                      h-11
                      w-11

                      items-center
                      justify-center

                      rounded-xl
                      "
                      style={{
                        background:`${item.color}20`
                      }}
                    >

                      <Icon
                        size={20}
                        style={{
                          color:item.color
                        }}
                      />

                    </div>

                    <div className="text-left">

                      <p className="text-sm text-zinc-500">

                        {item.title}

                      </p>

                      <p className="font-medium">

                        {item.value}

                      </p>

                    </div>

                  </div>

                  <ExternalLink
                    size={18}
                    className="text-zinc-500"
                  />

                </button>

              );

            })

          }

        </div>

      </div>

      {/* Tags */}

      <div className="p-6">

        <div className="flex items-center gap-3">

          <Layers3
            size={20}
            className="text-[#1D66FF]"
          />

          <h3
            className="
            text-lg

            font-semibold
            "
          >

            Categories

          </h3>

        </div>

        <div
          className="
          mt-5

          flex

          flex-wrap

          gap-3
          "
        >

          {

            tags.map((tag)=>(

              <span

                key={tag}

                className="
                rounded-full

                bg-[#171B22]

                border
                border-white/5

                px-4

                py-2

                text-sm

                text-zinc-300
                "

              >

                {tag}

              </span>

            ))

          }

        </div>

      </div>

      {/* Trust */}

      <div className="border-t border-white/5 p-6">

        <div className="flex items-center gap-4">

          <ShieldCheck
            size={26}
            className="text-green-400"
          />

          <div>

            <h3 className="font-semibold">

              Verified Asset

            </h3>

            <p
              className="
              mt-1

              text-sm

              text-zinc-500
              "
            >

              Listed and verified by CryptoMintX.

            </p>

          </div>

        </div>

      </div>

    </section>

  );

}