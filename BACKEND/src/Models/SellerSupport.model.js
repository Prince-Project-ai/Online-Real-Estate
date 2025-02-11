import mongoose, { Schema } from "mongoose";


const chatMessageSchema = new Schema(
    {
        senderId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        messageType: {
            type: String,
            enum: ["text", "image"],
            default: "text",
        },
        read: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);


export const MessageSchema = mongoose.model("chatMessageSchema", chatMessageSchema);