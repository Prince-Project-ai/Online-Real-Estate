import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { currentUser } from "../Api/website/HandleUserApi";
import { useMessage } from "./MessageContext";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext must be inside AuthProvider");
  return context;
};

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { showToast } = useMessage();
  const [currentAuth, setCurrentAuth] = useState(null);

  const fetchCurrentAuth = useCallback(async () => {
    try {
      const res = await currentUser();
      setCurrentAuth(res?.data);
      setIsAuthenticated(res?.success);
    } catch (error) {
      const isValidateAuth = error?.response?.data?.success;
      if (!isValidateAuth) {
        showToast(
          "You are not signed in. Please sign in to access resources.",
          "error"
        );
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
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
    setCurrentAuth,
    setIsAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
