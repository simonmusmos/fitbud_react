import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function NutritionPreferencesScreen() {
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [allergies, setAllergies] = useState('');
  const [waterGoal, setWaterGoal] = useState<number>(8); // glasses per day
  const [trackNutrition, setTrackNutrition] = useState<boolean>(true);
  
  const router = useRouter();

  const dietaryOptions = [
    { id: 'vegetarian', title: 'Vegetarian' },
    { id: 'vegan', title: 'Vegan' },
    { id: 'pescatarian', title: 'Pescatarian' },
    { id: 'keto', title: 'Keto' },
    { id: 'paleo', title: 'Paleo' },
    { id: 'gluten-free', title: 'Gluten Free' },
    { id: 'dairy-free', title: 'Dairy Free' },
    { id: 'low-carb', title: 'Low Carb' },
  ];

  const toggleDietary = (id: string) => {
    if (dietaryPreferences.includes(id)) {
      setDietaryPreferences(dietaryPreferences.filter(pref => pref !== id));
    } else {
      setDietaryPreferences([...dietaryPreferences, id]);
    }
  };

  const handleNext = () => {
    // No validation needed here, all fields are optional
    router.push('/onboarding/completion');
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
          <View style={styles.progressStepActive} />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationCircle}>
            <Ionicons name="nutrition" size={40} color="#667eea" />
          </View>
        </View>
        
        <Text style={styles.title}>Nutrition Preferences</Text>
        <Text style={styles.subtitle}>Help us create personalized nutrition plans for you</Text>

        {/* Dietary Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dietary Preferences</Text>
          <Text style={styles.sectionSubtitle}>Select any dietary restrictions or preferences</Text>
          <View style={styles.dietaryContainer}>
            {dietaryOptions.map((option) => (
              <TouchableOpacity 
                key={option.id}
                style={[styles.dietaryOption, dietaryPreferences.includes(option.id) && styles.dietaryOptionSelected]}
                onPress={() => toggleDietary(option.id)}
              >
                <Text style={[styles.dietaryOptionText, dietaryPreferences.includes(option.id) && styles.dietaryOptionTextSelected]}>
                  {option.title}
                </Text>
                {dietaryPreferences.includes(option.id) && (
                  <Ionicons name="checkmark" size={16} color="#667eea" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Allergies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Food Allergies</Text>
          <Text style={styles.sectionSubtitle}>List any food allergies or sensitivities</Text>
          <View style={styles.textAreaContainer}>
            <Text style={styles.textAreaPlaceholder}>
              {allergies || 'e.g., nuts, shellfish, lactose...'}
            </Text>
          </View>
        </View>

        {/* Water Goal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Water Goal</Text>
          <Text style={styles.sectionSubtitle}>How many glasses of water per day?</Text>
          
          <View style={styles.waterGoalContainer}>
            <TouchableOpacity 
              style={styles.waterButton} 
              onPress={() => setWaterGoal(prev => Math.max(1, prev - 1))}
            >
              <Ionicons name="remove" size={20} color="#667eea" />
            </TouchableOpacity>
            
            <View style={styles.waterValueContainer}>
              <Ionicons name="water" size={24} color="#667eea" />
              <Text style={styles.waterValue}>{waterGoal}</Text>
              <Text style={styles.waterUnit}>glasses</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.waterButton} 
              onPress={() => setWaterGoal(prev => Math.min(16, prev + 1))}
            >
              <Ionicons name="add" size={20} color="#667eea" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tracking Preference */}
        <View style={styles.section}>
          <View style={styles.switchContainer}>
            <View style={styles.switchContent}>
              <Ionicons name="nutrition" size={24} color="#667eea" />
              <View style={styles.switchTextContainer}>
                <Text style={styles.switchTitle}>Track Nutrition</Text>
                <Text style={styles.switchSubtitle}>Enable nutrition tracking features</Text>
              </View>
            </View>
            <Switch
              value={trackNutrition}
              onValueChange={setTrackNutrition}
              trackColor={{ false: '#E5E7EB', true: '#C7D2FE' }}
              thumbColor={trackNutrition ? '#667eea' : '#9CA3AF'}
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
            <Text style={styles.nextButtonText}>Get Started</Text>
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
  dietaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dietaryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  dietaryOptionSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#667eea',
  },
  dietaryOptionText: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 6,
  },
  dietaryOptionTextSelected: {
    color: '#667eea',
    fontWeight: '600',
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    padding: 16,
    backgroundColor: '#FFFFFF',
    minHeight: 100,
    justifyContent: 'center',
  },
  textAreaPlaceholder: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  waterGoalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  waterButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  waterValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  waterValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginHorizontal: 12,
  },
  waterUnit: {
    fontSize: 16,
    color: '#6B7280',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  switchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  switchTextContainer: {
    marginLeft: 12,
  },
  switchTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  switchSubtitle: {
    fontSize: 14,
    color: '#6B7280',
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