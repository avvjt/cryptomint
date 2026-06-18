import {
Apple,
Monitor,
Smartphone,
} from "lucide-react";

export default function DesktopAppDownload() {
return ( <section className="bg-black py-24">

```
  <div className="mx-auto max-w-7xl px-6">

    <h2
      className="
      text-center
      text-6xl
      font-bold
      text-white
      drop-shadow-[0_0_25px_rgba(255,255,255,.8)]
      "
    >
      Trade Anywhere with the MEXC App
    </h2>

    <div
      className="
      relative
      mt-16
      overflow-visible
      rounded-[32px]
      border
      border-[#15233A]
      bg-[#030813]
      "
    >

      <div className="grid lg:grid-cols-2">

        {/* LEFT PHONE */}

        <div className="relative flex justify-center">

          <img
            src="/app/phone.webp"
            alt=""
            className="
            absolute
            -top-10
            w-[340px]
            "
          />

        </div>

        {/* RIGHT CONTENT */}

        <div className="p-16">

          <div
            className="
            inline-block
            rounded-lg
            border
            border-blue-300
            bg-blue-100
            px-4
            py-2
            text-black
            shadow-[0_0_20px_rgba(59,130,246,.6)]
            "
          >
            First login on the App or Lite App to
            claim 5 USDT
          </div>

          <div className="mt-10 flex gap-8">

            <img
              src="/app/qr.webp"
              alt=""
              className="w-32"
            />

            <div>

              <h3 className="text-4xl font-semibold text-white">
                Scan to download App
              </h3>

              <p className="mt-4 text-zinc-400">
                Install without the App Store —
                experience MEXC instantly!
              </p>

              <button
                className="
                mt-4
                text-blue-400
                "
              >
                Scan to download APK
              </button>

            </div>

          </div>

          <div className="mt-12 flex items-center justify-between">

            <div className="flex items-center gap-4">

              <Apple size={32} />

              <span className="text-xl text-white">
                Install without the App Store
              </span>

            </div>

            <button
              className="
              rounded-full
              border
              border-zinc-700
              px-6
              py-3
              "
            >
              Installation Guide
            </button>

          </div>

          <div className="mt-10 grid grid-cols-2 gap-6">

            <button
              className="
              flex
              items-center
              justify-center
              gap-3
              rounded-2xl
              bg-[#111827]
              py-5
              text-xl
              "
            >
              <Smartphone />
              APK
            </button>

            <button
              className="
              flex
              items-center
              justify-center
              gap-3
              rounded-2xl
              bg-[#111827]
              py-5
              text-xl
              "
            >
              <Monitor />
              Windows
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>


);
}
