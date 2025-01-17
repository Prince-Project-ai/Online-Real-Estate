import DashboardHome from "../Components/dashboard/DashboardHome";
// import TotalUser from "../Components/dashboard/TotalUser"; // Ensure this component is correctly imported
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayouts from "../layouts/DashboardLayouts";
import SignIn from "../Pages/dashboard/SignIn";
import NotFound from "../Components/dashboard/NotFound";
import AdminContextProvider, { useAdminAuth } from "../Contexts/ADMIN/AdminAuth";

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
    <AdminContextProvider>
      <DashboardLayouts>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardHome />
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
  );
};

export default DashboardRouter;
