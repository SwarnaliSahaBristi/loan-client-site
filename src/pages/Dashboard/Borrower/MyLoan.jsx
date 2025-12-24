import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useTitle from "../../../components/Usetitle/useTitle";

const MyLoan = () => {
  useTitle('My Loan');
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isPaying, setIsPaying] = useState(false);

  const { data: loans = [], isLoading, refetch } = useQuery({
    queryKey: ["myLoans", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-loans?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner />;

  // Open Stripe Checkout in popup
  const handlePay = async (loan) => {
    setIsPaying(true);
    try {
      const { data } = await axiosSecure.post("/create-checkout-session", {
        loanId: loan._id,
        email: user.email,
      });

      // Open checkout in popup
      const stripeWindow = window.open(
        data.url,
        "Stripe Payment",
        "width=500,height=700"
      );

      const checkPaymentInterval = setInterval(async () => {
        if (stripeWindow.closed) {
          clearInterval(checkPaymentInterval);

          // Verify payment
          try {
            await axiosSecure.post(`/loan-applications/verify-payment`, {
              loanId: loan._id,
              sessionId: new URL(data.url).searchParams.get("session_id"),
              email: user.email,
            });

            Swal.fire("Payment Successful!", "", "success");
            refetch();
          } catch (err) {
            console.error(err);
            Swal.fire("Payment verification failed", "", "error");
          }
        }
      }, 1000);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Unable to start payment", "error");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Loans</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Loan Info</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Fee</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td>{loan._id.slice(-6)}</td>
                <td>{loan.loanTitle}</td>
                <td>${loan.loanAmount}</td>
                <td>
                  <span
                    className={`badge badge-${
                      loan.status === "pending" ? "warning" : "success"
                    }`}
                  >
                    {loan.status}
                  </span>
                </td>
                <td>
                  {loan.applicationFeeStatus === "paid" ? (
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() =>
                        Swal.fire({
                          title: "Payment Details",
                          html: `
                            <p>Email: ${loan.paymentInfo?.email}</p>
                            <p>Txn ID: ${loan.paymentInfo?.transactionId}</p>
                            <p>Loan ID: ${loan._id}</p>
                          `,
                        })
                      }
                    >
                      Paid
                    </button>
                  ) : (
                    <button
                      className="btn btn-xs btn-primary"
                      onClick={() => handlePay(loan)}
                      disabled={isPaying}
                    >
                      {isPaying ? "Processing..." : "Pay"}
                    </button>
                  )}
                </td>

                <td className="flex gap-2">
                  <button
                    className="btn btn-xs"
                    onClick={() => {
                      Swal.fire({
                        title: "Loan Details",
                        html: `
                          <p><strong>Borrower:</strong> ${loan.firstName} ${loan.lastName}</p>
                          <p><strong>Email:</strong> ${loan.userEmail}</p>
                          <p><strong>Loan Title:</strong> ${loan.loanTitle}</p>
                          <p><strong>Amount:</strong> ${loan.loanAmount}</p>
                          <p><strong>Status:</strong> ${loan.status}</p>
                          <p><strong>Applied At:</strong> ${new Date(
                            loan.appliedAt
                          ).toLocaleString()}</p>
                          <p><strong>Approved At:</strong> ${loan.approvedAt ? new Date(
                            loan.approvedAt
                          ).toLocaleString() : "N/A"}</p>
                          <p><strong>Contact:</strong> ${loan.contactNumber || "-"}</p>
                          <p><strong>Income Source:</strong> ${loan.incomeSource || "-"}</p>
                          <p><strong>Monthly Income:</strong> ${loan.monthlyIncome || "-"}</p>
                          <p><strong>Address:</strong> ${loan.address || "-"}</p>
                          <p><strong>Reason:</strong> ${loan.reason || "-"}</p>
                          <p><strong>Notes:</strong> ${loan.notes || "-"}</p>
                        `,
                        width: "600px",
                      });
                    }}
                  >
                    View
                  </button>

                  {loan.status === "pending" && (
                    <button
                      onClick={async () => {
                        const result = await Swal.fire({
                          title: "Cancel this loan?",
                          text: "This action cannot be undone",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Yes, cancel",
                        });

                        if (result.isConfirmed) {
                          await axiosSecure.patch(
                            `/loan-applications/cancel/${loan._id}`
                          );
                          refetch();
                          Swal.fire("Cancelled!", "", "success");
                        }
                      }}
                      className="btn btn-xs btn-error"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyLoan;
