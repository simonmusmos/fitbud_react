import React, { createContext, useContext, ReactNode } from 'react';
import { ColorSchemeName, useColorScheme as useRNColorScheme } from 'react-native';

interface ThemeContextType {
  colorScheme: ColorSchemeName;
  toggleColorScheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useRNColorScheme();
  
  const toggleColorScheme = () => {
    // In a real app, you would implement theme toggling logic
    // For now, this is a placeholder
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Define our color palette
export const Colors = {
  light: {
    primary: '#667eea',
    secondary: '#764ba2',
    background: '#F9FAFB',
    card: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    notification: '#FF6B6B',
    success: '#4ECDC4',
    warning: '#FFE66D',
    error: '#FF6B6B',
  },
  dark: {
    primary: '#818cf8',
    secondary: '#a78bfa',
    background: '#111827',
    card: '#1f2937',
    text: '#f9fafb',
    textSecondary: '#d1d5db',
    border: '#374151',
    notification: '#f87171',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
  },
};

// Get colors based on current theme
export const useThemeColors = () => {
  const { colorScheme } = useTheme();
  return Colors[colorScheme || 'light'];
};