import { useState, useEffect } from 'react';
import api from '../services/apiClient';
import { CafeShort } from '../types/items';

const useCafesShort = () => {
  const [cafesShort, setCafesShort] = useState<CafeShort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCafesShort = async () => {
      setLoading(true);
      
      try {
        const response = await api.get('/cafeterias');
        setCafesShort(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch cafes');
      } finally {
        setLoading(false);
      }
    };

    fetchCafesShort();
  }, []);

  return { cafesShort, loading, error };
};

export default useCafesShort;