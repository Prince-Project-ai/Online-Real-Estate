import mongoose, { Schema } from "mongoose";

const propertySchema = new Schema(
  {
    adderId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    role: {
      type: String,
      enum: ["Seller", "Agent"],
      required: true,
    },
    propertyTitle: {
      type: String,
      required: true,
    },
    propertyType: {
      type: String,
      enum: ['Apartment', 'House', 'PG'],
      required: true,
    },

    listingType: {
      type: String,
      enum: ['Sell', 'Rent'],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    priceNegotiable: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      required: true,
    },
    sizeUnit: {
      type: String,
      enum: ["Square meter", "Square feet", "hectare"],
      default: "Square meter",
    },

    location: {
      streetAddress: {
        type: String,
        required: true,
      },

      locationCode: [
        {
          latitude: {
            type: Number,
            required: true,
          },
          longitude: {
            type: Number,
            required: true,
          }
        }
      ]
    },
    images: [
      {
        propertyImages: {
          type: String,
          required: true,
        },
      }
    ],
    propertyVideo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Property = mongoose.model("property", propertySchema);
