import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AdminAuth } from "../../Api/dashboard/HandleAdminApi";

export const AdminContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdminAuth is use must be inside of AdminContextProvider.");
  return context;
}

const AdminContextProvider = ({ children }) => {

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCurrentAdmin = useCallback(async () => {

    try {
      await AdminAuth();
      setIsAdminAuthenticated(true);
    } catch (error) {
      console.error(false || error?.message);
    } finally {
      setIsLoading(false);
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
    isLoading,
    setIsAdminAuthenticated,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider;
