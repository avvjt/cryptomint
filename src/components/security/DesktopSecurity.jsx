export default function DesktopSecurity() {
  return (
    <section className="bg-black py-24">
      <div
        className="
        mx-auto
        max-w-7xl
        overflow-hidden
        rounded-[32px]
        border border-[#101B35]
        bg-[#030813]
        "
      >
        <div className="grid lg:grid-cols-2">

          {/* LEFT */}
          <div className="p-16">

            <h2
              className="
              text-5xl
              font-semibold
              text-white
              "
            >
              3 Key Measures for
              <br />
              Asset Security
            </h2>

            <div className="mt-16 space-y-14">

              <div>
                <h3 className="text-3xl font-semibold text-white">
                  • $100M Guardian Fund
                </h3>

                <p className="mt-4 text-zinc-400">
                  Wallet Address
                  0x469AfE803C54A36674C55231489Cf4b61da8c1bC
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-semibold text-white">
                  • Reserves Backed 1:1 and Beyond
                </h3>

                <p className="mt-4 text-zinc-400">
                  Verified in real time and accessible at all times
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-semibold text-white">
                  • Futures Insurance Fund
                </h3>

                <p className="mt-4 text-zinc-400">
                  Protection against market extremes
                </p>
              </div>

            </div>

            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold py-3 px-8 rounded-full text-lg transition">
            GetStartedwithMEXC
          </button>

          </div>

          {/* RIGHT */}
          <div
            className="
            relative
            flex
            flex-col
            items-center
            justify-center
            "
          >

            <img
              src="/shield.webp"
              alt=""
              className="w-[380px]"
            />

            <div className="mt-10 flex gap-10 opacity-30">
              <img
                src="/certik.webp"
                alt=""
                className="h-10"
              />

              <img
                src="/elliptic.webp"
                alt=""
                className="h-10"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}