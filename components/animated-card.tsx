import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

interface AnimatedCardProps {
  children: React.ReactNode;
  index?: number;
  style?: any;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, index = 0, style }) => {
  const opacity = new Animated.Value(0);
  const translateY = new Animated.Value(30);

  React.useEffect(() => {
    // Staggered animation for multiple cards
    Animated.stagger(
      index * 100,
      [
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          })
        ])
      ]
    ).start();
  }, []);

  return (
    <Animated.View 
      style={[
        styles.card, 
        style, 
        { 
          opacity: opacity,
          transform: [{ translateY: translateY }]
        }
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
});