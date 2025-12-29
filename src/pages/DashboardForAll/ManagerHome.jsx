import React from "react";
import { Link } from "react-router";
import { GrMoney } from "react-icons/gr";
import { FcApproval } from "react-icons/fc";
import { PiApproximateEqualsFill } from "react-icons/pi";
import {
  MdOutlineManageHistory,
} from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { FaUserEdit } from "react-icons/fa";

const ManagerHome = () => {
  const { user } = useAuth();

  const managerActions = [
    {
      title: "Add Loan",
      desc: "Design and launch new loan packages with custom interest rates.",
      icon: <GrMoney />,
      path: "/dashboard/add-loan",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Manage Loans",
      desc: "Edit existing packages, update terms, or deactivate old loans.",
      icon: <MdOutlineManageHistory />,
      path: "/dashboard/manage-loans",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Pending Loans",
      desc: "Review new applications and perform initial document verification.",
      icon: <PiApproximateEqualsFill />,
      path: "/dashboard/pending-loans",
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Approved Loans",
      desc: "View all loans you have sanctioned and monitor disbursement.",
      icon: <FcApproval />,
      path: "/dashboard/approved-loans",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "My Profile",
      desc: "Ensure your personal and financial information is up to date.",
      icon: <FaUserEdit />,
      path: "/dashboard/profile",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 space-y-8">
      {/* Manager Welcome Banner */}
      <div className="bg-[#1a2233] text-white p-8 rounded-2xl shadow-xl border border-white/5 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold p-4">
            Manager Portal: {user?.displayName}
          </h1>
        </div>
        {/* Background Accent */}
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Manager Function Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {managerActions.map((action, index) => (
          <Link
            key={index}
            to={action.path}
            className="group bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform group-hover:rotate-12 ${action.color}`}
            >
              {action.icon}
            </div>
            <h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors">
              {action.title}
            </h3>
            <p className="mt-2 text-sm text-base-content/60 leading-relaxed">
              {action.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ManagerHome;
