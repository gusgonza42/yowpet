import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';
import { useRequest } from '@/services/api/fetchingdata';
import { userService } from '@/services/profile/userService';
import { PlannerHome } from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


export function DailyPlans() {
  const { requestData } = useRequest();
  const [todayReminders, setTodayReminders] = useState([]);

  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

  const fetchTodayReminders = async () => {
    try {
      const userId = await userService.getUserIdFromToken();
      const response = await requestData('GET', `/agenda?date=${today}&user=${userId}`);
      setTodayReminders(response.data || []);
    } catch (error) {
      console.log('Error fetching today\'s reminders:', error);
      setTodayReminders([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTodayReminders();
    }, [])
  );


  return (
    <View style={PlannerHome.section}>
      <Text style={PlannerHome.sectionTitle}>Planes para hoy</Text>

      {todayReminders.length > 0 ? (
        todayReminders.map((reminder, index) => (
          <View key={index} style={PlannerHome.planCard}>
            <View style={PlannerHome.planIcon}>
              <MaterialCommunityIcons
                name="calendar-clock"
                size={24}
                color={YowPetTheme.status.info}
              />
            </View>
            <View style={PlannerHome.planInfo}>
              <Text style={PlannerHome.planTitle}>{reminder.title}</Text>
            </View>
          </View>
        ))
      ) : (
        <Text style={{ color: YowPetTheme.text.softText }}>No hay planes para hoy.</Text>
      )}
    </View>
  );
}
