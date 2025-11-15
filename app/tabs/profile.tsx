import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  
  const profileData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    height: '175 cm',
    weight: '72 kg',
    age: '28',
    gender: 'Male',
    goal: 'Build Muscle',
  };

  const stats = [
    { name: 'Workouts', value: 24, icon: 'barbell', color: '#667eea' },
    { name: 'Calories', value: 6540, icon: 'flame', color: '#FF6B6B' },
    { name: 'Steps', value: 42500, icon: 'walk', color: '#4ECDC4' },
    { name: 'Streak', value: 7, icon: 'fire', color: '#FFE66D' },
  ];

  const settings = [
    { name: 'Account Settings', icon: 'person', color: '#667eea' },
    { name: 'Notifications', icon: 'notifications', color: '#4ECDC4' },
    { name: 'Privacy', icon: 'lock-closed', color: '#FF6B6B' },
    { name: 'Appearance', icon: 'color-palette', color: '#FFE66D' },
    { name: 'Health Data', icon: 'heart', color: '#1A936F' },
    { name: 'Support', icon: 'help-circle', color: '#6B7280' },
  ];

  const renderStatCard = (stat: any) => (
    <TouchableOpacity style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
        <Ionicons name={stat.icon as any} size={24} color={stat.color} />
      </View>
      <View style={styles.statInfo}>
        <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
        <ThemedText type="defaultSemiBold">{stat.name}</ThemedText>
      </View>
    </TouchableOpacity>
  );

  const renderSettingItem = (setting: any) => (
    <TouchableOpacity style={styles.settingItem}>
      <View style={[styles.settingIcon, { backgroundColor: setting.color + '20' }]}>
        <Ionicons name={setting.icon as any} size={20} color={setting.color} />
      </View>
      <ThemedText type="defaultSemiBold" style={styles.settingText}>{setting.name}</ThemedText>
      <Ionicons name="chevron-forward" size={20} color="#6B7280" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with gradient background */}
      <View style={styles.headerGradient}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(!isEditing)}>
            <Ionicons name={isEditing ? 'checkmark' : 'create'} size={20} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.profileInfo}>
            <TouchableOpacity style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                style={styles.avatar}
              />
              <View style={styles.cameraIcon}>
                <Ionicons name="camera" size={16} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
            
            <ThemedText style={styles.profileName}>{profileData.name}</ThemedText>
            <ThemedText style={styles.profileEmail}>{profileData.email}</ThemedText>
          </View>
        </View>
      </View>
      
      <ScrollView style={styles.contentScrollView} contentContainerStyle={styles.content}>

      {/* Stats Overview */}
      <ThemedView style={styles.statsContainer}>
        <ThemedText type="title" style={styles.statsTitle}>Your Stats</ThemedText>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => renderStatCard(stat))}
        </View>
      </ThemedView>

      {/* Profile Info */}
      <ThemedView style={styles.infoContainer}>
        <View style={styles.infoHeader}>
          <ThemedText type="title">Profile Information</ThemedText>
          <TouchableOpacity>
            <Ionicons name="create" size={20} color="#667eea" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.infoList}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Height</Text>
            <Text style={styles.infoValue}>{profileData.height}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Weight</Text>
            <Text style={styles.infoValue}>{profileData.weight}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Age</Text>
            <Text style={styles.infoValue}>{profileData.age}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Gender</Text>
            <Text style={styles.infoValue}>{profileData.gender}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Goal</Text>
            <Text style={styles.infoValue}>{profileData.goal}</Text>
          </View>
        </View>
      </ThemedView>

      {/* Settings */}
      <ThemedView style={styles.settingsContainer}>
        <ThemedText type="title" style={styles.settingsTitle}>Settings</ThemedText>
        {settings.map((setting, index) => (
          <React.Fragment key={index}>
            {renderSettingItem(setting)}
            {index < settings.length - 1 && <View style={styles.settingSeparator} />}
          </React.Fragment>
        ))}
      </ThemedView>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <View style={styles.logoutIcon}>
          <Ionicons name="log-out" size={20} color="#FF6B6B" />
        </View>
        <ThemedText style={styles.logoutText}>Log Out</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  contentScrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 50,
  },
  headerGradient: {
    padding: 30,
    paddingTop: 60,
    alignItems: 'center',
    position: 'relative',
    minHeight: 250,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  editButton: {
    alignSelf: 'flex-end',
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  statsContainer: {
    marginHorizontal: 20,
    marginTop: -30,
    zIndex: 1,
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    marginBottom: 12,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  infoContainer: {
    marginHorizontal: 20,
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
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoList: {
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  settingsContainer: {
    marginHorizontal: 20,
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
  settingsTitle: {
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  settingSeparator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 4,
  },
  logoutButton: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FEF2F2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
});