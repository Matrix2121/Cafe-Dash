// src/hooks/useItem.ts
import { useState, useEffect } from 'react';
import api from '../services/apiClient';
import { Item } from '../types/item';

const useItem = (itemId: number) => {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/items/${itemId}`);
        setItem(response.data);
      } catch (err) {
        setError('Failed to fetch item details');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  return { item, loading, error };
};

export default useItem;