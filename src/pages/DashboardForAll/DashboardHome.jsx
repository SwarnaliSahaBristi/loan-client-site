// import ManagerHome from "./ManagerHome";
// import BorrowerHome from "./BorrowerHome";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import AdminHome from "./AdminHome";

const DashboardHome = () => {
  const {role, isLoading} = useRole();

  if (isLoading) return <LoadingSpinner></LoadingSpinner>

  if (role === 'admin') return <AdminHome />;
//   if (role === 'manager') return <ManagerHome />;
  
//   return <BorrowerHome />;
};

export default DashboardHome;