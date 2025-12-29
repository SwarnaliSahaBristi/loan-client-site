import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useTitle from "../../../components/Usetitle/useTitle";
import { format, isValid } from "date-fns";

const ApprovedLoans = () => {
  useTitle("Approved Loans");
  const axiosSecure = useAxiosSecure();
  const [selectedLoan, setSelectedLoan] = useState(null);

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["approvedLoans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/loan-applications?status=approved");
      return res.data;
    },
  });

  const safeFormat = (dateValue, formatStr) => {
    if (!dateValue) return "N/A";
    const date = new Date(dateValue);
    return isValid(date) ? format(date, formatStr) : "Invalid Date";
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Approved Loan Applications</h1>

      {loans.length === 0 ? (
        <p className="text-center text-gray-500">No approved applications found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>Loan ID</th>
                <th>Borrower</th>
                <th>Loan Title</th>
                <th>Amount</th>
                <th>Approved Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan._id} className="hover">
                  <td className="font-mono text-xs text-gray-500">{loan._id}</td>
                  <td>
                    <div>
                      <p className="font-semibold">{loan.userName}</p>
                      <p className="text-sm text-gray-500">{loan.userEmail}</p>
                    </div>
                  </td>
                  <td>{loan.loanTitle}</td>
                  <td className="font-bold text-success">${loan.loanAmount}</td>
                  <td>{safeFormat(loan.approvedAt, "PP")}</td>
                  <td>
                    <button
                      onClick={() => setSelectedLoan(loan)}
                      className="btn btn-sm btn-outline btn-info"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      {selectedLoan && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-2xl text-primary">Loan Details</h3>
              <span className="badge badge-success gap-2">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                {selectedLoan.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 border-t border-b">
              <div className="space-y-1">
                <p className="text-sm text-gray-500 uppercase font-bold">Borrower Info</p>
                <p><strong>Name:</strong> {selectedLoan.userName}</p>
                <p><strong>Email:</strong> {selectedLoan.userEmail}</p>
                <p><strong>Contact:</strong> {selectedLoan.contactNumber || "N/A"}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-500 uppercase font-bold">Financials</p>
                <p><strong>Loan Amount:</strong> ${selectedLoan.loanAmount}</p>
                <p><strong>Interest Rate:</strong> {selectedLoan.interestRate}%</p>
                <p><strong>Monthly Income:</strong> ${selectedLoan.monthlyIncome}</p>
              </div>

              <div className="col-span-full space-y-1">
                <p className="text-sm text-gray-500 uppercase font-bold">Timestamps</p>
                <p><strong>Approved On:</strong> {safeFormat(selectedLoan.approvedAt, "PPPpp")}</p>
                <p><strong>Applied On:</strong> {safeFormat(selectedLoan.appliedAt, "PPPpp")}</p>
              </div>
            </div>

            <div className="modal-action">
              <button 
                onClick={() => setSelectedLoan(null)} 
                className="btn btn-gradient"
              >
                Close
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setSelectedLoan(null)}></div>
        </div>
      )}
    </div>
  );
};

export default ApprovedLoans;