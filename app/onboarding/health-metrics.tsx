import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HealthMetricsScreen() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState<string | null>(null);
  const [injuries, setInjuries] = useState('');
  
  const router = useRouter();

  const activityLevels = [
    { id: 'sedentary', title: 'Sedentary', description: 'Little to no exercise' },
    { id: 'light', title: 'Light', description: 'Exercise 1-2 days/week' },
    { id: 'moderate', title: 'Moderate', description: 'Exercise 3-4 days/week' },
    { id: 'active', title: 'Active', description: 'Exercise 5-6 days/week' },
    { id: 'very-active', title: 'Very Active', description: 'Daily exercise' },
  ];

  const handleNext = () => {
    if (!height || !weight || !activityLevel) {
      alert('Please fill in all required fields');
      return;
    }
    router.push('/onboarding/workout-preferences');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#667eea" />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={styles.progressStepActive} />
          <View style={styles.progressStepActive} />
          <View style={styles.progressStepActive} />
          <View style={styles.progressStep} />
          <View style={styles.progressStep} />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationCircle}>
            <Ionicons name="analytics" size={40} color="#667eea" />
          </View>
        </View>
        
        <Text style={styles.title}>Your Health Metrics</Text>
        <Text style={styles.subtitle}>This helps us create personalized plans for you</Text>

        {/* Height and Weight Inputs */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricInput}>
            <Text style={styles.label}>Height (cm)</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="175"
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
              <Text style={styles.unitText}>cm</Text>
            </View>
          </View>
          
          <View style={styles.metricInput}>
            <Text style={styles.label}>Weight (kg)</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="70"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
              <Text style={styles.unitText}>kg</Text>
            </View>
          </View>
        </View>

        {/* Activity Level */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Activity Level</Text>
          <View style={styles.levelContainer}>
            {activityLevels.map((level) => (
              <TouchableOpacity 
                key={level.id}
                style={[styles.levelOption, activityLevel === level.id && styles.levelOptionSelected]}
                onPress={() => setActivityLevel(level.id)}
              >
                <View style={styles.levelOptionHeader}>
                  <Text style={[styles.levelOptionTitle, activityLevel === level.id && styles.levelOptionTitleSelected]}>
                    {level.title}
                  </Text>
                  {activityLevel === level.id && (
                    <Ionicons name="checkmark-circle" size={20} color="#667eea" />
                  )}
                </View>
                <Text style={[styles.levelOptionDescription, activityLevel === level.id && styles.levelOptionDescriptionSelected]}>
                  {level.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Injury Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Any injuries or limitations?</Text>
          <Text style={styles.labelDescription}>List any injuries or medical conditions we should consider</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="e.g., previous knee injury, back problems..."
              value={injuries}
              onChangeText={setInjuries}
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButtonStyle} onPress={handleBack}>
            <Ionicons name="arrow-back" size={20} color="#667eea" />
            <Text style={styles.backButtonText}>Back</Text>
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
    marginBottom: 30,
    lineHeight: 22,
  },
  metricsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  metricInput: {
    width: '48%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  labelDescription: {
    fontSize: 14,
    color: '#6B7280',
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
  unitText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 30,
  },
  levelContainer: {
    flexDirection: 'column',
  },
  levelOption: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  levelOptionSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#667eea',
  },
  levelOptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  levelOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  levelOptionTitleSelected: {
    color: '#667eea',
  },
  levelOptionDescription: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  levelOptionDescriptionSelected: {
    color: '#667eea',
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    minHeight: 100,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 'auto',
    paddingTop: 20,
  },
  backButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
    marginLeft: 8,
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