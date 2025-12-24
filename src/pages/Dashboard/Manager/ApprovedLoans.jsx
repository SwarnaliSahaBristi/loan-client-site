import { useState } from "react";
import { useQuery} from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useTitle from "../../../components/Usetitle/useTitle";
import { format } from "date-fns";

const ApprovedLoans = () => {
  useTitle("Approved Loans");
  const axiosSecure = useAxiosSecure();
  const [selectedLoan, setSelectedLoan] = useState(null);

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["approvedLoans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/loan-applications?status=approved");
      return res.data;
    }
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Approved Loan Applications</h1>

      {loans.length === 0 ? (
        <p className="text-center text-gray-500">No approved applications</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
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
                <tr key={loan._id}>
                  <td className="font-mono text-sm">{loan._id}</td>
                  <td>
                    <div>
                      <p className="font-semibold">{loan.userName}</p>
                      <p className="text-sm text-gray-500">{loan.userEmail}</p>
                    </div>
                  </td>
                  <td>{loan.loanTitle}</td>
                  <td className="font-bold">${loan.loanAmount}</td>
                  <td>{format(new Date(loan.approvedAt), "PP")}</td>
                  <td>
                    <button
                      onClick={() => setSelectedLoan(loan)}
                      className="btn btn-sm btn-info"
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
            <h3 className="font-bold text-lg mb-4">Loan Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><strong>Name:</strong> {selectedLoan.userName}</div>
              <div><strong>Email:</strong> {selectedLoan.userEmail}</div>
              <div><strong>Amount:</strong> ${selectedLoan.loanAmount}</div>
              <div><strong>Interest:</strong> {selectedLoan.interestRate}%</div>
              <div><strong>Status:</strong> <span className="badge badge-success">{selectedLoan.status}</span></div>
              <div><strong>Approved:</strong> {format(new Date(selectedLoan.approvedAt), "PPPpp")}</div>
            </div>
            <div className="modal-action">
              <button onClick={() => setSelectedLoan(null)} className="btn">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ApprovedLoans;
