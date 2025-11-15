import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { useAuth } from '@/components/auth-provider';
import { useRequireAuth } from '@/hooks/use-auth-redirect';
import { Ionicons } from '@expo/vector-icons';

export default function ExploreScreen() {
  useRequireAuth(); // Redirect to login if not authenticated
  const { logout } = useAuth();

  const categories = [
    { id: '1', title: 'Cardio', icon: 'pulse', color: '#F59E0B' },
    { id: '2', title: 'Strength', icon: 'barbell', color: '#EF4444' },
    { id: '3', title: 'Yoga', icon: 'body', color: '#10B981' },
    { id: '4', title: 'HIIT', icon: 'flash', color: '#8B5CF6' },
    { id: '5', title: 'Pilates', icon: 'walk', color: '#06B6D4' },
    { id: '6', title: 'CrossFit', icon: 'fitness', color: '#F97316' },
  ];

  const workouts = [
    { id: '1', title: 'Morning Cardio Blast', duration: '30 min', level: 'Beginner' },
    { id: '2', title: 'Upper Body Strength', duration: '45 min', level: 'Intermediate' },
    { id: '3', title: 'Evening Yoga Flow', duration: '60 min', level: 'Beginner' },
    { id: '4', title: 'HIIT Bootcamp', duration: '25 min', level: 'Advanced' },
  ];

  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity style={[styles.categoryCard, { borderColor: item.color }]}>
      <View style={[styles.categoryIcon, { backgroundColor: `${item.color}20` }]}>
        <Ionicons name={item.icon as any} size={24} color={item.color} />
      </View>
      <Text style={styles.categoryTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderWorkout = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.workoutCard}>
      <View style={styles.workoutHeader}>
        <Text style={styles.workoutTitle}>{item.title}</Text>
        <View style={[styles.levelBadge, item.level === 'Beginner' ? styles.beginnerBadge : 
          item.level === 'Intermediate' ? styles.intermediateBadge : styles.advancedBadge]}>
          <Text style={styles.levelText}>{item.level}</Text>
        </View>
      </View>
      <Text style={styles.workoutDuration}>{item.duration}</Text>
      <View style={styles.workoutActions}>
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton}>
          <Ionicons name="bookmark-outline" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Search workouts...</Text>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
          scrollEnabled={true}
        />

        {/* Popular Workouts */}
        <Text style={styles.sectionTitle}>Popular Workouts</Text>
        <View style={styles.workoutsContainer}>
          {workouts.map((workout) => (
            <TouchableOpacity key={workout.id} style={styles.workoutCard}>
              <View style={styles.workoutHeader}>
                <Text style={styles.workoutTitle}>{workout.title}</Text>
                <View style={[styles.levelBadge, 
                  workout.level === 'Beginner' ? styles.beginnerBadge : 
                  workout.level === 'Intermediate' ? styles.intermediateBadge : styles.advancedBadge]}>
                  <Text style={styles.levelText}>{workout.level}</Text>
                </View>
              </View>
              <Text style={styles.workoutDuration}>{workout.duration}</Text>
              <View style={styles.workoutActions}>
                <TouchableOpacity style={styles.startButton}>
                  <Text style={styles.startButtonText}>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton}>
                  <Ionicons name="bookmark-outline" size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
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
  scrollView: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchPlaceholder: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  categoriesList: {
    paddingBottom: 10,
  },
  categoryCard: {
    width: 100,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  workoutsContainer: {
    marginBottom: 20,
  },
  workoutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  levelBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  beginnerBadge: {
    backgroundColor: '#D1FAE5',
  },
  intermediateBadge: {
    backgroundColor: '#FEF3C7',
  },
  advancedBadge: {
    backgroundColor: '#FEE2E2',
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
  },
  workoutDuration: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  workoutActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    padding: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#FEE2E2',
    borderRadius: 10,
  },
});