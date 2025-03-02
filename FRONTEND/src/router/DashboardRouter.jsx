import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayouts from "../layouts/DashboardLayouts";
import SignIn from "../Pages/dashboard/SignIn";
import NotFound from "../Components/dashboard/NotFound";
import DashboardHome from "../Components/dashboard/DashboardHome";
import AdminContextProvider, { useAdminAuth } from "../Contexts/ADMIN/AdminAuthContext";
import MessageProvider from "../Contexts/MessageContext";
import DashboardSkeleton from "../Components/dashboard/comman/DashboardSkeleton";
import AdminProfile from "../Pages/dashboard/profileComponnet/AdminProfile";
import ApprovalDataTable from "../Pages/dashboard/propertyApproval/ApprovalDataTable";
import AllProperty from "../Pages/dashboard/AllProperty/AllProperty";

const DashboardRouter = () => {
  return (
    <MessageProvider>
      <AdminContextProvider>
        <DashboardLayouts>
          <Routes>
            {/* Public Route for Sign-in */}
            <Route path="/sign-in" element={<SignIn />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <DashboardHome />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <AdminProfile />
                </PrivateRoute>
              }
            />

            <Route
              path="/approvals"
              element={
                <PrivateRoute>
                  <ApprovalDataTable />
                </PrivateRoute>
              }
            />
            <Route
              path="/all-property"
              element={
                <PrivateRoute>
                  <AllProperty />
                </PrivateRoute>
              }
            />
            <Route
              path="/user"
              element={
                <PrivateRoute>
                  {/* <TotalUser /> */}
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayouts>
      </AdminContextProvider>
    </MessageProvider>
  );
};

export default DashboardRouter;

// PrivateRoute Component
const PrivateRoute = ({ children }) => {
  const { isAdminAuthenticated, isLoading } = useAdminAuth();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!isAdminAuthenticated) {
    return <Navigate to="/dashboard/sign-in" replace />;
  }

  return children;
};