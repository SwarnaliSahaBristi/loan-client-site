import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import MainLayout from "../layouts/MainLayout";
import { createBrowserRouter } from "react-router";
import LoanForm from "../pages/LoanForm/LoanForm";
import AllLoans from "../pages/AllLoans/AllLoans";
import ViewDetails from "../pages/AllLoans/ViewDetails";
import MyLoan from "../pages/Dashboard/Borrower/MyLoan";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import AddLoan from "../pages/Dashboard/Manager/AddLoan";
import AdminAllLoans from "../pages/Dashboard/Admin/AdminAllLoans";
import EditLoan from "../pages/Dashboard/Admin/EditLoan";
import LoanApplications from "../pages/Dashboard/Admin/LoanApplications";
import ManageLoans from "../pages/Dashboard/Manager/ManageLoans";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";
import ApprovedLoans from "../pages/Dashboard/Manager/ApprovedLoans";
import PendingLoans from "../pages/Dashboard/Manager/PendingLoans";
import AboutUs from "../pages/Dashboard/Common/AboutUs";
import Contact from "../pages/Dashboard/Common/Contact";
import UserManagement from "../pages/Dashboard/Admin/UserManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: '/about-us',
        element: <AboutUs />
      },
      {
        path: '/contact',
        element: <Contact></Contact>
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/loan-form/:loanId",
    element: <LoanForm></LoanForm>,
  },
  {
    path: "/all-loans",
    element: <AllLoans></AllLoans>,
  },
  {
    path: "/loans/:loanId",
    element: <ViewDetails></ViewDetails>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-loan",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <AddLoan />
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-loans",
        element: (
          <PrivateRoute>
            <MyLoan />
          </PrivateRoute>
        ),
      },
      {
        path: "all-loans",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminAllLoans />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "loan-applications",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <LoanApplications />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-loans",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <ManageLoans />
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "edit-loans/:id",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <EditLoan></EditLoan>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'user-management',
        element: <PrivateRoute>
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: 'pending-loans',
        element: <PrivateRoute>
          <ManagerRoute>
            <PendingLoans/>
          </ManagerRoute>
        </PrivateRoute>
      },
      {
        path: 'approved-loans',
        element: <PrivateRoute>
          <ManagerRoute>
            <ApprovedLoans/>
          </ManagerRoute>
        </PrivateRoute>
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
    ],
  },
]);
