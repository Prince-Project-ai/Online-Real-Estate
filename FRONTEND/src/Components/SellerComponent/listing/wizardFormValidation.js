export const formValidation = (name, value, files) => {
    const errors = {};

    // Property Title
    if (name === "propertyTitle") {
        if (!value) {
            errors.propertyTitle = "Property Title is required.";
        } else if (typeof value === "string" && value.trim().length < 7) {
            errors.propertyTitle = "Title must be at least 7 characters.";
        } else {
            errors.propertyTitle = '';
        }
    }

    // Price (Only required if not negotiable)
    if (name === "price") {
        if (!value) {
            errors.price = "Price is required.";
        } else if (isNaN(value) || value <= 0) {
            errors.price = "Enter a valid price.";
        } else {
            errors.price = '';
        }
    }

    // Size
    if (name === "size") {
        // console.log(value);
        if (!value) {
            errors.size = "Size is required .";
        } else if (isNaN(value) || value <= 0) {
            errors.size = "Enter a valid size.";
        } else {
            errors.size = '';
        }
    }

    // Size Unit
    if (name === "sizeUnit") {
        if (!value) {
            errors.sizeUnit = "Size Unit is required.";
        } else {
            errors.sizeUnit = '';
        }
    }

    // District
    if (name === "district") {
        if (!value) {
            errors.district = "District is required.";
        } else {
            errors.district = '';
        }
    }

    // Address
    if (name === "streetAddress") {
        if (!value) {
            errors.streetAddress = "Address is required.";
        } else if (value.trim().length < 10) errors.streetAddress = "Address length at least 10 character";
        else {
            errors.streetAddress = '';
        }
    }

    // Latitude (Valid number)
    if (name === "latitude") {
        if (!value) {
            errors.latitude = "Latitude is required.";
        } else if (isNaN(value) || value < -90 || value > 90) {
            errors.latitude = "Enter a valid latitude (-90 to 90).";
        } else {
            errors.latitude = '';
        }
    }

    // Longitude (Valid number)
    if (name === "longitude") {
        if (!value) {
            errors.longitude = "Longitude is required.";
        } else if (isNaN(value) || value < -180 || value > 180) {
            errors.longitude = "Enter a valid longitude (-180 to 180).";
        } else {
            errors.longitude = '';
        }
    }

    // Location URL (Valid URL)
    if (name === "address_url") {
        const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/.*)?$/;
        if (!value) {
            errors.address_url = "Location URL is required.";
        } else if (!urlRegex.test(value)) {
            errors.address_url = "Enter a valid URL.";
        } else {
            errors.address_url = '';
        }
    }

    // Property Images (Must be at least 1 image, and only JPG/PNG)
    if (name === "propertyImages" && files) {
        if (!files.length) {
            errors.propertyImages = "At least one image is required.";
        } else if (files.length > 6) {
            errors.propertyImages = "Max Images is 6. more upgrade to primium";
        } else {
            const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
            for (let file of files) {
                if (!allowedTypes.includes(file.type)) {
                    errors.propertyImages = "Only JPG and PNG images are allowed.";
                }
            }
        }
    }

    // Property Video (Optional but must be a valid video URL)
    if (name === "propertyVideo") {
        if (!value) {
            errors.propertyVideo = "Enter a YouTube/Vimeo video URL.";
        }
        const videoRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+$/;
        if (value && !videoRegex.test(value)) {
            errors.propertyVideo = "Enter a valid YouTube/Vimeo video URL.";
        }
    }

    // Virtual Tour (Optional but must be a valid URL)
    if (name === "virtualTour") {
        if (value) {
            const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/.*)?$/;
            if (!urlRegex.test(value)) {
                errors.virtualTour = "Enter a valid virtual tour URL.";
            }
        }
    }

    return errors;
};