import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '@/components/auth-provider';
import { ThemeProvider as AppThemeProvider } from '@/components/theme-provider';

export const unstable_settings = {
  anchor: 'login',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AppThemeProvider>
      <AuthProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            <Stack.Screen name="signup/name" options={{ headerShown: false }} />
            <Stack.Screen name="signup/email" options={{ headerShown: false }} />
            <Stack.Screen name="signup/password" options={{ headerShown: false }} />
            <Stack.Screen 
              name="onboarding/personal-info" 
              options={{ 
                headerShown: false,
                presentation: 'modal',
                animation: 'slide_from_right'
              }} 
            />
            <Stack.Screen 
              name="onboarding/fitness-goals" 
              options={{ 
                headerShown: false,
                presentation: 'modal',
                animation: 'slide_from_right'
              }} 
            />
            <Stack.Screen 
              name="onboarding/health-metrics" 
              options={{ 
                headerShown: false,
                presentation: 'modal',
                animation: 'slide_from_right'
              }} 
            />
            <Stack.Screen 
              name="onboarding/workout-preferences" 
              options={{ 
                headerShown: false,
                presentation: 'modal',
                animation: 'slide_from_right'
              }} 
            />
            <Stack.Screen 
              name="onboarding/nutrition-preferences" 
              options={{ 
                headerShown: false,
                presentation: 'modal',
                animation: 'slide_from_right'
              }} 
            />
            <Stack.Screen 
              name="onboarding/completion" 
              options={{ 
                headerShown: false,
                presentation: 'modal',
                animation: 'slide_from_right'
              }} 
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthProvider>
    </AppThemeProvider>
  );
}
