import React from "react";
import { Routes, Route } from "react-router-dom";
import AgentLayouts from "../layouts/AgentLayouts";
import DashContent from "../Components/AgentComponent/DashContent";
import AgentProfile from "../Components/AgentComponent/AgentProfile";



const AgentDashboardRouter = () => {
  return (
    <AgentLayouts>
      <Routes>
        <Route path="/" element={<DashContent />} />
        <Route path="/profile" element={<AgentProfile />} />
      </Routes>
    </AgentLayouts>
  );
};

export default AgentDashboardRouter;
