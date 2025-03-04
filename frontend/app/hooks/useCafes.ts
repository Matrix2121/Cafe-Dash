// src/hooks/useCafes.ts
import { useState, useEffect } from 'react';
import api from '../services/apiClient';

export type Cafe = {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
};

const useCafes = () => {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const response = await api.get('/cafes');
        setCafes(response.data);
      } catch (err) {
        setError('Failed to fetch cafes');
      } finally {
        setLoading(false);
      }
    };

    fetchCafes();
  }, []);

  return { cafes, loading, error };
};

export default useCafes;