import {
  Copy,
  Check,
  Share2,
  QrCode,
} from "lucide-react";

import { useState } from "react";

export default function ReferralLink({

  code,

  link,

}) {

  const [copied, setCopied] =
    useState(false);

  async function copyLink() {

    await navigator.clipboard.writeText(link);

    setCopied(true);

    setTimeout(() => {

      setCopied(false);

    }, 2000);

  }

  async function shareLink() {

    if (navigator.share) {

      try {

        await navigator.share({

          title: "CryptoMintX",

          text: "Join my team on CryptoMintX",

          url: link,

        });

      } catch {}

      return;

    }

    copyLink();

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

      overflow-hidden
      "
    >

      <div
        className="
        grid

        gap-8

        p-6

        lg:grid-cols-[1fr_260px]

        lg:p-8
        "
      >

        {/* Left */}

        <div>

          <p
            className="
            uppercase

            tracking-[0.25em]

            text-xs

            text-zinc-500
            "
          >

            Invite Friends

          </p>

          <h2
            className="
            mt-3

            text-3xl

            font-bold
            "
          >

            Earn 5% Referral Bonus

          </h2>

          <p
            className="
            mt-4

            max-w-2xl

            leading-7

            text-zinc-400
            "
          >

            Share your referral link with friends.
            When they register and make their first
            investment, you'll receive a one-time
            5% referral commission.

          </p>

          {/* Code */}

          <div className="mt-8">

            <label className="text-sm text-zinc-500">

              Referral Code

            </label>

            <div
              className="
              mt-3

              flex

              h-14

              items-center

              justify-between

              rounded-2xl

              border
              border-white/5

              bg-[#171B22]

              px-5
              "
            >

              <span
                className="
                font-mono

                text-lg

                font-semibold
                "
              >

                {code}

              </span>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(code)
                }
                className="
                text-[#1D66FF]

                hover:text-blue-300
                "
              >

                <Copy size={18} />

              </button>

            </div>

          </div>

          {/* Link */}

          <div className="mt-6">

            <label className="text-sm text-zinc-500">

              Referral Link

            </label>

            <div
              className="
              mt-3

              flex

              items-center

              gap-3

              rounded-2xl

              border
              border-white/5

              bg-[#171B22]

              p-4
              "
            >

              <input

                readOnly

                value={link}

                className="
                w-full

                bg-transparent

                text-sm

                outline-none
                "

              />

              <button

                onClick={copyLink}

                className="
                rounded-xl

                bg-[#1D66FF]/10

                p-3

                text-[#1D66FF]

                transition

                hover:bg-[#1D66FF]/20
                "

              >

                {

                  copied

                    ? <Check size={18}/>

                    : <Copy size={18}/>

                }

              </button>

            </div>

          </div>

          {/* Buttons */}

          <div
            className="
            mt-8

            flex

            flex-wrap

            gap-4
            "
          >

            <button

              onClick={copyLink}

              className="
              rounded-full

              bg-[#1D66FF]

              px-6
              py-3

              font-medium

              hover:bg-blue-600
              "

            >

              {copied ? "Copied!" : "Copy Link"}

            </button>

            <button

              onClick={shareLink}

              className="
              flex

              items-center

              gap-2

              rounded-full

              border
              border-white/10

              px-6
              py-3

              hover:border-[#1D66FF]
              "

            >

              <Share2 size={18}/>

              Share

            </button>

          </div>

        </div>

        {/* QR */}

        <div
          className="
          flex

          flex-col

          items-center

          justify-center
          "
        >

          <div
            className="
            flex

            h-56
            w-56

            items-center
            justify-center

            rounded-3xl

            bg-white
            "
          >

            <QrCode
              size={180}
              className="text-black"
            />

          </div>

          <p
            className="
            mt-5

            text-center

            text-sm

            text-zinc-500
            "
          >

            Scan to register
            <br />
            using your referral

          </p>

        </div>

      </div>

    </section>

  );

}