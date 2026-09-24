import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
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
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-[#68717D]">
            Last updated: September 2026
          </p>
        </div>

        <div className="space-y-10 pt-10 text-sm leading-7 text-[#8A94A3]">

          <section>
            <h2 className="text-xl font-semibold text-white">
              1. Information We Collect
            </h2>

            <p className="mt-3">
              Depending on how you use CryptoMintX, we may collect information
              such as account details, contact information, transaction
              information, device information and technical data required to
              operate and secure the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              2. How We Use Information
            </h2>

            <p className="mt-3">
              Information may be used to provide and maintain the platform,
              process supported transactions, secure accounts, communicate
              with users, prevent abuse and improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              3. Security
            </h2>

            <p className="mt-3">
              We use reasonable technical and organizational measures designed
              to protect information against unauthorized access, alteration,
              disclosure or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              4. Information Sharing
            </h2>

            <p className="mt-3">
              We may share information with service providers and partners
              when necessary to operate the platform, comply with legal
              obligations, protect users or maintain security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              5. Cookies and Similar Technologies
            </h2>

            <p className="mt-3">
              CryptoMintX may use cookies or similar technologies to maintain
              sessions, remember preferences, understand platform usage and
              improve the user experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              6. Data Retention
            </h2>

            <p className="mt-3">
              Information may be retained for as long as reasonably necessary
              to provide services, maintain records, comply with legal
              requirements and resolve disputes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              7. Your Choices
            </h2>

            <p className="mt-3">
              Depending on applicable law, you may have rights regarding access,
              correction, deletion or other processing of your personal
              information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              8. Policy Updates
            </h2>

            <p className="mt-3">
              This Privacy Policy may be updated periodically. The latest
              version will be made available through the CryptoMintX website.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}