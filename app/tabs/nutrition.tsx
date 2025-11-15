import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function NutritionScreen() {
  const [activeTab, setActiveTab] = useState('today');

  const nutritionGoals = [
    { name: 'Calories', current: 1850, goal: 2200, unit: 'kcal', color: '#667eea' },
    { name: 'Protein', current: 140, goal: 160, unit: 'g', color: '#4ECDC4' },
    { name: 'Carbs', current: 220, goal: 250, unit: 'g', color: '#FFE66D' },
    { name: 'Fat', current: 68, goal: 75, unit: 'g', color: '#FF6B6B' },
  ];

  const todayMeals = [
    { 
      id: 1, 
      name: 'Breakfast: Oatmeal with Berries', 
      calories: 380, 
      time: '8:30 AM',
      foods: ['Oatmeal', 'Blueberries', 'Almonds']
    },
    { 
      id: 2, 
      name: 'Lunch: Grilled Chicken Salad', 
      calories: 420, 
      time: '1:15 PM',
      foods: ['Chicken', 'Mixed Greens', 'Avocado', 'Olive Oil']
    },
    { 
      id: 3, 
      name: 'Snack: Greek Yogurt', 
      calories: 150, 
      time: '4:00 PM',
      foods: ['Greek Yogurt', 'Honey', 'Walnuts']
    },
    { 
      id: 4, 
      name: 'Dinner: Salmon with Veggies', 
      calories: 580, 
      time: '7:30 PM',
      foods: ['Salmon', 'Broccoli', 'Sweet Potato', 'Olive Oil']
    },
  ];

  const renderMeal = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.mealCard}>
      <View style={styles.mealHeader}>
        <ThemedText type="title" style={styles.mealName}>{item.name}</ThemedText>
        <View style={styles.mealTime}>
          <Ionicons name="time" size={14} color="#6B7280" />
          <Text style={styles.mealTimeText}>{item.time}</Text>
        </View>
      </View>
      <View style={styles.mealContent}>
        <View style={styles.caloriesContainer}>
          <Ionicons name="flame" size={16} color="#6B7280" />
          <Text style={styles.caloriesText}>{item.calories} kcal</Text>
        </View>
        <View style={styles.foodList}>
          {item.foods.map((food: string, index: number) => (
            <View key={index} style={styles.foodTag}>
              <Text style={styles.foodTagText}>{food}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderGoalCard = (goal: any) => {
    const percentage = Math.min(100, (goal.current / goal.goal) * 100);
    
    return (
      <View style={styles.goalCard}>
        <View style={styles.goalHeader}>
          <ThemedText type="defaultSemiBold">{goal.name}</ThemedText>
          <ThemedText type="defaultSemiBold">{goal.current}/{goal.goal} {goal.unit}</ThemedText>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${percentage}%` },
                { backgroundColor: goal.color }
              ]} 
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title">Nutrition</ThemedText>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </ThemedView>

      {/* Nutrition Goals */}
      <ThemedView style={styles.goalsContainer}>
        <ThemedText type="title" style={styles.goalsTitle}>Today's Goals</ThemedText>
        {nutritionGoals.map((goal, index) => (
          <View key={index}>
            {renderGoalCard(goal)}
            {index < nutritionGoals.length - 1 && <View style={styles.goalSeparator} />}
          </View>
        ))}
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
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>History</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Meals List */}
      <ThemedView style={styles.mealsContainer}>
        <View style={styles.mealsHeader}>
          <ThemedText type="title">Meals</ThemedText>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={todayMeals}
          renderItem={renderMeal}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.mealsList}
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
            <ThemedText type="defaultSemiBold">Log Meal</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#4ECDC4' }]}>
              <Ionicons name="water" size={24} color="#FFFFFF" />
            </View>
            <ThemedText type="defaultSemiBold">Water</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#FF6B6B' }]}>
              <Ionicons name="nutrition" size={24} color="#FFFFFF" />
            </View>
            <ThemedText type="defaultSemiBold">Scan</ThemedText>
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
  goalsContainer: {
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
  goalsTitle: {
    marginBottom: 15,
  },
  goalCard: {
    marginBottom: 15,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 8,
  },
  progressBarBackground: {
    flex: 1,
    height: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  goalSeparator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 10,
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
  mealsContainer: {
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
  mealsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  mealsList: {
    paddingBottom: 10,
  },
  mealCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    marginBottom: 12,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  mealName: {
    flex: 1,
    marginRight: 10,
  },
  mealTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  mealTimeText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#6B7280',
  },
  mealContent: {
    alignItems: 'flex-start',
  },
  caloriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  caloriesText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#6B7280',
  },
  foodList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  foodTag: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  foodTagText: {
    fontSize: 12,
    color: '#667eea',
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