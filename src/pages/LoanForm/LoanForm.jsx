import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useTitle from "../../components/Usetitle/useTitle";

const LoanForm = () => {
  useTitle('Loan Application Form')
  const { loanId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Get loan data
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
  if (error || !loan)
    return <p className="text-center mt-10">Loan not found</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const loanApplication = {
      userEmail: user.email,
      loanTitle: loan.loanTitle,
      interestRate: loan.interestRate,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      contactNumber: form.contactNumber.value,
      nationalId: form.nationalId.value,
      incomeSource: form.incomeSource.value,
      monthlyIncome: form.monthlyIncome.value,
      loanAmount: form.loanAmount.value,
      reason: form.reason.value,
      address: form.address.value,
      notes: form.notes.value,
      status: "pending",
      applicationFeeStatus: "unpaid",
      appliedAt: new Date(),
    };

    try {
      await axiosSecure.post("/loan-applications", loanApplication);
      toast.success("Loan application submitted successfully!");
      navigate("/dashboard/my-loans");
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit application");
    }
  };

  return (
    <div className="card bg-base-100 max-w-lg mx-auto shadow-xl rounded-2xl mt-10 p-6">
      <h2 className="text-7xl font-bold text-center mb-6">
        Loan Application Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Auto-filled Fields */}
        <input
          readOnly
          defaultValue={user?.email}
          className="input input-bordered w-full bg-base-200"
        />
        <input
          readOnly
          defaultValue={loan.loanTitle}
          className="input input-bordered w-full bg-base-200"
        />
        <input
          readOnly
          defaultValue={`${loan.interestRate}%`}
          className="input input-bordered w-full bg-base-200"
        />

        {/* User Inputs */}
        <div className="grid grid-cols-2 gap-3">
          <input
            name="firstName"
            required
            placeholder="First Name"
            className="input input-bordered w-full"
          />
          <input
            name="lastName"
            required
            placeholder="Last Name"
            className="input input-bordered w-full"
          />
        </div>

        <input
          name="contactNumber"
          required
          placeholder="Contact Number"
          className="input input-bordered w-full"
        />
        <input
          name="nationalId"
          required
          placeholder="National ID / Passport Number"
          className="input input-bordered w-full"
        />
        <input
          name="incomeSource"
          required
          placeholder="Income Source"
          className="input input-bordered w-full"
        />
        <input
          name="monthlyIncome"
          required
          type="number"
          placeholder="Monthly Income"
          className="input input-bordered w-full"
        />
        <input
          name="loanAmount"
          required
          type="number"
          placeholder="Loan Amount"
          className="input input-bordered w-full"
        />
        <textarea
          name="reason"
          required
          placeholder="Reason for Loan"
          className="textarea textarea-bordered w-full"
        />
        <textarea
          name="address"
          required
          placeholder="Address"
          className="textarea textarea-bordered w-full"
        />
        <textarea
          name="notes"
          placeholder="Extra Notes (Optional)"
          className="textarea textarea-bordered w-full"
        />

        <button type="submit" className="btn btn-gradient w-full">
          Apply for Loan
        </button>
      </form>
    </div>
  );
};

export default LoanForm;
