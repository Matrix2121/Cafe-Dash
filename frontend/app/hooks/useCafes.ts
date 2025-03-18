import {useState} from 'react';
import {Cafe} from '../types/items';
import axios from "axios";
import {url} from "@/app/common/constants";

const useCafesShort = () => {
    const [cafes, setCafes] = useState<Cafe[]>([]);
    const [cafe, setCafe] = useState<Cafe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAllCafes = () => {
        axios.get(`${url}api/cafeterias`)
            .then((response) => {
                const allProducts = response.data;
                setCafes(allProducts);
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
                const allProducts = response.data;
                setCafe(allProducts);
                setLoading(false);
            })
            .catch((error) => {
                setError(error?.response?.data?.message || error.message || 'Something went wrong');
                setLoading(false);
            });
    }

    return {cafes, cafe, fetchAllCafes, fetchCafeById, loading, error};
};

export default useCafesShort;