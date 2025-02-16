import React, { useCallback, useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { reviewByProduct } from '../../../Api/website/HandleUserApi';

const Review = ({ review }) => {
    return (
        <div className="bg-white rounded-md p-4 border-b-4 mb-2 border-2">
            <div className="flex w-full items-center justify-between mb-2">
                <div className="flex items-center">
                    <img
                        src={review.avatar}
                        alt="Profile"
                        className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                        <h3 className="font-bold">{review.name}</h3>
                        <p className="text-xs text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className="flex text-yellow-500">
                    {[...Array(review.rating)].map((_, index) => (
                        <span key={index} className="text-lg"><FaStar /></span>
                    ))}
                </div>
            </div>
            <p className="mb-2">{review.comment}</p>
        </div>
    );
};

const Reviews = () => {
    const { data } = useParams();
    const [reviews, setReviews] = useState([]);
    const fetchAllReviews = useCallback(async () => {
        if (!data) return;
        try {
            const response = await reviewByProduct(data);
            if (response?.success) {
                setReviews(response?.data);
            }
        } catch (error) {
            console.error(error?.response?.data?.message);
        }
    }, [data]);

    useEffect(() => {
        fetchAllReviews();
    }, [fetchAllReviews]);

    return (
        <div className="container mx-auto space-y-1">
            {reviews.map((review, index) => (
                <Review key={index} review={review} />
            ))}
        </div>
    );
};

export default React.memo(Reviews);
