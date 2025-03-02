import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
    {
        avatar: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
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
            required: function () {
                return this.messageType === "text";
            },
        },
        messageType: {
            type: String,
            enum: ["text", "image"],
            default: "text",
        },
        image: {
            type: String, // Store the URL or path to the image
            required: function () {
                return this.messageType === "image";
            },
        },
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
