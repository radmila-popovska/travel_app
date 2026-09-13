import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import userApi from '../api/userApi.ts';
import type { User } from '../api/types/user.ts';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  userRole: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
  isUser: () => boolean;
  checkAuth: () => Promise<void>;
}

export interface RegisterRequest {
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem('jwt_token');
      if (savedToken) {
        setToken(savedToken);
        try {
          const response = await userApi.getCurrentUser();
          setUser(response.data);
        } catch (error) {
          // Token is invalid, clear it
          localStorage.removeItem('jwt_token');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await userApi.getCurrentUser();
      setUser(response.data);
    } catch (error) {
      // Token is invalid or user not found, clear auth state
      localStorage.removeItem('jwt_token');
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await userApi.login({ username, password });
      const { token: newToken, user: userData } = response.data;

      // Store token FIRST so subsequent requests include it
      localStorage.setItem('jwt_token', newToken);
      setToken(newToken);
      setUser(userData);
    } catch (error) {
      // Clear any partial state on error
      localStorage.removeItem('jwt_token');
      setToken(null);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequest) => {
    setIsLoading(true);
    try {
      const response = await userApi.register(userData);
      const { token: newToken, user: newUser } = response.data;

      // Store token FIRST so subsequent requests include it
      localStorage.setItem('jwt_token', newToken);
      setToken(newToken);
      setUser(newUser);
    } catch (error) {
      // Clear any partial state on error
      localStorage.removeItem('jwt_token');
      setToken(null);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    setToken(null);
    setUser(null);
  };

  const isAdmin = () => user?.role === 'ROLE_ADMINISTRATOR' || user?.role === 'ADMINISTRATOR';
  const isUser = () => ['ROLE_USER', 'ROLE_ADMINISTRATOR', 'USER', 'ADMINISTRATOR'].includes(user?.role || '');

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token && !!user,
    userRole: user?.role || null,
    login,
    register,
    logout,
    isAdmin,
    isUser,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};







