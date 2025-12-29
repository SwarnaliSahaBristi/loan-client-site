import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useTitle from "../../../components/Usetitle/useTitle";

const ManageUsers = () => {
  useTitle("Manage Users");
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [suspendReason, setSuspendReason] = useState("");
  const [suspendFeedback, setSuspendFeedback] = useState("");
  const [showSuspendModal, setShowSuspendModal] = useState(false);

  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["users", page, search, roleFilter, statusFilter],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users", {
        params: { search, role: roleFilter, status: statusFilter, page, limit },
      });
      return res.data;
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }) =>
      await axiosSecure.patch(`/admin/users/${id}/role`, { role }),
    onSuccess: () => {
      toast.success("Role updated successfully");
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => toast.error("Failed to update role"),
  });

  const approveMutation = useMutation({
    mutationFn: async (id) =>
      await axiosSecure.patch(`/admin/users/${id}/approve`),
    onSuccess: () => {
      toast.success("User approved successfully");
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => toast.error("Failed to approve user"),
  });

  const suspendMutation = useMutation({
    mutationFn: async ({ id, reason, feedback }) => {
      if (!id) throw new Error("User ID is missing");

      const { data } = await axiosSecure.patch(`/admin/users/${id}/suspend`, {
        reason,
        feedback,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("User suspended successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setShowSuspendModal(false);
      setSuspendReason("");
      setSuspendFeedback("");
      setSelectedUser(null);
    },
    onError: (error) => {
      const msg = error.response?.data?.message || "Failed to suspend user";
      toast.error(msg);
    },
  });

  const handleSuspend = (user) => {
    setSelectedUser(user);
    setShowSuspendModal(true);
  };

  const confirmSuspend = () => {
    if (!suspendReason.trim()) {
      toast.error("Please provide a reason for suspension");
      return;
    }
    suspendMutation.mutate({
      id: selectedUser._id,
      reason: suspendReason,
      feedback: suspendFeedback,
    });
  };

  if (isLoading) return <LoadingSpinner />;

  const { users = [], total = 0 } = data;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="input input-bordered flex-1 min-w-[200px]"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="select select-bordered"
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Roles</option>
          <option value="borrower">Borrower</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <select
          className="select select-bordered"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Status</option>
          <option value="approved">Approved</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={user.image || "https://via.placeholder.com/40"}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <span>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <select
                    className="select select-sm select-bordered"
                    value={user.role}
                    onChange={(e) =>
                      updateRoleMutation.mutate({
                        id: user._id,
                        role: e.target.value,
                      })
                    }
                  >
                    <option value="borrower">Borrower</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <span
                    className={`badge ${
                      user.status === "approved"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="flex gap-2">
                  {user.status === "suspended" ? (
                    <button
                      onClick={() => approveMutation.mutate(user._id)}
                      className="btn btn-sm btn-success"
                    >
                      Approve
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSuspend(user)}
                      className="btn btn-sm btn-error"
                    >
                      Suspend
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          className="btn btn-sm"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="flex items-center px-4">
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-sm"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      {/* Suspend Modal */}
      {showSuspendModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Suspend User</h3>
            <p className="mb-4">
              You are about to suspend <strong>{selectedUser?.name}</strong>
            </p>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Reason for Suspension *</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Policy violation"
                className="input input-bordered"
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Feedback</span>
              </label>
              <textarea
                placeholder="Additional details about the suspension..."
                className="textarea textarea-bordered h-24"
                value={suspendFeedback}
                onChange={(e) => setSuspendFeedback(e.target.value)}
              />
            </div>

            <div className="modal-action">
              <button
                onClick={() => {
                  setShowSuspendModal(false);
                  setSuspendReason("");
                  setSuspendFeedback("");
                  setSelectedUser(null);
                }}
                className="btn"
              >
                Cancel
              </button>
              <button
                onClick={confirmSuspend}
                className="btn btn-error"
                disabled={!suspendReason.trim()}
              >
                Confirm Suspend
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
