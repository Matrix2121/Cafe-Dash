import { useState, useEffect } from 'react';
import api from '../services/apiClient';
import { CafeLong } from '../types/items';

const useCafeLong = (id: number) => {
    const [cafeLong, setCafeLong] = useState<CafeLong | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCafeLongById = async () => {
            setLoading(true);
            
            try {
                const response = await api.get(`/cafeterias/${id}`);
                setCafeLong(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch cafe details');
                return null;
            } finally {
                setLoading(false);
            }
  };

  fetchCafeLongById()
}, [id]);

    return { cafeLong, loading, error };
};

export default useCafeLong;