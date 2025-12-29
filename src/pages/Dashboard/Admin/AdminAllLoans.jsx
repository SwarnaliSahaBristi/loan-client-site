import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useTitle from "../../../components/Usetitle/useTitle";
import Swal from "sweetalert2"; // Import SweetAlert2

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
      const res = await axiosSecure.get("/admin/loans");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/admin/loans/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "The loan has been removed.", "success");
      refetch();
    },
    onError: (err) => toast.error(err.message),
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, showOnHome }) =>
      await axiosSecure.patch(`/admin/loans/${id}/show-on-home`, {
        showOnHome,
      }),
    onSuccess: () => refetch(),
    onError: (err) => toast.error(err.message),
  });

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

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">All Loans</h1>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>Image</th>
              <th>Title</th>
              <th>Interest</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Show on Home</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id} className="hover">
                <td>
                  <img
                    src={loan.loanImage}
                    alt={loan.loanTitle}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td className="font-semibold">{loan.loanTitle}</td>
                <td>{loan.interestRate}%</td>
                <td>
                  <span className="badge badge-ghost">{loan.category}</span>
                </td>
                <td className="text-sm">{loan.createdBy}</td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={loan.showOnHome}
                    onChange={() =>
                      toggleMutation.mutate({
                        id: loan._id,
                        showOnHome: !loan.showOnHome,
                      })
                    }
                  />
                </td>
                <td className="flex gap-2 justify-center">
                  <Link
                    to={`/dashboard/edit-loans/${loan._id}`}
                    className="btn btn-gradient"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(loan._id)}
                    className="btn outline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllLoans;
