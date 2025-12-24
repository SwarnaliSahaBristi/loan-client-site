import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verified, setVerified] = useState(false);

  const sessionId = searchParams.get("session_id");
  const loanId = searchParams.get("loanId");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId || !loanId) {
        toast.error("Invalid payment session");
        navigate("/dashboard/my-loans");
        return;
      }

      try {
        const res = await axiosSecure.post("/loan-applications/verify-payment", {
          sessionId,
          loanId
        });

        if (res.data.success) {
          setVerified(true);
          toast.success("Payment verified successfully!");
        }
      } catch (err) {
        toast.error("Payment verification failed");
        navigate("/dashboard/my-loans");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId, loanId, axiosSecure, navigate]);

  if (isVerifying) {
    return <LoadingSpinner />;
  }

  if (verified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <FaCheckCircle className="text-6xl text-success mb-4" />
            <h2 className="card-title text-2xl mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">
              Your application fee has been paid successfully. Your loan
              application is now being processed.
            </p>
            <div className="card-actions">
              <button
                onClick={() => navigate("/dashboard/my-loans")}
                className="btn btn-primary"
              >
                View My Loans
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentSuccess;