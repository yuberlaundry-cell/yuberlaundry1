"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { User, UserRole, mockUsers } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  React.useEffect(() => {
    try {
      const storedUser = localStorage.getItem('yuber-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((role: UserRole) => {
    const mockUser = mockUsers[role] || mockUsers['consumer'];
    setUser(mockUser);
    try {
        localStorage.setItem('yuber-user', JSON.stringify(mockUser));
    } catch (error) {
        console.error("Failed to save user to localStorage", error);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
        localStorage.removeItem('yuber-user');
    } catch (error) {
        console.error("Failed to remove user from localStorage", error);
    }
    router.push('/');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
