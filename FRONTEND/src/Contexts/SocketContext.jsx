import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) throw new Error("SocketContext must be used within SocketProvider");
    return context;
}

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io("http://localhost:9998", {
            withCredentials: true,
        });

        newSocket.on('connect', () => {
            console.log('Connected to server');
        });

        newSocket.on('disconnect', (reason) => {
            console.log('Disconnected from server:', reason);
        });

        newSocket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    const contextValue = {
        socket,
    };

    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    );
}

export default SocketProvider;