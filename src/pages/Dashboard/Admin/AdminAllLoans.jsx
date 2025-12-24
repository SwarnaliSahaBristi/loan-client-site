// import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useTitle from "../../../components/Usetitle/useTitle";

const AdminAllLoans = () => {
  useTitle("All Loans");
  const axiosSecure = useAxiosSecure();

  const {
    data: loans = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loans");
      return res.data;
    },
  });

  // Delete loan mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/loans/${id}`),
    onSuccess: () => {
      toast.success("Loan deleted successfully");
      refetch();
    },
    onError: (err) => toast.error(err.message),
  });

  // Toggle show on home
  const toggleMutation = useMutation({
    mutationFn: async ({ id, showOnHome }) =>
      await axiosSecure.patch(`/loans/${id}/show-on-home`, { showOnHome }),
    onSuccess: () => refetch(),
    onError: (err) => toast.error(err.message),
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">All Loans</h1>

      <table className="table-auto w-full border-collapse border border-base-300">
        <thead>
          <tr className="bg-base-100">
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Interest</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Created By</th>
            <th className="border px-4 py-2">Show on Home</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan._id} className="hover:bg-base-50">
              <td className="border px-4 py-2">
                <img
                  src={loan.loanImage}
                  alt={loan.loanTitle}
                  className="h-12 w-12 object-cover rounded"
                />
              </td>
              <td className="border px-4 py-2">{loan.loanTitle}</td>
              <td className="border px-4 py-2">{loan.interestRate}%</td>
              <td className="border px-4 py-2">{loan.category}</td>
              <td className="border px-4 py-2">{loan.createdBy}</td>
              <td className="border px-4 py-2 text-center">
                <input
                  type="checkbox"
                  checked={loan.showOnHome}
                  onChange={() =>
                    toggleMutation.mutate({
                      id: loan._id,
                      showOnHome: !loan.showOnHome,
                    })
                  }
                />
              </td>
              <td className="border px-4 py-2 flex gap-2 justify-center">
                <Link
                  to={`/dashboard/edit-loans/${loan._id}`}
                  className="btn btn-sm btn-outline"
                >
                  Update
                </Link>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this loan?"
                      )
                    ) {
                      deleteMutation.mutate(loan._id);
                    }
                  }}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAllLoans;
