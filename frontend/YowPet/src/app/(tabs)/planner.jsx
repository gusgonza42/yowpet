import { Calender, getDynamicMapStyles } from '@/components/Planner/styles';
import { useRequest } from '@/services/api/fetchingdata';
import { YowPetTheme } from '@/theme/Colors';
import React, { useEffect, useState } from 'react';
import { View, Text,  TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useAuth } from '@/context/AuthContext';
import { userService } from '@/services/profile/userService';
import Addnotifimodal from '@/components/Planner/addnotifimodal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

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

  const deleteReminder = async (reminderId) => {
    try {
      await requestData('DELETE', `/agenda/delete/${reminderId}`);
      fetchRemindersForDate(selectedDate);
      fetchNotifications();
    } catch (error) {
      console.log('Error deleting reminder:', error);
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
        theme={{
          backgroundColor: 'white',
          calendarBackground: 'white',
          textSectionTitleColor: "black",
          dayTextColor: '#111',
          todayTextColor: YowPetTheme.brand.primary, // Today
          selectedDayTextColor: '#fff',  // Text color when a day is selected
          selectedDayBackgroundColor: YowPetTheme.brand.primary,
          monthTextColor: '#333',        // Month title color
          arrowColor: YowPetTheme.brand.primary,
          textDisabledColor: '#ccc',     // Color of disabled days
        }}
      />

      <ScrollView style={Calender.reminderContainer}>
        <Text style={Calender.title}>Reminders for {selectedDate}</Text>
        {reminders.length > 0 ? (
          reminders.map((reminder, index) => (
            <View key={index} style={Calender.reminderCard}>
              <View style={Calender.reminderItem}>
                <Text style={Calender.reminderText}>
                  <MaterialCommunityIcons
                    name="calendar-clock"
                    size={24}
                    color={YowPetTheme.status.info}
                  /> {reminder.title}
                </Text>
                <TouchableOpacity onPress={() => deleteReminder(reminder.id)}>
                  <AntDesign name="delete" size={20} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={{ color: '#555' }}>No reminders for this day.</Text>
        )}
      </ScrollView>

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
