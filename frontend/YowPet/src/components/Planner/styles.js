import { StyleSheet } from "react-native";
import { YowPetTheme } from '@theme/Colors';

export const Calender = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A0B3FF",
    borderRadius: 10,
    paddingVertical: 20,
    padding: 16
  },
  calendar: {
    marginBottom: 20
  },
  reminderContainer: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  reminderCard: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  reminderText: {
    fontSize: 16
  },
});