import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/components/auth-provider';
import { LoadingSpinner } from '@/components/loading-spinner';

export default function SignUpPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { signup } = useAuth();
  const { email, firstName, lastName } = useLocalSearchParams(); // Get params from previous screen

  const handleSignUp = async () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in both password fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    try {
      // Use the email and name values passed from the previous screen
      await signup(email as string, password, firstName as string, lastName as string);
      // Signup successful - user will be redirected automatically by AuthProvider
    } catch (error: any) {
      Alert.alert('Signup Error', error.message || 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
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
          <View style={styles.progressStepActive} />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationCircle}>
            <Ionicons name="lock-closed" size={40} color="#667eea" />
          </View>
        </View>
        
        <Text style={styles.title}>Create Password</Text>
        <Text style={styles.subtitle}>Secure your account with a strong password</Text>

        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.textInputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.textInputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              selectTextOnFocus={true}
              enablesReturnKeyAutomatically={true}
              returnKeyType="next"
              editable={true}
            />
            <TouchableOpacity
              style={styles.passwordVisibilityButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.textInputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.textInputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              selectTextOnFocus={true}
              enablesReturnKeyAutomatically={true}
              returnKeyType="done"
              editable={true}
            />
            <TouchableOpacity
              style={styles.passwordVisibilityButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Password Requirements */}
        <View style={styles.requirementsContainer}>
          <View style={styles.requirementItem}>
            <Ionicons 
              name={password.length >= 6 ? "checkmark-circle" : "ellipse-outline"} 
              size={16} 
              color={password.length >= 6 ? "#10B981" : "#9CA3AF"} 
            />
            <Text style={[styles.requirementText, { color: password.length >= 6 ? "#10B981" : "#9CA3AF" }]}>
              At least 6 characters
            </Text>
          </View>
          <View style={styles.requirementItem}>
            <Ionicons 
              name={/(?=.*[a-z])/.test(password) ? "checkmark-circle" : "ellipse-outline"} 
              size={16} 
              color={/(?=.*[a-z])/.test(password) ? "#10B981" : "#9CA3AF"} 
            />
            <Text style={[styles.requirementText, { color: password.length >= 1 && /(?=.*[a-z])/.test(password) ? "#10B981" : "#9CA3AF" }]}>
              Contains lowercase letter
            </Text>
          </View>
          <View style={styles.requirementItem}>
            <Ionicons 
              name={/(?=.*[A-Z])/.test(password) ? "checkmark-circle" : "ellipse-outline"} 
              size={16} 
              color={/(?=.*[A-Z])/.test(password) ? "#10B981" : "#9CA3AF"} 
            />
            <Text style={[styles.requirementText, { color: password.length >= 1 && /(?=.*[A-Z])/.test(password) ? "#10B981" : "#9CA3AF" }]}>
              Contains uppercase letter
            </Text>
          </View>
          <View style={styles.requirementItem}>
            <Ionicons 
              name={/(?=.*\d)/.test(password) ? "checkmark-circle" : "ellipse-outline"} 
              size={16} 
              color={/(?=.*\d)/.test(password) ? "#10B981" : "#9CA3AF"} 
            />
            <Text style={[styles.requirementText, { color: password.length >= 1 && /(?=.*\d)/.test(password) ? "#10B981" : "#9CA3AF" }]}>
              Contains number
            </Text>
          </View>
        </View>

        {/* Navigation Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.signUpButton,
              isLoading && styles.signUpButtonDisabled
            ]}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <LoadingSpinner size={20} color="#FFFFFF" />
                <Text style={styles.signUpButtonText}>Creating Account...</Text>
              </View>
            ) : (
              <Text style={styles.signUpButtonText}>Create Account</Text>
            )}
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
    marginBottom: 30,
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
  passwordVisibilityButton: {
    paddingLeft: 10,
  },
  requirementsContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 14,
    marginLeft: 8,
  },
  requirementsContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 30,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 14,
    marginLeft: 8,
  },
  buttonContainer: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
  },
  signUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: '#667eea',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  signUpButtonDisabled: {
    opacity: 0.5,
  },
});