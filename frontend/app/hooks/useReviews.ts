import { useState, useEffect } from 'react';
import api from '../services/apiClient';
import { Review } from '../types/items';

const useReview = (cafeteriaId: number) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            setError(null);

            try {
                // const response = await api.get(`/reviews/${cafeteriaId}`);
                // setReviews(response.data);

                //Mock Data
                setTimeout(() => {
                    setReviews([{
                        id: 1,
                        title: "Great",
                        body: "Awesome",
                        rating: 1,
                        createdAt: new Date
                    },{
                        id: 2,
                        title: "Great",
                        body: "Awesome",
                        rating: 2,
                        createdAt: new Date
                    },{
                        id: 3,
                        title: "Nunc consectetur ut mi in finibus. Suspendisse potenti. Donec nec posuere urna. Aenean eget enim purus. Nunc ultrices nulla in ante euismod, et sollicitudin odio rutrum",
                        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porta mi sem, a semper neque tincidunt sit amet. Sed congue sollicitudin nisi, a varius quam venenatis eget. Nam sagittis vel est quis sagittis. Sed et interdum diam. Sed ut felis urna. Cras ullamcorper augue quis convallis varius. Sed vitae bibendum dolor. Phasellus eu blandit turpis.",
                        rating: 3,
                        createdAt: new Date
                    },{
                        id: 4,
                        title: "Great",
                        body: "Awesome",
                        rating: 4,
                        createdAt: new Date
                    },{
                        id: 5,
                        title: "Great",
                        body: "Awesome",
                        rating: 5,
                        createdAt: new Date
                    },]);
                    setLoading(false);
                }, 1000);
                //Mock Data

            } catch (err) {
                setError("Failed to fetch reviews.");
                setLoading(false);
            }
        };

        fetchReviews();
    }, [cafeteriaId]);

    return { reviews, loading, error };
};

export default useReview;