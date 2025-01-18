import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AdminAuth } from "../../Api/dashboard/HandleAdminApi";

export const AdminContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdminAuth is use must be inside of AdminContextProvider.");
  return context;
}

const AdminContextProvider = ({ children }) => {

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(null);

  const fetchCurrentAdmin = useCallback(async () => {
    try {
      const response = await AdminAuth();
      setIsAdminAuthenticated(true);
    } catch (error) {
      console.error(false || error?.message);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("load", fetchCurrentAdmin);
    return () => {
      window.removeEventListener("load", fetchCurrentAdmin);
    };
  }, [fetchCurrentAdmin]);

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
