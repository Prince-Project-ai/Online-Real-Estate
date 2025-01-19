import React from "react";
import { Routes, Route } from "react-router-dom";
import SellerLayout from "../layouts/SellerLayout";
const SellerDashboardRouter = () => {
  return (
    <SellerLayout>
      <Routes>
        <Route path="/" element={"seller Index Page"} />
      </Routes>
    </SellerLayout>
  );
};

export default SellerDashboardRouter;
