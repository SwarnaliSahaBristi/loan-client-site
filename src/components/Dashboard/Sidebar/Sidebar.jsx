import { Link } from "react-router";
import logo from "../../../assets/images/logo.png";
import { BsGraphUp } from "react-icons/bs";
import { FcSettings } from "react-icons/fc";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import ManagerMenu from "./Menu/ManagerMenu";
import BorrowerMenu from "./Menu/BorrowerMenu";

const Sidebar = ({ isOpen }) => {
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) return <LoadingSpinner />;

  return (
    <>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-base-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg mx-auto">
            <Link to="/" className="flex gap-3 justify-center items-center">
              <img src={logo} alt="logo" width="50" height="50" />
              <span className="font-bold text-2xl text-pink-600">LoanLink</span>
            </Link>
          </div>

          {/* Menu */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              <MenuItem icon={BsGraphUp} label="Statistics" address="/dashboard" />
              {role === "borrower" && <BorrowerMenu />}
              {role === "manager" && <ManagerMenu />}
              {role === "admin" && <AdminMenu />}
            </nav>
          </div>

          {/* Bottom Section */}
          <div>
            <hr />
            <MenuItem icon={FcSettings} label="Profile" address="/dashboard/profile" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
