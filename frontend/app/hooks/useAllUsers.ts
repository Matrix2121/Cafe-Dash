import { useState, useEffect } from "react";
import { User } from "@/app/types/items";
import customAPI from "@/app/services/apiClient";

const useAllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllUsers = async () => {
    try {
      const response = await customAPI.get("/api/users");
      setUsers(response.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchAllUsers,
  };
};

export default useAllUsers;
