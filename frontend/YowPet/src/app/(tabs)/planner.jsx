import { Calender, getDynamicMapStyles } from '@/components/Planner/styles';
import { useRequest } from '@/services/api/fetchingdata';
import { YowPetTheme } from '@/theme/Colors';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useAuth } from '@/context/AuthContext';
import { userService } from '@/services/profile/userService';
import Addnotifimodal from '@/components/Planner/addnotifimodal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

export default function CalendarScreen() {
  const { user } = useAuth();
  const userId = user?.userId;
  const insets = useSafeAreaInsets();
  const dynamicStyles = getDynamicMapStyles(insets);

  const formatLocalDate = (date: Date) => date.toLocaleDateString('sv-SE');
  const today = formatLocalDate(new Date());

  const [selectedDate, setSelectedDate] = useState(today);
  const [reminders, setReminders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const { requestData } = useRequest();
  const [showModal, setShowModal] = useState(false);

  const fetchRemindersForDate = async (date: string) => {
    try {
      const userId = await userService.getUserIdFromToken();


      const data = await requestData('GET', `/agenda?date=${date}&user=${userId}`, {
        body: userId,
      });
      setReminders(data.data || []);
    } catch (error) {
      console.log('Error fetching reminders:', error);
      setReminders([]);
    }
  };


  const fetchNotifications = async () => {
    const userId = await userService.getUserIdFromToken();
    if (!userId) return;
    try {

      const notificationsData = await requestData('GET', `/agenda/all/${userId}`);
      setNotifications(notificationsData.data || []);
    } catch (error) {
      console.log('Error fetching notifications:', error);
      setNotifications([]);
    }
  };

  const addReminder = async () => {
    try {
      const userId = await userService.getUserIdFromToken();

      const agenda = {
        title: newTitle,
        date: selectedDate,
        userid: userId,
      };
      console.warn('Agenda:', agenda);

      await requestData('POST', '/agenda/create', agenda);
      setNewTitle('');
      fetchRemindersForDate(today);
      fetchNotifications();
    } catch (error) {
      console.log('Error adding reminder:', error);
    }
  };


  const handleChooseDate = async (dateString: string) => {
    setSelectedDate(dateString);
    await fetchRemindersForDate(dateString);
  };

  useEffect(() => {
    fetchRemindersForDate(today);
    fetchNotifications();
  }, [userId]); // ✅ Wait until userId is available

  const formatDate = (dateString: string) => {
    const localDate = new Date(dateString);
    return localDate.toLocaleDateString('sv-SE');
  };

  const generateMarkedDates = () => {
    const marked = {};
    notifications.forEach(notification => {
      const formattedDate = formatDate(notification.date);
      marked[formattedDate] = {
        dots: [
          {
            color: YowPetTheme.brand.primary,
            selectedDotColor: 'green',
          },
        ],
      };
    });
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

      <TouchableOpacity
        onPress={() => { setShowModal(true) }}
        title="Add Reminder"
        color={YowPetTheme.brand.primary}
        style={dynamicStyles.addbutton}
        accessibilityLabel="Add Reminder"

      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>

      <Addnotifimodal
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        onRequestClose={() => setShowModal(false)}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        addReminder={addReminder}
        closeModal={() => setShowModal(false)}
      />
    </View>
  );
}
