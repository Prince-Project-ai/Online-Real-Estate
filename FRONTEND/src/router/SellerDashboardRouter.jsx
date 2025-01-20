import React from "react";
import { Routes, Route } from "react-router-dom";
import SellerLayout from "../layouts/SellerLayout";
import SellerHome from "../Components/SellerComponent/SellerHome";
const SellerDashboardRouter = () => {
  return (
    <SellerLayout>
      <Routes>
        <Route path="/" element={<SellerHome />} />
      </Routes>
    </SellerLayout>
  );
};

export default SellerDashboardRouter;
