import { useState } from "react";
import useTitle from "../components/Usetitle/useTitle";
import Navbar from "../components/Shared/Navbar/Navbar";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  useTitle("Dashboard");
  const [isSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Navbar at the top (Fixed) */}
      <div className="fixed top-0 left-0 right-0 z-20">
        <Navbar />
      </div>

      <div className="flex flex-1 pt-16">
        {" "}
        <Sidebar isOpen={isSidebarOpen} />
        {/* 3. Main Content Area */}
        <main
          className={`flex-1 transition-all duration-300 bg-base-100 ${
            isSidebarOpen ? "md:ml-64" : "md:ml-0"
          }`}
        >
          <div className="p-5 min-h-screen">
            <Outlet />
          </div>
          <footer className="footer footer-center p-4 bg-base-200 text-base-content border-t">
            <aside>
              <p>Copyright © 2025 - LoanLink Financial Services</p>
            </aside>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
