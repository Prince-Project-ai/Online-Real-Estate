import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AgentLayouts from "../layouts/AgentLayouts";
import DashContent from "../Components/AgentComponent/DashContent";
import AgentProfile from "../Components/AgentComponent/AgentProfile";
import MessageProvider from "../Contexts/MessageContext";
import AuthProvider, { useAuth } from "../Contexts/AuthContext";

const AgentDashboardRouter = () => {
  return (
    <MessageProvider>
      <AuthProvider>
        <PrivateRoute>
          <AgentLayouts>
            <Routes>
              <Route path="/" element={<DashContent />} />
              <Route path="/profile" element={<AgentProfile />} />
            </Routes>
          </AgentLayouts>
        </PrivateRoute>
      </AuthProvider>
    </MessageProvider>
  );
};

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading, currentAuth } = useAuth();
  console.log("Current Auth : ", currentAuth);
  if (isLoading)
    return <p className="bg-dark text-white text-5xl">LOADING...</p>;
  if (!isAuthenticated || currentAuth.role !== "Agent") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default React.memo(AgentDashboardRouter);
