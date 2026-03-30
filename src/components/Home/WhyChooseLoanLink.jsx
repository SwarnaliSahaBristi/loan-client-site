import { FaShieldAlt, FaBolt, FaHandHoldingUsd, FaUserCheck } from "react-icons/fa";

const features = [
  {
    icon: <FaBolt />,
    title: "Fast Approval",
    desc: "Get loan decisions within minutes using our smart evaluation system.",
    more: "No paperwork needed, completely online process."
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure & Transparent",
    desc: "Your data is protected with enterprise-level security & no hidden fees.",
    more: "We comply with all GDPR regulations."
  },
  {
    icon: <FaHandHoldingUsd />,
    title: "Flexible Loan Options",
    desc: "Choose repayment plans that fit your income and lifestyle.",
    more: "Custom plans tailored to your budget."
  },
  {
    icon: <FaUserCheck />,
    title: "Trusted by Thousands",
    desc: "10,000+ borrowers already trust LoanLink with their financial needs.",
    more: "Rated 4.8/5 by our users."
  },
  // Add more features here
];

const WhyChooseLoanLink = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Why Choose LoanLink?
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We combine technology, transparency, and trust to make borrowing easy for everyone.
          </p>
        </div>

        {/* Marquee Section */}
        <div className="relative">
          <div className="flex animate-marquee space-x-8">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="min-w-[250px] p-8 rounded-3xl bg-gray-50 dark:bg-gray-800 shadow-lg flex-shrink-0"
              >
                <div className="text-4xl text-pink-500 mb-5">{f.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{f.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">{f.desc}</p>
                {f.more && (
                  <p className="mt-2 text-gray-500 dark:text-gray-300 text-xs italic">{f.more}</p>
                )}
              </div>
            ))}
            {/* Duplicate to make seamless loop */}
            {features.map((f, idx) => (
              <div
                key={`dup-${idx}`}
                className="min-w-[250px] p-8 rounded-3xl bg-gray-50 dark:bg-gray-800 shadow-lg flex-shrink-0"
              >
                <div className="text-4xl text-pink-500 mb-5">{f.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{f.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">{f.desc}</p>
                {f.more && (
                  <p className="mt-2 text-gray-500 dark:text-gray-300 text-xs italic">{f.more}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind custom animation */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseLoanLink;