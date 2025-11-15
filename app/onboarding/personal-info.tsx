import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PersonalInfoScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other' | null>(null);
  
  const router = useRouter();

  const handleNext = () => {
    if (!firstName || !lastName || !dateOfBirth || !gender) {
      alert('Please fill in all fields');
      return;
    }
    router.push('/onboarding/fitness-goals');
  };

  const handleSkip = () => {
    router.push('/onboarding/fitness-goals');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#6B7280" />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={styles.progressStepActive} />
          <View style={styles.progressStep} />
          <View style={styles.progressStep} />
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
        
        <Text style={styles.title}>Tell us about yourself</Text>
        <Text style={styles.subtitle}>This will help us personalize your fitness experience</Text>

        {/* Input Fields */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="John"
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor="#9CA3AF"
            />
            <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.textInputIcon} />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Doe"
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor="#9CA3AF"
            />
            <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.textInputIcon} />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date of Birth</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="MM/DD/YYYY"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              placeholderTextColor="#9CA3AF"
              keyboardType="numbers-and-punctuation"
            />
            <Ionicons name="calendar-outline" size={20} color="#9CA3AF" style={styles.textInputIcon} />
          </View>
        </View>

        {/* Gender Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity 
              style={[styles.genderOption, gender === 'male' && styles.genderOptionSelected]}
              onPress={() => setGender('male')}
            >
              <Ionicons 
                name={gender === 'male' ? "radio-button-on" : "radio-button-off"} 
                size={20} 
                color={gender === 'male' ? "#667eea" : "#9CA3AF"} 
              />
              <Text style={[styles.genderOptionText, gender === 'male' && styles.genderOptionTextSelected]}>Male</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.genderOption, gender === 'female' && styles.genderOptionSelected]}
              onPress={() => setGender('female')}
            >
              <Ionicons 
                name={gender === 'female' ? "radio-button-on" : "radio-button-off"} 
                size={20} 
                color={gender === 'female' ? "#667eea" : "#9CA3AF"} 
              />
              <Text style={[styles.genderOptionText, gender === 'female' && styles.genderOptionTextSelected]}>Female</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.genderOption, gender === 'other' && styles.genderOptionSelected]}
              onPress={() => setGender('other')}
            >
              <Ionicons 
                name={gender === 'other' ? "radio-button-on" : "radio-button-off"} 
                size={20} 
                color={gender === 'other' ? "#667eea" : "#9CA3AF"} 
              />
              <Text style={[styles.genderOptionText, gender === 'other' && styles.genderOptionTextSelected]}>Other</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  closeButton: {
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
    flex: 1,
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
  },
  textInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#1F2937',
  },
  textInputIcon: {
    marginLeft: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  genderOptionSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#667eea',
  },
  genderOptionText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#6B7280',
  },
  genderOptionTextSelected: {
    color: '#667eea',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 'auto',
    paddingTop: 20,
  },
  skipButton: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 14,
    backgroundColor: '#667eea',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
});