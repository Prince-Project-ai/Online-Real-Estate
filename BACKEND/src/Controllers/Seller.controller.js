// import { User } from "../Models/User.model.js";
import { Property } from "../Models/Property.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import cloudinary from "../Config/Cloudinary.js";

export const addSellerProperty = asyncHandler(async (req, res) => {
    try {
        const { adderId, role, propertyTitle, listingType, propertyType, price, priceNegotiable, size, sizeUnit, streetAddress, district, state, country, address_url, latitude, longitude, propertyVideo } = req.body;

        if (!req.body) {
            throw new ApiError(400, "No Data Provided");
        }

        if (
            !(
                adderId && role && propertyTitle && listingType && propertyType && price && priceNegotiable && size && sizeUnit && streetAddress && district && state && country && address_url && latitude && longitude && propertyVideo
            )
        ) {
            throw new ApiError(400, "Please Fill the Required Fields.");
        }

        let uploadedImages = [];

        // Check if there are files from Multer
        if (req.files && req.files.length > 0) {
            // Upload all files concurrently using Promise.all
            uploadedImages = await Promise.all(
                req.files.map(file =>
                    cloudinary.uploader.upload(file.path, {
                        folder: "PropertyFy/property_images",
                    })
                )
            );
        }

        const imagesArray = uploadedImages.map(upload => ({
            propertyImages: upload.secure_url, // secure_url is the Cloudinary URL of the uploaded image
        }));

        const newProperty = await Property.create({
            adderId,
            role,
            propertyTitle,
            listingType,
            propertyType,
            price,
            priceNegotiable,
            size,
            sizeUnit,
            location: {
                streetAddress,
                address_url,
                district,
                state,
                country,
                locationCode: {
                    latitude: latitude,
                    longitude: longitude,
                },
            },
            images: imagesArray, // Using the images uploaded to Cloudinary
            propertyVideo,
        });

        if (!newProperty) {
            throw new ApiError(404, "Property Not Created");
        }
        res
            .status(201)
            .json(new ApiResponse(201, newProperty, "Property added successfully."));
    } catch (error) {
        throw new ApiError(
            error.status || 500,
            error.message || "INTERNAL SERVER ERROR FROM THE ADD LISTING SELLER"
        );
    }
});
