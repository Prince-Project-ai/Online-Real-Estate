import React from "react";
import { Routes, Route } from "react-router-dom";
import SellerLayout from "../layouts/SellerLayout";
import DashContent from "../Components/SellerComponent/DashContent";
import SellerProfile from "../Components/SellerComponent/SellerProfile";

const SellerDashboardRouter = () => {
  return (
    <SellerLayout>
      <Routes>
        <Route path="/" element={<DashContent />} />
        <Route path="/profile" element={<SellerProfile />} />
      </Routes>
    </SellerLayout>
  );
};

export default SellerDashboardRouter;
