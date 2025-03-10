// src/hooks/useCafeImage.ts
import { useEffect, useState } from 'react';
import api from '../services/apiClient';

const useCafeImage = (cafeId: number) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // const fetchImageUrl = async () => {
    //   try {
    //     const response = await api.get(`/cafes/${cafeId}/image-url`);
    //     setImageUrl(response.data.url); // Assume API returns { url: "..." }
    //   } catch (err) {
    //     setError('Failed to fetch image');
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchImageUrl();

    setLoading(true);

    setTimeout(() => {
      setImageUrl(require('../assets/images/logo.png'))
      setError(null);
      setLoading(false);
    }, 1000);

  }, [cafeId]);

  return { imageUrl, loading, error };
};

export default useCafeImage;