import { useState, useEffect } from 'react';
import { Review } from '../types/items';
import customAPI from '../services/apiClient';

const useReviews = (cafeteriaId: number) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchReviewsByCafeId = async (cafeteriaId: number) => {
        setLoading(true);
        customAPI.get(`api/reviews/${cafeteriaId}`)
            .then((response) => {
                const allReviews = response.data;
                setReviews(allReviews);
            })
            .catch((error) => {
                setError(error?.response?.data?.message || error.message || 'Something went wrong');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const postReview = async (review : Review) => {
        await customAPI.post(`api/reviews`, review)
            .catch((error) => {
                setError(error?.response?.data?.message || error.message || 'Something went wrong');
            });
    };

    return { reviews, loading, error, postReview, fetchReviewsByCafeId };
};

export default useReviews;
