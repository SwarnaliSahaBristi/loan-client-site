import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ErrorPage from "../ErrorPage";
import LoanCard from "./LoanCard";
import useTitle from "../../components/Usetitle/useTitle";
import Navbar from "../../components/Shared/Navbar/Navbar";
import Footer from "../../components/Shared/Footer/Footer";

const AllLoans = () => {
  useTitle("All Loans");
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const limit = 9;
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  // Debounced search value
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Update debounced value after user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);; // reset to first page on search
    }, 500); 

    return () => clearTimeout(handler); // cleanup
  }, [search]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["loans", page, debouncedSearch, status],
    queryFn: async () => {
      const res = await axiosSecure.get("/loans", {
        params: { page, limit, search: debouncedSearch, status },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorPage />;

  const { loans = [], total = 0 } = data || {};
  const totalPages = Math.ceil(total / limit);

  // Sliding page numbers helper
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    for (let i = Math.max(1, page - delta); i <= Math.min(totalPages, page + delta); i++) {
      range.push(i);
    }
    if (range[0] > 2) {
      range.unshift("...");
      range.unshift(1);
    } else if (range[0] === 2) range.unshift(1);
    if (range[range.length - 1] < totalPages - 1) {
      range.push("...");
      range.push(totalPages);
    } else if (range[range.length - 1] === totalPages - 1) range.push(totalPages);
    return range;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-center mb-10 py-24">Available Loans</h1>

        {/* Search & Filter */}
        <div className="flex gap-4 justify-center mb-8 flex-wrap">
          <input
            type="text"
            placeholder="Search loans..."
            className="input input-bordered"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select select-bordered"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Loan Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loans.map((loan, index) => (
            <LoanCard key={index} loan={loan} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
          <button
            className="btn btn-sm"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>

          {pageNumbers.map((num, idx) =>
            num === "..." ? (
              <span key={idx} className="px-2">...</span>
            ) : (
              <button
                key={idx}
                className={`btn btn-sm ${num === page ? "btn-active" : ""}`}
                onClick={() => setPage(num)}
              >
                {num}
              </button>
            )
          )}

          <button
            className="btn btn-sm"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllLoans;
