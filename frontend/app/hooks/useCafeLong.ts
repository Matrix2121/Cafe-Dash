import { useState, useEffect } from 'react';
import api from '../services/apiClient';
import { CafeLong } from '../types/items';

const useCafeLong = (id: number) => {
    const [cafeLong, setCafeLong] = useState<CafeLong | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
//         const fetchCafeLongById = async () => {
//             setLoading(true);
            
//             try {
//                 const response = await api.get(`/cafes/${id}`);
//                 setCafeLong(response.data);
//                 setError(null);
//             } catch (err) {
//                 setError('Failed to fetch cafe details');
//                 return null;
//             } finally {
//                 setLoading(false);
//             }
//   };

//   fetchCafeLongById()


//MockData start
            setLoading(true);

            setTimeout(() => {
                setCafeLong({
                    id: 1,
                    name: "Mock Cafe",
                    location: "123 Fake Street",
                    rating: 4.2,
                    reviewCount: 87,
                    openingHours: "7 AM - 9 PM",
                    phone: "+100200300",
                });
                setError(null);
                setLoading(false);
            }, 1000);
//MockData stop


    }, [id]);

    return { cafeLong, loading, error };
};

export default useCafeLong;