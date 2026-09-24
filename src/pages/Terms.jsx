import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
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
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#596473]">
            Legal
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
            Terms of Service
          </h1>

          <p className="mt-4 text-sm text-[#68717D]">
            Last updated: September 2026
          </p>
        </div>

        <div className="space-y-10 pt-10 text-sm leading-7 text-[#8A94A3]">

          <section>
            <h2 className="text-xl font-semibold text-white">
              1. Acceptance of Terms
            </h2>

            <p className="mt-3">
              By accessing or using CryptoMintX, you agree to these Terms of
              Service and any applicable policies referenced in them. If you
              do not agree with these terms, please do not use the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              2. About CryptoMintX
            </h2>

            <p className="mt-3">
              CryptoMintX provides a digital asset platform and related
              interfaces for account management, market information,
              transactions and other supported services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              3. Account
            </h2>

            <p className="mt-3">
              You are responsible for maintaining the confidentiality of your
              account credentials and for activity performed through your
              account. You should notify CryptoMintX if you believe your
              account has been accessed without authorization.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              4. Digital Assets
            </h2>

            <p className="mt-3">
              Digital assets can be volatile and may involve substantial risk.
              Information displayed through the platform should not be
              interpreted as a guarantee of future performance or value.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              5. Prohibited Use
            </h2>

            <p className="mt-3">
              You agree not to use the platform for unlawful activities,
              unauthorized access, fraud, abuse, manipulation, or any activity
              that could interfere with the security or operation of the
              platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              6. Platform Availability
            </h2>

            <p className="mt-3">
              We may modify, suspend or discontinue parts of the platform from
              time to time for maintenance, security, technical or operational
              reasons.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              7. Limitation of Liability
            </h2>

            <p className="mt-3">
              To the extent permitted by applicable law, CryptoMintX shall
              not be responsible for losses resulting from market movements,
              interruptions, unauthorized access caused by compromised user
              credentials, or circumstances outside our reasonable control.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              8. Changes to These Terms
            </h2>

            <p className="mt-3">
              These terms may be updated from time to time. Continued use of
              CryptoMintX after an update means that you acknowledge the
              revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              9. Contact
            </h2>

            <p className="mt-3">
              For questions regarding these terms, please contact the
              CryptoMintX support team through the available support channels.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}