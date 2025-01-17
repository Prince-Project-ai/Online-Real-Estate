import { createContext, useContext, useState } from "react";

export const AdminContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdminAuth is use must be inside of AdminContextProvider.");
  return context;
}

const AdminContextProvider = ({ children }) => {

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const contextValue = {
    isAdminAuthenticated,
    setIsAdminAuthenticated,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  )
}
export default AdminContextProvider;
