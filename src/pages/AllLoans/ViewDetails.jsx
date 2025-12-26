import React from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ErrorPage from "../ErrorPage";
import useTitle from "../../components/Usetitle/useTitle";

const ViewDetails = () => {
  useTitle("Loan Details");
  const axiosSecure = useAxiosSecure();
  const { loanId } = useParams();
  const { user } = useAuth();

  const {
    data: loan,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["loan", loanId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loan/${loanId}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error || !loan) return <ErrorPage />;

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-10 px-4 md:px-8">
      <div className="mt-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-extrabold text-center"
        >
          {loan.loanTitle}
        </motion.h1>
        <p className="text-gray-500 mt-2 text-center py-3 hover:text-base-content"><Link to='/' className="hover: underline">Home /</Link>
        <Link to='/all-loans' className="hover: underline ">All Loans /</Link>  {loan.category}</p>
      </div>
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row gap-6 md:gap-10 p-6 md:p-10 transition-colors duration-300">
        {/* Loan Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={loan.loanImage}
            alt={loan.loanTitle}
            className="rounded-xl shadow-lg object-cover w-full max-h-[400px] hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Loan Info */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-pink-600 dark:text-pink-400">
            {loan.loanTitle}
          </h1>
          <p className="text-gray-700 dark:text-gray-300">{loan.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="font-semibold text-gray-600 dark:text-gray-400">
                Category
              </h3>
              <p className="text-gray-800 dark:text-gray-200">
                {loan.category}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-600 dark:text-gray-400">
                Interest Rate
              </h3>
              <p className="text-gray-800 dark:text-gray-200">
                {loan.interestRate}%
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-600 dark:text-gray-400">
                Max Loan Limit
              </h3>
              <p className="text-gray-800 dark:text-gray-200">
                ${loan.maxLimit}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-600 dark:text-gray-400">
                EMI Plans
              </h3>
              <p className="text-gray-800 dark:text-gray-200">
                {loan.emiPlans.join(", ")}
              </p>
            </div>
          </div>

          {/* Apply Now Button */}
          {user && user.role !== "manager" && user.role !== "admin" ? (
            <Link
              to={`/loan-form/${loan._id}`}
              state={{
                loanTitle: loan.loanTitle,
                interestRate: loan.interestRate,
              }}
              className="btn btn-gradient mt-6 w-full sm:w-auto"
            >
              Apply Now
            </Link>
          ) : (
            <p className="mt-6 text-gray-500 dark:text-gray-400">
              Login as a borrower to apply for this loan.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ViewDetails;
