import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function WorkoutPreferencesScreen() {
  const [workoutTypes, setWorkoutTypes] = useState<string[]>([]);
  const [preferredTime, setPreferredTime] = useState<string | null>(null);
  const [equipment, setEquipment] = useState<string[]>([]);
  
  const router = useRouter();

  const workoutOptions = [
    { id: 'cardio', title: 'Cardio', icon: 'heart' },
    { id: 'strength', title: 'Strength Training', icon: 'barbell' },
    { id: 'hiit', title: 'HIIT', icon: 'flash' },
    { id: 'yoga', title: 'Yoga', icon: 'leaf' },
    { id: 'pilates', title: 'Pilates', icon: 'fitness' },
    { id: 'boxing', title: 'Boxing', icon: 'fitness-outline' },
  ];

  const timeOptions = [
    { id: 'morning', title: 'Morning', icon: 'sunny' },
    { id: 'afternoon', title: 'Afternoon', icon: 'partly-sunny' },
    { id: 'evening', title: 'Evening', icon: 'moon' },
    { id: 'flexible', title: 'Flexible', icon: 'time' },
  ];

  const equipmentOptions = [
    { id: 'none', title: 'No Equipment' },
    { id: 'dumbbells', title: 'Dumbbells' },
    { id: 'resistance-bands', title: 'Resistance Bands' },
    { id: 'gym', title: 'Gym Access' },
    { id: 'kettlebell', title: 'Kettlebell' },
    { id: 'all', title: 'All Equipment' },
  ];

  const toggleWorkoutType = (id: string) => {
    if (workoutTypes.includes(id)) {
      setWorkoutTypes(workoutTypes.filter(type => type !== id));
    } else {
      setWorkoutTypes([...workoutTypes, id]);
    }
  };

  const toggleEquipment = (id: string) => {
    if (equipment.includes(id)) {
      setEquipment(equipment.filter(item => item !== id));
    } else {
      setEquipment([...equipment, id]);
    }
  };

  const handleNext = () => {
    if (workoutTypes.length === 0 || !preferredTime) {
      alert('Please select at least one workout type and preferred time');
      return;
    }
    router.push('/onboarding/nutrition-preferences');
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
          <View style={styles.progressStepActive} />
          <View style={styles.progressStep} />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationCircle}>
            <Ionicons name="timer" size={40} color="#667eea" />
          </View>
        </View>
        
        <Text style={styles.title}>Your Workout Preferences</Text>
        <Text style={styles.subtitle}>Help us customize your fitness plan</Text>

        {/* Workout Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferred Workout Types</Text>
          <Text style={styles.sectionSubtitle}>Select all that interest you</Text>
          <View style={styles.gridContainer}>
            {workoutOptions.map((option) => (
              <TouchableOpacity 
                key={option.id}
                style={[styles.gridItem, workoutTypes.includes(option.id) && styles.gridItemSelected]}
                onPress={() => toggleWorkoutType(option.id)}
              >
                <View style={[styles.gridItemCircle, workoutTypes.includes(option.id) && styles.gridItemCircleSelected]}>
                  <Ionicons 
                    name={option.icon as any} 
                    size={24} 
                    color={workoutTypes.includes(option.id) ? "#FFFFFF" : "#667eea"} 
                  />
                </View>
                <Text style={[styles.gridItemText, workoutTypes.includes(option.id) && styles.gridItemTextSelected]}>
                  {option.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Preferred Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferred Workout Time</Text>
          <View style={styles.timeContainer}>
            {timeOptions.map((time) => (
              <TouchableOpacity 
                key={time.id}
                style={[styles.timeOption, preferredTime === time.id && styles.timeOptionSelected]}
                onPress={() => setPreferredTime(time.id)}
              >
                <View style={styles.timeOptionContent}>
                  <Ionicons 
                    name={time.icon as any} 
                    size={20} 
                    color={preferredTime === time.id ? "#667eea" : "#9CA3AF"} 
                  />
                  <Text style={[styles.timeOptionText, preferredTime === time.id && styles.timeOptionTextSelected]}>
                    {time.title}
                  </Text>
                </View>
                {preferredTime === time.id && (
                  <Ionicons name="checkmark" size={20} color="#667eea" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Equipment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Equipment</Text>
          <Text style={styles.sectionSubtitle}>Select what you have access to</Text>
          <View style={styles.equipmentContainer}>
            {equipmentOptions.map((item) => (
              <TouchableOpacity 
                key={item.id}
                style={[styles.equipmentOption, equipment.includes(item.id) && styles.equipmentOptionSelected]}
                onPress={() => toggleEquipment(item.id)}
              >
                <Text style={[styles.equipmentOptionText, equipment.includes(item.id) && styles.equipmentOptionTextSelected]}>
                  {item.title}
                </Text>
                {equipment.includes(item.id) && (
                  <Ionicons name="checkmark" size={16} color="#667eea" />
                )}
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
  section: {
    width: '100%',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  gridItemSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#667eea',
  },
  gridItemCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  gridItemCircleSelected: {
    backgroundColor: '#667eea',
  },
  gridItemText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6B7280',
  },
  gridItemTextSelected: {
    color: '#667eea',
    fontWeight: '600',
  },
  timeContainer: {
    flexDirection: 'column',
  },
  timeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  timeOptionSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#667eea',
  },
  timeOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeOptionText: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 10,
  },
  timeOptionTextSelected: {
    color: '#667eea',
    fontWeight: '600',
  },
  equipmentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  equipmentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  equipmentOptionSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#667eea',
  },
  equipmentOptionText: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 6,
  },
  equipmentOptionTextSelected: {
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