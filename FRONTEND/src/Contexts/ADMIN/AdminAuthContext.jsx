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
  const [adminInfo, setAdminInfo] = useState(null);

  const fetchCurrentAdmin = useCallback(async () => {

    try {
      const response = await AdminAuth();
      if (response?.success) {
        setAdminInfo(response?.data);
      }
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
    adminInfo,
    setAdminInfo,
    setIsAdminAuthenticated,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider;
