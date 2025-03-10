import { useState, useEffect } from 'react';
import api from '../services/apiClient';
import { Product } from '../types/items';

const useProduct = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // const fetchProducts = async () => {
        // try {
        //     const response = await api.get(`/items/`);
        //     setItems(response.data);
        // } catch (err) {
        //     setError('Failed to fetch item details');
        // } finally {
        //     setLoading(false);
        // }
        // };

        // fetchProducts();

//MockData start
    setLoading(true);

    setTimeout(() => {
        setProducts([{
            id: 1,
            name: "cafe",
            price: 2.50,
            productType: "DRINKABLE"
        },{
            id: 2,
            name: "kroasan",
            price: 3.50,
            productType: "EDIBLE"
        },{
            id: 3,
            name: "cafe",
            price: 2.50,
            productType: "DRINKABLE"
        },{
            id: 4,
            name: "kroasan",
            price: 3.50,
            productType: "EDIBLE"
        },{
            id: 5,
            name: "cafe",
            price: 2.50,
            productType: "DRINKABLE"
        },{
            id: 6,
            name: "kroasan",
            price: 3.50,
            productType: "EDIBLE"
        }]);
        setError(null);
        setLoading(false);
    }, 1000);
//MockData end
    }, []);

    return { products, loading, error };
};

export default useProduct;