import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SignUpNameScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const router = useRouter();

  const handleNext = () => {
    if (!firstName || !lastName) {
      Alert.alert('Error', 'Please enter both first and last name');
      return;
    }
    // Pass the name values to the email screen
    router.push({
      pathname: '/signup/email',
      params: { firstName, lastName }
    });
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
          <View style={styles.progressStep} />
          <View style={styles.progressStep} />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationCircle}>
            <Ionicons name="person" size={40} color="#667eea" />
          </View>
        </View>
        
        <Text style={styles.title}>Create Your Account</Text>
        <Text style={styles.subtitle}>Let's start with your name</Text>

        {/* Input Fields */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name</Text>
          <View style={styles.textInputContainer}>
            <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.textInputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="John"
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor="#9CA3AF"
              selectTextOnFocus={true}
              enablesReturnKeyAutomatically={true}
              returnKeyType="next"
              editable={true}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <View style={styles.textInputContainer}>
            <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.textInputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Doe"
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor="#9CA3AF"
              selectTextOnFocus={true}
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
            disabled={!firstName || !lastName}
          >
            <Text style={styles.nextButtonText}>Next</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
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
    opacity: 1,
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
});