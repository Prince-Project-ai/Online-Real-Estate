import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { currentUser } from "../Api/website/HandleUserApi";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext must be inside AuthProvider");
  return context;
};

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentAuth, setCurrentAuth] = useState(null);

  // seller at-a-glannce
  const [totalProperty, setTotalProperty] = useState(0);
  const [totalView, setTotalView] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0);
  const [totalSpending, setTotalSpending] = useState(0);




  const fetchCurrentAuth = useCallback(async () => {
    try {
      const res = await currentUser();
      setCurrentAuth(res?.data);
      setIsAuthenticated(res?.success);
    } catch (error) {
      const isValidateAuth = error?.response?.data?.success;
      !isValidateAuth && console.log("Please signIn");
      // if (!isValidateAuth) {
      //   showToast(
      //     "You are not signed in. Please sign in to access resources.",
      //     "error"
      //   );
      // } else {
      //   showToast("An unexpected error occurred. Please try again.", "error");
      // }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // window.addEventListener("load", fetchCurrentAuth)
    // return () => {
    //   window.removeEventListener("load", fetchCurrentAuth);
    // }
    fetchCurrentAuth();
  }, [fetchCurrentAuth]);

  const contextValue = {
    currentAuth,
    isAuthenticated,
    isLoading,
    totalProperty,
    totalView,
    pendingApprovals,
    totalSpending,
    setTotalProperty,
    setTotalView,
    setPendingApprovals,
    setTotalSpending,
    setCurrentAuth,
    setIsAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;