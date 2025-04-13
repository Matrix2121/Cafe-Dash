import { useEffect, useState } from 'react';
import { User, UserUpdate } from '../types/items';
import customAPI from '../services/apiClient';

const useUser = (id?: number) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserById = async (id: number) => {
    try {
      const response = await customAPI.get(`api/users/${id}`);
      setUser(response.data);
    } catch (error: any) {
      setError(error?.response?.data?.message || error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id != null) {
      fetchUserById(id);
    }
  }, [id]);

  const updateUser = async (updatedUser: UserUpdate, id: number) => {
    try {
      const response = await customAPI.put(`api/users/${id}`, updatedUser);
      setUser(response.data);
    } catch (error: any) {
      setError(error?.response?.data?.message || error.message || 'Something went wrong');
    }
  };

  return { user, updateUser, loading, error };
};

export default useUser;
