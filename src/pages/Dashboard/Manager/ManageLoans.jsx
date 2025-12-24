import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useTitle from "../../../components/Usetitle/useTitle";
import useAuth from "../../../hooks/useAuth";

const ManageLoans = () => {
  useTitle("Manage Loans");
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [search, setSearch] = useState("");

  const { data: allLoans = [], isLoading } = useQuery({
    queryKey: ["managerLoans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loans");
      return res.data.loans || [];
    }
  });

  // Filter loans created by this manager
  const loans = allLoans.filter(loan => loan.createdBy === user?.email);

  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/loans/${id}`),
    onSuccess: () => {
      toast.success("Loan deleted successfully");
      queryClient.invalidateQueries(["managerLoans"]);
    },
    onError: () => toast.error("Failed to delete loan")
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this loan?")) {
      deleteMutation.mutate(id);
    }
  };

  // Filter by search
  const filteredLoans = loans.filter(
    (loan) =>
      loan.loanTitle.toLowerCase().includes(search.toLowerCase()) ||
      loan.category.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage My Loans</h1>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title or category..."
          className="input input-bordered w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredLoans.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-500">No loans found</p>
          <p className="text-gray-400 mt-2">
            {search ? "Try a different search term" : "Add your first loan to get started!"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Interest Rate</th>
                <th>Category</th>
                <th>Max Limit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan) => (
                <tr key={loan._id}>
                  <td>
                    <img
                      src={loan.loanImage}
                      alt={loan.loanTitle}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="font-semibold">{loan.loanTitle}</td>
                  <td>{loan.interestRate}%</td>
                  <td>
                    <span className="badge badge-primary">{loan.category}</span>
                  </td>
                  <td>${loan.maxLimit}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/dashboard/edit-loans/${loan._id}`)}
                        className="btn btn-sm btn-info"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(loan._id)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageLoans;