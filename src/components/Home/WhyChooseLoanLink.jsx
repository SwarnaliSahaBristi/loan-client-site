import { FaShieldAlt, FaBolt, FaHandHoldingUsd, FaUserCheck } from "react-icons/fa";

const features = [
  {
    icon: <FaBolt />,
    title: "Fast Approval",
    desc: "Get loan decisions within minutes using our smart evaluation system.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure & Transparent",
    desc: "Your data is protected with enterprise-level security & no hidden fees.",
  },
  {
    icon: <FaHandHoldingUsd />,
    title: "Flexible Loan Options",
    desc: "Choose repayment plans that fit your income and lifestyle.",
  },
  {
    icon: <FaUserCheck />,
    title: "Trusted by Thousands",
    desc: "10,000+ borrowers already trust LoanLink with their financial needs.",
  },
];

const WhyChooseLoanLink = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
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

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="group relative p-8 rounded-3xl bg-gray-50 dark:bg-gray-800 shadow-lg hover:shadow-2xl transition"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-10 transition" />

              <div className="relative">
                <div className="text-4xl text-pink-500 mb-5 group-hover:scale-110 transition">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {f.title}
                </h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseLoanLink;
