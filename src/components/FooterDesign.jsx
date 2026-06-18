import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function FooterDesign() {
  return (
    <motion.footer
      initial={{
        y: 300,
        opacity: 0,
      }}
      whileInView={{
        y: 0,
        opacity: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
      relative
      min-h-screen
      overflow-hidden
      bg-[#050505]
      text-white
      "
    >
      {/* Grid */}
      <div className="absolute inset-0 footer-grid" />

      {/* Noise */}
      <div className="absolute inset-0 footer-noise" />

      {/* Content */}
      <div className="relative z-10 h-full">

        {/* TOP */}
        <div
          className="
          max-w-[1600px]
          mx-auto
          px-6
          lg:px-16
          pt-20
          "
        >
          <div
            className="
            flex
            flex-col
            lg:flex-row
            justify-between
            gap-16
            "
          >
            {/* Logo */}
            <div>
              <h3
                className="
                text-2xl
                font-black
                tracking-wider
                "
              >
                ZERO-FEE
              </h3>
            </div>

            {/* Navigation */}
            <div
              className="
              flex
              flex-col
              gap-2
              uppercase
              font-semibold
              "
            >
              <a href="/">Home</a>
              <a href="/markets">Markets</a>
              <a href="/trade">Trade</a>
              <a href="/futures">Futures</a>
              <a href="/assets">Assets</a>
            </div>

            {/* Newsletter */}
            <div className="w-full max-w-md">

              <h3
                className="
                text-4xl
                lg:text-5xl
                font-black
                uppercase
                leading-none
                "
              >
                Sign Up
                <br />
                To Our
                <br />
                Newsletter
              </h3>

              <div
                className="
                mt-6
                flex
                items-center
                overflow-hidden
                rounded-full
                bg-[#1D66FF]
                "
              >
                <input
                  placeholder="YOUR EMAIL"
                  className="
                  flex-1
                  bg-transparent
                  px-6
                  py-5
                  text-black
                  font-semibold
                  outline-none
                  placeholder:text-black
                  "
                />

                <button
                  className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-black
                  text-white
                  mr-2
                  "
                >
                  <ArrowUpRight />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* HUGE TYPOGRAPHY */}

        <div
          className="
          mt-12
          lg:mt-24
          overflow-hidden
          "
        >
          <h1
            className="
            text-center
            text-[22vw]
            leading-[0.8]
            font-black
            tracking-[-0.08em]
            text-[#F3F1EA]
            uppercase
            select-none
            "
          >
            MEXC
          </h1>

          <h1
            className="
            -mt-8
            text-center
            text-[22vw]
            leading-[0.8]
            font-black
            tracking-[-0.08em]
            text-[#F3F1EA]
            uppercase
            select-none
            "
          >
            FUTURES
          </h1>
        </div>

        {/* BOTTOM */}

        <div
          className="
          max-w-[1600px]
          mx-auto
          px-6
          lg:px-16
          pb-12
          "
        >
          <div
            className="
            flex
            flex-col
            lg:flex-row
            justify-between
            gap-10
            "
          >
            <div
              className="
              text-sm
              uppercase
              font-semibold
              "
            >
              © 2025 MEXC Exchange
              <br />
              All Rights Reserved
            </div>

            <div
              className="
              flex
              flex-col
              lg:flex-row
              gap-6
              text-sm
              uppercase
              "
            >
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">Disclaimer</a>
            </div>

            <div
              className="
              flex
              gap-6
              text-sm
              uppercase
              "
            >
              <a
                href="#"
                className="text-[#1D66FF]"
              >
                Telegram
              </a>

              <a
                href="#"
                className="text-[#1D66FF]"
              >
                X
              </a>

              <a
                href="#"
                className="text-[#1D66FF]"
              >
                Discord
              </a>
            </div>
          </div>
        </div>

      </div>
    </motion.footer>
  );
}