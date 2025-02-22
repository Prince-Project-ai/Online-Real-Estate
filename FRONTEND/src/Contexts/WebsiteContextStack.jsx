import { createContext } from "react";
import MessageProvider from "./MessageContext";
import AuthProvider from "./AuthContext";
import SharedDataProvider from "./SharedDataContext";
import UserProvider from "./UserContext";
import SocketProvider from "./SocketContext";

// export const WebsiteContextStack = createContext();

const WebsiteContextStackProvider = ({ children }) => {
  return (

    <MessageProvider>
      <AuthProvider>
        <SocketProvider>
          <UserProvider>
            <SharedDataProvider>
              {children}
            </SharedDataProvider>
          </UserProvider>
        </SocketProvider>
      </AuthProvider>
    </MessageProvider>
  )
}

export default WebsiteContextStackProvider;