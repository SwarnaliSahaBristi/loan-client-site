import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get("/admin/users", {
          params: { search, role, status },
        });
        if (isMounted) setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, [search, role, status,axiosSecure]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search email..."
          className="input input-bordered"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="borrower">Borrower</option>
          <option value="manager">Manager</option>
        </select>

        <select
          className="select select-bordered"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="approved">Approved</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td className="capitalize">{u.role}</td>
                <td>{u.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
