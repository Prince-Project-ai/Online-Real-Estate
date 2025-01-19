import React from "react";
import { Routes, Route } from "react-router-dom";
import AgentLayouts from "../layouts/AgentLayouts";
const AgentDashboardRouter = () => {
  return (
    <AgentLayouts>
      <Routes>
        <Route path="/" element={"Index page"} />
      </Routes>
    </AgentLayouts>
  );
};

export default AgentDashboardRouter;
