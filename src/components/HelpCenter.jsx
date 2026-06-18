import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What is crypto?",
    answer:
      "Cryptocurrency is a digital asset secured by cryptography and recorded on a blockchain.",
  },
  {
    question: "How do I trade crypto on MEXC?",
    answer:
      "Create an account, complete verification, deposit funds, and start trading in Spot or Futures.",
  },
  {
    question: "Does MEXC offer zero-fee trading?",
    answer:
      "Yes. Selected pairs and promotions may offer zero-fee trading.",
  },
  {
    question: "What tokens are available on MEXC?",
    answer:
      "MEXC lists thousands of crypto assets across Spot and Futures markets.",
  },
  {
    question: "How can I earn rewards on MEXC?",
    answer:
      "Participate in launchpads, staking programs, referral campaigns, and promotions.",
  },
  {
    question: "Why should I use MEXC?",
    answer:
      "MEXC offers deep liquidity, low fees, extensive token listings, and global accessibility.",
  },
];

export default function HelpCenter() {
  const [active, setActive] = useState(null);

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="bg-black py-20 px-4 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <h2
          className="
          text-center
          text-4xl
          lg:text-6xl
          font-bold
          text-white
          drop-shadow-[0_0_20px_rgba(255,255,255,.8)]
          "
        >
          Help Centre
        </h2>

        {/* FAQ */}
        <div className="mt-16 space-y-4">

          {faqData.map((item, index) => (
            <div
              key={index}
              className="
              border-b
              border-zinc-800
              pb-4
              "
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="
                w-full
                flex
                items-center
                justify-between
                gap-4
                text-left
                py-4
                "
              >
                <div className="flex gap-5">
                  <span
                    className="
                    min-w-[20px]
                    text-white
                    font-semibold
                    "
                  >
                    {index + 1}
                  </span>

                  <span
                    className="
                    text-white
                    text-lg
                    lg:text-2xl
                    "
                  >
                    {item.question}
                  </span>
                </div>

                <ChevronDown
                  className={`
                    transition-transform duration-300
                    ${
                      active === index
                        ? "rotate-180"
                        : ""
                    }
                  `}
                />
              </button>

              <div
                className={`
                  overflow-hidden
                  transition-all
                  duration-300
                  ${
                    active === index
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0"
                  }
                `}
              >
                <p
                  className="
                  pl-9
                  pb-4
                  text-zinc-400
                  "
                >
                  {item.answer}
                </p>
              </div>

            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">

          <button
            className="
            rounded-full
            bg-[#1D66FF]
            px-10
            py-4
            text-lg
            font-medium
            text-white
            transition
            hover:bg-blue-700
            "
          >
            Sign Up Now
          </button>

        </div>

      </div>
    </section>
  );
}