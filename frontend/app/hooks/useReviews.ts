import { useState, useEffect } from 'react';
import { url } from "@/app/common/constants";
import { Review } from '../types/items';
import customAPI from '../services/apiClient';

const useReviews = (cafeteriaId: number) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchReviewsByCafeId = (cafeteriaId: number) => {
        setLoading(true);
        customAPI.get(`${url}api/reviews/${cafeteriaId}`)
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
        await customAPI.post(`/reviews`, review) //waits for a response from the backend
            .catch((error) => {
                setError(error?.response?.data?.message || error.message || 'Something went wrong');
            });
    };

    return { reviews, loading, error, postReview, fetchReviewsByCafeId };
};

export default useReviews;
