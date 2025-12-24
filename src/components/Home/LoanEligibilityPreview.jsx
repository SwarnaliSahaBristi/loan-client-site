import { useState } from "react";
import { Link } from "react-router";

const LoanEligibilityPreview = () => {
  const [income, setIncome] = useState(30000);
  const [amount, setAmount] = useState(200000);

  const eligible = income >= amount / 10;

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-3xl p-10 bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Check Your Loan Eligibility
          </h2>
          <p className="text-center mt-3 opacity-90">
            Estimate your chances before applying — no credit impact.
          </p>

          {/* Sliders */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block mb-2 font-medium">
                Monthly Income (৳)
              </label>
              <input
                type="range"
                min="10000"
                max="200000"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full"
              />
              <p className="mt-2 text-sm">৳ {income}</p>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Desired Loan Amount (৳)
              </label>
              <input
                type="range"
                min="50000"
                max="1000000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full"
              />
              <p className="mt-2 text-sm">৳ {amount}</p>
            </div>
          </div>

          {/* Result */}
          <div className="mt-10 text-center">
            <p className="text-lg py-4">
              Eligibility Status:
              <span
                className={`ml-2 font-bold ${
                  eligible ? "text-green-300" : "text-yellow-300"
                }`}
              >
                {eligible ? "Likely Eligible" : "Needs Review"}
              </span>
            </p>

            <Link to="/loan-form" className="mt-8 bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition">
              Apply for Loan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanEligibilityPreview;
