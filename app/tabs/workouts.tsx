import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function WorkoutsScreen() {
  const [activeTab, setActiveTab] = useState('today');

  const workoutTypes = [
    { id: 1, name: 'Cardio', icon: 'flame', color: '#FF6B6B', count: 12 },
    { id: 2, name: 'Strength', icon: 'barbell', color: '#4ECDC4', count: 8 },
    { id: 3, name: 'Yoga', icon: 'leaf', color: '#FFE66D', count: 5 },
    { id: 4, name: 'HIIT', icon: 'speedometer', color: '#1A936F', count: 15 },
  ];

  const todayWorkouts = [
    { id: 1, name: 'Morning Run', duration: '30 min', calories: 320, type: 'Cardio' },
    { id: 2, name: 'Chest & Triceps', duration: '45 min', calories: 280, type: 'Strength' },
    { id: 3, name: 'Evening Yoga', duration: '20 min', calories: 120, type: 'Yoga' },
  ];

  const upcomingWorkouts = [
    { id: 4, name: 'Leg Day', duration: '60 min', date: 'Tomorrow', type: 'Strength' },
    { id: 5, name: 'HIIT Circuit', duration: '30 min', date: 'Dec 15', type: 'HIIT' },
  ];

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.workoutCard}>
      <View style={styles.workoutHeader}>
        <View style={[styles.workoutType, { backgroundColor: workoutTypes.find(t => t.name === item.type)?.color + '20' }]}>
          <Ionicons 
            name={workoutTypes.find(t => t.name === item.type)?.icon as any || 'fitness'} 
            size={20} 
            color={workoutTypes.find(t => t.name === item.type)?.color} 
          />
          <Text style={[styles.workoutTypeText, { color: workoutTypes.find(t => t.name === item.type)?.color }]}>
            {item.type}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#6B7280" />
      </View>
      <ThemedText type="title" style={styles.workoutName}>{item.name}</ThemedText>
      <View style={styles.workoutDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="time" size={16} color="#6B7280" />
          <Text style={styles.detailText}>{item.duration}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="flame" size={16} color="#6B7280" />
          <Text style={styles.detailText}>{item.calories || 0} cal</Text>
        </View>
        {item.date && (
          <View style={styles.detailItem}>
            <Ionicons name="calendar" size={16} color="#6B7280" />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title">Workouts</ThemedText>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </ThemedView>

      {/* Stats Overview */}
      <ThemedView style={styles.statsContainer}>
        <View style={styles.statsRow}>
          {workoutTypes.map((type) => (
            <View key={type.id} style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: type.color + '20' }]}>
                <Ionicons name={type.icon as any} size={24} color={type.color} />
              </View>
              <ThemedText style={styles.statCount}>{type.count}</ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.statLabel}>{type.name}</ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'today' && styles.activeTab]}
          onPress={() => setActiveTab('today')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'today' && styles.activeTabText]}>Today</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>Upcoming</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Workouts List */}
      <ThemedView style={styles.workoutsContainer}>
        <FlatList
          data={activeTab === 'today' ? todayWorkouts : upcomingWorkouts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.workoutsList}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </ThemedView>

      {/* Quick Actions */}
      <ThemedView style={styles.quickActionsContainer}>
        <ThemedText type="title" style={styles.quickActionsTitle}>Quick Actions</ThemedText>
        <View style={styles.quickActionsRow}>
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#667eea' }]}>
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </View>
            <ThemedText type="defaultSemiBold">New Workout</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#4ECDC4' }]}>
              <Ionicons name="timer" size={24} color="#FFFFFF" />
            </View>
            <ThemedText type="defaultSemiBold">Timer</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#FF6B6B' }]}>
              <Ionicons name="musical-notes" size={24} color="#FFFFFF" />
            </View>
            <ThemedText type="defaultSemiBold">Music</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 20,
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    width: '22%',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statCount: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#6B7280',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#667eea',
  },
  tabText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  workoutsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  workoutsList: {
    paddingBottom: 10,
  },
  workoutCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    marginBottom: 12,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  workoutType: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  workoutTypeText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '600',
  },
  workoutName: {
    marginBottom: 12,
  },
  workoutDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#6B7280',
  },
  separator: {
    height: 12,
  },
  quickActionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  quickActionsTitle: {
    marginBottom: 15,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    alignItems: 'center',
    width: '30%',
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
});