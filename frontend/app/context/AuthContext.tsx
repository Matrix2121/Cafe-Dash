import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import customAPI from '../services/apiClient';

type Role = {
  authority: string;
};

type User = {
  id: number;
  username: string;
  sub: string;
  roles: Role[];
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const decodeToken = (token: string) => {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem('jwt');
      if (token) {
        try {
          const decoded = decodeToken(token);
          setUser(decoded);
        } catch (error) {
          await AsyncStorage.removeItem('jwt');
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (username: string, passwordHash: string) => {
    const response = await customAPI.post('api/auth/login', { username, passwordHash });
    const token = response.data;
    // logged just for demonstration purposes
    console.log(token);
    await AsyncStorage.setItem('jwt', token);
    const decoded = decodeToken(token);
    console.log(decoded.id);
    setUser(decoded);
  };

  const register = async (username: string, email: string, passwordHash: string) => {
    const response = await customAPI.post('api/auth/register', {
      username,
      email,
      passwordHash,
      roleNames: ['customer']
    });
    const token = response.data;
    await AsyncStorage.setItem('jwt', token);
    const decoded = decodeToken(token);
    console.log(decoded.id);
    setUser(decoded);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('jwt');
    setUser(null);
  };

  return (
      <AuthContext.Provider value={{ user, loading, login, register, logout }}>
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