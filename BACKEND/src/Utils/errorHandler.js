import { ApiError } from "./ApiError.js";

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
        });
    }

    // console.error(err); // Log the error for debugging purposes
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
    });
};

export default errorHandler;
