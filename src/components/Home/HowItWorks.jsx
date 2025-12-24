import { FaUserEdit, FaFileInvoiceDollar, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";
import { Link } from "react-router";

const steps = [
  {
    id: 1,
    title: "Apply Online",
    description:
      "Fill out a simple loan application in minutes with basic personal and financial details.",
    icon: <FaUserEdit />,
  },
  {
    id: 2,
    title: "Pay Application Fee",
    description:
      "Securely pay a small application fee to verify and process your loan request.",
    icon: <FaFileInvoiceDollar />,
  },
  {
    id: 3,
    title: "Get Approved",
    description:
      "Our team reviews your application quickly and notifies you of approval status.",
    icon: <FaCheckCircle />,
  },
  {
    id: 4,
    title: "Receive Funds",
    description:
      "Once approved, the loan amount is disbursed directly to your account.",
    icon: <FaMoneyBillWave />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Getting a loan with LoanLink is simple, transparent, and fast.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-pink-400 to-purple-500 -translate-x-1/2" />

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Card */}
                <div className="md:w-1/2">
                  <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl">
                        {step.icon}
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Step Number */}
                <div className="hidden md:flex w-12 h-12 rounded-full bg-white dark:bg-gray-900 border-4 border-pink-500 text-pink-600 font-bold items-center justify-center z-10">
                  {step.id}
                </div>

                <div className="md:w-1/2" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <Link to="/loan-form" className="px-10 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition">
            Apply for a Loan
          </Link>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
