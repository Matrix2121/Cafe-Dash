import { useState, useEffect } from 'react';
import api from '../services/apiClient';
import { CafeShort } from '../types/items';

const useCafesShort = () => {
  const [cafesShort, setCafesShort] = useState<CafeShort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // const fetchCafesShort = async () => {
    //   setLoading(true);
      
    //   try {
    //     const response = await api.get('/cafes');
    //     setCafesShort(response.data);
    //     setError(null);
    //   } catch (err) {
    //     setError('Failed to fetch cafes');
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchCafesShort();


//MockData start
    setLoading(true);

    setTimeout(() => {
      setCafesShort([{
        id: 1,
        name: "cafene1",
        location: "zad ftori",
        rating: 3.4,
        reviewCount: 32,
      },{
        id: 2,
        name: "cafene2",
        location: "pred ftori",
        rating: 3.9,
        reviewCount: 12,
      },{
        id: 3,
        name: "cafene3",
        location: "zad ftori",
        rating: 3.4,
        reviewCount: 32,
      },{
        id: 4,
        name: "cafene4",
        location: "pred ftori",
        rating: 3.9,
        reviewCount: 12,
      }]);
      setError(null);
      setLoading(false);
    }, 1000);
//MockData end



  }, []);

  return { cafesShort, loading, error };
};

export default useCafesShort;