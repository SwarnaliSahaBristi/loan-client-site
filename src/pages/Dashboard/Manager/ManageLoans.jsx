import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useTitle from "../../../components/Usetitle/useTitle";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const ManageLoans = () => {
  useTitle("Manage Loans");
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  // React Hook Form for the Modal
  const { register, handleSubmit, reset } = useForm();

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["managerLoans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loans");
      return Array.isArray(res.data) ? res.data : res.data.loans || [];
    },
  });

  const managerCreatedLoans = loans.filter(
    (loan) => loan.createdBy === user?.email
  );

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/loans/${id}`),
    onSuccess: () => {
      toast.success("Loan deleted successfully");
      queryClient.invalidateQueries(["managerLoans"]);
    },
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const { _id, ...data } = updatedData;
      return await axiosSecure.patch(`/loans/${_id}`, data);
    },
    onSuccess: () => {
      toast.success("Loan updated successfully");
      setIsUpdateModalOpen(false);
      queryClient.invalidateQueries(["managerLoans"]);
    },
  });

  const openUpdateModal = (loan) => {
    setSelectedLoan(loan);
    reset(loan);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSubmit = (data) => {
    updateMutation.mutate({ ...data, _id: selectedLoan._id });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const filteredLoans = managerCreatedLoans.filter(
    (loan) =>
      loan?.loanTitle?.toLowerCase().includes(search.toLowerCase()) ||
      loan?.category?.toLowerCase().includes(search.toLowerCase())
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
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="font-semibold">{loan.loanTitle}</td>
                <td>{loan.interestRate}%</td>
                <td>
                  <span className="badge badge-primary">{loan.category}</span>
                </td>
                <td>{loan.maxLimit}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openUpdateModal(loan)}
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

      {/* --- UPDATE MODAL --- */}
      <div className={`modal ${isUpdateModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Update Loan Details</h3>
          <form
            onSubmit={handleSubmit(handleUpdateSubmit)}
            className="space-y-4"
          >
            <div className="form-control">
              <label className="label">Loan Title</label>
              <input
                {...register("loanTitle")}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">Interest Rate (%)</label>
              <input
                {...register("interestRate")}
                type="number"
                step="0.01"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">Max Limit</label>
              <input
                {...register("maxLimit")}
                className="input input-bordered"
              />
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => setIsUpdateModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={updateMutation.isLoading}
              >
                {updateMutation.isLoading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageLoans;
