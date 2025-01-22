import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SellerLayout from "../layouts/SellerLayout";
import DashContent from "../Components/SellerComponent/DashContent";
import SellerProfile from "../Components/SellerComponent/SellerProfile";
import MessageProvider from "../Contexts/MessageContext";
import AuthProvider, { useAuth } from "../Contexts/AuthContext";

const SellerDashboardRouter = () => {
  return (
    <MessageProvider>
      <AuthProvider>
        <PrivateRoute>
          <SellerLayout>
            <Routes>
              <Route path="/" element={<DashContent />} />
              <Route path="/profile" element={<SellerProfile />} />
            </Routes>
          </SellerLayout>
        </PrivateRoute>
      </AuthProvider>
    </MessageProvider>
  );
};

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <p className="bg-dark text-white text-5xl">LOADING...</p>
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }
  return { children };
}


export default SellerDashboardRouter;
