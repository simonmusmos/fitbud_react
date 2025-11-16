import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/components/auth-provider';

export default function SignUpEmailScreen() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { signInWithGoogle, signInWithApple } = useAuth();
  const { firstName, lastName } = useLocalSearchParams(); // Get name values from previous screen

  const handleNext = () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    // Pass email, firstName, and lastName to the password screen
    router.push({
      pathname: '/signup/password',
      params: { email, firstName, lastName }
    });
  };

  const handleBack = () => {
    router.back();
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // Sign-in successful - user will be redirected automatically by AuthProvider
    } catch (error: any) {
      Alert.alert('Google Sign-Up Error', error.message || 'An error occurred during Google sign-up');
    }
  };

  const handleAppleSignIn = async () => {
    try {
      await signInWithApple();
      // Sign-in successful - user will be redirected automatically by AuthProvider
    } catch (error: any) {
      Alert.alert('Apple Sign-Up Error', error.message || 'An error occurred during Apple sign-up');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#667eea" />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={styles.progressStepActive} />
          <View style={styles.progressStepActive} />
          <View style={styles.progressStep} />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationCircle}>
            <Ionicons name="mail" size={40} color="#667eea" />
          </View>
        </View>

        <Text style={styles.title}>Your Email</Text>
        <Text style={styles.subtitle}>We'll send a confirmation to this address</Text>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.textInputContainer}>
            <Ionicons name="mail-outline" size={20} color="#9CA3AF" style={styles.textInputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="john.doe@example.com"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              enablesReturnKeyAutomatically={true}
              returnKeyType="next"
              editable={true}
            />
          </View>
        </View>

        {/* Navigation Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            disabled={!email || !/^\S+@\S+\.\S+$/.test(email)}
          >
            <Text style={styles.nextButtonText}>Next</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or sign up with</Text>
          <View style={styles.divider} />
        </View>

        {/* Social Signup Buttons */}
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity
            style={[styles.socialLoginButton, styles.googleButton]}
            onPress={handleGoogleSignIn}
          >
            <Ionicons name="logo-google" size={20} color="#DB4437" style={styles.socialIcon} />
            <Text style={styles.socialLoginText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialLoginButton, styles.appleButton]}
            onPress={handleAppleSignIn}
          >
            <Ionicons name="logo-apple" size={20} color="#FFFFFF" style={styles.socialIcon} />
            <Text style={[styles.socialLoginText, styles.appleButtonText]}>Apple</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 20,
  },
  progressStep: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 2,
    borderRadius: 2,
  },
  progressStepActive: {
    flex: 1,
    height: 4,
    backgroundColor: '#667eea',
    marginHorizontal: 2,
    borderRadius: 2,
  },
  mainContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  illustrationContainer: {
    marginBottom: 30,
  },
  illustrationCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    height: 50,
  },
  textInputContainerFocused: {
    borderColor: '#667eea',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    padding: 0,
    minHeight: 40,
  },
  textInputIcon: {
    marginRight: 10,
  },
  buttonContainer: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: '#667eea',
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  socialLoginButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
  },
  appleButton: {
    backgroundColor: '#000000',
  },
  socialIcon: {
    marginRight: 8,
  },
  socialLoginText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '600',
  },
  appleButtonText: {
    color: '#FFFFFF',
  },
});