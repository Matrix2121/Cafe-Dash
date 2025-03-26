import { useEffect, useState } from 'react';
import { User, UserUpdate } from '../types/items';
import customAPI from '../services/apiClient';

const useUser = (id?: number) => {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAllUsers = async () => {
        await customAPI.get(`/users`)
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
    const fetchUserById = async (id: number) => {
        await customAPI.get(`/users/${id}`)
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
        if (id != null) {
            fetchUserById(id);
        }
    }, [id]);

    const updateUser = async (updatedUser: UserUpdate, id: number) => {
         await customAPI.put(`/users/${id}`, updatedUser)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                setError(error?.response?.data?.message || error);
            })
    }

    return {users, user, updateUser, loading, error};
};

export default useUser;