import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { deleteReview, reviewByProduct } from "../Api/website/HandleUserApi";
import { useMessage } from "./MessageContext";

export const userContext = createContext();

export const useCurrentData = () => {
    const context = useContext(userContext);
    if (!context) throw new Error("userContext must be use inside of context.");
    return context;
}

const UserProvider = ({ children }) => {
    const { showToast } = useMessage();
    const [reviews, setReviews] = useState([]);
    const [currentProductId, setCurrentProductId] = useState("");

    const [isEdited, setIsEdited] = useState(null);

    const fetchAllReviews = useCallback(async () => {
        if (!currentProductId) return;
        try {
            const response = await reviewByProduct(currentProductId);
            if (response?.success) {
                setReviews(response?.data);
            }
        } catch (error) {
            console.error(error?.response?.data?.message);
        }
    }, [currentProductId]);

    useEffect(() => {
        fetchAllReviews();
    }, [currentProductId, fetchAllReviews]);


    const handleDelete = async (reviewId) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;
        try {
            const response = await deleteReview(reviewId);
            if (response?.success) {
                showToast("Review deleted successfully", "success");
                setReviews((prevReviews) => prevReviews.filter(review => review._id !== reviewId));
            }
        } catch (error) {
            showToast(error?.response?.data?.message, "error");
        }
    };

    const handleEditReview = (e, id) => {
        e.preventDefault();
        setIsEdited(id);
    }

    const contextValue = {
        // GETTER
        reviews,
        currentProductId,
        isEdited,
        // SETTER
        setReviews,
        setCurrentProductId,
        setIsEdited,
        // callbacks 
        handleDelete,
        handleEditReview,
    }
    return (
        <userContext.Provider value={contextValue} >
            {children}
        </userContext.Provider>
    );
};


export default UserProvider;