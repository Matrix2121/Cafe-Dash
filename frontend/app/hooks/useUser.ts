import {useEffect, useState} from 'react';
import {User} from '../types/items';
import axios from "axios";
import {url} from "@/app/common/constants";

const useUser = (id?: number) => {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAllUsers = () => {
        axios.get(`${url}api/users`)
            .then((response) => {
                const allUsers = response.data;
                setUsers(allUsers);
                setLoading(false);
            })
            .catch((error) => {
                setError(error?.response?.data?.message || error.message || 'Something went wrong');
                setLoading(false);
            });
    }
    const fetchUserById = (id: number) => {
        axios.get(`${url}api/users/${id}`)
            .then((response) => {
                const user = response.data;
                setUser(user);
                setLoading(false);
            })
            .catch((error) => {
                setError(error?.response?.data?.message || error.message || 'Something went wrong');
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchAllUsers()
    }, []);

    useEffect(() => {
        if (id != null) {
            fetchUserById(id);
        }
    }, []);

    return {users, user, loading, error};
};

export default useUser;