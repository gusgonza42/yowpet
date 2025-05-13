import { Calender } from '@/components/auth/styles';
import { YowPetTheme } from '@/theme/Colors';
import { ScreenContainer } from '@components/global/ScreenContainer';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const remindersData = {
  '2025-05-14': [
    { id: '1', title: 'Vet Appointment at 10:00 AM' },
    { id: '2', title: 'Dog Food Pickup at 3:00 PM' },
  ],
  '2025-05-15': [
    { id: '3', title: 'Playdate at the Park at 4:00 PM' },
  ],
};

export default function CalendarScreen() {
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
const [selectedDate, setSelectedDate] = useState(today);


  const reminders = remindersData[selectedDate] || [];

  return (
    <ScreenContainer>

    <View style={Calender.container}>
      <Calendar
        onDayPress={day => setSelectedDate(day.dateString)}
        markedDates={{
          ...Object.keys(remindersData).reduce((acc, date) => {
            acc[date] = { marked: true, dotColor: '#A0B3FF' };
            return acc;
          }, {}),
          ...(selectedDate && {
            [selectedDate]: {
              selected: true,
              selectedColor: YowPetTheme.brand.primary,
              marked: true,
            },
          }),
        }}
        style={Calender.calendar}
      />

      <View style={Calender.reminderContainer}>
        <Text style={Calender.title}>Reminders for {selectedDate || '...'}</Text>
        {reminders.length > 0 ? (
          <FlatList
            data={reminders}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={Calender.reminderCard}>
                <Text style={Calender.reminderText}>🔔 {item.title}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={{ color: '#555' }}>No reminders for this day.</Text>
        )}
      </View>
    </View>

    </ScreenContainer>
  );
}


