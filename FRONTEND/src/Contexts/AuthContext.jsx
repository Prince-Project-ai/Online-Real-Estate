import { createContext, useContext, useEffect, useState } from "react";
import { currentUser } from "../Api/website/HandleUserApi";
import { useMessage } from "./MessageContext";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext mest be inside AuthProvider");
  return context;
}


const AuthProvider = ({ children }) => {
  const { showToast } = useMessage();
  const [currentAuth, setCurrentAuth] = useState(null);

  useEffect(() => {
    const fetchCurrentAuth = async () => {
      try {
        const res = await currentUser(showToast);
        setCurrentAuth(res?.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCurrentAuth();
  }, []);

  const contextValue = {
    currentAuth,
    setCurrentAuth,
  }
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;


// function fetchCurrentUser() {
//   const data = localStorage.getItem("currentAuth");
//   return data ? JSON.parse(data) : null;
// }