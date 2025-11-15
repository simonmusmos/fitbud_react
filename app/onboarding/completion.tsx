import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CompletionScreen() {
  const router = useRouter();

  const handleFinish = () => {
    // In a real app, we would save all the onboarding data here
    // For now, just navigate to the main app
    router.replace('/(tabs)/index');
  };

  return (
    <View style={styles.container}>
      {/* Completion Illustration */}
      <View style={styles.illustrationContainer}>
        <View style={styles.checkmarkCircle}>
          <Ionicons name="checkmark" size={60} color="#FFFFFF" />
        </View>
      </View>
      
      {/* Success Message */}
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to FitBud!</Text>
        <Text style={styles.subtitle}>Your personalized fitness journey begins now</Text>
        
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Ionicons name="barbell" size={24} color="#667eea" style={styles.featureIcon} />
            <Text style={styles.featureText}>Custom workout plans</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="nutrition" size={24} color="#667eea" style={styles.featureIcon} />
            <Text style={styles.featureText}>Personalized nutrition</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="analytics" size={24} color="#667eea" style={styles.featureIcon} />
            <Text style={styles.featureText}>Progress tracking</Text>
          </View>
        </View>
      </View>

      {/* Action Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
          <Text style={styles.finishButtonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
    justifyContent: 'space-between',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  checkmarkCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  featuresContainer: {
    width: '100%',
    alignItems: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '600',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 40,
  },
  finishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 14,
    backgroundColor: '#667eea',
  },
  finishButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 10,
  },
});