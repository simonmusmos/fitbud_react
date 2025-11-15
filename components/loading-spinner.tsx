import React from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  duration?: number;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 20, 
  color = '#FFFFFF', 
  duration = 1000 
}) => {
  const spinValue = new Animated.Value(0);

  React.useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spinAnimation.start();

    return () => spinAnimation.stop();
  }, [duration, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.container, { width: size, height: size }]}>
      <Animated.View
        style={[
          styles.spinner,
          {
            width: size,
            height: size,
            borderColor: `${color}40`,
            borderTopColor: color,
            borderWidth: size * 0.15,
            borderRadius: size / 2,
            transform: [{ rotate: spin }],
          },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    borderRadius: 100,
  },
});