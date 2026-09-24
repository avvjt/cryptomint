import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  CircleHelp,
  LockKeyhole,
  Search,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    icon: Wallet,
    title: "Account & Wallet",
    description: "Account settings, deposits, withdrawals and wallet management.",
  },
  {
    icon: CircleHelp,
    title: "Trading",
    description: "Learn about markets, orders and managing your trades.",
  },
  {
    icon: LockKeyhole,
    title: "Security",
    description: "Protect your account and understand security features.",
  },
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "Everything you need to get familiar with CryptoMintX.",
  },
];

const popularQuestions = [
  "How do I create a CryptoMintX account?",
  "How do I deposit USDT?",
  "How do I withdraw my assets?",
  "Where can I view my transactions?",
  "How do I change my account information?",
  "How can I secure my account?",
];

export default function Help() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070A] text-white">

      {/* HERO */}

      <section className="relative px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pt-24">

        <div className="pointer-events-none absolute left-1/2 top-[-150px] h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#246BFF]/[0.06] blur-[120px]" />

        <div className="relative mx-auto max-w-[900px] text-center">

          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#596473]">
            Help Center
          </p>

          <h1 className="mt-5 text-[42px] font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            How can we
            <br />
            <span className="text-[#596473]">
              help you?
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-[500px] text-sm leading-6 text-[#68717D] sm:text-base">
            Find answers, learn how CryptoMintX works,
            and get help with your account.
          </p>

          {/* SEARCH */}

          <div className="mx-auto mt-8 flex h-14 max-w-[620px] items-center rounded-2xl border border-[#1A222C] bg-[#0A0E13] px-4 transition focus-within:border-[#303B4A]">

            <Search
              size={18}
              className="shrink-0 text-[#596473]"
            />

            <input
              type="search"
              placeholder="Search the help center..."
              className="
                min-w-0
                flex-1
                bg-transparent
                px-3
                text-sm
                text-white
                outline-none
                placeholder:text-[#4F5967]
              "
            />

          </div>

        </div>
      </section>

      {/* CATEGORIES */}

      <section className="px-4 pb-20 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-[1100px]">

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.title}
                  type="button"
                  className="
                    group
                    rounded-[22px]
                    border
                    border-[#1A2029]
                    bg-[#090D12]
                    p-5
                    text-left
                    transition
                    duration-300
                    hover:border-[#2A3442]
                    hover:bg-[#0D1218]
                  "
                >

                  <div className="flex items-center justify-between">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1B232D] bg-[#0D131A]">
                      <Icon
                        size={17}
                        className="text-[#719BFF]"
                      />
                    </div>

                    <ArrowRight
                      size={15}
                      className="text-[#4F5967] transition group-hover:translate-x-1 group-hover:text-white"
                    />

                  </div>

                  <h2 className="mt-7 text-base font-semibold text-white">
                    {category.title}
                  </h2>

                  <p className="mt-2 text-xs leading-5 text-[#68717D]">
                    {category.description}
                  </p>

                </button>
              );
            })}

          </div>

        </div>
      </section>

      {/* POPULAR */}

      <section className="border-y border-[#121820] bg-[#070A0E] px-4 py-16 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-[900px]">

          <div className="flex items-end justify-between gap-4">

            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#596473]">
                Quick answers
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                Popular questions
              </h2>
            </div>

            <Link
              to="/academy"
              className="hidden items-center gap-1 text-xs text-[#68717D] transition hover:text-white sm:flex"
            >
              Visit Academy
              <ChevronRight size={14} />
            </Link>

          </div>

          <div className="mt-7 divide-y divide-[#171D25] border-y border-[#171D25]">

            {popularQuestions.map((question) => (
              <button
                key={question}
                type="button"
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-between
                  gap-4
                  py-5
                  text-left
                "
              >

                <span className="text-sm text-[#9AA3AF] transition group-hover:text-white">
                  {question}
                </span>

                <ChevronRight
                  size={16}
                  className="shrink-0 text-[#4F5967] transition group-hover:translate-x-1 group-hover:text-white"
                />

              </button>
            ))}

          </div>

        </div>
      </section>

      {/* ACADEMY CTA */}

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">

        <div className="mx-auto max-w-[1000px]">

          <div className="relative overflow-hidden rounded-[28px] border border-[#1A2029] bg-[#090D12] px-6 py-12 text-center sm:px-10 sm:py-16">

            <div className="pointer-events-none absolute left-1/2 top-[-100px] h-[250px] w-[400px] -translate-x-1/2 rounded-full bg-[#246BFF]/[0.07] blur-[100px]" />

            <div className="relative">

              <BookOpen
                size={22}
                className="mx-auto text-[#719BFF]"
              />

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                Want to learn more?
              </h2>

              <p className="mx-auto mt-4 max-w-[440px] text-sm leading-6 text-[#68717D]">
                Explore the CryptoMintX Academy for guides,
                explanations and useful resources.
              </p>

              <Link
                to="/academy"
                className="
                  mx-auto
                  mt-7
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-black
                  transition
                  hover:bg-[#E8ECF2]
                "
              >
                Explore Academy
                <ArrowRight size={15} />
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}