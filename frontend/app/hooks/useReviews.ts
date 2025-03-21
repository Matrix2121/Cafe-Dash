import { useState, useEffect } from 'react';
import axios from "axios";
import {url} from "@/app/common/constants";
import { Review } from '../types/items';

const useReviews = (cafeteriaId: number) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchReviewsById = (cafeteriaId: number) => {
        axios.get(`${url}api/reviews/${cafeteriaId}`)
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

    useEffect(() => {
        if (cafeteriaId != null) {
            fetchReviewsById(cafeteriaId);
        }
    }, [cafeteriaId]);

    return { reviews, loading, error };
};

export default useReviews;