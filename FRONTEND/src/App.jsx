import React from "react";
import "./styles/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Main Routers
import DashboardRouter from "./router/DashboardRouter";
import WebsiteRouter from "./router/WebsiteRouter";
import SellerDashboardRouter from "./router/SellerDashboardRouter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<WebsiteRouter />} />
        <Route path="/dashboard/*" element={<DashboardRouter />} />
        <Route path="/dashboard-seller/*" element={<SellerDashboardRouter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
