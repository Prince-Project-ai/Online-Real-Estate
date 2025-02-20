import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) throw new Error("SocketContext must be use in SocketProvider");
    return context;
}

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io("http://localhost:9998");
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);

    const contextValue = {
        socket,
    }

    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    )
}


export default SocketProvider;