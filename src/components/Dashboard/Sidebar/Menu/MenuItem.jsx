/* eslint-disable no-unused-vars */
import { NavLink } from "react-router";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `
        flex items-center px-4 py-2 my-2 rounded-lg
        transition-colors duration-300
        hover:bg-base-200 hover:text-base-content
        ${
          isActive
            ? "bg-base-300 text-base-content font-semibold"
            : "text-base-content/70"
        }
        `
      }
    >
      <Icon className="w-5 h-5" />
      <span className="mx-4">{label}</span>
    </NavLink>
  );
};

export default MenuItem;
