import React from "react";
import { Routes, Route } from "react-router-dom";
import AgentLayouts from "../layouts/AgentLayouts";
import AgenetHome from "../Components/AgentComponent/AgenetHome";

const AgentDashboardRouter = () => {
  return (
    <AgentLayouts>
      <Routes>
        <Route path="/" element={<AgenetHome />} />
      </Routes>
    </AgentLayouts>
  );
};

export default AgentDashboardRouter;
