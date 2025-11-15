import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/components/auth-provider';

export function useRequireAuth(redirectTo = '/login') {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect when we have a determined auth state (not null)
    if (isLoggedIn === false) {
      router.replace(redirectTo);
    }
  }, [isLoggedIn, redirectTo, router]);

  return { isLoggedIn };
}

export function useRedirectIfLoggedIn(redirectTo = '/(tabs)/index') {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect when we have a determined auth state (not null)
    if (isLoggedIn === true) {
      router.replace(redirectTo);
    }
  }, [isLoggedIn, redirectTo, router]);

  return { isLoggedIn };
}