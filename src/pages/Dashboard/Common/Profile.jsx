import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useTitle from "../../../components/Usetitle/useTitle";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import { FaMoon, FaSun } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Profile = () => {
  useTitle("My Profile");

  const { user, setUser, logOut } = useAuth();
  const { role, isRoleLoading } = useRole();
  const axiosSecure = useAxiosSecure();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  // Apply theme
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  const handleUpdateProfile = async () => {
    const updatedData = {
      name: "New Name",
      photo: "New Photo URL",
    };

    try {
      await axiosSecure.patch("/users/profile", updatedData);

      toast.success("Profile updated!");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successfully!");
        setUser(null);
      })
      .catch((e) => toast.error(e.message));
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-base-200">
      <div className="w-full max-w-3xl bg-base-100 shadow-xl rounded-3xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Profile</h2>

          {/* 🌙 Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="btn btn-sm btn-outline"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col items-center text-center">
          <img
            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-primary object-cover"
          />

          <h3 className="mt-4 text-xl font-semibold">
            {user?.displayName || "User"}
          </h3>

          <p className="text-sm text-gray-500">{user?.email}</p>

          <span className="mt-2 px-4 py-1 text-xs bg-primary text-white rounded-full">
            {role}
          </span>
        </div>

        {/* Divider */}
        <div className="divider my-6"></div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="bg-base-200 p-4 rounded-xl">
            <p className="text-gray-500">User ID</p>
            <p className="font-semibold break-all">{user?.uid}</p>
          </div>

          <div className="bg-base-200 p-4 rounded-xl">
            <p className="text-gray-500">Account Type</p>
            <p className="font-semibold capitalize">{role}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button className="btn btn-gradient">Update Profile</button>

          <button className="btn btn-outline">Change Password</button>

          <button onClick={handleLogOut} className="btn btn-error text-white">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
