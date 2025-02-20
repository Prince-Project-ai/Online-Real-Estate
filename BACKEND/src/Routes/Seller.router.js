import { Router } from "express";
import path from "path";

import { addSellerProperty, deleteListing, sellerReview, totalListing, updateSellerListing } from "../Controllers/Seller.controller.js";
import { verifyJWT } from "../Middlewares/Auth.Middleware.js";
const router = Router();

import multer from "multer";
import { ApiError } from "../Utils/ApiError.js";

// Configure Multer to store files temporarily
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads/property_images/");
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const uniqueName = `${Date.now()}_${Math.random() * 10 + 1}${fileExt}`;
        cb(null, uniqueName);
    },
});

// File type filtering
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(
            new ApiError(
                400,
                "Unsupported file type! Only JPEG, JPG,  and PNG are allowed"
            ),
            false
        );
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // File size limit: 5MB
    },
    fileFilter,
});


router.post("/add-seller-property", verifyJWT, upload.array('propertyImages', 6), addSellerProperty);

router.get("/get-all-listing", verifyJWT, totalListing);
router.delete("/delete-listing/:deleteId", deleteListing);
router.patch("/update-seller-listing/:propertyId", verifyJWT, upload.array('propertyImages', 6), updateSellerListing);
router.get("/seller-review/:sellerId", verifyJWT, sellerReview);


export default router;