import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const platformLinks = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Markets",
    to: "/markets",
  },
  {
    label: "Trade",
    to: "/trade",
  },
  {
    label: "Futures",
    to: "/futures",
  },
  {
    label: "Assets",
    to: "/assets",
  },
];

const resourceLinks = [
  {
    label: "Help Center",
    to: "/help",
  },
  {
    label: "Academy",
    to: "/academy",
  },
  {
    label: "Terms",
    to: "/terms",
  },
  {
    label: "Privacy",
    to: "/privacy",
  },
  {
    label: "Disclaimer",
    to: "/disclaimer",
  },
];

export default function FooterDesign() {
  return (
    <motion.footer
      initial={{
        y: 100,
        opacity: 0,
      }}
      whileInView={{
        y: 0,
        opacity: 1,
      }}
      viewport={{
        once: true,
        amount: 0.05,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        overflow-hidden
        bg-[#050505]
        text-white
      "
    >
      {/* ================================================== */}
      {/* BACKGROUND */}
      {/* ================================================== */}

      <div className="pointer-events-none absolute inset-0 footer-grid" />

      <div className="pointer-events-none absolute inset-0 footer-noise" />

      {/* ================================================== */}
      {/* MAIN CONTENT */}
      {/* ================================================== */}

      <div className="relative z-10">

        {/* ================================================== */}
        {/* TOP */}
        {/* ================================================== */}

        <div
          className="
            mx-auto
            max-w-[1500px]
            px-4
            pb-12
            pt-14
            sm:px-6
            sm:pb-14
            sm:pt-16
            lg:px-12
            lg:pb-16
            lg:pt-20
          "
        >
          <div
            className="
              grid
              gap-12
              lg:grid-cols-[1fr_auto_1.1fr]
              lg:items-start
              lg:gap-20
            "
          >

            {/* ================================================= */}
            {/* BRAND */}
            {/* ================================================= */}

            <div>

              <Link
                to="/"
                className="
                  inline-block
                  text-2xl
                  font-black
                  tracking-[-0.04em]
                  transition-opacity
                  hover:opacity-80
                "
              >
                CryptoMintX
              </Link>

              <p
                className="
                  mt-4
                  max-w-[300px]
                  text-sm
                  leading-6
                  text-[#68717D]
                "
              >
                A focused interface for managing,
                exploring and interacting with digital assets.
              </p>

              {/* Socials */}

              <div className="mt-6 flex items-center gap-2">

                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    rounded-full
                    border
                    border-[#1B222B]
                    px-4
                    py-2
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.12em]
                    text-[#737E8C]
                    transition
                    hover:border-[#303945]
                    hover:text-white
                  "
                >
                  Telegram
                </a>

                <a
                  href="https://discord.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    rounded-full
                    border
                    border-[#1B222B]
                    px-4
                    py-2
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.12em]
                    text-[#737E8C]
                    transition
                    hover:border-[#303945]
                    hover:text-white
                  "
                >
                  Discord
                </a>

              </div>

            </div>

            {/* ================================================= */}
            {/* NAVIGATION */}
            {/* ================================================= */}

            <div
              className="
                grid
                grid-cols-2
                gap-10
                sm:gap-14
              "
            >

              {/* Platform */}

              <div>

                <p
                  className="
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-[#4F5967]
                  "
                >
                  Platform
                </p>

                <nav className="mt-5 flex flex-col gap-3">

                  {platformLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="
                        w-fit
                        text-sm
                        text-[#8A94A3]
                        transition
                        hover:text-white
                      "
                    >
                      {link.label}
                    </Link>
                  ))}

                </nav>

              </div>

              {/* Resources */}

              <div>

                <p
                  className="
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-[#4F5967]
                  "
                >
                  Resources
                </p>

                <nav className="mt-5 flex flex-col gap-3">

                  {resourceLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="
                        w-fit
                        text-sm
                        text-[#8A94A3]
                        transition
                        hover:text-white
                      "
                    >
                      {link.label}
                    </Link>
                  ))}

                </nav>

              </div>

            </div>

            {/* ================================================= */}
            {/* NEWSLETTER */}
            {/* ================================================= */}

            <div className="w-full max-w-[420px]">

              <p
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-[#4F5967]
                "
              >
                Stay updated
              </p>

              <h3
                className="
                  mt-4
                  text-3xl
                  font-semibold
                  leading-[0.95]
                  tracking-[-0.05em]
                  text-white
                  sm:text-4xl
                "
              >
                Keep up with
                <br />
                CryptoMintX.
              </h3>

              <p
                className="
                  mt-4
                  max-w-[350px]
                  text-xs
                  leading-5
                  text-[#596473]
                "
              >
                Get important platform updates and
                announcements.
              </p>

              {/* Newsletter input */}

              <div
                className="
                  mt-6
                  flex
                  h-14
                  overflow-hidden
                  rounded-full
                  border
                  border-[#1C232C]
                  bg-[#0A0D11]
                  transition
                  focus-within:border-[#303945]
                "
              >

                <input
                  type="email"
                  placeholder="Your email"
                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    px-5
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-[#4F5967]
                  "
                />

                <button
                  type="button"
                  aria-label="Subscribe to newsletter"
                  className="
                    m-1
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-black
                    transition
                    hover:bg-[#E6E9ED]
                    active:scale-95
                  "
                >
                  <ArrowUpRight size={17} />
                </button>

              </div>

            </div>

          </div>
        </div>

        {/* ================================================== */}
        {/* HUGE BRAND */}
        {/* ================================================== */}

        <div
          className="
            overflow-hidden
            px-0
          "
        >

          <Link
            to="/"
            className="
              block
              select-none
              whitespace-nowrap
              text-center
              text-[17vw]
              font-black
              uppercase
              leading-[0.76]
              tracking-[-0.09em]
              text-[#F3F1EA]
              transition-opacity
              hover:opacity-90
              sm:text-[15vw]
              lg:text-[11vw]
            "
          >
            CryptoMintX
          </Link>

        </div>

        {/* ================================================== */}
        {/* BOTTOM BAR */}
        {/* ================================================== */}

        <div
          className="
            mx-auto
            max-w-[1500px]
            px-4
            pb-5
            pt-7
            sm:px-6
            sm:pt-8
            lg:px-12
          "
        >

          <div
            className="
              border-t
              border-[#171C23]
              pt-5
            "
          >

            <div
              className="
                flex
                flex-col
                gap-3
                text-[9px]
                font-medium
                uppercase
                tracking-[0.08em]
                text-[#4F5967]
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >

              {/* Copyright */}

              <div>
                © 2026 CryptoMintX
              </div>

              {/* Legal */}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">

                <Link
                  to="/terms"
                  className="transition hover:text-white"
                >
                  Terms
                </Link>

                <Link
                  to="/privacy"
                  className="transition hover:text-white"
                >
                  Privacy
                </Link>

                <Link
                  to="/disclaimer"
                  className="transition hover:text-white"
                >
                  Disclaimer
                </Link>

              </div>

              {/* Rights */}

              <div>
                All rights reserved
              </div>

            </div>

          </div>

        </div>

      </div>
    </motion.footer>
  );
}