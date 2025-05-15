import { Calender } from '@/components/Planner/styles';
import { useRequest } from '@/services/api/fetchingdata';
import { YowPetTheme } from '@/theme/Colors';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, TextInput } from 'react-native';

export default function CalendarScreen() {
  // Get local date in YYYY-MM-DD format (not UTC)
  const formatLocalDate = (date: Date) => date.toLocaleDateString('sv-SE'); // "sv-SE" = ISO-like format (YYYY-MM-DD)
  const [newTitle, setNewTitle] = useState('');

  console.warn("Planner 15 --> User id is= " + AsyncStorage.getItem('userId'))

  // Usage
  const today = formatLocalDate(new Date());

  const [selectedDate, setSelectedDate] = useState(today);
  const [reminders, setReminders] = useState([]);
  const { requestData, responseData, loading } = useRequest();
  const [notifications, setNotifications] = useState([]);

  const fetchRemindersForDate = async (date: string) => {
    try {
      const userId = await AsyncStorage.getItem('userId'); // adjust the key name if needed
      const data = await requestData('GET', `/yowpet/agenda?date=${date}&user=${userId}`, {
        body: parseInt(userId), // or JSON.stringify({ user: parseInt(userId) }) if needed
      });
      setReminders(data.data || []);
    } catch (error) {
      console.log('Error fetching reminders:', error);
      setReminders([]);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const notificationsData = await requestData('GET', `/yowpet/agenda/all/${userId}`);
        setNotifications(notificationsData.data || []);
      } catch (error) {
        console.log('Error fetching notifications:', error);
        setNotifications([]);
      }
    };


    fetchNotifications();
  }, []);

  const addReminder = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const today = formatLocalDate(new Date());

    const newAgenda = {
      title: newTitle,
      date: today,
      user: parseInt(userId),
      // Add other required fields depending on Agenda model
    };

    try {
      await requestData('POST', '/yowpet/agenda/create', { body: newAgenda });
      setNewTitle('');
      fetchRemindersForDate(today);
      fetchNotifications();
    } catch (error) {
      console.log('Error adding reminder:', error);
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

  // Helper function to format the date string into "YYYY-MM-DD"
  const formatDate = (dateString: string) => {
    const localDate = new Date(dateString);
    return localDate.toLocaleDateString('sv-SE'); // ensures YYYY-MM-DD in local time
  };


  const generateMarkedDates = () => {
    const marked = {};
    notifications.forEach(notification => {
      const date = notification.date; // Assuming notification has a 'date' field in ISO string format
      const formattedDate = formatDate(date);

      // Log the formatted date to check it
      console.log('Formatted date:', formattedDate);

      // Add a dot if there is a notification for that date
      marked[formattedDate] = {
        dots: [
          {
            color: YowPetTheme.brand.primary, // The dot color
            selectedDotColor: 'green', // The color when selected
          },
        ],
      };
    });
    console.log('Marked Dates:', marked); // Log the marked dates object
    return marked;
  };


  return (
    <View style={Calender.container}>
      <Calendar
        onDayPress={day => handleChooseDate(day.dateString)}
        markingType="multi-dot"
        markedDates={{
          ...generateMarkedDates(),
          [selectedDate]: {
            ...(generateMarkedDates()[selectedDate] || {}),
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

      <View style={{ padding: 10 }}>
        <TextInput
          placeholder="Enter reminder title"
          value={newTitle}
          onChangeText={setNewTitle}
          style={{
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 5,
            padding: 8,
            marginBottom: 10,
          }}
        />
        <Button title="Add Reminder" onPress={addReminder} />
      </View>

    </View>
  );
}
