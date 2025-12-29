import useRole from "../../hooks/useRole";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import AdminHome from "./AdminHome";
import BorrowerHome from "./BorrowHome";
import ManagerHome from "./ManagerHome";

const DashboardHome = () => {
  const { role, isLoading } = useRole();

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  if (role === "admin") return <AdminHome />;
  if (role === "manager") return <ManagerHome />;

  return <BorrowerHome />;
};

export default DashboardHome;
