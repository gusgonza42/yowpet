import { Calender } from '@/components/Planner/styles';
import { useRequest } from '@/services/api/fetchingdata';
import { YowPetTheme } from '@/theme/Colors';
import { ScreenContainer } from '@components/global/ScreenContainer';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarScreen() {
// Get local date in YYYY-MM-DD format (not UTC)
const formatLocalDate = (date: Date) =>
  date.toLocaleDateString('sv-SE'); // "sv-SE" = ISO-like format (YYYY-MM-DD)

// Usage
const today = formatLocalDate(new Date());

  const [selectedDate, setSelectedDate] = useState(today);
  const [reminders, setReminders] = useState([]);
  const { requestData,responseData, loading } = useRequest();

const fetchRemindersForDate = async (date: string) => {
  try {
    const data = await requestData('GET', `/agenda?date=${date}`);
    setReminders(data.data || []);
  } catch (error) {
    console.log('Error fetching reminders:', error);
    setReminders([]);
  }
};



const handleChooseDate = async (dateString: string) => {
  setSelectedDate(dateString);
  await fetchRemindersForDate(dateString); // dateString is already in YYYY-MM-DD
};



  // Automatically fetch reminders for today on mount
  useEffect(() => {
    fetchRemindersForDate(today);
  }, []);

  return (
      <View style={Calender.container}>
        <Calendar
          onDayPress={day => handleChooseDate(day.dateString)}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: YowPetTheme.brand.primary,
            },
          }}
          style={Calender.calendar}
        />

        <View style={Calender.reminderContainer}>
          <Text style={Calender.title}>Reminders for {selectedDate}</Text>
          {reminders.length > 0 ? (
           reminders.map((reminder, index) => (
              <View key={index} style={Calender.reminderCard}>
                <Text style={Calender.reminderText}>🔔 {reminder.title}</Text>
              </View>
            ))
          ) : (
            <Text style={{ color: '#555' }}>No reminders for this day.</Text>
          )}
        </View>
      </View>
  );
}
