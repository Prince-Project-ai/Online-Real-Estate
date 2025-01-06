import { createContext } from "react";
import MessageProvider from "./MessageContext";
import AuthProvider from "./AuthContext";

export const WebsiteContextStack = createContext();
const WebsiteContextStackProvider = ({ children }) => {
  return (
    <AuthProvider>
      <MessageProvider>
        {children}
      </MessageProvider>
    </AuthProvider>
  )
}

export default WebsiteContextStackProvider;