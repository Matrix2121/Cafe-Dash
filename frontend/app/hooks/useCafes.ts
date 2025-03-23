import {useEffect, useState} from 'react';
import {Cafe} from '../types/items';
import axios from "axios";
import {url} from "@/app/common/constants";

const useCafes = (id?: number) => {
    const [cafes, setCafes] = useState<Cafe[]>([]);
    const [cafe, setCafe] = useState<Cafe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAllCafes = () => {
        axios.get(`${url}api/cafeterias`)
            .then((response) => {
                const allCafes = response.data;
                setCafes(allCafes);
                setLoading(false);
            })
            .catch((error) => {
                setError(error?.response?.data?.message || error.message || 'Something went wrong');
                setLoading(false);
            });
    }
    const fetchCafeById = (id: number) => {
        axios.get(`${url}api/cafeterias/${id}`)
            .then((response) => {
                const allCafes = response.data;
                setCafe(allCafes);
                setLoading(false);
            })
            .catch((error) => {
                setError(error?.response?.data?.message || error.message || 'Something went wrong');
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchAllCafes()
    }, []);

    useEffect(() => {
        if (id != null) {
            fetchCafeById(id);
        }
    }, [id]);

    return {cafes, cafe, loading, error};
};

export default useCafes;