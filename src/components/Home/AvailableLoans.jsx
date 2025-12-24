import { useEffect, useState } from "react";
import LoanCard from "../../pages/AllLoans/LoanCard";
import Container from "../Shared/Container";
import axiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../Shared/LoadingSpinner";

const AvailableLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic.get("/loans/available").then((res) => {
      setLoans(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <Container>
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Heading */}
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Available Loans
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose from our flexible loan options designed to fit your
              financial needs.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loans.map((loan) => (
              <LoanCard key={loan._id} loan={loan} />
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default AvailableLoans;
