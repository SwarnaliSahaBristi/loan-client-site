import { FaUserCog } from "react-icons/fa";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { AiFillMoneyCollect } from "react-icons/ai";


import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      {" "}
      <MenuItem
        icon={RiMoneyDollarBoxFill}
        label="All Loans"
        address="all-loans"
      />
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
      <MenuItem icon={FaUserCog} label="User Management" address="user-management" />
      <MenuItem icon={AiFillMoneyCollect} label="Loan Applications" address="loan-applications" />
    </>
  );
};

export default AdminMenu;
