import React from "react";
import { Link } from "react-router";
import { 
  FaMoneyCheckAlt, 
  FaHistory, 
  FaHandHoldingUsd, 
  FaUserEdit, 
  FaFileInvoice 
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const BorrowerHome = () => {
  const { user } = useAuth();

  const borrowerActions = [
    {
      title: "Apply for Loan",
      desc: "Need financial support? Browse our loan packages and apply today.",
      icon: <FaHandHoldingUsd />,
      path: "/loan-form",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "My Loans",
      desc: "Track the status of your current applications and active loans.",
      icon: <FaMoneyCheckAlt />,
      path: "/dashboard/my-loans",
      color: "bg-blue-100 text-blue-600",
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-[#1a2233] text-white p-8 rounded-2xl shadow-xl border border-white/5 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold p-4">Hello, {user?.displayName || "Borrower"}!</h1>
          <div className="mt-4">
          </div>
        </div>
        {/* Decorative background shape */}
        <div className="absolute -right-5 -bottom-5 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid of Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {borrowerActions.map((action, index) => (
          <Link
            key={index}
            to={action.path}
            className="group bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform group-hover:scale-110 ${action.color}`}>
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

export default BorrowerHome;