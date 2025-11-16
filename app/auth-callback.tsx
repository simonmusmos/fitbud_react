// This component handles OAuth redirects
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // The OAuth flow should automatically update the auth state
    // via the auth provider's onAuthStateChange listener
    // so we can just redirect to the appropriate screen
    router.replace('/login');
  }, []);

  return null; // This component doesn't render anything visible
}