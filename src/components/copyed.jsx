import { useState } from "react";

export default function Copyed() {
  const [expanded, setExpanded] = useState(false);


  //commit check for git setup 18.02.2026
  return (
    <div className="bg-gray-50">
      {/* HEADER */}
      <header className="relative z-10 py-4 md:py-6">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="#"
                className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                <img
                  className="w-auto h-8"
                  src="https://cdn.rareblocks.xyz/collection/clarity/images/logo.svg"
                  alt="Logo"
                />
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="text-gray-900"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
              >
                {!expanded ? (
                  <svg
                    className="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex md:items-center md:justify-center md:space-x-10 md:absolute md:inset-y-0 md:left-1/2 md:-translate-x-1/2 lg:space-x-16">
              {["Features", "Pricing", "Support"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-opacity-50 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex">
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-gray-900 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Try for free
              </a>
            </div>
          </div>

          {/* Mobile nav */}
          {expanded && (
            <nav className="md:hidden">
              <div className="px-1 py-8">
                <div className="grid gap-y-7">
                  {["Features", "Pricing", "Support"].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 rounded hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                    >
                      {item}
                    </a>
                  ))}

                  <a
                    href="#"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-gray-900 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  >
                    Try for free
                  </a>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative py-12 sm:py-16 lg:pb-40">
        <div className="absolute bottom-0 right-0 overflow-hidden">
          <img
            className="w-full h-auto origin-bottom-right transform scale-150 lg:w-auto lg:scale-75"
            src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/1/background-pattern.png"
            alt=""
          />
        </div>

        <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center">
            <div className="text-center lg:text-left lg:pr-20">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                An editor that helps you write clean codes.
              </h1>

              <p className="mt-4 text-lg text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>

              <a
                href="#"
                className="inline-flex px-8 py-4 mt-8 text-lg font-bold text-white bg-gray-900 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Try our free editor
              </a>
            </div>

            <div>
              <img
                className="w-full mx-auto"
                src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/1/illustration.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
