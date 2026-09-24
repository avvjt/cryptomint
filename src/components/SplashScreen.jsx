import logotext from "../assets/logotext.png";

export default function SplashScreen() {
  return (
    <div
      className="
      fixed
      inset-0
      z-[9999]

      flex
      items-center
      justify-center

      overflow-hidden

      bg-[#050A14]
      "
    >
      {/* Background Glow */}

      <div
        className="
        absolute

        h-[420px]
        w-[420px]

        rounded-full

        bg-[#1D66FF]/10

        blur-[120px]
        "
      />

      {/* Content */}

      <div className="relative text-center">

        {/* Logo */}

        <div className="relative">

          {/* Rotating Ring */}

          <div
            className="
            absolute

            inset-0

            m-auto

            h-28
            w-28

            rounded-full

            border-2
            border-transparent

            border-t-[#1D66FF]
            border-r-[#4F8FFF]

            animate-spin
            "
          />

          {/* Glow */}

          <div
            className="
            absolute

            inset-0

            m-auto

            h-20
            w-20

            rounded-full

            bg-[#1D66FF]/20

            blur-xl
            "
          />

          {/* Logo */}

          <img
            src={logotext}
            alt="CryptoMintX"
            className="
            relative

            mx-auto

            h-20
            w-20

            animate-float
            "
          />

        </div>

        {/* Title */}

        <h1
          className="
          mt-8

          text-3xl
          font-bold

          tracking-wide

          text-white
          "
        >
          CryptoMintX
        </h1>

        <p
          className="
          mt-2

          text-sm

          tracking-wide

          text-zinc-500
          "
        >
          Securing your trading session...
        </p>

        {/* Dots */}

        <div
          className="
          mt-8

          flex
          justify-center
          gap-2
          "
        >
          <span className="loading-dot" />
          <span className="loading-dot delay-200" />
          <span className="loading-dot delay-400" />
        </div>

      </div>

    </div>
  );
}