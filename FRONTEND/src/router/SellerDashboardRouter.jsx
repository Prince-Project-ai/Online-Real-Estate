import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SellerLayout from "../layouts/SellerLayout";
import DashContent from "../Components/SellerComponent/DashContent";
import SellerProfile from "../Components/SellerComponent/SellerProfile";
import MessageProvider from "../Contexts/MessageContext";
import AuthProvider, { useAuth } from "../Contexts/AuthContext";
import AddListing from "../Components/SellerComponent/listing/AddListing";
import SellerSupport from "../Components/SellerComponent/Chating/SellerSupport";
import DataTableListing from "../Components/SellerComponent/listing/DataTableListing";
import ApprovalProperty from "../Components/SellerComponent/listing/PropertyApprovals/ApprovalProperty";
import SocketProvider from "../Contexts/SocketContext";

const SellerDashboardRouter = () => {
  return (
    <MessageProvider>
      <SocketProvider>
        <AuthProvider>
          <PrivateRoute>
            <SellerLayout>
              <Routes>
                <Route path="/" element={<DashContent />} />
                <Route path="/profile" element={<SellerProfile />} />
                <Route path="/add-listing" element={<AddListing />} />
                <Route path="/total-listing" element={<DataTableListing />} />
                <Route path="/view-approvals" element={<ApprovalProperty />} />
                <Route path="/seller-supprot" element={<SellerSupport />} />
                <Route path="/review" element={"Backend is Created."} />
              </Routes>
            </SellerLayout>
          </PrivateRoute>
        </AuthProvider>
      </SocketProvider>
    </MessageProvider>
  );
};

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading, currentAuth } = useAuth();
  if (isLoading) return <p className="bg-dark text-white text-5xl">LOADING...</p>;
  if (!isAuthenticated || currentAuth.role !== "Seller") return <Navigate to="/" replace />;
  return children;
};

export default SellerDashboardRouter;
