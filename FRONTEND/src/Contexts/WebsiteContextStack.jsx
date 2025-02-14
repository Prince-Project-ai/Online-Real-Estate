import { createContext } from "react";
import MessageProvider from "./MessageContext";
import AuthProvider from "./AuthContext";
import SharedDataProvider from "./SharedDataContext";

export const WebsiteContextStack = createContext();

const WebsiteContextStackProvider = ({ children }) => {
  return (
    <MessageProvider>
      <AuthProvider>
        <SharedDataProvider>
          {children}
        </SharedDataProvider>
      </AuthProvider>
    </MessageProvider>
  )
}

export default WebsiteContextStackProvider;