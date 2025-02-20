import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
    {
        // user id ok
        senderId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        // here seller id
        receiverId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        // message text
        message: {
            type: String,
            required: true,
        },
        // message type
        messageType: {
            type: String,
            enum: ["text", "image"],
            default: "text",
        },
        // message status
        read: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Add indexes for frequently queried fields
messageSchema.index({ senderId: 1, receiverId: 1 });
messageSchema.index({ createdAt: 1 });

export const Message = mongoose.model("Message", messageSchema);
