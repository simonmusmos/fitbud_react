/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#1F2937',
    textSecondary: '#6B7280',
    background: '#F9FAFB',
    card: '#FFFFFF',
    border: '#E5E7EB',
    tint: '#667eea',
    icon: '#6B7280',
    tabIconDefault: '#6B7280',
    tabIconSelected: '#667eea',
    primary: '#667eea',
    secondary: '#764ba2',
    notification: '#FF6B6B',
    success: '#4ECDC4',
    warning: '#FFE66D',
    error: '#FF6B6B',
  },
  dark: {
    text: '#f9fafb',
    textSecondary: '#d1d5db',
    background: '#111827',
    card: '#1f2937',
    border: '#374151',
    tint: '#818cf8',
    icon: '#d1d5db',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: '#818cf8',
    primary: '#818cf8',
    secondary: '#a78bfa',
    notification: '#f87171',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
