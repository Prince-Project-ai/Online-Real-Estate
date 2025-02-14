export const formValidation = (name, value, files, formData) => {
    const validations = {
        propertyTitle: () => {
            if (!value) return 'Property Title is required.';
            if (typeof value === 'string' && value.trim().length < 7) return 'Title must be at least 7 characters.';
            return '';
        },
        price: () => {
            if (!value) return 'Price is required.';
            if (isNaN(value) || value <= 0) return 'Enter a valid price.';
            return '';
        },
        size: () => {
            if (!value) return 'Size is required.';
            if (isNaN(value) || value <= 0) return 'Enter a valid size.';
            return '';
        },
        sizeUnit: () => (!value ? 'Size Unit is required.' : ''),
        latitude: () => {
            if (!value) return 'Latitude is required.';
            if (isNaN(value) || value < -90 || value > 90) return 'Enter a valid latitude (-90 to 90).';
            return '';
        },
        longitude: () => {
            if (!value) return 'Longitude is required.';
            if (isNaN(value) || value < -180 || value > 180) return 'Enter a valid longitude (-180 to 180).';
            return '';
        },

        propertyImages: () => {
            if (!files || !files.length) return 'At least one image is required.';
            if (files.length > 6) return 'Max Images is 6. Upgrade to premium for more.';
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            for (let file of files) {
                if (!allowedTypes.includes(file.type)) return 'Only JPG and PNG images are allowed.';
            }
            return '';
        },
        propertyVideo: () => {
            if (!value) return 'Enter a YouTube/Vimeo video URL.';
            const videoRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+$/;
            if (value && !videoRegex.test(value)) return 'Enter a valid YouTube/Vimeo video URL.';
            return '';
        },
    };

    return validations[name] ? validations[name]() : '';
};
