import { useEffect, useState } from 'react';
import { Order } from '../types/items';
import customAPI from '../services/apiClient';

const useOrders = (userId?: number) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrdersByUserId = async (userId: number) => {
        customAPI.get(`api/orders/user/${userId}`)
            .then((response) => {
                const orders = response.data;
                setOrders(orders);
                setLoading(false);
            })
            .catch((error) => {
                setError(error?.response?.data?.message || error.message || 'Something went wrong');
                setLoading(false);
            })
            .finally(()=> {
                setLoading(false);
            });
    }

    const postOrder = async (order : Order) => {
        await customAPI.post(`api/orders`, order)
            .catch((error) => {
                setError(error?.response?.data?.message || error.message || 'Something went wrong');
            });
    }

    useEffect(() => {
        if (userId === undefined) {
            setLoading(false);
            return;
        }
        fetchOrdersByUserId(userId);
    }, [userId]);

    return {orders, postOrder, loading, error};
};

export default useOrders;