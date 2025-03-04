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

  const fetchCafeById = async (id: number) => {
    try {
      const response = await api.get(`/cafes/${id}`);
      return response.data;
    } catch (err) {
      setError('Failed to fetch cafe details');
      return null;
    }
  };

  return { cafes, loading, error, fetchCafeById };
};

export default useCafes;