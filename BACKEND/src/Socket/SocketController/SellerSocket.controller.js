import { Property } from "../../Models/Property.model.js";

export const retrivedSellerApproaval = async (socket, id) => {
    try {
        const approvedProp = await Property.find({
            $and: [{ adderId: id }, { approval: false }]
        });
        if (!approvedProp) {
            socket.emit('error', 'Approvals not available at the moment');
        }
        socket.emit('Properties', approvedProp);

    } catch (error) {
        socket.emit('error', error.message || "INTERNAL SERVER ERROR.");
    }
};