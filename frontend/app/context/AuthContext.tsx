// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/apiClient';

type User = {
  id: number;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem('jwt');
      if (token) {
        try {
          const response = await api.get('/auth/me');
          setUser(response.data);
        } catch (error) {
          await AsyncStorage.removeItem('jwt');
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    await AsyncStorage.setItem('jwt', response.data.token);
    setUser(response.data.user);
  };

  // Logout function
  const logout = async () => {
    await AsyncStorage.removeItem('jwt');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};