import { Link } from "react-router";
// import logo from "../../../assets/images/logo.png";
import { BsGraphUp } from "react-icons/bs";
import { FcSettings } from "react-icons/fc";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import ManagerMenu from "./Menu/ManagerMenu";
import BorrowerMenu from "./Menu/BorrowerMenu";

const Sidebar = ({ isSidebarOpen }) => {
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) return <LoadingSpinner />;

  return (
    <>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-base-100 w-64 space-y-6 px-2 py-4 absolute 
        inset-y-0 top-16 left-0 transform transition-transform duration-200 ease-in-out 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Menu */}
          <div className="flex flex-col justify-between flex-1 mt-12">
            <nav>
              {role === "borrower" && <BorrowerMenu />}
              {role === "manager" && <ManagerMenu />}
              {role === "admin" && <AdminMenu />}
            </nav>
          </div>

          {/* Bottom Section */}
          <div>
            <hr />
            <MenuItem
              icon={FcSettings}
              label="Profile"
              address="/dashboard/profile"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
