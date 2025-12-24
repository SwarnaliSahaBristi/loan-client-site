import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../components/Usetitle/useTitle";

const LoanApplications = () => {
    useTitle('Loan Applications')
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [reasonInput, setReasonInput] = useState("");
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const fetchLoanApplications = async () => {
    const { data } = await axiosSecure.get("/loan-applications", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data;
  };

  const {
    data: loans = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["loanApplications"],
    queryFn: fetchLoanApplications,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status, reason }) =>
      axiosSecure.patch(
        `/loan-applications/${id}/status`,
        { status, reason },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["loanApplications"]);
      setSelectedLoan(null);
      setReasonInput("");
    },
  });

  const filteredLoans =
    statusFilter === "all"
      ? loans
      : loans.filter((loan) => loan.status.toLowerCase() === statusFilter);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading loans</div>;

  const handleStatusChange = (status) => {
    updateStatusMutation.mutate({
      id: selectedLoan._id,
      status,
      reason: reasonInput,
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Loan Applications</h2>

      {/* Filter */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="suspended">Suspended</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-base-100">
            <th className="border px-4 py-2">Loan ID</th>
            <th className="border px-4 py-2">User</th>
            <th className="border px-4 py-2">Loan Title</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLoans.map((loan) => (
            <tr key={loan._id}>
              <td className="border px-4 py-2">{loan._id}</td>
              <td className="border px-4 py-2">
                {loan.userName} <br />
                <span className="text-sm text-gray-500">{loan.userEmail}</span>
              </td>
              <td className="border px-4 py-2">{loan.loanTitle}</td>
              <td className="border px-4 py-2">${loan.loanAmount}</td>
              <td className="border px-4 py-2 capitalize">{loan.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => setSelectedLoan(loan)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              Loan Application Details
            </h3>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {selectedLoan.userName}
              </p>
              <p>
                <strong>Email:</strong> {selectedLoan.userEmail}
              </p>
              <p>
                <strong>Loan Title:</strong> {selectedLoan.loanTitle}
              </p>
              <p>
                <strong>Amount:</strong> ${selectedLoan.loanAmount}
              </p>
              <p>
                <strong>Status:</strong> {selectedLoan.status}
              </p>
              <p>
                <strong>Applied At:</strong>{" "}
                {format(new Date(selectedLoan.appliedAt), "PPPpp")}
              </p>
              <p>
                <strong>Contact Number:</strong> {selectedLoan.contactNumber}
              </p>
              <p>
                <strong>National ID:</strong> {selectedLoan.nationalId}
              </p>
              <p>
                <strong>Income Source:</strong> {selectedLoan.incomeSource}
              </p>
              <p>
                <strong>Monthly Income:</strong> ${selectedLoan.monthlyIncome}
              </p>
              <p>
                <strong>Reason:</strong> {selectedLoan.reason}
              </p>
              <p>
                <strong>Address:</strong> {selectedLoan.address}
              </p>
              <p>
                <strong>Notes:</strong> {selectedLoan.notes || "N/A"}
              </p>
              {selectedLoan.paymentInfo && (
                <>
                  <p>
                    <strong>Payment Status:</strong>{" "}
                    {selectedLoan.applicationFeeStatus}
                  </p>
                  <p>
                    <strong>Transaction ID:</strong>{" "}
                    {selectedLoan.paymentInfo?.transactionId || "N/A"}
                  </p>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 space-y-2">
              {selectedLoan.status === "pending" && (
                <>
                  <div>
                    <label className="block font-medium mb-1">
                      Reason (if Reject/Suspend)
                    </label>
                    <input
                      type="text"
                      value={reasonInput}
                      onChange={(e) => setReasonInput(e.target.value)}
                      className="border px-2 py-1 w-full rounded"
                      placeholder="Optional reason"
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleStatusChange("approved")}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange("rejected")}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleStatusChange("suspended")}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Suspend
                    </button>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => {
                setSelectedLoan(null);
                setReasonInput("");
              }}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanApplications;
