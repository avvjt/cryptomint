import {
  ArrowRight,
  BookOpen,
  CircleDollarSign,
  Lock,
  PlayCircle,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";

const lessons = [
  {
    number: "01",
    icon: BookOpen,
    title: "Crypto basics",
    description:
      "Understand the fundamentals of digital assets, markets and wallets.",
  },
  {
    number: "02",
    icon: Wallet,
    title: "Wallets & deposits",
    description:
      "Learn how wallets work and how supported deposits and withdrawals work.",
  },
  {
    number: "03",
    icon: CircleDollarSign,
    title: "Understanding markets",
    description:
      "Learn the basics of market prices, trading pairs and price movements.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Account security",
    description:
      "Learn practical ways to protect your account and digital assets.",
  },
];

const guides = [
  "What is cryptocurrency?",
  "Understanding trading pairs",
  "What is a blockchain?",
  "How crypto wallets work",
  "Understanding market prices",
  "Protecting your crypto account",
];

export default function Academy() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070A] text-white">

      {/* HERO */}

      <section className="relative px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pt-24">

        <div className="pointer-events-none absolute right-[-150px] top-[-100px] h-[450px] w-[450px] rounded-full bg-[#246BFF]/[0.055] blur-[130px]" />

        <div className="relative mx-auto max-w-[1100px]">

          <div className="max-w-[700px]">

            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#596473]">
              CryptoMintX Academy
            </p>

            <h1 className="mt-5 text-[44px] font-semibold leading-[0.94] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              Learn crypto.
              <br />
              <span className="text-[#596473]">
                One step at a time.
              </span>
            </h1>

            <p className="mt-6 max-w-[520px] text-sm leading-6 text-[#68717D] sm:text-base">
              Simple guides and explanations to help you
              understand digital assets and the CryptoMintX
              platform.
            </p>

          </div>

        </div>
      </section>

      {/* FEATURED LESSON */}

      <section className="px-4 pb-16 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-[1100px]">

          <div className="group relative overflow-hidden rounded-[28px] border border-[#1A2029] bg-[#090D12]">

            <div className="absolute inset-0 bg-gradient-to-br from-[#246BFF]/[0.07] via-transparent to-transparent" />

            <div className="relative grid lg:grid-cols-[1.1fr_0.9fr]">

              <div className="p-6 sm:p-8 lg:p-12">

                <div className="flex items-center gap-2">

                  <span className="rounded-full border border-[#1C2837] bg-[#0C131D] px-3 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#719BFF]">
                    Start here
                  </span>

                  <span className="text-[10px] text-[#4F5967]">
                    Beginner
                  </span>

                </div>

                <h2 className="mt-7 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                  Your first steps
                  <br />
                  into crypto.
                </h2>

                <p className="mt-4 max-w-[480px] text-sm leading-6 text-[#68717D]">
                  Start with the fundamentals and build your
                  understanding before exploring more advanced
                  topics.
                </p>

                <button
                  type="button"
                  className="
                    mt-7
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-white
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-black
                  "
                >
                  <PlayCircle size={15} />
                  Start learning
                </button>

              </div>

              {/* Visual */}

              <div className="relative min-h-[260px] border-t border-[#171E27] lg:border-l lg:border-t-0">

                <div className="absolute inset-0 flex items-center justify-center">

                  <div className="relative h-40 w-40 rounded-full border border-[#253143] bg-[#0B1119]">

                    <div className="absolute inset-5 rounded-full border border-[#202B3A]" />

                    <div className="absolute inset-10 rounded-full bg-[#246BFF]/10 shadow-[0_0_80px_rgba(36,107,255,0.2)]" />

                    <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#719BFF]" />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* LEARNING PATH */}

      <section className="border-y border-[#121820] bg-[#070A0E] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">

        <div className="mx-auto max-w-[1100px]">

          <div className="max-w-[600px]">

            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#596473]">
              Learning path
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              Build your knowledge.
            </h2>

          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">

            {lessons.map((lesson) => {
              const Icon = lesson.icon;

              return (
                <article
                  key={lesson.number}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[22px]
                    border
                    border-[#1A2029]
                    bg-[#090D12]
                    p-6
                    transition
                    duration-300
                    hover:border-[#2A3442]
                  "
                >

                  <div className="flex items-start justify-between">

                    <span className="text-[10px] tracking-[0.16em] text-[#4F5967]">
                      {lesson.number}
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#1B232D] bg-[#0D131A]">
                      <Icon
                        size={16}
                        className="text-[#719BFF]"
                      />
                    </div>

                  </div>

                  <h3 className="mt-12 text-xl font-semibold tracking-[-0.035em]">
                    {lesson.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#68717D]">
                    {lesson.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[#596473] transition group-hover:text-white">
                    Learn more
                    <ArrowRight size={13} />
                  </div>

                </article>
              );
            })}

          </div>

        </div>

      </section>

      {/* GUIDES */}

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">

        <div className="mx-auto max-w-[900px]">

          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#596473]">
              Guides
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">
              Explore the basics.
            </h2>
          </div>

          <div className="mt-8 divide-y divide-[#171D25] border-y border-[#171D25]">

            {guides.map((guide, index) => (
              <button
                key={guide}
                type="button"
                className="
                  group
                  flex
                  w-full
                  items-center
                  gap-4
                  py-5
                  text-left
                "
              >

                <span className="w-6 text-[10px] text-[#4F5967]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="flex-1 text-sm text-[#8A94A3] transition group-hover:text-white">
                  {guide}
                </span>

                <ArrowRight
                  size={15}
                  className="text-[#4F5967] transition group-hover:translate-x-1 group-hover:text-white"
                />

              </button>
            ))}

          </div>

        </div>

      </section>

      {/* SECURITY */}

      <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">

        <div className="mx-auto max-w-[1100px]">

          <div className="rounded-[28px] border border-[#1A2029] bg-[#090D12] p-6 sm:p-8 lg:p-10">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-start gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#1B232D] bg-[#0D131A]">
                  <Lock
                    size={17}
                    className="text-[#719BFF]"
                  />
                </div>

                <div>

                  <h3 className="font-semibold">
                    Security matters.
                  </h3>

                  <p className="mt-1 max-w-[500px] text-sm leading-6 text-[#68717D]">
                    Learn how to protect your account and
                    understand the security tools available to you.
                  </p>

                </div>

              </div>

              <Link
                to="/help"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-white"
              >
                Security help
                <ArrowRight size={15} />
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}