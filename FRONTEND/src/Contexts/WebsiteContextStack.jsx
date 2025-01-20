import { createContext } from "react";
import MessageProvider from "./MessageContext";
import AuthProvider from "./AuthContext";

export const WebsiteContextStack = createContext();

const WebsiteContextStackProvider = ({ children }) => {
  return (
    <MessageProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </MessageProvider>
  )
}

export default WebsiteContextStackProvider;