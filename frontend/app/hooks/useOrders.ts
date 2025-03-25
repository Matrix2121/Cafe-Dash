import {useEffect, useState} from 'react';
import {Cafe} from '../types/items';
import api from '../services/apiClient';

const useCafes = (id: number) => {
    const [orders, setOrders] = useState<Cafe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrdersByUserId = (id: number) => {
        api.get(`/orders/${id}`)
            .then((response) => {
                const orders = response.data;
                setOrders(orders);
                setLoading(false);
            })
            .catch((error) => {
                setError(error?.response?.data?.message || error.message || 'Something went wrong');
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchOrdersByUserId(id)
    }, []);

    return {orders, loading, error};
};

export default useCafes;