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
    const [senderText, setSenderText] = useState("");
    const [chats, setChats] = useState([]);


    useEffect(() => {
        const newSocket = io("http://localhost:9998", {
            withCredentials: true,
        });

        newSocket.on('connect', () => {
            console.log("Socket Connected.");
        });

        newSocket.on('disconnect', (reason) => {
            console.log('Socket Disconnected : ', reason);
        });

        newSocket.on('connect_error', (error) => {
            console.log('Socket Error : ', error);
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    const sendMessage = (text, reciverId, senderId, type) => {
        socket.emit('emit-message', { text, reciverId, senderId, type });
        setChats((prev) => ([...prev, text]));
        setSenderText("");
    }

    const contextValue = {
        socket,
        sendMessage,
        senderText,
        setSenderText,
        chats,
        setChats,
    };

    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    );
}

export default SocketProvider;