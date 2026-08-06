import logo from "../assets/logo.png";

export default function SplashScreen() {
  return (
    <div
      className="
      fixed
      inset-0

      flex
      items-center
      justify-center

      bg-[#050A14]
      "
    >
      <div className="text-center">

        <img
          src={logo}
          alt="CryptoMintX"
          className="
          mx-auto
          h-20
          w-20

          animate-pulse
          "
        />

        <h1
          className="
          mt-6

          text-3xl
          font-bold
          text-white
          "
        >
          CryptoMintX
        </h1>

        <p className="mt-2 text-zinc-500">
          Loading your account...
        </p>

        <div
          className="
          mx-auto
          mt-8

          h-1
          w-40

          overflow-hidden

          rounded-full

          bg-zinc-800
          "
        >
          <div
            className="
            h-full
            w-1/2

            animate-pulse

            rounded-full

            bg-[#1D66FF]
            "
          />
        </div>

      </div>
    </div>
  );
}