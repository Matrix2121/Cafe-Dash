import { useState, useEffect } from 'react';
import { Review } from '../types/items';
import customAPI from '../services/apiClient';
import useCafes from "@/app/hooks/useCafes";

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
                if (error?.response?.status === 404) {
                    setReviews([]);
                } else {
                    setError(error?.response?.data?.message || error.message || 'Something went wrong');
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const postReview = async (review: Review) => {
        try {
            await customAPI.post(`api/reviews`, review);
            // await fetchReviewsByCafeId(cafeteriaId);
        } catch (error: any) {
            setError(error?.response?.data?.message || error.message || 'Something went wrong');
        }
    };


    return { reviews, loading, error, postReview, fetchReviewsByCafeId };
};

export default useReviews;
