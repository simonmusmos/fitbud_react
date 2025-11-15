import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function FitnessGoalsScreen() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<string | null>(null);
  
  const router = useRouter();

  const fitnessGoals = [
    { id: 'weight-loss', title: 'Weight Loss', icon: 'scale' },
    { id: 'muscle-gain', title: 'Muscle Gain', icon: 'barbell' },
    { id: 'strength', title: 'Strength', icon: 'fitness' },
    { id: 'endurance', title: 'Endurance', icon: 'walk' },
    { id: 'flexibility', title: 'Flexibility', icon: 'body' },
    { id: 'overall-fitness', title: 'Overall Fitness', icon: 'heart' },
  ];

  const experienceLevels = [
    { id: 'beginner', title: 'Beginner' },
    { id: 'intermediate', title: 'Intermediate' },
    { id: 'advanced', title: 'Advanced' },
  ];

  const toggleGoal = (id: string) => {
    if (selectedGoals.includes(id)) {
      setSelectedGoals(selectedGoals.filter(goal => goal !== id));
    } else {
      setSelectedGoals([...selectedGoals, id]);
    }
  };

  const selectExperience = (level: string) => {
    setExperienceLevel(level);
  };

  const handleNext = () => {
    if (selectedGoals.length === 0 || !experienceLevel) {
      alert('Please select at least one goal and your experience level');
      return;
    }
    router.push('/onboarding/health-metrics');
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
          <View style={styles.progressStep} />
          <View style={styles.progressStep} />
          <View style={styles.progressStep} />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationCircle}>
            <Ionicons name="flag" size={40} color="#667eea" />
          </View>
        </View>
        
        <Text style={styles.title}>What are your fitness goals?</Text>
        <Text style={styles.subtitle}>Select all that apply</Text>

        {/* Fitness Goals */}
        <View style={styles.goalsContainer}>
          {fitnessGoals.map((goal) => (
            <TouchableOpacity 
              key={goal.id}
              style={[styles.goalOption, selectedGoals.includes(goal.id) && styles.goalOptionSelected]}
              onPress={() => toggleGoal(goal.id)}
            >
              <View style={[styles.goalCircle, selectedGoals.includes(goal.id) && styles.goalCircleSelected]}>
                <Ionicons 
                  name={goal.icon as any} 
                  size={24} 
                  color={selectedGoals.includes(goal.id) ? "#FFFFFF" : "#667eea"} 
                />
              </View>
              <Text style={[styles.goalText, selectedGoals.includes(goal.id) && styles.goalTextSelected]}>
                {goal.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Experience Level */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Your Experience Level</Text>
          <View style={styles.levelContainer}>
            {experienceLevels.map((level) => (
              <TouchableOpacity 
                key={level.id}
                style={[styles.levelOption, experienceLevel === level.id && styles.levelOptionSelected]}
                onPress={() => selectExperience(level.id)}
              >
                <Text style={[styles.levelOptionText, experienceLevel === level.id && styles.levelOptionTextSelected]}>
                  {level.title}
                </Text>
              </TouchableOpacity>
            ))}
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
  goalsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  goalOption: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  goalOptionSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#667eea',
  },
  goalCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  goalCircleSelected: {
    backgroundColor: '#667eea',
  },
  goalText: {
    fontSize: 14,
    color: '#6B7280',
  },
  goalTextSelected: {
    color: '#667eea',
    fontWeight: '600',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  levelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelOption: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    alignItems: 'center',
  },
  levelOptionSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#667eea',
  },
  levelOptionText: {
    fontSize: 16,
    color: '#6B7280',
  },
  levelOptionTextSelected: {
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