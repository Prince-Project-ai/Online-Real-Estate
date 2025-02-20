    // import { User } from "../Models/User.model.js";
import { Property } from "../Models/Property.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import cloudinary from "../Config/Cloudinary.js";
import { Review } from "../Models/Review.model.js";

export const addSellerProperty = asyncHandler(async (req, res) => {
    try {
        if (!req.body) {
            throw new ApiError(400, "No Data Provided");
        }

        let locationData;
        if (typeof req.body.location === "string") {
            try {
                locationData = JSON.parse(req.body.location);
            } catch (error) {
                throw new ApiError(400, "Invalid location format");
            }
        } else {
            locationData = req.body.location;
        }

        // Extract necessary fields from parsed `location`
        const { streetAddress, latitude, longitude } = locationData;

        // Validate required fields
        if (
            !req.body.adderId ||
            !req.body.role ||
            !req.body.propertyTitle ||
            !req.body.listingType ||
            !req.body.propertyType ||
            !req.body.price ||
            !req.body.size ||
            !req.body.sizeUnit ||
            !streetAddress ||
            !latitude ||
            !longitude ||
            !req.body.propertyVideo
        ) {
            throw new ApiError(400, "Please fill in all required fields.");
        }

        let uploadedImages = [];

        if (req.files && req.files.length > 0) {
            uploadedImages = await Promise.all(
                req.files.map(file =>
                    cloudinary.uploader.upload(file.path, {
                        folder: "PropertyFy/property_images",
                    })
                )
            );
        }

        const imagesArray = uploadedImages.map(upload => ({
            propertyImages: upload.secure_url,
        }));

        const newProperty = await Property.create({
            adderId: req.body.adderId,
            role: req.body.role,
            propertyTitle: req.body.propertyTitle,
            listingType: req.body.listingType,
            propertyType: req.body.propertyType,
            price: req.body.price,
            priceNegotiable: req.body.priceNegotiable, // Ensure boolean
            size: req.body.size,
            sizeUnit: req.body.sizeUnit,
            location: {
                streetAddress,
                locationCode: [{ latitude, longitude }], // Ensure it's an array
            },
            images: imagesArray,
            propertyVideo: req.body.propertyVideo,
        });

        if (!newProperty) {
            throw new ApiError(404, "Property Not Created");
        }

        res.status(201).json(new ApiResponse(201, newProperty, "Property added successfully."));
    } catch (error) {
        throw new ApiError(error.status || 500, error.message || "Internal Server Error");
    }
});


export const totalListing = asyncHandler(async (req, res) => {
    try {
        const sellerIds = req?.user?._id;

        const listings = await Property.find({ adderId: sellerIds });

        if (!listings) throw new ApiError(404, "Data Not Found");

        res
            .status(200)
            .json(new ApiResponse(200, listings, "Fetch Successfully"));
    } catch (error) {
        throw new ApiError(error.status || 500, error.message || 'INTERNAL SERVER ERROR FORM THE FETCH TOTAL LISTING.');
    }
});

export const deleteListing = asyncHandler(async (req, res) => {
    try {
        const deleteId = req.params.deleteId;
        if (!deleteId) throw new ApiError(404, "property id not provided.");
        const deleteListing = await Property.findByIdAndDelete(deleteId);
        if (!deleteListing) throw new ApiError(400, "Delete Listing Faild");
        res.status(200).json(new ApiResponse(200, deleteListing, "Delete Listing Successfully"));
    } catch (error) {
        throw new ApiError(error.status || 500, error.message || "INTERNAL SERVER ERROR FROM DELETE LISTING");
    }
});



export const updateSellerListing = asyncHandler(async (req, res) => {
    try {
        const sellerId = req.user._id; // Seller's ID
        const { propertyId } = req.params; // Property ID to update

        let updateData = { ...req.body }; // Copy req.body to prevent mutations
        
        let uploadedImages = [];

        // Upload images to Cloudinary if any
        if (req.files && req.files.length > 0) {
            uploadedImages = await Promise.all(
                req.files.map(file =>
                    cloudinary.uploader.upload(file.path, {
                        folder: "PropertyFy/property_images",
                    })
                )
            );
        }

        // Extract URLs and format them as required by schema
        const newImages = uploadedImages.map(upload => ({
            propertyImages: upload.secure_url,
        }));

        // Find the property listing and ensure the seller owns it
        let listing = await Property.findOne({ _id: propertyId, adderId: sellerId });

        if (!listing) {
            throw new ApiError(404, "Listing not found or unauthorized.");
        }

        // Preserve old images and append new ones if available
        if (newImages.length > 0) {
            updateData.images = [...listing.images, ...newImages];
        }

        // Update the listing
        listing = await Property.findByIdAndUpdate(propertyId, updateData, {
            new: true,
            runValidators: true,
        });

        res.status(200).json(new ApiResponse(200, listing, "Listing updated successfully."));
    } catch (error) {
        throw new ApiError(error.status || 500, error.message || "INTERNAL SERVER ERROR FROM UPDATE LISTING");
    }
});

export const sellerReview = asyncHandler(async (req,res) => {
    try {   
        const { sellerId } = req.params;
        if(!sellerId) throw new ApiError(404,"Seller id not Found");
        const Revies = await Review.find({userId:sellerId});
        if(!Revies) throw new ApiError(404,"Review Not Available");
        res
        .status(200)
        .json(new ApiResponse(200, Revies, "Reviews Retrieved Successfully."));
    } catch (error) {
        throw new ApiError(error.status || 500, error.message || "INTERNAL SERVER ERROR FROM REVIEW SELLER.");
    }
});

// export const SellerSupportChat = asyncHandler(async (req,res) => {
//     try {
        
//     } catch (error) {
//         throw new ApiError(error.retrivedSellerApproaval
// 
//  || 500,error.messaage || "INTERNAL SERVER ERROR FORM CHATING SULLER SUPPORT.")
//     }
// });