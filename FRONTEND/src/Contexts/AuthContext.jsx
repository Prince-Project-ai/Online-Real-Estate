import { createContext, useContext, useEffect, useState } from "react";
import { currentUser } from "../Api/website/HandleUserApi";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext mest be inside AuthProvider");
  return context;
}


const AuthProvider = ({ children }) => {
  const [currentAuth, setCurrentAuth] = useState(null);

  useEffect(() => {
    const fetchCurrentAuth = async () => {
      try {
        const res = await currentUser();
        setCurrentAuth(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCurrentAuth();
  }, []);

  const contextValue = {
    currentAuth,
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