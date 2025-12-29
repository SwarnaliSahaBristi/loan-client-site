import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../components/Usetitle/useTitle";
import Swal from "sweetalert2"; // Recommended for professional feedback

const LoanApplications = () => {
  useTitle("Loan Applications");
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [reasonInput, setReasonInput] = useState("");
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // 1. Fetch Logic
  const {
    data: loans = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["loanApplications"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin/loan-applications");
      return data;
    },
  });

  // 2. Update Logic (Mutation)
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, reason }) => {
      const { data } = await axiosSecure.patch(
        `/admin/loan-applications/${id}/status`,
        {
          status,
          reason,
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["loanApplications"]);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Loan status has been updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      setSelectedLoan(null);
      setReasonInput("");
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!",
      });
    },
  });

  // 3. Filter Logic
  const filteredLoans =
    statusFilter === "all"
      ? loans
      : loans.filter((loan) => loan.status.toLowerCase() === statusFilter);

  const handleStatusChange = (status) => {
    if (
      (status === "rejected" || status === "suspended") &&
      !reasonInput.trim()
    ) {
      return Swal.fire(
        "Required",
        "Please provide a reason for this action.",
        "warning"
      );
    }

    updateStatusMutation.mutate({
      id: selectedLoan._id,
      status,
      reason: reasonInput,
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center p-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (isError)
    return (
      <div className="text-red-500 text-center p-10">
        Error loading loans. Please check your connection.
      </div>
    );

  return (
    <div className="p-4 md:p-8 bg-base-200 min-h-screen">
      <div className="max-w-7xl mx-auto bg-base-100 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-base-content">
          Loan Applications
        </h2>

        {/* Filter Section */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
          <label className="font-medium text-base-content opacity-70">
            Filter by Status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-bordered select-sm w-full max-w-xs bg-base-100 text-base-content"
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="suspended">Suspended</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto rounded-lg border border-base-300">
          <table className="table table-zebra w-full">
            <thead className="bg-base-300 text-base-content">
              <tr>
                <th>User Details</th>
                <th>Loan Title</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan) => (
                <tr
                  key={loan._id}
                  className="hover:bg-base-200 transition-colors"
                >
                  <td>
                    <div className="font-bold">{loan.userName}</div>
                    <div className="text-sm opacity-60">{loan.userEmail}</div>
                  </td>
                  <td className="font-medium">{loan.loanTitle}</td>
                  <td className="text-primary font-semibold">
                    ${loan.loanAmount}
                  </td>
                  <td>
                    <span
                      className={`badge badge-sm uppercase font-bold ${
                        loan.status === "approved"
                          ? "badge-success"
                          : loan.status === "pending"
                          ? "badge-warning"
                          : "badge-error"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedLoan(loan)}
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Section */}
      {selectedLoan && (
        <div className="modal modal-open bg-black/60">
          <div className="modal-box bg-base-100 text-base-content max-w-2xl border border-base-300">
            <h3 className="text-xl font-bold border-b pb-3 mb-4">
              Application Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="opacity-60">Applicant Name</p>
                <p className="font-semibold">{selectedLoan.userName}</p>
              </div>
              <div>
                <p className="opacity-60">Application ID</p>
                <p className="font-mono text-xs">{selectedLoan._id}</p>
              </div>
              <div>
                <p className="opacity-60">Loan Type</p>
                <p className="font-semibold">{selectedLoan.loanTitle}</p>
              </div>
              <div>
                <p className="opacity-60">Requested Amount</p>
                <p className="text-lg font-bold text-primary">
                  ${selectedLoan.loanAmount}
                </p>
              </div>
              <div>
                <p className="opacity-60">Phone</p>
                <p>{selectedLoan.contactNumber}</p>
              </div>
              <div>
                <p className="opacity-60">Income</p>
                <p>
                  ${selectedLoan.monthlyIncome}/mo ({selectedLoan.incomeSource})
                </p>
              </div>
              <div className="col-span-2">
                <p className="opacity-60">Address</p>
                <p>{selectedLoan.address}</p>
              </div>
              <div className="col-span-2">
                <p className="opacity-60">Applied Date</p>
                <p>{format(new Date(selectedLoan.appliedAt), "PPPpp")}</p>
              </div>
            </div>

            {/* Admin Action Area */}
            <div className="mt-8 pt-6 border-t">
              {selectedLoan.status === "pending" ? (
                <div className="space-y-4">
                  <div>
                    <label className="label text-sm font-bold">
                      Admin Remarks / Reason
                    </label>
                    <textarea
                      value={reasonInput}
                      onChange={(e) => setReasonInput(e.target.value)}
                      className="textarea textarea-bordered w-full h-20 bg-base-200"
                      placeholder="Enter reason for approval or rejection..."
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      disabled={updateStatusMutation.isPending}
                      onClick={() => handleStatusChange("approved")}
                      className="btn btn-success flex-1"
                    >
                      Approve
                    </button>
                    <button
                      disabled={updateStatusMutation.isPending}
                      onClick={() => handleStatusChange("rejected")}
                      className="btn btn-error flex-1"
                    >
                      Reject
                    </button>
                    <button
                      disabled={updateStatusMutation.isPending}
                      onClick={() => handleStatusChange("suspended")}
                      className="btn btn-warning flex-1"
                    >
                      Suspend
                    </button>
                  </div>
                </div>
              ) : (
                <div className="btn btn-gradient">
                  <span>
                    This application is already{" "}
                    <strong>{selectedLoan.status}</strong>.
                  </span>
                </div>
              )}
            </div>

            <div className="modal-action">
              <button
                onClick={() => {
                  setSelectedLoan(null);
                  setReasonInput("");
                }}
                className="btn btn-ghost"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanApplications;
