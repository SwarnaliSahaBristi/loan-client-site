import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useTitle from "../../../components/Usetitle/useTitle";
import { format } from "date-fns";

const PendingLoans = () => {
  useTitle("Pending Loans");
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  
  // State Management
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [isRejecting, setIsRejecting] = useState(false);

  // Fetch Data
  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["pendingLoans"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/manager/loan-applications?status=pending"
      );
      return res.data;
    },
  });

  // Approve Mutation
  const approveMutation = useMutation({
    mutationFn: async (id) =>
      await axiosSecure.patch(`/loan-applications/manager/${id}/approve`),
    onSuccess: () => {
      toast.success("Loan approved successfully");
      queryClient.invalidateQueries(["pendingLoans"]);
      queryClient.invalidateQueries(["approvedLoans"]);
    },
    onError: () => toast.error("Failed to approve loan"),
  });

  // Reject Mutation
  const rejectMutation = useMutation({
    mutationFn: async ({ id, reason }) =>
      await axiosSecure.patch(`/loan-applications/manager/${id}/reject`, {
        reason,
      }),
    onSuccess: () => {
      toast.success("Loan rejected");
      queryClient.invalidateQueries(["pendingLoans"]);
      closeModals();
    },
    onError: () => toast.error("Failed to reject loan"),
  });

  // Handlers
  const handleView = (loan) => {
    setSelectedLoan(loan);
    setIsRejecting(false); // Mode: View
  };

  const handleRejectClick = (loan) => {
    setSelectedLoan(loan);
    setIsRejecting(true); // Mode: Reject
    setRejectReason("");
  };

  const handleRejectSubmit = () => {
    if (!rejectReason.trim()) {
      toast.error("Please provide a reason");
      return;
    }
    rejectMutation.mutate({ id: selectedLoan._id, reason: rejectReason });
  };

  const closeModals = () => {
    setSelectedLoan(null);
    setIsRejecting(false);
    setRejectReason("");
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Pending Loan Applications</h1>

      {loans.length === 0 ? (
        <p className="text-center text-gray-500">No pending applications</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Borrower</th>
                <th>Loan Title</th>
                <th>Amount</th>
                <th>Applied Date</th>
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
                  <td>{format(new Date(loan.appliedAt), "PP")}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(loan)}
                        className="btn btn-sm btn-info"
                      >
                        View
                      </button>
                      <button
                        onClick={() => approveMutation.mutate(loan._id)}
                        disabled={approveMutation.isPending}
                        className="btn btn-sm btn-success"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectClick(loan)}
                        className="btn btn-sm btn-error"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- View Modal --- */}
      {selectedLoan && !isRejecting && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4 text-primary">Loan Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><strong>Name:</strong> {selectedLoan.userName}</div>
              <div><strong>Email:</strong> {selectedLoan.userEmail}</div>
              <div><strong>Amount:</strong> ${selectedLoan.loanAmount}</div>
              <div><strong>Interest:</strong> {selectedLoan.interestRate}%</div>
              <div><strong>Contact:</strong> {selectedLoan.contactNumber}</div>
              <div><strong>National ID:</strong> {selectedLoan.nationalId}</div>
              <div><strong>Income Source:</strong> {selectedLoan.incomeSource}</div>
              <div><strong>Monthly Income:</strong> ${selectedLoan.monthlyIncome}</div>
              <div className="col-span-2"><strong>Reason for Loan:</strong> {selectedLoan.reason}</div>
              <div className="col-span-2"><strong>Address:</strong> {selectedLoan.address}</div>
            </div>
            <div className="modal-action">
              <button onClick={closeModals} className="btn btn-gradient">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* --- Reject Modal --- */}
      {selectedLoan && isRejecting && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4 text-error">Reject Application</h3>
            <p className="mb-4">Provide a clear reason for the borrower:</p>
            <textarea
              className="textarea textarea-bordered w-full h-24"
              placeholder="e.g., Credit score insufficient or documents missing..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="modal-action">
              <button onClick={closeModals} className="btn">Cancel</button>
              <button 
                onClick={handleRejectSubmit} 
                disabled={rejectMutation.isPending}
                className="btn btn-error"
              >
                {rejectMutation.isPending ? "Rejecting..." : "Confirm Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingLoans;