import React from "react";
import { Link } from "react-router";
import {   
  FaHourglassHalf, 
  FaCheckDouble, 
  FaUserCircle, 
  FaFileInvoiceDollar, 
  FaUserCog
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { AiFillMoneyCollect } from "react-icons/ai";

const AdminHome = () => {
  const { user } = useAuth();

  const adminActions = [
    {
      title: "All Loans",
      desc: "Get all loan strategies with custom EMI plans and interest rates.",
      icon: <RiMoneyDollarBoxFill />,
      path: "/dashboard/all-loans",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Manage Users",
      desc: "Update existing users, change roles, or remove them.",
      icon: <FaUserCog />,
      path: "/dashboard/manage-users",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "User Management",
      desc: "Manage all users and monitor all of them.",
      icon: <FaHourglassHalf />,
      path: "/dashboard/user-management",
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Loan Applications",
      desc: "View history of all sanctioned loans and disbursement details.",
      icon: <AiFillMoneyCollect />,
      path: "/dashboard/loan-applications",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "My Profile",
      desc: "Update your account information and security settings.",
      icon: <FaUserCircle />,
      path: "/dashboard/profile",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      <div className="bg-[#1a2233] text-white p-8 rounded-2xl shadow-xl border border-white/5 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold p-4">Welcome Back, {user?.displayName || "Admin"}!</h1>
        </div>
        {/* Decorative background circle */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminActions.map((action, index) => (
          <Link
            key={index}
            to={action.path}
            className="group bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start"
          >
            {/* Icon Container */}
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform group-hover:scale-110 ${action.color}`}>
              {action.icon}
            </div>
            
            {/* Text Area */}
            <h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors">
              {action.title}
            </h3>
            <p className="mt-2 text-sm text-base-content/60 leading-relaxed">
              {action.desc}
            </p>
            
            {/* Hover arrow indicator */}
            <div className="mt-4 flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              GO TO PAGE <span className="ml-1">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;