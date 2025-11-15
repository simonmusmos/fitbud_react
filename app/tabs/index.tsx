import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [streak, setStreak] = useState(7);
  const [steps, setSteps] = useState(8432);
  const [calories, setCalories] = useState(420);
  const [water, setWater] = useState(4);
  const [sleep, setSleep] = useState(7.2);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const achievements = [
    { icon: 'flame', title: 'Active Streak', value: `${streak} days`, color: '#FF6B6B' },
    { icon: 'walk', title: 'Steps', value: `${steps}`, color: '#4ECDC4' },
    { icon: 'flame', title: 'Calories', value: `${calories}`, color: '#FFE66D' },
    { icon: 'water', title: 'Water', value: `${water}/8 cups`, color: '#1A936F' },
  ];

  const weeklyProgress = [
    { day: 'Mon', value: 80 },
    { day: 'Tue', value: 90 },
    { day: 'Wed', value: 70 },
    { day: 'Thu', value: 85 },
    { day: 'Fri', value: 95 },
    { day: 'Sat', value: 100 },
    { day: 'Sun', value: 75 },
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh}
          colors={['#667eea']}
        />
      }
    >
      {/* Header */}
      <ThemedView style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <ThemedText type="defaultSemiBold">Good morning,</ThemedText>
            <ThemedText type="title">Alex!</ThemedText>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle-outline" size={40} color="#667eea" />
          </TouchableOpacity>
        </View>
        
        <ThemedView style={styles.quoteContainer}>
          <Ionicons name="diamond-outline" size={20} color="#667eea" />
          <ThemedText type="subtitle" style={styles.quote}>
            "Your body can do it — it's your mind you need to convince."
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Stats Overview */}
      <ThemedView style={styles.statsContainer}>
        <ThemedText type="title" style={styles.statsTitle}>Today's Stats</ThemedText>
        <View style={styles.statsGrid}>
          {achievements.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.statCard, { borderColor: item.color }]}
            >
              <View style={styles.statIcon}>
                <Ionicons name={item.icon as any} size={24} color={item.color} />
              </View>
              <View style={styles.statInfo}>
                <ThemedText style={[styles.statValue, { color: item.color }]}>
                  {item.value}
                </ThemedText>
                <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ThemedView>

      {/* Weekly Progress */}
      <ThemedView style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <ThemedText type="title" style={styles.progressTitle}>Weekly Progress</ThemedText>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.progressGraph}>
          {weeklyProgress.map((day, index) => (
            <View key={index} style={styles.dayContainer}>
              <View style={styles.dayBar}>
                <View
                  style={[
                    styles.barFill,
                    { height: `${day.value}%`, backgroundColor: '#667eea' }
                  ]}
                />
              </View>
              <Text style={styles.dayLabel}>{day.day}</Text>
            </View>
          ))}
        </View>
      </ThemedView>

      {/* Quick Actions */}
      <ThemedView style={styles.actionsContainer}>
        <ThemedText type="title" style={styles.actionsTitle}>Quick Actions</ThemedText>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#667eea' }]}>
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </View>
            <ThemedText type="defaultSemiBold">New Workout</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#4ECDC4' }]}>
              <Ionicons name="checkmark-done" size={24} color="#FFFFFF" />
            </View>
            <ThemedText type="defaultSemiBold">Log Meal</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#FF6B6B' }]}>
              <Ionicons name="water" size={24} color="#FFFFFF" />
            </View>
            <ThemedText type="defaultSemiBold">Log Water</ThemedText>
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
    padding: 16,
    paddingBottom: 30,
  },
  header: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    padding: 12,
    borderRadius: 12,
  },
  quote: {
    marginLeft: 10,
    fontSize: 14,
    lineHeight: 20,
    color: '#667eea',
  },
  statsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  statsTitle: {
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  progressContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressTitle: {
    marginBottom: 0,
  },
  progressGraph: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: 10,
  },
  dayContainer: {
    alignItems: 'center',
    flex: 1,
  },
  dayBar: {
    width: 20,
    height: 100,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 10,
  },
  dayLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#6B7280',
  },
  actionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  actionsTitle: {
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    width: '30%',
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
});