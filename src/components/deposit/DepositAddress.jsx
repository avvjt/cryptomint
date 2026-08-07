import {
  Copy,
  CheckCircle2,
  QrCode,
} from "lucide-react";

import { useState } from "react";

export default function DepositAddress({

  address,

  qr,

}) {

  const [copied, setCopied] =
    useState(false);

  async function copyAddress() {

    await navigator.clipboard.writeText(
      address
    );

    setCopied(true);

    setTimeout(() => {

      setCopied(false);

    }, 2000);

  }

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

      <div
        className="
        grid

        gap-8

        lg:grid-cols-[320px_1fr]
        "
      >

        {/* QR */}

        <div
          className="
          flex

          flex-col

          items-center
          "
        >

          <div
            className="
            flex

            h-[280px]
            w-[280px]

            items-center
            justify-center

            rounded-3xl

            bg-white

            p-4
            "
          >

            {qr ? (

              <img

                src={qr}

                alt="QR"

                className="h-full w-full"

              />

            ) : (

              <QrCode

                size={220}

                className="text-black"

              />

            )}

          </div>

          <p
            className="
            mt-5

            text-sm

            text-zinc-500
            "
          >

            Scan QR using your wallet

          </p>

        </div>

        {/* Address */}

        <div>

          <p
            className="
            uppercase

            tracking-[.25em]

            text-xs

            text-zinc-500
            "
          >

            Deposit Address

          </p>

          <h2
            className="
            mt-3

            text-3xl

            font-bold
            "
          >

            USDT Wallet

          </h2>

          <p
            className="
            mt-4

            max-w-xl

            text-zinc-400

            leading-7
            "
          >

            Send only USDT using the selected
            network. Sending any other asset may
            permanently result in loss of funds.

          </p>

          {/* Address */}

          <div
            className="
            mt-8

            rounded-3xl

            border
            border-white/5

            bg-[#171B22]

            p-5
            "
          >

            <p
              className="
              break-all

              font-mono

              text-lg

              leading-8
              "
            >

              {address}

            </p>

          </div>

          {/* Copy */}

          <button

            onClick={copyAddress}

            className="
            mt-6

            flex

            items-center

            gap-3

            rounded-full

            bg-[#1D66FF]

            px-7
            py-3

            font-semibold

            transition-all

            hover:scale-105

            hover:bg-blue-600
            "

          >

            {

              copied

                ? (

                  <>

                    <CheckCircle2 size={20}/>

                    Copied

                  </>

                )

                : (

                  <>

                    <Copy size={20}/>

                    Copy Address

                  </>

                )

            }

          </button>

          {/* Notice */}

          <div
            className="
            mt-8

            rounded-2xl

            border

            border-yellow-500/20

            bg-yellow-500/10

            p-5
            "
          >

            <h3
              className="
              font-semibold

              text-yellow-300
              "
            >

              Important

            </h3>

            <ul
              className="
              mt-4

              space-y-3

              text-sm

              text-yellow-100/80
              "
            >

              <li>

                • Minimum deposit is
                <strong> 50 USDT</strong>

              </li>

              <li>

                • Deposit only through the
                selected network.

              </li>

              <li>

                • Deposit will be credited
                automatically after network
                confirmation.

              </li>

              <li>

                • Never send BTC, ETH or other
                assets to this address.

              </li>

            </ul>

          </div>

        </div>

      </div>

    </section>

  );

}