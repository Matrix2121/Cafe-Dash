import { useState, useEffect } from 'react';
import api from '../services/apiClient';
import { Product } from '../types/items';

const useProduct = () => {
    const [items, setItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItem = async () => {
        try {
            const response = await api.get(`/items/`);
            setItems(response.data);
        } catch (err) {
            setError('Failed to fetch item details');
        } finally {
            setLoading(false);
        }
        };

        fetchItem();
    }, []);

    return { items, loading, error };
};

export default useProduct;