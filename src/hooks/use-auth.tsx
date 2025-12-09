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
    // Mock checking for a logged in user from a session
    // For now, we start as logged out
    setUser(null);
    setLoading(false);
  }, []);

  const login = useCallback((role: UserRole) => {
    const mockUser = mockUsers[role] || mockUsers['consumer'];
    setUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
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
