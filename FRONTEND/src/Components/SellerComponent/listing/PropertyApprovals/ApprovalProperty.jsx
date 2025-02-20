import React, { useEffect } from "react";
import { useSocket } from "../../../../Contexts/SocketContext";

const ApprovalProperty = () => {
    const { socket } = useSocket();

    useEffect(() => {
        if (!socket) return;

        socket.emit("retrivedNotApprovalProperty", () => {
            socket.on("sendProperty", function (data) {
                console.log("Received : ", data);
            });
        });

        return () => socket.off("retrivedNotApprovalProperty");
    }, [socket]);

    return (
        <p>View Approvals.</p>
    );
};

export default ApprovalProperty;
