import React, { useEffect } from "react";
import { useSocket } from "../../../../Contexts/SocketContext";
import { useAuth } from "../../../../Contexts/AuthContext";
const ApprovalProperty = () => {

    const { socket } = useSocket();
    const { currentAuth } = useAuth();

    useEffect(() => {
        if (!socket) return;

        const handleSendProperty = (data) => {
            console.log("Received:", data);
        };
        socket.emit("retrivedNotApprovalProperty", currentAuth._id);
        socket.on("Properties", handleSendProperty);

        socket.on('error', (message) => {
            console.log("Calling");
            console.error('WebSocket error :', message);
        });
        return () => {
            // socket.off("sendProperty", handleSendProperty);
        };
    }, [socket]);

    return (
        <p>View Approvals.</p>
    );
};

export default React.memo(ApprovalProperty);
