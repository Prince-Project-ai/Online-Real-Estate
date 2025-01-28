import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayouts from "../layouts/DashboardLayouts";
import SignIn from "../Pages/dashboard/SignIn";
import NotFound from "../Components/dashboard/NotFound";
import DashboardHome from "../Components/dashboard/DashboardHome";
import AdminContextProvider, { useAdminAuth } from "../Contexts/ADMIN/AdminAuthContext";
import MessageProvider from "../Contexts/MessageContext";
import DashboardSkeleton from "../Components/dashboard/comman/DashboardSkeleton";


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
        </MessageProvider>
    );
};




export default DashboardRouter;

// PrivateRoute Component
const PrivateRoute = ({ children }) => {
    const { isAdminAuthenticated, isLoading } = useAdminAuth();
    if (isLoading) {
        return <DashboardSkeleton />
    }
    if (!isAdminAuthenticated) {
        return <Navigate to="/dashboard/sign-in" replace />;
    }

    return children;
};
