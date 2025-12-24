import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import useTitle from "../components/Usetitle/useTitle";

const DashboardLayout = () => {
  useTitle('Dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Theme state lifted here
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative min-h-screen md:flex bg-white">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : "md:ml-0"}`}>
        <Navbar 
          toggleSidebar={toggleSidebar} 
          theme={theme} 
          setTheme={setTheme}
        />
        <div className="flex-1 p-5 mt-32 bg-base-100">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
