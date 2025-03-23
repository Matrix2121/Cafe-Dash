import { useState, useEffect } from 'react';
import { url } from "@/app/common/constants";
import { Review } from '../types/items';
import api from '../services/apiClient';

const useReviews = (cafeteriaId: number) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchReviewsByCafeId = (cafeteriaId: number) => {
        api.get(`${url}api/reviews/${cafeteriaId}`)
            .then((response) => {
                const allReviews = response.data;
                setReviews(allReviews);
                setLoading(false);
            })
            .catch((error) => {
                setError(error?.response?.data?.message || error.message || 'Something went wrong');
                setLoading(false);
            });
    }

    const postReview = (review : Review) => {
        api.post(`/reviews`, review)
            .catch((error) => {
                setError(error?.response?.data?.message || error.message || 'Something went wrong');
            });
    }

    useEffect(() => {
        if (cafeteriaId != null) {
            fetchReviewsByCafeId(cafeteriaId);
        }
    }, [cafeteriaId]);

    return { reviews, loading, error, postReview };
};

export default useReviews;