import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'header' | 'caption';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'header' ? styles.header : undefined,
        type === 'caption' ? styles.caption : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'System',
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    fontFamily: 'System',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 32,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
    fontFamily: 'System',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
    fontFamily: 'System',
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'System',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#667eea',
    fontWeight: '600',
  },
});
