import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../Contexts/AuthContext';
import { fetchSellerReviewBYId } from '../../../Api/website/HandleUserApi';
import { motion } from 'framer-motion';
import { FaStar } from "react-icons/fa6";


const ReviewsDashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reviewsPerPage = 5;

  const { currentAuth } = useAuth();

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchSellerReviewBYId(currentAuth?._id);
      if (response?.success) {
        setReviews(response?.data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [currentAuth?._id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        className="spinner"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        🌀
      </motion.div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen text-red-500">
      Error: {error}
    </div>
  );

  return (
    <motion.div
      className="min-h-screen rounded-lg border bg-white p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold text-center mb-10 text-gray-800">Property Reviews</h1>
      <div className="space-y-10">
        {currentReviews.map((review, index) => (
          <React.Fragment key={review._id}>
            <motion.div
              className="relative flex items-start space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.img
                src={review.avatar}
                alt={review.name}
                className="w-16 h-16 rounded-full object-cover"
                whileHover={{ scale: 1.1 }}
              />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900">{review.name}</h2>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500 flex space-x-1">
                    {[...Array(review.rating)].map((_, i) => (

                      <FaStar key={i} />

                    ))}
                  </span>
                  <span className="ml-2 text-gray-600">{review.rating} / 5</span>
                </div>
                <p className="mt-4 text-gray-700 italic">"{review.comment}"</p>
              </div>
            </motion.div>
            {index < currentReviews.length - 1 && (
              <hr className="border-t border-gray-200 my-8 w-full" />
            )}
          </React.Fragment>
        ))}
      </div>
      <motion.div className="flex justify-center mt-10 space-x-4">
        {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }, (_, i) => (
          <motion.button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`w-10 h-10 font-description  rounded-full flex items-center justify-center ${currentPage === i + 1 ? 'bg-dark text-white' : 'bg-secondary text-gray-00'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {i + 1}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default React.memo(ReviewsDashboard);