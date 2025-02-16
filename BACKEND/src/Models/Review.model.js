import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        propertyId: {
            type: Schema.Types.ObjectId,
            ref: "property",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            trim: true,
        },
        avatar: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Review = mongoose.model("Review", reviewSchema);
