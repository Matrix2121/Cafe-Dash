import { useState, useEffect } from "react";
import { Review } from "@/app/types/items";
import customAPI from "@/app/services/apiClient";

const useUserReviews = (userId: number) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserReviews = async () => {
    try {
      const response = await customAPI.get(`/api/reviews/user/${userId}`);
      setReviews(response.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Failed to fetch user reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserReviews();
    }
  }, [userId]);

  return { reviews, loading, error, fetchUserReviews };
};

export default useUserReviews;
