import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

type AuthContextType = {
  isLoggedIn: boolean | null; // null means loading
  login: () => void;
  logout: () => void;
  signup: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null means loading
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in (for now, just using a simple state persistence)
    // In a real app, you would check for a valid token in secure storage
    checkLoginStatus();
  }, []);

  useEffect(() => {
    // Redirect based on login status
    // Only redirect if status is determined
    if (isLoggedIn === false) {
      router.replace('/login');
    } else if (isLoggedIn === true) {
      // If user completed onboarding, go to main app; otherwise, go to onboarding
      // For now, always go to main app - in a real app you would check if onboarding is complete
      router.replace('/(tabs)/index');
    }
    // Don't redirect if isLoggedIn is still null (loading state)
  }, [isLoggedIn, router]);

  const checkLoginStatus = async () => {
    // In a real app, you would check for a stored token
    // For now, just assume no user is logged in initially
    // You could implement actual token verification here
    setIsLoggedIn(false);
  };

  const login = () => {
    setIsLoggedIn(true);
  };

  const signup = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}