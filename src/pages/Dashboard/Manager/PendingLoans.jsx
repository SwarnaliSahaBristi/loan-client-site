// PendingLoans.jsx
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
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["pendingLoans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/loan-applications?status=pending");
      return res.data;
    }
  });

  const approveMutation = useMutation({
    mutationFn: async (id) =>
      await axiosSecure.patch(`/loan-applications/manager/${id}/approve`),
    onSuccess: () => {
      toast.success("Loan approved successfully");
      queryClient.invalidateQueries(["pendingLoans"]);
      queryClient.invalidateQueries(["approvedLoans"]);
    },
    onError: () => toast.error("Failed to approve loan")
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ id, reason }) =>
      await axiosSecure.patch(`/loan-applications/manager/${id}/reject`, { reason }),
    onSuccess: () => {
      toast.success("Loan rejected");
      queryClient.invalidateQueries(["pendingLoans"]);
      setSelectedLoan(null);
      setRejectReason("");
    },
    onError: () => toast.error("Failed to reject loan")
  });

  const handleReject = () => {
    if (!rejectReason.trim()) {
      toast.error("Please provide a reason");
      return;
    }
    rejectMutation.mutate({ id: selectedLoan._id, reason: rejectReason });
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
                        onClick={() => setSelectedLoan(loan)}
                        className="btn btn-sm btn-info"
                      >
                        View
                      </button>
                      <button
                        onClick={() => approveMutation.mutate(loan._id)}
                        className="btn btn-sm btn-success"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          setSelectedLoan(loan);
                          setRejectReason("");
                        }}
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

      {/* View Modal */}
      {selectedLoan && !rejectReason && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Loan Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><strong>Name:</strong> {selectedLoan.userName}</div>
              <div><strong>Email:</strong> {selectedLoan.userEmail}</div>
              <div><strong>Amount:</strong> ${selectedLoan.loanAmount}</div>
              <div><strong>Interest:</strong> {selectedLoan.interestRate}%</div>
              <div><strong>Contact:</strong> {selectedLoan.contactNumber}</div>
              <div><strong>National ID:</strong> {selectedLoan.nationalId}</div>
              <div><strong>Income Source:</strong> {selectedLoan.incomeSource}</div>
              <div><strong>Monthly Income:</strong> ${selectedLoan.monthlyIncome}</div>
              <div className="col-span-2"><strong>Reason:</strong> {selectedLoan.reason}</div>
              <div className="col-span-2"><strong>Address:</strong> {selectedLoan.address}</div>
            </div>
            <div className="modal-action">
              <button onClick={() => setSelectedLoan(null)} className="btn">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {selectedLoan && rejectReason !== null && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Reject Application</h3>
            <p className="mb-4">Provide a reason for rejection:</p>
            <textarea
              className="textarea textarea-bordered w-full h-24"
              placeholder="Reason for rejection..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="modal-action">
              <button
                onClick={() => {
                  setSelectedLoan(null);
                  setRejectReason("");
                }}
                className="btn"
              >
                Cancel
              </button>
              <button onClick={handleReject} className="btn btn-error">
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingLoans;