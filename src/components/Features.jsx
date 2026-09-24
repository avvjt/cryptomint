import {
  ArrowUpRight,
  BarChart3,
  ShieldCheck,
  Users,
} from "lucide-react";

const features = [
  {
    number: "01",
    icon: BarChart3,
    title: "Simple trading",
    description:
      "Follow markets and manage your activity from one focused interface.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Asset control",
    description:
      "Keep your balances, transactions and account activity organized.",
  },
  {
    number: "03",
    icon: Users,
    title: "Your network",
    description:
      "Track your referral activity and team structure in one place.",
  },
];

function FeatureNumber({ children }) {
  return (
    <span className="text-[10px] font-medium tracking-[0.16em] text-[#4F5967]">
      {children}
    </span>
  );
}

function FeatureIcon({ children }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1A222D] bg-[#0C1117]">
      {children}
    </div>
  );
}

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-[#05070A] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">

      {/* Background glow */}
      <div className="pointer-events-none absolute left-[-180px] top-[35%] h-[400px] w-[400px] rounded-full bg-[#246BFF]/[0.035] blur-[120px]" />

      <div className="relative mx-auto max-w-[1200px]">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="max-w-[650px]">

          <FeatureNumber>
            FEATURES
          </FeatureNumber>

          <h2 className="mt-4 text-[38px] font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
            Everything important.
            <br />
            <span className="text-[#596473]">
              Nothing unnecessary.
            </span>
          </h2>

          <p className="mt-5 max-w-[500px] text-sm leading-6 text-[#68717D] sm:text-base">
            A focused interface for markets, assets and
            everything around your CryptoMintX account.
          </p>

        </div>

        {/* ================================================= */}
        {/* FEATURE GRID */}
        {/* ================================================= */}

        <div className="mt-12 grid gap-3 lg:grid-cols-2 lg:gap-4">

          {/* ================================================= */}
          {/* MAIN FEATURE */}
          {/* ================================================= */}

          <article
            className="
              group
              relative
              min-h-[390px]
              overflow-hidden
              rounded-[28px]
              border
              border-[#1A2029]
              bg-[#090D12]
              p-6
              sm:p-8
              lg:row-span-2
              lg:min-h-[650px]
            "
          >

            {/* Large visual glow */}
            <div className="pointer-events-none absolute right-[-120px] top-[90px] h-[340px] w-[340px] rounded-full bg-[#246BFF]/[0.07] blur-[100px]" />

            {/* Grid lines */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-[0.035]
                [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)]
                [background-size:45px_45px]
              "
            />

            <div className="relative flex h-full flex-col">

              <div className="flex items-center justify-between">

                <FeatureNumber>
                  01
                </FeatureNumber>

                <FeatureIcon>
                  <BarChart3
                    size={17}
                    className="text-[#709AFF]"
                  />
                </FeatureIcon>

              </div>

              {/* Fake market visual */}
              <div className="relative mt-14 flex-1">

                <div className="absolute left-[5%] right-[5%] top-[18%]">

                  <div className="mb-3 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-[#4F5967]">
                        Market
                      </p>

                      <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
                        BTC / USDT
                      </p>
                    </div>

                    <span className="text-xs font-medium text-[#08B77A]">
                      +2.84%
                    </span>
                  </div>

                  {/* Graph */}
                  <div className="relative h-[150px] overflow-hidden rounded-2xl border border-[#151C25] bg-[#080C11]">

                    <svg
                      viewBox="0 0 500 160"
                      preserveAspectRatio="none"
                      className="absolute inset-0 h-full w-full"
                    >
                      <defs>
                        <linearGradient
                          id="featureGraph"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#4D8DFF"
                            stopOpacity="0.25"
                          />

                          <stop
                            offset="100%"
                            stopColor="#4D8DFF"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>

                      <path
                        d="M0 125 C50 120 55 105 95 110 C135 115 140 80 180 92 C220 104 225 72 265 78 C305 84 310 45 350 55 C390 65 405 25 440 38 C465 47 480 20 500 25 L500 160 L0 160 Z"
                        fill="url(#featureGraph)"
                      />

                      <path
                        d="M0 125 C50 120 55 105 95 110 C135 115 140 80 180 92 C220 104 225 72 265 78 C305 84 310 45 350 55 C390 65 405 25 440 38 C465 47 480 20 500 25"
                        fill="none"
                        stroke="#4D8DFF"
                        strokeWidth="2"
                      />
                    </svg>

                  </div>

                </div>

              </div>

              <div className="relative mt-auto">

                <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                  Simple trading.
                </h3>

                <p className="mt-3 max-w-[430px] text-sm leading-6 text-[#68717D]">
                  Follow markets and manage your activity
                  without unnecessary complexity.
                </p>

                <div className="mt-6 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#667181] transition-colors group-hover:text-white">
                  Explore markets
                  <ArrowUpRight size={13} />
                </div>

              </div>

            </div>
          </article>

          {/* ================================================= */}
          {/* FEATURE 02 */}
          {/* ================================================= */}

          <article
            className="
              group
              relative
              min-h-[250px]
              overflow-hidden
              rounded-[28px]
              border
              border-[#1A2029]
              bg-[#090D12]
              p-6
              transition
              duration-300
              hover:border-[#293340]
              sm:p-7
            "
          >

            <div className="flex items-start justify-between">

              <FeatureNumber>
                02
              </FeatureNumber>

              <FeatureIcon>
                <ShieldCheck
                  size={17}
                  className="text-[#709AFF]"
                />
              </FeatureIcon>

            </div>

            <div className="mt-14">

              <h3 className="text-xl font-semibold tracking-[-0.035em] text-white sm:text-2xl">
                Asset control.
              </h3>

              <p className="mt-3 max-w-[430px] text-sm leading-6 text-[#68717D]">
                Keep your balances, transactions and account
                activity organized in one place.
              </p>

            </div>

          </article>

          {/* ================================================= */}
          {/* FEATURE 03 */}
          {/* ================================================= */}

          <article
            className="
              group
              relative
              min-h-[250px]
              overflow-hidden
              rounded-[28px]
              border
              border-[#1A2029]
              bg-[#090D12]
              p-6
              transition
              duration-300
              hover:border-[#293340]
              sm:p-7
            "
          >

            <div className="flex items-start justify-between">

              <FeatureNumber>
                03
              </FeatureNumber>

              <FeatureIcon>
                <Users
                  size={17}
                  className="text-[#709AFF]"
                />
              </FeatureIcon>

            </div>

            <div className="mt-14">

              <h3 className="text-xl font-semibold tracking-[-0.035em] text-white sm:text-2xl">
                Your network.
              </h3>

              <p className="mt-3 max-w-[430px] text-sm leading-6 text-[#68717D]">
                Track your referral activity and team structure
                from a single interface.
              </p>

            </div>

          </article>

        </div>

      </div>
    </section>
  );
}