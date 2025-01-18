import React, { lazy, Suspense } from "react";
const DashboardHome = lazy(() => import("../Components/dashboard/DashboardHome"));
// import DashboardHome from "";
// import TotalUser from "../Components/dashboard/TotalUser"; // Ensure this component is correctly imported
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayouts from "../layouts/DashboardLayouts";
import SignIn from "../Pages/dashboard/SignIn";
import NotFound from "../Components/dashboard/NotFound";
import AdminContextProvider, { useAdminAuth } from "../Contexts/ADMIN/AdminAuthContext";
import MessageProvider from "../Contexts/MessageContext";

// PrivateRoute Component
const PrivateRoute = ({ children }) => {
  const { isAdminAuthenticated } = useAdminAuth();

  if (!isAdminAuthenticated) {
    return <Navigate to="/dashboard/sign-in" replace />;
  }

  return children;
};

const DashboardRouter = () => {
  return (
    <MessageProvider>
      <AdminContextProvider>
        <DashboardLayouts>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route
              path="/"
              element={
                <Suspense fallback={<h1>Dashboard is loading...</h1>}>
                  <PrivateRoute>
                    <DashboardHome />
                  </PrivateRoute>
                </Suspense>
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
