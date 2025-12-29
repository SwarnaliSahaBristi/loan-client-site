import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["loanApplications"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin/loan-applications");
      return data;
    },
  });

  // --- Data Transformation for Charts ---
  
  // 1. Bar Chart Data (Loan Amount by User)
  // 1. Bar Chart Data (Top 5 Loan Amounts) - Safely handled
const barData = loans?.slice(0, 5).map(loan => ({
  // Use optional chaining (?.) and a fallback name like "Guest"
  name: loan?.userName ? loan.userName.split(" ")[0] : "User",
  amount: loan?.loanAmount || 0
}));

  // 2. Pie Chart Data (Status Distribution)
  const statusCounts = loans.reduce((acc, loan) => {
    acc[loan.status] = (acc[loan.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(statusCounts).map(key => ({
    name: key.toUpperCase(),
    value: statusCounts[key]
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  if (isLoading) return <span className="loading loading-spinner loading-lg"></span>;

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Banner */}
      <div className="bg-[#1a2233] text-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold">Admin Insights</h1>
        <p className="mt-2 text-gray-400">Visual breakdown of LoanLink's current performance.</p>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Bar Chart: Recent Loan Requests */}
        <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Recent Loan Amounts ($)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Application Status */}
        <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Application Status Ratio</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Quick Links Section (The cards you built before) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Link to="/dashboard/loan-applications" className="btn btn-outline border-base-300 lowercase">
           View Detailed Reports →
         </Link>
      </div>
    </div>
  );
};

export default AdminHome;