import { Link } from "react-router-dom";
import { ArrowLeft, TriangleAlert } from "lucide-react";

export default function Disclaimer() {
  return (
    <main className="min-h-screen bg-[#05070A] px-4 pb-20 pt-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[900px]">

        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-[#68717D] transition hover:text-white"
        >
          <ArrowLeft size={15} />
          Back to CryptoMintX
        </Link>

        <div className="border-b border-[#1A2029] pb-8">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#3A2410] bg-[#17100A]">
            <TriangleAlert
              size={18}
              className="text-[#E9A23B]"
            />
          </div>

          <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.18em] text-[#596473]">
            Important information
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
            Disclaimer
          </h1>

          <p className="mt-4 text-sm text-[#68717D]">
            Last updated: September 2026
          </p>
        </div>

        <div className="space-y-10 pt-10 text-sm leading-7 text-[#8A94A3]">

          <section>
            <h2 className="text-xl font-semibold text-white">
              Digital Asset Risk
            </h2>

            <p className="mt-3">
              Digital assets and related markets can involve significant
              financial risk. Prices may change rapidly and you may lose some
              or all of the value of an asset.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              No Financial Advice
            </h2>

            <p className="mt-3">
              Information presented through CryptoMintX is provided for
              informational purposes and should not be considered financial,
              investment, legal or tax advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              Market Information
            </h2>

            <p className="mt-3">
              Market prices, charts, statistics and other information may
              change and may not always be complete, accurate or available in
              real time. You should independently evaluate information before
              making decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              No Guarantee
            </h2>

            <p className="mt-3">
              Past performance does not guarantee future results. CryptoMintX
              does not guarantee profits, returns or future asset values.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              User Responsibility
            </h2>

            <p className="mt-3">
              You are responsible for understanding the risks associated with
              digital assets and for determining whether a particular service
              or transaction is appropriate for your circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              Third-Party Services
            </h2>

            <p className="mt-3">
              CryptoMintX may interact with third-party services or external
              networks. Their availability, functionality and policies may
              differ from those of CryptoMintX.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}