import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  isLoggedIn: boolean | null; // null means loading
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
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
  const [isAuthenticating, setIsAuthenticating] = useState(false); // Track authentication state
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    checkLoginStatus();

    // Set up real-time authentication listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Redirect based on login status
    // Only redirect if status is determined and we're not currently authenticating
    if (!isAuthenticating) {
      if (isLoggedIn === false) {
        router.replace('/login');
      } else if (isLoggedIn === true) {
        // If user completed onboarding, go to main app; otherwise, go to onboarding
        console.log('onboarding');
        router.replace('/(tabs)/index');
      }
    }
    // Don't redirect if isLoggedIn is still null (loading state)
  }, [isLoggedIn, router, isAuthenticating]);

  const checkLoginStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsLoggedIn(!!session);
  };

  const login = async (email: string, password: string) => {
    setIsAuthenticating(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    setIsAuthenticating(true);
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Note: The profile will be created automatically via the database trigger
      // that runs when a new user is created in the auth system
      if (data.user && data.session) {
        // The user is now logged in automatically
        setIsLoggedIn(true);
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const signInWithGoogle = async () => {
    console.log('signInWithGoogle called');
    setIsAuthenticating(true);
    // For mobile apps, we use the Supabase project callback URL
    // This needs to match what's registered in Google Cloud Console
    const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
    console.log('Supabase URL:', supabaseUrl);

    if (!supabaseUrl) {
      console.error('Supabase URL is not configured');
      throw new Error('Supabase URL is not configured');
    }

    const redirectTo = `${supabaseUrl}/auth/v1/callback`;
    console.log('Redirect URL:', redirectTo);

    try {
      // The signInWithOAuth should automatically open the browser
      // If it doesn't work in Expo Go, it may work in a development build
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectTo,
        }
      });

      if (error) {
        console.error('Google sign-in error:', error);
        throw error;
      }

      console.log('Google sign-in initiated successfully');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const signInWithApple = async () => {
    setIsAuthenticating(true);
    // For mobile apps, we use the Supabase project callback URL
    // This needs to match what's registered in Apple Developer Portal
    const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
      throw new Error('Supabase URL is not configured');
    }

    const redirectTo = `${supabaseUrl}/auth/v1/callback`;

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: redirectTo,
        }
      });

      if (error) {
        console.error('Apple sign-in error:', error);
        throw error;
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = async () => {
    setIsAuthenticating(true);
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Logout error:', error);
      }
    } finally {
      setIsAuthenticating(false);
    }

    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, signup, signInWithGoogle, signInWithApple }}>
      {children}
    </AuthContext.Provider>
  );
}